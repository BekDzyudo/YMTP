import {
  FaBalanceScale,
  FaBookOpen,
  FaBriefcase,
  FaBullhorn,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaChartLine,
  FaFlask,
  FaFolderOpen,
  FaGavel,
  FaGlobeAmericas,
  FaHandsHelping,
  FaImages,
  FaInfoCircle,
  FaLaptop,
  FaLayerGroup,
  FaMapMarkedAlt,
  FaMicroscope,
  FaNewspaper,
  FaPhoneAlt,
  FaPhotoVideo,
  FaShieldAlt,
  FaSitemap,
  FaTrophy,
  FaUniversity,
  FaUserGraduate,
  FaUserTie,
  FaUsers,
  FaFileAlt,
  FaVideo,
} from "react-icons/fa";
import { institutLinks } from "./institutLinks";

// Havola ikonkalari (slug bo'yicha)
export const linkIcons = {
  about: FaInfoCircle,
  leadership: FaUserTie,
  structure: FaSitemap,
  "hududiy-filiallar": FaMapMarkedAlt,
  "raqamlashtirish-laboratoriyasi": FaFlask,
  "oquv-metodik-birlashmalar": FaUsers,
  "xalqaro-hamkorlik": FaGlobeAmericas,
  "normativ-documents": FaBalanceScale,
  vacancy: FaBriefcase,
  "anti-corruption": FaShieldAlt,
  "korik-tanlov": FaTrophy,
  science: FaFileAlt,
  "karyera-rivojlantirish": FaChartLine,
  "ijtimoiy-emotsional-konikma": FaHandsHelping,
  doktorantlar: FaUserGraduate,
  "ilmiy-qarorlar": FaGavel,
  "dars-jadvali": FaCalendarAlt,
  "ilmiy-jurnal": FaBookOpen,
  training: FaChalkboardTeacher,
  "methodological-support": FaLayerGroup,
  "digital-educational-resources": FaLaptop,
  news: FaNewspaper,
  announcements: FaBullhorn,
  "photo-gallery": FaImages,
  "video-gallery": FaVideo,
};

const groupLinks = (group) => institutLinks.filter((l) => l.group === group);

/**
 * Header menyusi. Har bir bo'lim headerda alohida turadi, ustiga borilganda
 * o'z bloki (links) ochiladi. `to` bo'lsa — oddiy havola.
 * Barcha bloklar bir xil ko'rinishda va platforma gradienti ranglarida chiqadi (Header.jsx).
 */
export const navMenu = [
  { key: "institut", labelKey: "institutLinks.group.institut", icon: FaUniversity, links: groupLinks("institut") },
  { key: "ochiq", labelKey: "institutLinks.group.ochiq", icon: FaFolderOpen, links: groupLinks("ochiq") },
  { key: "ilmiy", labelKey: "institutLinks.group.ilmiy", icon: FaMicroscope, links: groupLinks("ilmiy") },
  {
    key: "platformalar",
    labelKey: "nav.platforms",
    icon: FaLaptop,
    links: [
      { to: "https://my.moqt.uz/", labelKey: "nav.training", slug: "training", external: true },
      { to: "/methodological-support", labelKey: "nav.methodicalSupport", slug: "methodological-support" },
      { to: "/digital-educational-resources", labelKey: "nav.digitalResources", slug: "digital-educational-resources" },
      ...groupLinks("platforma"), // Ilmiy jurnal
    ],
  },
  {
    key: "media",
    labelKey: "nav.media",
    icon: FaPhotoVideo,
    links: [
      { to: "/news", labelKey: "nav.news", slug: "news" },
      { to: "/announcements", labelKey: "nav.announcements", slug: "announcements" },
      { to: "/photo-gallery", labelKey: "nav.photoGallery", slug: "photo-gallery" },
      { to: "/video-gallery", labelKey: "nav.videoGallery", slug: "video-gallery" },
    ],
  },
  { key: "contact", labelKey: "nav.contact", icon: FaPhoneAlt, to: "/contact" },
];
