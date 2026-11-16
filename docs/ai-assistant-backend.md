# AI yordamchi (robotcha) — backend shartnomasi

Saytning pastki o'ng burchagidagi robotcha ([src/components/AiAssistant.jsx](../src/components/AiAssistant.jsx))
kasbiy ta'limga oid savollarga javob beradi. Frontend LLM bilan to'g'ridan-to'g'ri gaplashmaydi —
API kalit brauzerga chiqib ketmasligi uchun so'rov **backend orqali** o'tadi.

## Endpoint

```
POST {VITE_BASE_URL}/ai_app/chat/
```

Boshqa manzil kerak bo'lsa, frontend `.env` da `VITE_AI_CHAT_URL` bilan almashtiriladi.

### So'rov

Headerlar: `Content-Type: application/json`, `Accept-Language: uz|ru|en`

```json
{
  "lang": "uz",
  "messages": [
    { "role": "user", "content": "Texnikumga qabul qanday amalga oshiriladi?" },
    { "role": "assistant", "content": "..." },
    { "role": "user", "content": "Hujjatlar ro'yxati qanday?" }
  ]
}
```

- `messages` — oxirgi 20 tagacha xabar, birinchisi va oxirgisi doim `user`.
- Har bir savol 1000 belgigacha.

### Javob

```json
{ "reply": "Javob matni (oddiy matn yoki yengil markdown: **qalin**, - ro'yxat)" }
```

Xatoda 4xx/5xx status qaytariladi — frontend "Qayta urinib ko'rish" tugmasini ko'rsatadi.

## Django namunaviy implementatsiya

```bash
pip install anthropic
# Server muhitida:
export ANTHROPIC_API_KEY=sk-ant-...
```

```python
# ai_app/views.py
import json
import logging

import anthropic
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

logger = logging.getLogger(__name__)
client = anthropic.Anthropic()  # ANTHROPIC_API_KEY muhit o'zgaruvchisidan o'qiladi

MODEL = "claude-opus-5-5"
MAX_MESSAGES = 20
MAX_CHARS = 1000

LANG_NAMES = {"uz": "o'zbek (lotin)", "ru": "rus", "en": "ingliz"}

SYSTEM_PROMPT = """Sen ktri.uz saytidagi AI yordamchisan — O'zbekiston kasbiy ta'lim tizimi bo'yicha maslahatchi.
Kasbiy ta'limga oid savollarga javob berasan: kasb-hunar maktablari, kollejlar, texnikumlar, qabul tartibi,
yo'nalishlar va kasblar, o'quv dasturlari, malaka oshirish va qayta tayyorlash, pedagoglar, metodik ta'minot,
dual ta'lim, ishga joylashish, tegishli me'yoriy hujjatlar.

Qoidalar:
- Javobni qisqa va aniq yoz (odatda 3-8 gap yoki qisqa ro'yxat). Faqat **qalin** va "- " ro'yxatdan foydalan.
- Aniq bilmagan raqam, sana, narx yoki hujjat raqamini to'qima. Ishonching komil bo'lmasa, shuni ayt va
  rasmiy manbani (ktri.uz, edu.uz, lex.uz yoki tegishli muassasa) tekshirishni tavsiya qil.
- Kasbiy ta'limga aloqasi yo'q savollarga xushmuomalalik bilan javob bermasligingni ayt va
  kasbiy ta'lim mavzusiga qaytar.
- Shaxsiy ma'lumot so'rama."""


@csrf_exempt
@require_POST
def chat(request):
    try:
        body = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"detail": "Noto'g'ri JSON"}, status=400)

    lang = body.get("lang") if body.get("lang") in LANG_NAMES else "uz"
    messages = [
        {"role": m["role"], "content": str(m["content"])[:MAX_CHARS]}
        for m in body.get("messages", [])[-MAX_MESSAGES:]
        if isinstance(m, dict) and m.get("role") in ("user", "assistant") and str(m.get("content", "")).strip()
    ]
    while messages and messages[0]["role"] != "user":
        messages.pop(0)
    if not messages or messages[-1]["role"] != "user":
        return JsonResponse({"detail": "Savol topilmadi"}, status=400)

    try:
        response = client.beta.messages.create(
            model=MODEL,
            max_tokens=4000,
            system=[{
                "type": "text",
                "text": SYSTEM_PROMPT,
                "cache_control": {"type": "ephemeral"},
            }],
            messages=[
                *messages,
                # Javob tili — har so'rovda o'zgarishi mumkin, shuning uchun system prompt keshini buzmaslik
                # uchun alohida mid-conversation system xabar sifatida beriladi
                {"role": "system", "content": f"Javobni {LANG_NAMES[lang]} tilida yoz."},
            ],
            output_config={"effort": "low"},  # chat uchun tez va arzon
            betas=["server-side-fallback-2026-07-01"],
            fallbacks="default",  # xavfsizlik filtri rad etsa, boshqa modelda qayta urinadi
        )
    except anthropic.RateLimitError:
        return JsonResponse({"detail": "Juda ko'p so'rov, birozdan so'ng urinib ko'ring"}, status=429)
    except anthropic.APIStatusError as e:
        logger.exception("AI API xatosi: %s", e.status_code)
        return JsonResponse({"detail": "AI xizmati xatosi"}, status=502)
    except anthropic.APIConnectionError:
        logger.exception("AI API ga ulanib bo'lmadi")
        return JsonResponse({"detail": "AI xizmati mavjud emas"}, status=503)

    if response.stop_reason == "refusal":
        return JsonResponse({"reply": "Kechirasiz, bu savolga javob bera olmayman."})

    reply = "".join(b.text for b in response.content if b.type == "text").strip()
    return JsonResponse({"reply": reply or "Kechirasiz, javob tayyorlay olmadim."})
```

```python
# ai_app/urls.py
from django.urls import path
from . import views

urlpatterns = [path("chat/", views.chat)]
# asosiy urls.py: path("api/ai_app/", include("ai_app.urls"))
```

### Production uchun tavsiyalar

- **Rate limit** qo'ying (masalan, IP bo'yicha daqiqasiga 10 so'rov — `django-ratelimit` yoki nginx `limit_req`),
  aks holda endpoint orqali API hisobini sarflab yuborishlari mumkin.
- CORS: faqat `ktri.uz` domeniga ruxsat bering.
- Ko'proq aniqlik kerak bo'lsa, institut ma'lumotlari (FAQ, qabul qoidalari, kurslar ro'yxati)ni
  `SYSTEM_PROMPT` ga qo'shish mumkin — u keshlanadi, shuning uchun takroriy so'rovlarda arzon tushadi.

## Keyingi bosqich: audio

Frontenddagi `askAssistant()` ([src/utils/aiAssistant.js](../src/utils/aiAssistant.js)) matn oladi va matn qaytaradi.
Ovozli rejim shu funksiya atrofiga qo'shiladi: mikrofon → nutqni matnga (STT) → `askAssistant` → matnni nutqqa (TTS).
Endpoint shartnomasi o'zgarmaydi.
