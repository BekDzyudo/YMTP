import React, { useState, useMemo, useEffect } from "react";
import {
  FaCalendar,
  FaNewspaper,
  FaTrophy,
  FaUsers,
  FaGraduationCap,
  FaHandshake,
  FaLightbulb,
  FaHome,
} from "react-icons/fa";
import useGetFetch from "../../hooks/useGetFetch";
import { Link } from "react-router-dom";
import { useHero } from "../../context/HeroContext";
import Pagination from "../../components/Pagination";

function NewsList() {
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [currentPage, setCurrentPage] = useState(1);
  const { setOnHero } = useHero();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/shared_app/yangiliklar/?page=${page}`
      );
      const json = await res.json();
      setData(json);
      setCurrentPage(page);
    } catch (error) {
      console.error("Ma'lumot yuklashda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  useEffect(() => {
    setOnHero(false);
    return () => setOnHero(false);
  }, [setOnHero]);

  // Kategoriyaga mos icon va gradient
  const getCategoryStyle = (kategoriya) => {
    const styles = {
      Uchrashuv: {
        icon: <FaHandshake size={18} />,
        gradient: "from-blue-500 to-cyan-500",
        bgLight: "bg-blue-50",
        textColor: "text-blue-600",
      },
      Talim: {
        icon: <FaGraduationCap size={18} />,
        gradient: "from-emerald-500 to-teal-500",
        bgLight: "bg-emerald-50",
        textColor: "text-emerald-600",
      },
      Yutuqlar: {
        icon: <FaTrophy size={18} />,
        gradient: "from-amber-500 to-orange-500",
        bgLight: "bg-amber-50",
        textColor: "text-amber-600",
      },
      Tadbir: {
        icon: <FaUsers size={18} />,
        gradient: "from-violet-500 to-purple-500",
        bgLight: "bg-violet-50",
        textColor: "text-violet-600",
      },
      Texnologiya: {
        icon: <FaLightbulb size={18} />,
        gradient: "from-emerald-500 to-teal-500",
        bgLight: "bg-emerald-50",
        textColor: "text-emerald-600",
      },
      Hamkorlik: {
        icon: <FaHandshake size={18} />,
        gradient: "from-pink-500 to-rose-500",
        bgLight: "bg-pink-50",
        textColor: "text-pink-600",
      },
      Elon: {
        icon: <FaNewspaper size={18} />,
        gradient: "from-indigo-500 to-blue-500",
        bgLight: "bg-indigo-50",
        textColor: "text-indigo-600",
      },
    };

    return (
      styles[kategoriya] || {
        icon: <FaNewspaper size={18} />,
        gradient: "from-blue-500 to-cyan-500",
        bgLight: "bg-blue-50",
        textColor: "text-blue-600",
      }
    );
  };

  // Sanani formatlash
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avgust",
      "Sentabr",
      "Oktabr",
      "Noyabr",
      "Dekabr",
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // HTML taglarini olib tashlash
  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // Title ni kesish
  const truncateTitle = (text, maxLength = 80) => {
    if (text.length <= maxLength) return text;
    const truncated = text.substr(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    return truncated.substr(0, lastSpace) + "...";
  };

  // Excerpt ni kesish
  const truncateExcerpt = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    const truncated = text.substr(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    return truncated.substr(0, lastSpace) + "...";
  };

  const newsData =
    data?.results?.map((item) => ({
      id: item.id,
      title: item.title,
      excerpt: stripHtml(item.text || ""),
      date: formatDate(item.sana),
      image: item.image,
      category: item.kategoriya,
      ...getCategoryStyle(item.kategoriya),
    })) || [];

  // Kategoriyalar ro'yxati
  const categories = [
    "Barchasi",
    ...new Set(newsData.map((item) => item.category)),
  ];

  // Filter - faqat kategoriya bo'yicha
  const filteredNews = useMemo(() => {
    if (selectedCategory === "Barchasi") {
      return newsData;
    }
    return newsData.filter((item) => item.category === selectedCategory);
  }, [newsData, selectedCategory]);

  // Kategoriya o'zgarganda sahifani tiklash
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Sahifa o'zgarganda faqat barcha yangiliklar ko'rsatilganda API ga murojaat qilish
  const handlePageChange = (page) => {
    if (selectedCategory === "Barchasi") {
      fetchData(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Lokal pagination (kategoriya filterlanganda)
  const itemsPerPage = 12;
  const totalPages =
    selectedCategory === "Barchasi"
      ? data?.total_pages || 1
      : Math.ceil(filteredNews.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews =
    selectedCategory === "Barchasi"
      ? filteredNews
      : filteredNews.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <section className="relative min-h-screen w-full bg-linear-to-b from-base-100 via-base-200 to-base-100 py-24 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-base-content/70">
            Yangiliklar yuklanmoqda...
          </p>
        </div>
      </section>
    );
  }

  if (!data && !loading) {
    return (
      <section className="relative min-h-screen w-full bg-linear-to-b from-base-100 via-base-200 to-base-100 py-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-error">Ma'lumot topilmadi</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-100 relative min-h-screen w-full bg-linear-to-b from-base-100 via-base-200 to-base-100 py-24 mt-2 sm:mt-10 lg:mt-15">
      <div className="px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12">
        {/* Header with Filter */}
        <div className="mb-4 sm:mb-8">
          {/* Breadcrumb */}
          <div className="hidden md:block breadcrumbs text-base mb-4">
            <ul>
              <li>
                <Link to="/" className="text-base-content/70 hover:text-blue-700 transition-colors">
                  <FaHome className="w-4 h-4 mr-1" />
                  Bosh sahifa
                </Link>
              </li>
              <li className="text-blue-700 font-semibold">Yangiliklar</li>
            </ul>
          </div>

          <div className="flex flex-col items-center lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
            <div>
              <h1 className="text-2xl sm:text-4xl font-serif lg:text-5xl font-black bg-linear-to-r from-blue-700 via-blue-600 to-blue-500 bg-clip-text text-transparent">
                Barcha yangiliklar
              </h1>
            </div>

            {/* Category Filter */}
            {/* Mobile: Select dropdown (< 640px) */}
            <div className="sm:hidden w-full">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="select select-bordered w-full bg-base-100 border-base-300 focus:outline-none focus:border-blue-600 cursor-pointer font-semibold"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Tablet & Desktop: Buttons (≥ 640px) */}
            <div className="hidden sm:flex flex-wrap gap-2 justify-start lg:justify-end">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`md:px-4 md:py-2 px-2 py-1 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    selectedCategory === category
                      ? "bg-linear-to-r from-blue-700 via-blue-600 to-blue-500 text-white shadow-lg scale-105"
                      : "bg-base-100 text-base-content hover:bg-base-200 border border-base-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* News Grid */}
        {currentNews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {currentNews.map((news) => (
                <Link key={news.id} to={`/news/${news.id}`} className="group">
                  <div className="relative h-full bg-base-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-base-300 flex flex-col transition-all duration-300 hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative h-60.5 overflow-hidden shrink-0">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Category Badge */}
                      <div
                        className={`absolute top-3 left-3 px-3 py-1.5 rounded-full bg-linear-to-r ${news.gradient} flex items-center gap-2 shadow-lg`}
                      >
                        <span className="text-white">{news.icon}</span>
                        <span className="text-white text-sm font-semibold">
                          {news.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                      {/* Date */}
                      <div className="flex items-center gap-1.5 text-base-content/60 mb-2">
                        <FaCalendar size={12} />
                        <span className="text-xs font-medium">{news.date}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-2">
                        {truncateTitle(news.title)}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-base-content/60 line-clamp-3 mb-3 flex-1">
                        {truncateExcerpt(news.excerpt)}
                      </p>

                      {/* Read More Link */}
                      <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300 cursor-pointer">
                        <span>Batafsil o'qish</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                current_page={currentPage}
                total_pages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <FaNewspaper className="text-6xl text-base-content/20 mb-4" />
            <p className="text-base-content/70 text-lg">
              Hech qanday yangilik topilmadi
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default NewsList;
