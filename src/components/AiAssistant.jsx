import { useCallback, useEffect, useRef, useState } from "react";
import {
  FaPaperPlane,
  FaTimes,
  FaRedo,
  FaMinus,
  FaPaperclip,
  FaChevronRight,
  FaBookOpen,
  FaGraduationCap,
  FaFileAlt,
  FaPlay,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { LuShieldCheck } from "react-icons/lu";
import { useTranslation } from "../i18n/LanguageContext";
import { askAssistant, MAX_QUESTION_LENGTH } from "../utils/aiAssistant";
import { RobotHead, RobotMascot } from "./AiRobot";

const HISTORY_KEY = "aiAssistantHistory";
const GREETING_KEY = "aiAssistantGreetingShown";

const readHistory = () => {
  try {
    const saved = JSON.parse(sessionStorage.getItem(HISTORY_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

const saveHistory = (messages) => {
  try {
    sessionStorage.setItem(HISTORY_KEY, JSON.stringify(messages));
  } catch {
    // sessionStorage mavjud emas
  }
};

// Tezkor savollar: tugma matni va yuboriladigan savol
const QUICK_QUESTIONS = [
  { key: "materials", icon: <FaBookOpen className="w-6 shrink-0 text-xl text-[#1d5fd6]" /> },
  { key: "platforms", icon: <FaGraduationCap className="w-6 shrink-0 text-xl text-[#1d5fd6]" /> },
  { key: "journals", icon: <FaFileAlt className="w-6 shrink-0 text-xl text-[#1d5fd6]" /> },
  {
    key: "lessons",
    icon: (
      <span className="w-6 h-5 shrink-0 rounded-[5px] bg-[#1d5fd6] flex items-center justify-center">
        <FaPlay className="text-white text-[9px] ml-px" />
      </span>
    ),
  },
];

// AI javobini xavfsiz formatlash (innerHTML ishlatilmaydi): paragraf, ro'yxat, **qalin**
function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      part
    )
  );
}

function FormattedText({ text }) {
  const blocks = [];
  let list = null;
  text.split("\n").forEach((raw, i) => {
    const line = raw.trim();
    const bullet = line.match(/^(?:[-*•]|\d+[.)])\s+(.*)$/);
    if (bullet) {
      if (!list) {
        list = { ordered: /^\d/.test(line), items: [] };
        blocks.push(list);
      }
      list.items.push(bullet[1]);
      return;
    }
    list = null;
    if (!line) return;
    const heading = line.match(/^#{1,6}\s+(.*)$/);
    blocks.push({ key: i, text: heading ? `**${heading[1]}**` : line });
  });

  return blocks.map((b, i) => {
    if (b.items) {
      const Tag = b.ordered ? "ol" : "ul";
      return (
        <Tag key={i} className={`${b.ordered ? "list-decimal" : "list-disc"} pl-5 my-1 space-y-0.5`}>
          {b.items.map((item, j) => (
            <li key={j}>{renderInline(item)}</li>
          ))}
        </Tag>
      );
    }
    return (
      <p key={i} className="my-1 first:mt-0 last:mb-0">
        {renderInline(b.text)}
      </p>
    );
  });
}

// Javob yonidagi kichik avatar
function BotAvatar() {
  return (
    <span className="w-8 h-8 shrink-0 rounded-full bg-linear-to-br from-[#194882] to-info flex items-center justify-center shadow-md ring-2 ring-white">
      <RobotHead className="w-6 h-6" />
    </span>
  );
}

function HeaderButton({ onClick, label, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-[#0b1f4d] shadow-md hover:bg-white hover:scale-105 active:scale-95 transition-all"
      title={label}
      aria-label={label}
    >
      {children}
    </button>
  );
}

function AiAssistant() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(readHistory);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  const listRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  const hasChat = messages.length > 0 || isLoading || error;

  useEffect(() => saveHistory(messages), [messages]);

  // 10 soniyadan keyin robotcha salomlashadi (sessiyada bir marta)
  useEffect(() => {
    let shown = false;
    try {
      shown = sessionStorage.getItem(GREETING_KEY) === "true";
    } catch {
      // e'tiborsiz
    }
    if (shown) return;
    const timer = setTimeout(() => {
      setShowGreeting(true);
      try {
        sessionStorage.setItem(GREETING_KEY, "true");
      } catch {
        // e'tiborsiz
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Yangi xabar kelganda pastga scroll
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, isLoading, error, isOpen]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Komponent yopilganda kutilayotgan so'rovni bekor qilish
  useEffect(() => () => abortRef.current?.abort(), []);

  // Esc bilan kichraytirish
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const requestReply = useCallback(async (history) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setIsLoading(true);
    setError(false);
    try {
      const reply = await askAssistant(history, { signal: controller.signal });
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      if (err.name === "AbortError") return;
      console.error("AI yordamchi xatosi:", err);
      setError(true);
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
        setIsLoading(false);
      }
    }
  }, []);

  const sendQuestion = (text) => {
    const question = text.trim().slice(0, MAX_QUESTION_LENGTH);
    if (!question || isLoading) return;
    const next = [...messages, { role: "user", content: question }];
    setMessages(next);
    setInput("");
    requestReply(next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendQuestion(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      sendQuestion(input);
    }
  };

  const handleRetry = () => {
    if (messages.at(-1)?.role === "user") requestReply(messages);
  };

  // Yopish: suhbat tugaydi va keyingi ochilishda boshlang'ich oyna chiqadi
  const handleClose = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsLoading(false);
    setError(false);
    setMessages([]);
    setInput("");
    setIsOpen(false);
  };

  const openChat = () => {
    setShowGreeting(false);
    setIsOpen(true);
  };

  const quickButtons = (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
      {QUICK_QUESTIONS.map(({ key, icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => sendQuestion(t(`ai.quick.${key}Q`))}
          disabled={isLoading}
          className="group flex items-center gap-2 sm:gap-2.5 min-w-0 px-2.5 sm:px-3 py-3 rounded-xl bg-white border border-[#cfdcf3] text-[#0b1f4d] text-xs sm:text-sm font-medium text-left hover:border-[#1d5fd6] hover:shadow-md hover:-translate-y-0.5 disabled:opacity-60 transition-all"
        >
          {icon}
          <span className="flex-1 min-w-0 truncate">{t(`ai.quick.${key}`)}</span>
          <FaChevronRight className="shrink-0 text-xs text-[#1d5fd6] transition-transform group-hover:translate-x-0.5" />
        </button>
      ))}
    </div>
  );

  return (
    <>
      {/* Salomlashish pufakchasi */}
      {showGreeting && !isOpen && (
        <div className="fixed bottom-28 right-4 sm:right-6 z-50 animate-slideUp max-w-[calc(100vw-2rem)]">
          <div className="relative bg-white rounded-2xl shadow-2xl p-4 pr-9 w-72 max-w-full border border-blue-100">
            <button
              onClick={() => setShowGreeting(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1"
              aria-label={t("fab.close")}
            >
              <FaTimes />
            </button>
            <p className="font-bold text-gray-800 mb-1">{t("ai.greetingTitle")}</p>
            <p className="text-sm text-gray-600 mb-3">{t("ai.greetingText")}</p>
            <button
              onClick={openChat}
              className="w-full px-4 py-2 bg-linear-to-br from-[#1d5fd6] to-[#0b3a91] text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              {t("ai.ask")}
            </button>
            <span className="absolute -bottom-2 right-8 w-4 h-4 bg-white rotate-45 border-r border-b border-blue-100" />
          </div>
        </div>
      )}

      {/* Chat oynasi */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={t("ai.title")}
          className={`fixed z-50 inset-x-0 bottom-0 max-h-[calc(100dvh-4rem)] sm:inset-auto sm:bottom-28 sm:right-6 sm:w-[480px] sm:max-h-[calc(100vh-8.5rem)] flex flex-col overflow-hidden rounded-t-[28px] sm:rounded-[28px] border border-white/70 shadow-[0_24px_60px_-12px_rgba(11,42,102,0.45)] bg-linear-to-b from-[#c9dcfb] via-[#eef4ff] to-white animate-slideUp ${
            hasChat ? "h-[calc(100dvh-4rem)] sm:h-[600px]" : ""
          }`}
        >
          {/* Pastki o'ng burchakdagi ko'k to'lqin */}
          <svg
            viewBox="0 0 200 80"
            preserveAspectRatio="none"
            className="pointer-events-none absolute bottom-0 right-0 w-48 h-16"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="aiWave" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="100%" stopColor="#1d4fd8" />
              </linearGradient>
            </defs>
            <path d="M0 80 C70 76 150 60 200 0 V80 Z" fill="url(#aiWave)" />
          </svg>

          {/* Boshqaruv tugmalari */}
          <div className="absolute top-3.5 right-3.5 z-10 flex gap-2.5">
            <HeaderButton onClick={() => setIsOpen(false)} label={t("ai.minimize")}>
              <FaMinus className="text-sm" />
            </HeaderButton>
            <HeaderButton onClick={handleClose} label={t("fab.close")}>
              <FaTimes className="text-base" />
            </HeaderButton>
          </div>

          {hasChat ? (
            /* Suhbat sarlavhasi */
            <div className="flex items-center gap-3 px-4 pt-4 pb-3 pr-28 shrink-0">
              <span className="w-12 h-12 shrink-0 rounded-full bg-white/80 shadow flex items-center justify-center">
                <RobotMascot className="w-11 h-11" />
              </span>
              <div className="min-w-0">
                <p className="font-bold text-[#0b1f4d] leading-tight truncate">{t("ai.title")}</p>
                <p className="flex items-center gap-1.5 text-xs text-[#3c4f75]">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  {t("ai.online")}
                </p>
              </div>
            </div>
          ) : (
            /* Boshlang'ich oyna: robotcha va salomlashish */
            <div className="relative flex items-start gap-1 sm:gap-2 px-3 sm:px-4 pt-4 shrink-0">
              <div className="relative w-36 sm:w-48 shrink-0 -ml-2 sm:-ml-3 -mr-3 sm:-mr-4">
                <span className="absolute left-2 right-0 top-8 bottom-0 rounded-full bg-linear-to-br from-white/70 to-[#b9d1fa]/60" />
                <RobotMascot className="relative w-full drop-shadow-[0_10px_14px_rgba(11,42,102,0.25)] ai-robot-float" />
              </div>
              <div className="relative flex-1 min-w-0 pt-12 pb-4">
                <div className="relative bg-white rounded-3xl px-4 py-3.5 sm:px-5 sm:py-4 shadow-[0_8px_24px_-8px_rgba(11,42,102,0.25)]">
                  <span className="absolute -left-2 top-1/2 w-5 h-5 bg-white rotate-45 rounded-sm" aria-hidden="true" />
                  <p className="relative text-lg sm:text-[22px] font-extrabold whitespace-nowrap text-[#0b1f4d] leading-tight">{t("ai.hello")}</p>
                  <p className="relative mt-1 text-sm sm:text-[17px] text-[#0b1f4d] leading-snug">{t("ai.intro")}</p>
                </div>
                <p className="mt-3 text-xs sm:text-sm text-[#3c4f75] leading-relaxed">{t("ai.introNote")}</p>
              </div>
            </div>
          )}

          {/* Kontent */}
          {hasChat ? (
            <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-white/60 border-y border-white" aria-live="polite">
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div className="bg-linear-to-br from-[#1d5fd6] to-[#0b3a91] text-white rounded-2xl rounded-br-sm px-3.5 py-2.5 text-sm max-w-[85%] whitespace-pre-wrap break-words shadow-sm">
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex items-end gap-2">
                    <BotAvatar />
                    <div className="bg-white border border-[#dbe5f5] rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm text-gray-800 max-w-[85%] shadow-sm break-words">
                      <FormattedText text={m.content} />
                    </div>
                  </div>
                )
              )}

              {isLoading && (
                <div className="flex items-end gap-2">
                  <BotAvatar />
                  <div className="bg-white border border-[#dbe5f5] rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-1" aria-label={t("ai.thinking")}>
                    <span className="w-2 h-2 rounded-full bg-[#1d5fd6]/60 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-[#1d5fd6]/60 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-[#1d5fd6]/60 animate-bounce" />
                  </div>
                </div>
              )}

              {error && (
                <div className="flex flex-col items-center gap-2 text-center">
                  <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{t("ai.error")}</p>
                  <button
                    onClick={handleRetry}
                    className="inline-flex items-center gap-2 text-sm text-[#1d5fd6] font-semibold hover:underline"
                  >
                    <FaRedo className="text-xs" /> {t("ai.retry")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="relative px-4 sm:px-6 pt-4 pb-1 overflow-y-auto bg-white/70 rounded-t-[28px]">
              <p className="flex items-center gap-2 mb-3 text-base sm:text-lg font-bold text-[#0b1f4d]">
                <HiSparkles className="text-xl text-[#1d5fd6]" />
                {t("ai.quickTitle")}
              </p>
              {quickButtons}
            </div>
          )}

          {/* Kiritish maydoni */}
          <form onSubmit={handleSubmit} className={`relative px-4 sm:px-6 pt-4 pb-3 shrink-0 ${hasChat ? "bg-white/60" : "bg-white/70"}`}>
            <div className="flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-white border border-[#cfdcf3] shadow-sm focus-within:border-[#1d5fd6] focus-within:ring-2 focus-within:ring-[#1d5fd6]/20 transition-all">
              <FaPaperclip className="shrink-0 text-lg text-[#5b6b8c]" aria-hidden="true" />
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_QUESTION_LENGTH))}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder={t("ai.placeholder")}
                className="flex-1 min-w-0 resize-none max-h-28 py-2.5 bg-transparent text-sm sm:text-base text-[#0b1f4d] placeholder:text-[#5b6b8c] outline-none field-sizing-content"
                aria-label={t("ai.placeholder")}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="h-11 w-11 sm:h-12 sm:w-12 shrink-0 flex items-center justify-center rounded-full bg-linear-to-br from-[#1d5fd6] to-[#0b3a91] text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
                aria-label={t("common.send")}
                title={t("common.send")}
              >
                <FaPaperPlane className="-ml-0.5" />
              </button>
            </div>
            <p className="relative mt-2.5 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs italic text-[#3c4f75]" title={t("ai.disclaimer")}>
              <LuShieldCheck className="shrink-0 text-base text-[#1d5fd6] not-italic" />
              {t("ai.scope")}
            </p>
          </form>
        </div>
      )}

      {/* Robotcha tugmasi */}
      <button
        onClick={() => (isOpen ? setIsOpen(false) : openChat())}
        className={`fixed bottom-5 right-4 sm:right-6 z-50 group ${isOpen ? "hidden sm:block" : ""}`}
        title={isOpen ? t("ai.minimize") : t("ai.title")}
        aria-label={isOpen ? t("ai.minimize") : t("ai.title")}
        aria-expanded={isOpen}
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-info/40 animate-ping [animation-duration:2.5s]" />
        )}
        <span className="relative flex items-center justify-center w-[72px] h-[72px] rounded-full bg-linear-to-br from-[#194882] to-info ring-4 ring-white/90 shadow-[0_10px_30px_-4px_rgba(11,42,102,0.6)] transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
          <RobotHead className="w-12 h-12 ai-robot-float" />
          <span className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-green-500 ring-[3px] ring-white" aria-hidden="true" />
        </span>
      </button>
    </>
  );
}

export default AiAssistant;
