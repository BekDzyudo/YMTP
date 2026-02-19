import React, { useState, useMemo, useEffect } from "react";
import {
  FaCalendar,
  FaNewspaper,
  FaTrophy,
  FaUsers,
  FaGraduationCap,
  FaHandshake,
  FaLightbulb,
} from "react-icons/fa";
import useGetFetch from "../../hooks/useGetFetch";
import { Link } from "react-router-dom";
import { useHero } from "../../context/HeroContext";
import Pagination from "../../components/Pagination";

function NewsList() {
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const { setOnHero } = useHero();

   const [activeFilter, setActiveFilter] = useState(1);
  const [data, setData] = useState(null);

  const fetchData = async (page = 1) => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/shared_app/yangiliklar/`);
    const json = await res.json();
    setData(json);
  };

useEffect(() => {
    fetchData(1);
  }, [activeFilter]);

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
      image: item.rasm,
      category: item.kategoriya,
      ...getCategoryStyle(item.kategoriya),
    })) || [];

  // Kategoriyalar ro'yxati
  const categories = [
    "Barchasi",
    ...new Set(newsData.map((item) => item.category)),
  ];

  // Filter
  const filteredNews = useMemo(() => {
    if (selectedCategory === "Barchasi") {
      return newsData;
    }
    return newsData.filter((item) => item.category === selectedCategory);
  }, [newsData, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);


  if (!data) {
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

  if (!data) {
    return (
      <section className="relative min-h-screen w-full bg-linear-to-b from-base-100 via-base-200 to-base-100 py-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-error">Xatolik yuz berdi: {error.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full bg-linear-to-b from-base-100 via-base-200 to-base-100 py-24 mt-20">
      <div className="px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12">
        {/* Header with Filter */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif lg:text-5xl font-black bg-linear-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent">
                Barcha yangiliklar
              </h1>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-start lg:justify-end">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-primary text-white shadow-lg scale-105"
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
                <div key={news.id} className="group">
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
                      <Link
                        to={`/news/${news.id}`}
                        className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-300 cursor-pointer"
                      >
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
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {data?.total > 0 && (
              <Pagination
                current_page={data?.current_page}
                total_pages={data?.total_pages}
                onPageChange={fetchData}
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
