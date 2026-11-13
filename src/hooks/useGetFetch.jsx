import React, { useEffect, useState } from "react";
import { useTranslation } from "../i18n/LanguageContext";
import { langHeaders, txDataFor } from "../i18n/i18n";

function useGetFetch(url) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  // Til o'zgarganda ma'lumot qayta yuklanadi
  const { lang } = useTranslation();

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    if (!url) {
      setData(null);
      setIsPending(false);
      setError(null);
      return () => {
        cancelled = true;
        controller.abort();
      };
    }

    const fetchData = async () => {
      setIsPending(true);
      setError(null);
      try {
        const req = await fetch(url, {
          signal: controller.signal,
          headers: langHeaders(lang),
        });
        if (!req.ok) {
          throw new Error(req.statusText || `Request failed: ${req.status}`);
        }
        const json = await req.json();
        // O'zbekcha kontent yangi alifboda ko'rsatiladi (o' => ö, g' => ğ, sh => ş, ch => ç)
        if (!cancelled) setData(txDataFor(lang, json));
      } catch (err) {
        if (err.name === "AbortError") return;
        if (!cancelled) {
          setError(err.message || "Unknown error");
          console.error(err);
        }
      } finally {
        if (!cancelled) setIsPending(false);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [url, lang]);

  return { data, isPending, error };
}

export default useGetFetch;
