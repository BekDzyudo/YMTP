# Backend: ko'p tillilikni (uz / ru / en) ulash

Frontend tayyor. Bu hujjatda backend nima qilishi kerakligi yozilgan.

## 1. Frontend nima yuboradi

- Saytda 3 til bor: `uz` (asosiy), `ru`, `en`. Foydalanuvchi Header'dagi tugma orqali tanlaydi.
- Frontend **har bir API so'roviga** (GET va POST) shu headerni qo'shadi:

  ```
  Accept-Language: uz | ru | en
  ```

- Header quyidagi manzillarga ketadi: `VITE_BASE_URL`, `VITE_BASE_URL_RTR`, `VITE_BASE_URL_EDU`, `VITE_BASE_URL_ADABIYOTLAR` va `https://kasb-edu.uz/api`.
- Til almashganda frontend sahifadagi ma'lumotni qayta so'raydi.
- Interfeys matnlari (tugmalar, sarlavhalar, xato xabarlari) frontendda tarjima qilingan. **Backenddan faqat ma'lumotlar bazasidagi kontent** tarjima qilinishi kerak.

## 2. Asosiy qoida: javob tuzilishi o'zgarmasin

Frontend `title`, `text`, `nomi` kabi maydonlarni o'qiydi. Backend **o'sha maydon nomlarida** so'ralgan tildagi qiymatni qaytarsin.

To'g'ri:

```json
{ "id": 5, "title": "Новости института", "text": "..." }
```

Noto'g'ri (frontend buni o'qimaydi):

```json
{ "id": 5, "title_uz": "...", "title_ru": "...", "title_en": "..." }
```

Agar biror tilda tarjima bo'sh bo'lsa, **o'zbekcha qiymat qaytsin** (bo'sh joy chiqmasin).

## 3. Django'da sozlash (tavsiya)

### 3.1. Tillar va middleware

```python
# settings.py
from django.utils.translation import gettext_lazy as _

LANGUAGE_CODE = "uz"
USE_I18N = True

LANGUAGES = [
    ("uz", _("O'zbekcha")),
    ("ru", _("Русский")),
    ("en", _("English")),
]

MIDDLEWARE = [
    # ...
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.locale.LocaleMiddleware",   # SessionMiddleware dan keyin, CommonMiddleware dan oldin
    "django.middleware.common.CommonMiddleware",
    # ...
]
```

`LocaleMiddleware` `Accept-Language` headerini o'qib, aktiv tilni o'rnatadi. Javobga `Vary: Accept-Language` ham avtomatik qo'shiladi.

### 3.2. Model maydonlarini tarjima qilish (`django-modeltranslation`)

```bash
pip install django-modeltranslation
```

```python
# settings.py
INSTALLED_APPS = [
    "modeltranslation",   # django.contrib.admin dan OLDIN bo'lishi shart
    "django.contrib.admin",
    # ...
]

MODELTRANSLATION_DEFAULT_LANGUAGE = "uz"
MODELTRANSLATION_FALLBACK_LANGUAGES = ("uz",)
```

Har bir app'da `translation.py`:

```python
# shared_app/translation.py
from modeltranslation.translator import register, TranslationOptions
from .models import Yangilik

@register(Yangilik)
class YangilikTR(TranslationOptions):
    fields = ("title", "text")
```

So'ng:

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py update_translation_fields   # mavjud matnlarni *_uz ustunlariga ko'chiradi
```

`modeltranslation` o'rnatilgandan keyin `obj.title` aktiv tildagi qiymatni (bo'sh bo'lsa o'zbekchasini) qaytaradi. Serializerlarni o'zgartirish **shart emas**: `fields = ["id", "title", "text"]` qanday bo'lsa, shunday qoladi.

### 3.3. Admin panel

Muharrirlar 3 tilni to'ldira olishi uchun:

```python
from modeltranslation.admin import TabbedTranslationAdmin

@admin.register(Yangilik)
class YangilikAdmin(TabbedTranslationAdmin):
    ...
```

### 3.4. Xato xabarlari

DRF'ning standart validatsiya xabarlari aktiv tilda avtomatik chiqadi. Kodda yozilgan o'zbekcha xabarlarni `gettext` bilan o'rang:

```python
from django.utils.translation import gettext as _
raise ValidationError(_("Bu email allaqachon ro'yxatdan o'tgan"))
```

So'ng `makemessages -l ru -l en` qiling, `.po` fayllarni tarjima qiling va `compilemessages` qiling.

## 4. Qaysi endpointlarda nimani tarjima qilish kerak

Faqat foydalanuvchiga ko'rinadigan matnli maydonlar tarjima qilinadi. Ismlar (F.I.Sh), telefon, email, sana, fayl va rasm maydonlariga tegilmaydi.

### Asosiy backend (`VITE_BASE_URL`)

| Endpoint | Tarjima qilinadigan maydonlar |
|---|---|
| `/shared_app/yangiliklar/`, `/shared_app/yangiliklar/latest/`, `/shared_app/yangiliklar/{id}/` | `title`, `text`, `kategoriya` (5-bandga qarang) |
| `/shared_app/institut/`, `/shared_app/institut/contact/` | `title`, `description` |
| `/shared_app/rahbariyat/` | `lavozimi`, `vazifasi`, `mehnat_faoliyati`, qabul kunlari |
| `/shared_app/tuzilma/`, `/shared_app/tuzilma/{id}/xodimlar/` | `nomi`, `bolim_nomi`, xodim `lavozimi` |
| `/shared_app/xodim/{id}/` | `lavozimi`, `biografiya`, `vazifasi`, `mehnat_faoliyati` |
| `/shared_app/hujjatlar/` | hujjat nomi, tavsifi |
| `/shared_app/vacancies/`, `/shared_app/vacancies/{id}/` | `title`, `department`, `requirements`, majburiyatlar, ish sharoiti, `location`, `languages`, ish kunlari |
| `/shared_app/anti-corruption/` | (POST) faqat xato xabarlari |
| `/shared_app/contact/create/`, `/shared_app/vacancies/{id}/apply/` | (POST) faqat xato xabarlari |
| `/edu-prof/bilim-soha/`, `/edu-prof/talim-soha/`, `/edu-prof/talim-yunalish/`, `/edu-prof/kasb-va-mutaxassislik/`, `/edu-prof/fan/`, `/shared_app/fanlar/` | `name` / `nomi` |
| `/district/`, `/district-college/`, `/college-detail/`, `/kasb/`, `/pedagoklar/`, `/qisqa-muddatli-kurslar/`, `/world-skills/` | nomlar, tavsiflar, manzil |
| `/birlashma/...` (materiallar, kategoriyalar) | kategoriya va material turi nomlari |
| `/register/...`, `/login/`, `/email-verify/`, `/password-reset/` | faqat xato xabarlari |

### Metodik ta'minot (`VITE_BASE_URL_EDU`)

`/bilim-soxasi/`, `/talim-soxasi/`, `/kasb/`, `/kasb-files/`, `/uquv-qullanma/`, `/uquv-material/`, `/uquv-mat-type/`, `/qisqa-kurs/`, `/qisqa-kurs-tur/`, `/new-category/`, `/new-item/`: nom (`name`, `title`) va tavsif maydonlari.

### RTR (`VITE_BASE_URL_RTR`)

`/v1/rtr_base_app/subject-list/`, `/v1/rtr_base_app/theme-detail/`, `/v1/video/video-material-list/`: fan va mavzu nomlari (`title`), `content`, `practical_assignment`.

### Adabiyotlar (`VITE_BASE_URL_ADABIYOTLAR`)

`/talim-darajalari/`, `/bilim-sohalar/`, `/talim-sohalar/`, `/talim-yonalishlar/`, `/kasblar/`, `/bloklar/`: `name` / `nomi`.

> Bu servislar alohida backend bo'lsa, ularning har birida 3-band sozlamalari takrorlanadi.

## 5. Muhim: yangiliklar kategoriyasi

Frontend yangilik kartochkasining ikonka va rangini `kategoriya` qiymatiga qarab tanlaydi. Bunda o'zbekcha nomlar kalit sifatida ishlatiladi: `Uchrashuv`, `Ta'lim`, `Yutuqlar`, `Tadbir`, `Texnologiya`, `Hamkorlik`, `Elon`, `Korrupsiya`.

Kategoriya nomi tarjima qilinsa, ikonka standart holatga tushib qoladi. Shuning uchun:

- yangilik javobiga o'zgarmas `kategoriya_slug` maydonini qo'shing (masalan, `uchrashuv`, `talim`, `yutuqlar`, `tadbir`, `texnologiya`, `hamkorlik`, `elon`, `korrupsiya`);
- `kategoriya` esa tarjima qilingan nomni qaytarsin.

`kategoriya_slug` qo'shilgach, frontendga xabar bering: ikonka tanlashni slug'ga o'tkazamiz (kichik o'zgarish).

## 6. CORS va kesh

- `django-cors-headers` ishlatilsa, `accept-language` standart ruxsat etilgan headerlar ro'yxatida bor, qo'shimcha sozlash kerak emas. Agar `CORS_ALLOW_HEADERS` qo'lda yozilgan bo'lsa, unga `"accept-language"` qo'shing.
- Kesh (`cache_page`, nginx, CDN) ishlatilsa, javob tilga qarab keshlanishi kerak. Django buni `Vary: Accept-Language` orqali qiladi; nginx yoki CDN'da ham `Accept-Language` kesh kalitiga kirishini tekshiring. Aks holda bir tildagi javob boshqa tilda ham chiqib qoladi.

## 7. Tekshirish

```bash
curl -H "Accept-Language: uz" https://kasb-edu.uz/api/shared_app/yangiliklar/latest/
curl -H "Accept-Language: ru" https://kasb-edu.uz/api/shared_app/yangiliklar/latest/
curl -H "Accept-Language: en" https://kasb-edu.uz/api/shared_app/yangiliklar/latest/
```

Kutilgan natija:

- uchala javobning tuzilishi (maydon nomlari) bir xil;
- matnlar tegishli tilda;
- tarjimasi yo'q yozuvlarda o'zbekcha matn chiqadi;
- header yuborilmasa, o'zbekcha qaytadi.

Brauzerda: saytni ochib, Header'da tilni almashtiring. DevTools → Network bo'limida so'rovlarda `Accept-Language` borligini va javob o'zgarganini ko'ring.

## 8. Bajarish ro'yxati

- [ ] `LocaleMiddleware`, `LANGUAGES`, `LANGUAGE_CODE = "uz"` sozlandi
- [ ] `django-modeltranslation` o'rnatildi, `translation.py` fayllar yozildi (4-band)
- [ ] Migratsiya va `update_translation_fields` bajarildi
- [ ] Admin `TabbedTranslationAdmin` ga o'tkazildi
- [ ] Javob tuzilishi o'zgarmadi, tarjima bo'sh bo'lsa o'zbekcha qaytadi
- [ ] Yangiliklarga `kategoriya_slug` qo'shildi va frontendga xabar berildi
- [ ] Kodda yozilgan xato xabarlari `gettext` bilan o'raldi, `.po` fayllar tarjima qilindi
- [ ] RTR, EDU va Adabiyotlar servislarida ham shu ish qilindi
- [ ] Kesh tilga qarab ajratilishi tekshirildi
- [ ] `curl` bilan 3 tilda tekshirildi
- [ ] Muharrirlar mavjud kontentni ru/en tillariga tarjima qilib chiqdi
