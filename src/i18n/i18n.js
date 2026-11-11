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
