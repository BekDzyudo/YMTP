import { useCallback, useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaTimes, FaRedo, FaTrashAlt } from "react-icons/fa";
import { useTranslation } from "../i18n/LanguageContext";
import { askAssistant, MAX_QUESTION_LENGTH } from "../utils/aiAssistant";

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

// Robotcha ikonkasi
function RobotIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <line x1="32" y1="6" x2="32" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="5" r="3.5" fill="#facc15" />
      <rect x="10" y="14" width="44" height="34" rx="12" fill="currentColor" />
      <rect x="16" y="21" width="32" height="18" rx="8" fill="#0f2f57" />
      <circle cx="25" cy="30" r="4" fill="#5eead4" className="ai-robot-eye" />
      <circle cx="39" cy="30" r="4" fill="#5eead4" className="ai-robot-eye" />
      <rect x="4" y="25" width="6" height="12" rx="3" fill="currentColor" />
      <rect x="54" y="25" width="6" height="12" rx="3" fill="currentColor" />
      <path d="M24 54h16" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

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

  // Esc bilan yopish
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

  const handleClear = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsLoading(false);
    setError(false);
    setMessages([]);
  };

  const openChat = () => {
    setShowGreeting(false);
    setIsOpen(true);
  };

  const suggestions = [t("ai.suggestion1"), t("ai.suggestion2"), t("ai.suggestion3")];

  return (
    <>
      {/* Salomlashish pufakchasi */}
      {showGreeting && !isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 animate-slideUp max-w-[calc(100vw-2rem)]">
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
              className="w-full px-4 py-2 bg-linear-to-br from-[#194882] to-info text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all"
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
          className="fixed z-50 inset-x-0 bottom-0 top-16 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-96 sm:h-[min(600px,calc(100vh-8rem))] flex flex-col bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl border border-gray-200 overflow-hidden animate-slideUp"
        >
          {/* Sarlavha */}
          <div className="bg-linear-to-br from-[#194882] to-info px-4 py-3 flex items-center gap-3 text-white shrink-0">
            <div className="bg-white/15 rounded-full p-1.5">
              <RobotIcon className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold leading-tight">{t("ai.title")}</p>
              <p className="text-xs text-white/80 truncate">{t("ai.subtitle")}</p>
            </div>
            {messages.length > 0 && (
              <button
                onClick={handleClear}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                title={t("ai.clear")}
                aria-label={t("ai.clear")}
              >
                <FaTrashAlt className="text-sm" />
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              title={t("fab.close")}
              aria-label={t("fab.close")}
            >
              <FaTimes />
            </button>
          </div>

          {/* Xabarlar */}
          <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50" aria-live="polite">
            {/* Kirish xabari */}
            <div className="flex items-end gap-2">
              <RobotIcon className="w-7 h-7 text-[#194882] shrink-0" />
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm text-gray-800 max-w-[85%] shadow-sm">
                {t("ai.welcome")}
              </div>
            </div>

            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2 pl-9">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendQuestion(s)}
                    className="text-left text-xs px-3 py-1.5 rounded-full border border-blue-200 bg-white text-[#194882] hover:bg-blue-50 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <div className="bg-[#194882] text-white rounded-2xl rounded-br-sm px-3.5 py-2.5 text-sm max-w-[85%] whitespace-pre-wrap break-words">
                    {m.content}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex items-end gap-2">
                  <RobotIcon className="w-7 h-7 text-[#194882] shrink-0" />
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm text-gray-800 max-w-[85%] shadow-sm break-words">
                    <FormattedText text={m.content} />
                  </div>
                </div>
              )
            )}

            {isLoading && (
              <div className="flex items-end gap-2">
                <RobotIcon className="w-7 h-7 text-[#194882] shrink-0" />
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-1" aria-label={t("ai.thinking")}>
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                </div>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{t("ai.error")}</p>
                <button
                  onClick={handleRetry}
                  className="inline-flex items-center gap-2 text-sm text-[#194882] font-semibold hover:underline"
                >
                  <FaRedo className="text-xs" /> {t("ai.retry")}
                </button>
              </div>
            )}
          </div>

          {/* Kiritish maydoni */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 bg-white shrink-0">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_QUESTION_LENGTH))}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder={t("ai.placeholder")}
                className="flex-1 resize-none max-h-32 min-h-[44px] px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none field-sizing-content"
                aria-label={t("ai.placeholder")}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="h-11 w-11 shrink-0 flex items-center justify-center rounded-xl bg-linear-to-br from-[#194882] to-info text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                aria-label={t("common.send")}
                title={t("common.send")}
              >
                <FaPaperPlane />
              </button>
            </div>
            <p className="mt-1.5 text-[11px] text-gray-400 text-center">{t("ai.disclaimer")}</p>
          </form>
        </div>
      )}

      {/* Robotcha tugmasi */}
      <button
        onClick={() => (isOpen ? setIsOpen(false) : openChat())}
        className="fixed bottom-6 right-4 sm:right-6 z-50 group"
        title={isOpen ? t("fab.close") : t("ai.title")}
        aria-label={isOpen ? t("fab.close") : t("ai.title")}
        aria-expanded={isOpen}
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-info/40 animate-ping [animation-duration:2.5s]" />
        )}
        <span className="relative flex items-center justify-center w-15 h-15 rounded-full bg-linear-to-br from-[#194882] to-info shadow-2xl transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
          {isOpen ? (
            <FaTimes className="text-white text-xl" />
          ) : (
            <RobotIcon className="w-10 h-10 text-white ai-robot-float" />
          )}
        </span>
      </button>
    </>
  );
}

export default AiAssistant;
