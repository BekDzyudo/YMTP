import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaImages, FaTimes, FaChevronLeft, FaChevronRight, FaCalendar, FaArrowRight, FaExpand } from "react-icons/fa";
import SEO from "../../components/SEO";
import Pagination from "../../components/Pagination";
import useAllNews from "../../hooks/useAllNews";
import { langHeaders } from "../../i18n/i18n";
import { useTranslation } from "../../i18n/LanguageContext";
import MediaPageLayout from "./MediaPageLayout";

const PAGE_SIZE = 12;
// Juda kichik (ikonka/placeholder) rasmlar sifatsiz hisoblanib, galereyadan chiqariladi
const MIN_QUALITY_WIDTH = 220;
// Faqat shundan ko'p rasmga ega albomlar galereyada ko'rsatiladi
const MIN_ALBUM_PHOTOS = 5;

// Albom ko'rish oynasi: albomning barcha rasmlari.
// Fotogalereya albomlari uchun rasmlar ro'yxatda allaqachon keladi (album.images);
// yangilikdan olingan albomlar uchun yangilik tafsilotidan so'raladi.
function AlbumLightbox({ album, onClose, t, locale }) {
  const [images, setImages] = useState(album.images?.length ? album.images : [album.image]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(!album.images?.length);

  useEffect(() => {
    if (album.images?.length) return;
    const controller = new AbortController();
    fetch(`${import.meta.env.VITE_BASE_URL}/shared_app/yangiliklar/${album.id}/`, {
      headers: langHeaders(),
      signal: controller.signal,
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const list = (data?.rasmlar || []).map((r) => r.rasm).filter(Boolean);
        if (list.length) setImages(list);
      })
      .catch(() => {})
      .finally(() => !controller.signal.aborted && setLoading(false));
    return () => controller.abort();
  }, [album.id, album.images]);

  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/92 backdrop-blur-sm flex flex-col animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={album.title}
    >
      <div className="flex items-center gap-3 px-4 sm:px-6 py-3.5 text-white bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">{album.title}</p>
          <p className="text-xs text-white/60">
            {album.date && new Date(album.date).toLocaleDateString(locale)} · {index + 1} / {images.length}
            {loading && " …"}
          </p>
        </div>
        {!album.images?.length && (
          <Link to={`/news/${album.id}`} className="hidden sm:inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
            {t("media.openNews")} <FaArrowRight size={12} />
          </Link>
        )}
        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/15 transition-colors" aria-label={t("fab.close")}>
          <FaTimes size={20} />
        </button>
      </div>

      <div className="relative flex-1 min-h-0 flex items-center justify-center px-2 sm:px-16" onClick={onClose}>
        <img
          key={images[index]}
          src={images[index]}
          alt={`${album.title} — ${index + 1}`}
          className="max-h-full max-w-full object-contain rounded-xl shadow-2xl animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        />
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 sm:left-4 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              aria-label={t("media.prev")}
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 sm:right-4 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              aria-label={t("media.next")}
            >
              <FaChevronRight />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto px-4 py-3.5 justify-center-safe bg-gradient-to-t from-black/60 to-transparent">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setIndex(i)}
              className={`shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden ring-2 transition-all duration-200 ${
                i === index ? "ring-white scale-105" : "ring-transparent opacity-45 hover:opacity-90"
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Galereyadagi bitta albom kartasi. Rasm yuklanmasa yoki sifati past (juda kichik) bo'lsa,
// onDiscard orqali albom ro'yxatdan avtomatik chiqariladi — faqat sifatli rasmlar qoladi.
function AlbumTile({ album, big, onOpen, onDiscard, locale }) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = (e) => {
    if (e.target.naturalWidth && e.target.naturalWidth < MIN_QUALITY_WIDTH) {
      onDiscard(album.id);
      return;
    }
    setLoaded(true);
  };

  return (
    <button
      onClick={() => onOpen(album)}
      className={`group relative overflow-hidden rounded-2xl bg-slate-200 shadow-sm ring-1 ring-black/5 hover:shadow-2xl hover:ring-black/10 transition-all duration-300 text-left ${
        big ? "col-span-2 row-span-2" : ""
      }`}
    >
      {!loaded && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 to-slate-300" />}
      <img
        src={album.image}
        alt={album.title}
        loading="lazy"
        onLoad={handleLoad}
        onError={() => onDiscard(album.id)}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
      <span className="absolute top-3 right-3 grid place-items-center w-9 h-9 rounded-full bg-white/20 backdrop-blur text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <FaExpand size={13} />
      </span>
      {album.images?.length > 1 && (
        <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-black/45 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-white">
          <FaImages size={10} /> {album.images.length}
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-white">
        {album.date && (
          <p className="flex items-center gap-1.5 text-[11px] text-white/75 mb-1">
            <FaCalendar size={10} /> {new Date(album.date).toLocaleDateString(locale)}
          </p>
        )}
        <p className={`font-semibold leading-snug line-clamp-2 ${big ? "text-base sm:text-xl" : "text-xs sm:text-sm"}`}>
          {album.title}
        </p>
      </div>
    </button>
  );
}

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[190px] sm:auto-rows-[240px] gap-3 sm:gap-4">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className={`rounded-2xl animate-pulse bg-gradient-to-br from-slate-200 to-slate-300 ${
            i === 0 ? "col-span-2 row-span-2" : ""
          }`}
        />
      ))}
    </div>
  );
}

// Yangilikdan mustaqil fotoalbomlar (admin panelda to'g'ridan-to'g'ri rasm yuklanadigan bo'lim):
// GET /shared_app/fotogalereya/ -> [{ id, title, image, images: [...], sana }]
const PHOTO_API = `${import.meta.env.VITE_BASE_URL}/shared_app/fotogalereya/`;

function PhotoGallery() {
  const { t, lang, locale } = useTranslation();
  const { news, isPending: newsPending, error } = useAllNews(lang);
  const [apiAlbums, setApiAlbums] = useState([]);
  const [apiPending, setApiPending] = useState(true);
  const [page, setPage] = useState(1);
  const [openAlbum, setOpenAlbum] = useState(null);
  const [excludedIds, setExcludedIds] = useState(() => new Set());

  const discard = useCallback((id) => {
    setExcludedIds((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch(PHOTO_API, { headers: langHeaders(lang), signal: controller.signal })
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.results || [];
        setApiAlbums(
          list
            .filter((a) => a.image)
            .map((a) => ({ id: `photo-${a.id}`, title: a.title, image: a.image, images: a.images, date: a.sana }))
        );
      })
      .catch(() => {})
      .finally(() => !controller.signal.aborted && setApiPending(false));
    return () => controller.abort();
  }, [lang]);

  const isPending = newsPending || apiPending;

  const albums = useMemo(() => {
    const seenImages = new Set();
    return [
      ...apiAlbums,
      ...news
        .filter((n) => n.image)
        .map((n) => {
          const images = [...new Set([n.image, ...(n.rasmlar || []).map((r) => r.rasm)].filter(Boolean))];
          return { id: n.id, title: n.title, image: n.image, images, date: n.sana, category: n.kategoriya };
        }),
    ]
      .filter((a) => {
        if ((a.images?.length || 0) <= MIN_ALBUM_PHOTOS) return false; // faqat 5 tadan ko'p rasmli albomlar
        if (excludedIds.has(a.id)) return false;
        if (seenImages.has(a.image)) return false; // dublikat rasmlarni olib tashlaymiz
        seenImages.add(a.image);
        return true;
      })
      .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }, [news, apiAlbums, excludedIds]);

  const totalPages = Math.ceil(albums.length / PAGE_SIZE);
  const current = albums.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <SEO title={t("nav.photoGallery")} description={t("media.photoSubtitle")} />
      <MediaPageLayout
        title={t("nav.photoGallery")}
        subtitle={t("media.photoSubtitle")}
        icon={FaImages}
        stats={albums.length ? [{ value: albums.length, label: t("media.albums") }] : undefined}
      >
        {isPending ? (
          <GallerySkeleton />
        ) : error ? (
          <div className="alert alert-error">{t("inst.loadError")}</div>
        ) : albums.length === 0 ? (
          <div className="text-center py-20 text-base-content/60">
            <FaImages className="mx-auto text-6xl opacity-20 mb-4" />
            {t("media.noPhotos")}
          </div>
        ) : (
          <>
            {/* Masonry-ga o'xshash to'r: birinchi albom kattaroq, faqat sifatli rasmlar ko'rinadi */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[190px] sm:auto-rows-[240px] gap-3 sm:gap-4 mb-8">
              {current.map((album, i) => (
                <AlbumTile
                  key={album.id}
                  album={album}
                  big={i === 0 && page === 1}
                  onOpen={setOpenAlbum}
                  onDiscard={discard}
                  locale={locale}
                />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                current_page={page}
                total_pages={totalPages}
                onPageChange={(p) => {
                  setPage(p);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}
          </>
        )}
      </MediaPageLayout>

      {openAlbum && <AlbumLightbox album={openAlbum} onClose={() => setOpenAlbum(null)} t={t} locale={locale} />}
    </>
  );
}

export default PhotoGallery;
