import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaVideo, FaPlay, FaTimes, FaCalendar, FaArrowRight } from "react-icons/fa";
import SEO from "../../components/SEO";
import useAllNews from "../../hooks/useAllNews";
import { langHeaders } from "../../i18n/i18n";
import { useTranslation } from "../../i18n/LanguageContext";
import MediaPageLayout from "./MediaPageLayout";

// Alohida videogalereya API (backendda qo'shilsa avtomatik ishlaydi):
// GET /shared_app/videogalereya/ -> [{ id, title, video_url, sana }] yoki { results: [...] }
const VIDEO_API = `${import.meta.env.VITE_BASE_URL}/shared_app/videogalereya/`;

const YT_RE = /(?:youtube\.com\/(?:watch\?(?:[^"'\s<>]*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/g;

const extractYoutubeIds = (text = "") => [...new Set([...text.matchAll(YT_RE)].map((m) => m[1]))];

function VideoThumb({ video, big, onPlay, locale }) {
  return (
    <button
      onClick={() => onPlay(video)}
      className={`group relative block w-full overflow-hidden rounded-2xl bg-slate-900 shadow-md hover:shadow-2xl text-left ${
        big ? "aspect-video lg:aspect-auto lg:h-full lg:min-h-80" : "aspect-video"
      }`}
    >
      {video.ytId ? (
        <img
          src={`https://i.ytimg.com/vi/${video.ytId}/hqdefault.jpg`}
          alt={video.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-white/30">
          <FaVideo size={48} />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <span
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full bg-white/90 text-rose-600 shadow-xl transition-transform duration-300 group-hover:scale-110 ${
          big ? "w-20 h-20" : "w-14 h-14"
        }`}
      >
        <FaPlay className="ml-1" size={big ? 26 : 18} />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-white">
        {video.date && (
          <p className="flex items-center gap-1.5 text-[11px] text-white/75 mb-1">
            <FaCalendar size={10} /> {new Date(video.date).toLocaleDateString(locale)}
          </p>
        )}
        <p className={`font-semibold leading-snug line-clamp-2 ${big ? "text-lg sm:text-2xl" : "text-sm"}`}>{video.title}</p>
      </div>
    </button>
  );
}

function VideoGallery() {
  const { t, lang, locale } = useTranslation();
  const { news, isPending: newsPending } = useAllNews(lang);
  const [apiVideos, setApiVideos] = useState([]);
  const [apiPending, setApiPending] = useState(true);
  const [playing, setPlaying] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(VIDEO_API, { headers: langHeaders(lang), signal: controller.signal })
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.results || [];
        setApiVideos(
          list
            .map((v) => {
              const url = v.video_url || v.url || v.havola || v.video || "";
              const [ytId] = extractYoutubeIds(url);
              return { key: `api-${v.id}`, title: v.title || v.nomi || "", date: v.sana || v.created_at, ytId, file: ytId ? null : url };
            })
            .filter((v) => v.ytId || v.file)
        );
      })
      .catch(() => {})
      .finally(() => !controller.signal.aborted && setApiPending(false));
    return () => controller.abort();
  }, [lang]);

  // Yangiliklar matnidagi YouTube videolar ham galereyaga qo'shiladi
  const newsVideos = useMemo(
    () =>
      news.flatMap((n) =>
        extractYoutubeIds(`${n.text || ""} ${n.video || ""} ${n.video_url || ""}`).map((ytId) => ({
          key: `news-${n.id}-${ytId}`,
          title: n.title,
          date: n.sana,
          ytId,
          newsId: n.id,
        }))
      ),
    [news]
  );

  const videos = useMemo(() => {
    const seen = new Set();
    return [...apiVideos, ...newsVideos].filter((v) => {
      const id = v.ytId || v.file;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  }, [apiVideos, newsVideos]);

  useEffect(() => {
    if (!playing) return;
    const onKey = (e) => e.key === "Escape" && setPlaying(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [playing]);

  const isPending = newsPending || apiPending;
  const [featured, ...rest] = videos;

  return (
    <>
      <SEO title={t("nav.videoGallery")} description={t("media.videoSubtitle")} />
      <MediaPageLayout
        title={t("nav.videoGallery")}
        subtitle={t("media.videoSubtitle")}
        icon={FaVideo}
        stats={videos.length ? [{ value: videos.length, label: t("media.videos") }] : undefined}
      >
        {isPending ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-blue-600" />
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-20 text-base-content/60">
            <FaVideo className="mx-auto text-6xl opacity-20 mb-4" />
            {t("media.noVideos")}
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`grid gap-4 ${rest.length ? "lg:grid-cols-3" : ""}`}>
              <div className={rest.length ? "lg:col-span-2" : ""}>
                <VideoThumb video={featured} big onPlay={setPlaying} locale={locale} />
              </div>
              {rest.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  {rest.slice(0, 2).map((v) => (
                    <VideoThumb key={v.key} video={v} onPlay={setPlaying} locale={locale} />
                  ))}
                </div>
              )}
            </div>
            {rest.length > 2 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {rest.slice(2).map((v) => (
                  <VideoThumb key={v.key} video={v} onPlay={setPlaying} locale={locale} />
                ))}
              </div>
            )}
          </div>
        )}
      </MediaPageLayout>

      {playing && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex flex-col items-center justify-center p-3 sm:p-8 animate-fadeIn"
          onClick={() => setPlaying(null)}
          role="dialog"
          aria-modal="true"
          aria-label={playing.title}
        >
          <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 text-white mb-3">
              <p className="flex-1 font-semibold line-clamp-1">{playing.title}</p>
              {playing.newsId && (
                <Link to={`/news/${playing.newsId}`} className="hidden sm:inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
                  {t("media.openNews")} <FaArrowRight size={12} />
                </Link>
              )}
              <button onClick={() => setPlaying(null)} className="p-2 rounded-lg hover:bg-white/15" aria-label={t("fab.close")}>
                <FaTimes size={20} />
              </button>
            </div>
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-2xl">
              {playing.ytId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${playing.ytId}?autoplay=1&rel=0`}
                  title={playing.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <video src={playing.file} controls autoPlay className="w-full h-full" />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VideoGallery;
