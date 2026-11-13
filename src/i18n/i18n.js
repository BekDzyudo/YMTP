import messages from "./locales/index.js";

export const LANGUAGES = [
  { code: "uz", label: "O'z", name: "O'zbekcha", flag: "uz", locale: "uz-UZ", ogLocale: "uz_UZ" },
  { code: "ru", label: "Ру", name: "Русский", flag: "ru", locale: "ru-RU", ogLocale: "ru_RU" },
  { code: "en", label: "En", name: "English", flag: "gb", locale: "en-US", ogLocale: "en_US" },
];

export const DEFAULT_LANG = "uz";
const STORAGE_KEY = "lang";

export const isSupportedLang = (code) => LANGUAGES.some((l) => l.code === code);
export const getLanguageInfo = (code) => LANGUAGES.find((l) => l.code === code) || LANGUAGES[0];

export const readSavedLang = () => {
  try {
    // ?lang=ru kabi havola orqali ochilsa, shu til tanlanadi
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (isSupportedLang(fromUrl)) return fromUrl;
  } catch {
    // e'tiborsiz
  }
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isSupportedLang(saved)) return saved;
  } catch {
    // localStorage mavjud emas
  }
  return DEFAULT_LANG;
};

// Hook ishlatib bo'lmaydigan joylar (fetch utillari, komponentdan tashqaridagi helperlar) uchun joriy til
let currentLang = readSavedLang();

export const getCurrentLang = () => currentLang;
export const getCurrentLocale = () => getLanguageInfo(currentLang).locale;

export const setCurrentLang = (code) => {
  currentLang = code;
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // e'tiborsiz
  }
  document.documentElement.setAttribute("lang", code);
};

// API so'rovlari uchun til headeri (backend shu orqali kontent tilini tanlaydi)
export const langHeaders = (lang = currentLang) => ({ "Accept-Language": lang });

// {name} ko'rinishidagi o'zgaruvchilarni almashtirish
const interpolate = (str, vars) =>
  vars ? str.replace(/\{(\w+)\}/g, (m, k) => (vars[k] ?? m)) : str;

export const translate = (lang, key, vars) => {
  const entry = messages[key];
  if (entry === undefined) {
    if (import.meta.env.DEV) console.warn(`[i18n] tarjima topilmadi: ${key}`);
    return key;
  }
  const value = entry[lang] ?? entry[DEFAULT_LANG];
  if (Array.isArray(value)) return value;
  return interpolate(value, vars);
};

// Komponentdan tashqaridagi helperlar uchun (render paytida chaqiriladi)
export const tr = (key, vars) => translate(currentLang, key, vars);

// Yangi o'zbek alifbosi: o' => ö, g' => ğ, ch => ç, sh => ş.
// {o'zgaruvchi}, havola va HTML entity'lar o'zgartirilmaydi.
const APOS = "['‘’ʻʼ`]";
// HTML teglar (<img src="..."> va h.k.), havolalar, email va entity'lar tegilmaydi
const PROTECTED = /(<[^>]*>|\{\w+\}|https?:\/\/[^\s"'<>]+|[\w.+-]+@[\w-]+\.[\w.-]+|&[a-zA-Z]+;|&#\d+;)/;
export const toNewAlphabet = (str) =>
  typeof str !== "string"
    ? str
    : str
        .split(PROTECTED)
        .map((part, i) =>
          i % 2
            ? part
            : part
                .replace(new RegExp("O" + APOS, "g"), "Ö")
                .replace(new RegExp("o" + APOS, "g"), "ö")
                .replace(new RegExp("G" + APOS, "g"), "Ğ")
                .replace(new RegExp("g" + APOS, "g"), "ğ")
                .replace(/C[Hh]/g, "Ç")
                .replace(/ch/g, "ç")
                .replace(/S[Hh]/g, "Ş")
                .replace(/sh/g, "ş")
        )
        .join("");

// Qattiq yozilgan o'zbekcha matnni faqat til o'zbekcha bo'lganda yangi alifboga o'tkazadi
export const txFor = (lang, str) => (lang === "uz" ? toNewAlphabet(str) : str);

// Ma'lumot obyektlari/massivlari uchun: matnli maydonlarni aylantiradi.
// Texnik maydonlar (id, havola, rasm yo'li va h.k.) va o'zbekcha bo'lmagan (inglizcha/nemischa) matnlar tegilmaydi.
const TECH_KEYS = new Set(["id", "slug", "status", "type", "category", "url", "sourceUrl", "link", "href", "to", "path", "src", "image", "img", "icon", "color", "date", "time", "file", "photo", "avatar", "logo", "email", "phone", "lang", "code", "username", "password", "token"]);
const TECH_KEY_RE = /(_url|_id|_link|_file|_image|_photo|_email|_phone|_date|_at)$|^(image|photo|file|url)_/i;
const NON_UZ = /\b(the|of|and|for|with|der|die|und|bei|von)\b|Kh|kh[aeiou]/i;
const looksTechnical = (s) => !/\s/.test(s) && /[/.#@_]/.test(s);
export const txDataFor = (lang, data) => {
  if (lang !== "uz") return data;
  const walk = (v, key) => {
    if (typeof v === "string") return TECH_KEYS.has(key) || (key && TECH_KEY_RE.test(key)) || looksTechnical(v) || NON_UZ.test(v) ? v : toNewAlphabet(v);
    if (Array.isArray(v)) return v.map((x) => walk(x, key));
    if (v && typeof v === "object" && !v.$$typeof && Object.getPrototypeOf(v) === Object.prototype)
      return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x, k)]));
    return v;
  };
  return walk(data);
};

// Bizning API manzillarimiz (tashqi saytlarga header qo'shilmaydi)
const API_BASES = [
  import.meta.env.VITE_BASE_URL,
  import.meta.env.VITE_BASE_URL_RTR,
  import.meta.env.VITE_BASE_URL_EDU,
  import.meta.env.VITE_BASE_URL_ADABIYOTLAR,
  "https://kasb-edu.uz/api",
].filter(Boolean);

const isApiUrl = (url) => API_BASES.some((base) => url.startsWith(base));

// Loyihadagi barcha fetch chaqiruvlariga (GET va POST) Accept-Language qo'shadi.
// Agar so'rovda header allaqachon berilgan bo'lsa, o'zgartirilmaydi.
export const installApiLanguageHeader = () => {
  if (typeof window === "undefined" || window.fetch.__langPatched) return;
  const originalFetch = window.fetch.bind(window);

  const patchedFetch = (input, init = {}) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input?.url;
    if (!url || !isApiUrl(url)) return originalFetch(input, init);

    const headers = new Headers(init.headers || (input instanceof Request ? input.headers : undefined));
    if (!headers.has("Accept-Language")) headers.set("Accept-Language", currentLang);
    return originalFetch(input, { ...init, headers });
  };
  patchedFetch.__langPatched = true;
  window.fetch = patchedFetch;
};
