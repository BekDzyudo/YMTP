import { getCurrentLang, langHeaders } from "../i18n/i18n";

// AI yordamchi (robotcha) backend manzili.
// LLM API kaliti hech qachon frontendga qo'yilmaydi — so'rov backend orqali o'tadi.
// Shartnoma: docs/ai-assistant-backend.md
export const AI_CHAT_URL =
  import.meta.env.VITE_AI_CHAT_URL || `${import.meta.env.VITE_BASE_URL}/ai_app/chat/`;

// Backendga yuboriladigan oxirgi xabarlar soni (kontekst va narxni cheklash uchun)
const MAX_HISTORY = 20;
export const MAX_QUESTION_LENGTH = 1000;

/**
 * Savolni yuboradi va matnli javobni qaytaradi.
 * Keyinchalik audio qo'shilganda ham shu funksiya ishlatiladi:
 * nutq -> matn (STT) -> askAssistant -> matn -> nutq (TTS).
 *
 * @param {{role: "user"|"assistant", content: string}[]} history - suhbat (oxirgisi foydalanuvchi savoli)
 * @param {{signal?: AbortSignal}} [options]
 * @returns {Promise<string>}
 */
export async function askAssistant(history, { signal } = {}) {
  const lang = getCurrentLang();
  const messages = history
    .filter((m) => (m.role === "user" || m.role === "assistant") && m.content?.trim())
    .slice(-MAX_HISTORY)
    .map(({ role, content }) => ({ role, content }));

  // Suhbat foydalanuvchi xabaridan boshlanishi kerak
  while (messages.length && messages[0].role !== "user") messages.shift();

  const response = await fetch(AI_CHAT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...langHeaders(lang) },
    body: JSON.stringify({ messages, lang }),
    signal,
  });

  if (!response.ok) {
    const error = new Error(`AI server xatosi: ${response.status}`);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  const reply = data?.reply ?? data?.answer ?? data?.message;
  if (typeof reply !== "string" || !reply.trim()) {
    throw new Error("AI javobi bo'sh");
  }
  return reply.trim();
}
