import { useEffect, useState } from "react";
import { langHeaders } from "../i18n/i18n";

const NEWS_URL = `${import.meta.env.VITE_BASE_URL}/shared_app/yangiliklar/`;

/**
 * Barcha sahifalardagi yangiliklarni bitta ro'yxatga yig'adi
 * (foto va video galereya shu ma'lumotdan quriladi).
 */
export default function useAllNews(lang) {
  const [news, setNews] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      setIsPending(true);
      setError(null);
      try {
        const get = (page) =>
          fetch(`${NEWS_URL}?page=${page}`, { headers: langHeaders(lang), signal: controller.signal }).then((r) => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
          });
        const first = await get(1);
        const total = first.total_pages || 1;
        const rest = await Promise.all(
          Array.from({ length: total - 1 }, (_, i) => get(i + 2).then((j) => j.results || []))
        );
        setNews([...(first.results || []), ...rest.flat()]);
      } catch (err) {
        if (err.name !== "AbortError") setError(err);
      } finally {
        if (!controller.signal.aborted) setIsPending(false);
      }
    };
    load();
    return () => controller.abort();
  }, [lang]);

  return { news, isPending, error };
}
