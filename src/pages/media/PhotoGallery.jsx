import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaImages, FaTimes, FaChevronLeft, FaChevronRight, FaCalendar, FaArrowRight } from "react-icons/fa";
import SEO from "../../components/SEO";
import Pagination from "../../components/Pagination";
import useAllNews from "../../hooks/useAllNews";
import { langHeaders } from "../../i18n/i18n";
import { useTranslation } from "../../i18n/LanguageContext";
import MediaPageLayout from "./MediaPageLayout";

const PAGE_SIZE = 12;

// Albom ko'rish oynasi: yangilikning barcha rasmlari (rasmlar backenddagi yangilik tafsilotidan olinadi)
function AlbumLightbox({ album, onClose, t, locale }) {
  const [images, setImages] = useState([album.image]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [album.id]);

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
    <div className="fixed inset-0 z-[60] bg-black/90 flex flex-col animate-fadeIn" role="dialog" aria-modal="true" aria-label={album.title}>
      <div className="flex items-center gap-3 px-4 sm:px-6 py-3 text-white">
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">{album.title}</p>
          <p className="text-xs text-white/60">
            {album.date && new Date(album.date).toLocaleDateString(locale)} · {index + 1} / {images.length}
            {loading && " …"}
          </p>
        </div>
        <Link to={`/news/${album.id}`} className="hidden sm:inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
          {t("media.openNews")} <FaArrowRight size={12} />
        </Link>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/15" aria-label={t("fab.close")}>
          <FaTimes size={20} />
        </button>
      </div>

      <div className="relative flex-1 min-h-0 flex items-center justify-center px-2 sm:px-16" onClick={onClose}>
        <img
          key={images[index]}
          src={images[index]}
          alt={`${album.title} — ${index + 1}`}
          className="max-h-full max-w-full object-contain rounded-lg animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        />
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 sm:left-4 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white"
              aria-label={t("media.prev")}
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 sm:right-4 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white"
              aria-label={t("media.next")}
            >
              <FaChevronRight />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto px-4 py-3 justify-center-safe">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setIndex(i)}
              className={`shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-md overflow-hidden ring-2 transition ${
                i === index ? "ring-white" : "ring-transparent opacity-50 hover:opacity-100"
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

function PhotoGallery() {
  const { t, lang, locale } = useTranslation();
  const { news, isPending, error } = useAllNews(lang);
  const [page, setPage] = useState(1);
  const [openAlbum, setOpenAlbum] = useState(null);

  const albums = useMemo(
    () =>
      news
        .filter((n) => n.image)
        .map((n) => ({ id: n.id, title: n.title, image: n.image, date: n.sana, category: n.kategoriya })),
    [news]
  );

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
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-blue-600" />
          </div>
        ) : error ? (
          <div className="alert alert-error">{t("inst.loadError")}</div>
        ) : albums.length === 0 ? (
          <div className="text-center py-20 text-base-content/60">
            <FaImages className="mx-auto text-6xl opacity-20 mb-4" />
            {t("media.noPhotos")}
          </div>
        ) : (
          <>
            {/* Masonry-ga o'xshash to'r: birinchi albom kattaroq */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[160px] sm:auto-rows-[200px] gap-3 sm:gap-4 mb-8">
              {current.map((album, i) => (
                <button
                  key={album.id}
                  onClick={() => setOpenAlbum(album)}
                  className={`group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl text-left ${
                    i === 0 && page === 1 ? "col-span-2 row-span-2" : ""
                  }`}
                >
                  <img
                    src={album.image}
                    alt={album.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute top-3 right-3 grid place-items-center w-9 h-9 rounded-full bg-white/20 backdrop-blur text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaImages size={14} />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-white">
                    {album.date && (
                      <p className="flex items-center gap-1.5 text-[11px] text-white/75 mb-1">
                        <FaCalendar size={10} /> {new Date(album.date).toLocaleDateString(locale)}
                      </p>
                    )}
                    <p className={`font-semibold leading-snug line-clamp-2 ${i === 0 && page === 1 ? "text-base sm:text-xl" : "text-xs sm:text-sm"}`}>
                      {album.title}
                    </p>
                  </div>
                </button>
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
