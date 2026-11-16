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

// Eng yuqori sifatli YouTube rasmidan boshlab, topilmasa pastroq sifatga qaytamiz
const YT_THUMB_CHAIN = ["maxresdefault", "sddefault", "hqdefault", "mqdefault"];

// YouTube preview yoki yuklangan video fayldan (haqiqiy kadr) önizleme chiqaradi.
// Bitta joyda, chunki aynan shu mantiq ham featured kartada, ham kichik kartalarda kerak.
function VideoFrame({ video, onDiscard, mediaClassName, iconSize = 48 }) {
  const [thumbIdx, setThumbIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const handleError = () => {
    if (video.ytId) {
      if (thumbIdx < YT_THUMB_CHAIN.length - 1) setThumbIdx((i) => i + 1);
      else onDiscard?.(video.key);
    } else {
      onDiscard?.(video.key);
    }
  };

  return (
    <>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-800 to-slate-900" />}
      {video.ytId ? (
        <img
          src={`https://i.ytimg.com/vi/${video.ytId}/${YT_THUMB_CHAIN[thumbIdx]}.jpg`}
          alt={video.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={handleError}
          className={`${mediaClassName} ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      ) : video.file ? (
        <video
          src={`${video.file}#t=0.1`}
          muted
          playsInline
          preload="metadata"
          onLoadedData={() => setLoaded(true)}
          onError={handleError}
          className={`${mediaClassName} ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-white/20">
          <FaVideo size={iconSize} />
        </div>
      )}
    </>
  );
}

// Eng so'nggi/asosiy video — matn va "tomosha qilish" tugmasi bilan ikki bo'lakli katta karta
function FeaturedVideo({ video, onPlay, onDiscard, locale, t }) {
  return (
    <div className="grid lg:grid-cols-5 rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5">
      <button
        onClick={() => onPlay(video)}
        className="group relative lg:col-span-3 aspect-video lg:aspect-auto bg-slate-900 text-left"
      >
        <VideoFrame
          video={video}
          onDiscard={onDiscard}
          iconSize={56}
          mediaClassName="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-20 h-20 rounded-full bg-white/90 text-rose-600 shadow-xl transition-transform duration-300 group-hover:scale-110">
          <FaPlay className="ml-1" size={26} />
        </span>
      </button>

      <div className="lg:col-span-2 flex flex-col justify-center gap-3 bg-gradient-to-br from-[#002d6d] via-[#194882] to-info text-white p-6 sm:p-8">
        <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide">
          <FaVideo size={10} /> {t("media.featured")}
        </span>
        <h2 className="text-xl sm:text-2xl font-black font-serif leading-snug line-clamp-3">{video.title}</h2>
        {video.date && (
          <p className="flex items-center gap-1.5 text-sm text-white/70">
            <FaCalendar size={12} /> {new Date(video.date).toLocaleDateString(locale)}
          </p>
        )}
        <button
          onClick={() => onPlay(video)}
          className="mt-2 inline-flex w-fit items-center gap-2 rounded-xl bg-white text-[#002d6d] font-semibold px-4 py-2.5 text-sm hover:bg-white/90 transition-colors"
        >
          <FaPlay size={12} /> {t("media.watch")}
        </button>
      </div>
    </div>
  );
}

function VideoThumb({ video, onPlay, onDiscard, locale }) {
  return (
    <button
      onClick={() => onPlay(video)}
      className="group relative block w-full aspect-video overflow-hidden rounded-2xl bg-slate-900 shadow-sm ring-1 ring-black/10 hover:shadow-2xl hover:ring-black/0 transition-all duration-300 text-left"
    >
      <VideoFrame
        video={video}
        onDiscard={onDiscard}
        mediaClassName="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-14 h-14 rounded-full bg-white/90 text-rose-600 shadow-xl transition-transform duration-300 group-hover:scale-110">
        <FaPlay className="ml-1" size={18} />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-white">
        {video.date && (
          <p className="flex items-center gap-1.5 text-[11px] text-white/75 mb-1">
            <FaCalendar size={10} /> {new Date(video.date).toLocaleDateString(locale)}
          </p>
        )}
        <p className="font-semibold leading-snug line-clamp-2 text-sm">{video.title}</p>
      </div>
    </button>
  );
}

function VideoSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-5 rounded-3xl overflow-hidden">
        <div className="lg:col-span-3 aspect-video lg:aspect-auto lg:h-80 animate-pulse bg-gradient-to-br from-slate-800 to-slate-900" />
        <div className="lg:col-span-2 h-40 lg:h-80 animate-pulse bg-gradient-to-br from-[#002d6d] to-[#194882]" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="aspect-video rounded-2xl animate-pulse bg-gradient-to-br from-slate-800 to-slate-900" />
        ))}
      </div>
    </div>
  );
}

function VideoGallery() {
  const { t, lang, locale } = useTranslation();
  const { news, isPending: newsPending } = useAllNews(lang);
  const [apiVideos, setApiVideos] = useState([]);
  const [apiPending, setApiPending] = useState(true);
  const [playing, setPlaying] = useState(null);
  const [excludedKeys, setExcludedKeys] = useState(() => new Set());

  const discard = (key) => setExcludedKeys((prev) => (prev.has(key) ? prev : new Set(prev).add(key)));

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
      if (excludedKeys.has(v.key)) return false;
      const id = v.ytId || v.file;
      if (seen.has(id)) return false; // dublikat videolarni olib tashlaymiz
      seen.add(id);
      return true;
    });
  }, [apiVideos, newsVideos, excludedKeys]);

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
          <VideoSkeleton />
        ) : videos.length === 0 ? (
          <div className="text-center py-20 text-base-content/60">
            <FaVideo className="mx-auto text-6xl opacity-20 mb-4" />
            {t("media.noVideos")}
          </div>
        ) : (
          <div className="space-y-8">
            <FeaturedVideo video={featured} onPlay={setPlaying} onDiscard={discard} locale={locale} t={t} />
            {rest.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-slate-700 mb-3">{t("media.moreVideos")}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {rest.map((v) => (
                    <VideoThumb key={v.key} video={v} onPlay={setPlaying} onDiscard={discard} locale={locale} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </MediaPageLayout>

      {playing && (
        <div
          className="fixed inset-0 z-[60] bg-black/92 backdrop-blur-sm flex flex-col items-center justify-center p-3 sm:p-8 animate-fadeIn"
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
              <button onClick={() => setPlaying(null)} className="p-2 rounded-full hover:bg-white/15 transition-colors" aria-label={t("fab.close")}>
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
