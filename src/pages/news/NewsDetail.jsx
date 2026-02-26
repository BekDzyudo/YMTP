import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaCalendar,
  FaHome,
  FaNewspaper,
  FaTrophy,
  FaUsers,
  FaGraduationCap,
  FaHandshake,
  FaLightbulb,
  FaEye,
  FaArrowLeft,
} from "react-icons/fa";
import { useHero } from "../../context/HeroContext";

function NewsDetail() {
  const { id } = useParams();
  const { setOnHero } = useHero();
  const [newsDetail, setNewsDetail] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setOnHero(false);
    return () => setOnHero(false);
  }, [setOnHero]);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/shared_app/yangiliklar/${id}/`
        );
        const data = await res.json();
        setNewsDetail(data);

        // Fetch related news
        const relatedRes = await fetch(
          `${import.meta.env.VITE_BASE_URL}/shared_app/yangiliklar/`
        );
        const relatedData = await relatedRes.json();
        // Filter out current news and limit to 4
        const filtered = relatedData.results
          ?.filter((item) => item.id !== parseInt(id))
          .slice(0, 4);
        setRelatedNews(filtered || []);
      } catch (error) {
        console.error("Ma'lumot yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };


    if (id) {
      fetchNewsDetail();
    }
  }, [id]);

  // Auto-play slider - hooks always called in the same order
  useEffect(() => {
    if (!newsDetail) return;
    
    const newsImages = newsDetail.rasmlar && newsDetail.rasmlar.length > 0
      ? newsDetail.rasmlar.map(item => item.rasm)
      : newsDetail.image ? [newsDetail.image] : [];
    
    if (newsImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [newsDetail]);

  // Kategoriyaga mos icon va gradient
  const getCategoryStyle = (kategoriya) => {
    const styles = {
      Uchrashuv: {
        icon: <FaHandshake size={18} />,
        gradient: "from-blue-500 to-cyan-500",
      },
      Talim: {
        icon: <FaGraduationCap size={18} />,
        gradient: "from-emerald-500 to-teal-500",
      },
      Yutuqlar: {
        icon: <FaTrophy size={18} />,
        gradient: "from-amber-500 to-orange-500",
      },
      Tadbir: {
        icon: <FaUsers size={18} />,
        gradient: "from-violet-500 to-purple-500",
      },
      Texnologiya: {
        icon: <FaLightbulb size={18} />,
        gradient: "from-emerald-500 to-teal-500",
      },
      Hamkorlik: {
        icon: <FaHandshake size={18} />,
        gradient: "from-pink-500 to-rose-500",
      },
      Elon: {
        icon: <FaNewspaper size={18} />,
        gradient: "from-indigo-500 to-blue-500",
      },
    };

    return (
      styles[kategoriya] || {
        icon: <FaNewspaper size={18} />,
        gradient: "from-blue-500 to-cyan-500",
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

  // Title ni kesish (related news uchun)
  const truncateTitle = (text, maxLength = 60) => {
    if (text.length <= maxLength) return text;
    const truncated = text.substr(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    return truncated.substr(0, lastSpace) + "...";
  };

  if (loading) {
    return (
      <section className="relative min-h-screen w-full bg-linear-to-b from-base-100 via-base-200 to-base-100 py-24 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-base-content/70">
            Yangilik yuklanmoqda...
          </p>
        </div>
      </section>
    );
  }

  if (!newsDetail) {
    return (
      <section className="relative min-h-screen w-full bg-linear-to-b from-base-100 via-base-200 to-base-100 py-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-error">Yangilik topilmadi</p>
          <Link
            to="/news"
            className="btn btn-primary mt-4"
          >
            Yangiliklarga qaytish
          </Link>
        </div>
      </section>
    );
  }

  const categoryStyle = getCategoryStyle(newsDetail.kategoriya);
  console.log(newsDetail);

  // Yangilik uchun rasmlar - slider uchun
  const newsImages = newsDetail.rasmlar && newsDetail.rasmlar.length > 0
    ? newsDetail.rasmlar.map(item => item.rasm)
    : newsDetail.image ? [newsDetail.image] : [];

  return (
    <section className="bg-slate-100 relative min-h-screen w-full bg-linear-to-b from-base-100 via-base-200 to-base-100 py-24 mt-2 sm:mt-10 lg:mt-15">
      <div className="px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12">
        {/* Breadcrumb */}
        <div className="breadcrumbs hidden md:block text-base mb-6">
          <ul>
            <li>
              <Link
                to="/"
                className="text-base-content/70 hover:text-blue-700 transition-colors"
              >
                <FaHome className="w-4 h-4 mr-2" />
                Bosh sahifa
              </Link>
            </li>
            <li>
              <Link
                to="/news"
                className="text-base-content/70 hover:text-blue-700 transition-colors"
              >
                Yangiliklar
              </Link>
            </li>
            <li className="text-blue-700 font-semibold">
              {truncateTitle(newsDetail.title, 40)}
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-base-100 rounded-3xl overflow-hidden shadow-xl border border-base-300">
              {/* Featured Image / Slider */}
              {newsImages.length > 0 && (
                <div className="p-6 sm:p-8">
                  <div className="relative h-[200px] sm:h-[500px] md:h-[600px] xl:h-[700px] overflow-hidden">
                    {/* Slider rasmlar */}
                    {newsImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={newsDetail.title}
                        className={`absolute inset-0 w-full h-full object-cover rounded-t-2xl transition-all duration-700 ${
                          index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                        }`}
                      />
                    ))}
                    
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Category Badge */}
                    <div
                      className={`absolute top-2 sm:top-6 left-2 sm:left-6 px-2 sm:px-4 py-1 sm:py-2 rounded-full bg-linear-to-r ${categoryStyle.gradient} flex items-center gap-2 shadow-lg`}
                    >
                      <span className="text-white">{categoryStyle.icon}</span>
                      <span className="text-white text-sm sm:text-[16px] font-semibold">
                        {newsDetail.kategoriya}
                      </span>
                    </div>

                    {/* Dots indicator - faqat bir nechta rasm bo'lsa */}
                    {newsImages.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {newsImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              index === currentSlide
                                ? 'w-6 bg-blue-600'
                                : 'w-2 bg-white/50 hover:bg-white/70'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="p-6 sm:p-8">
                {/* Date and Views */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-3 px-4 py-2 bg-base-300 rounded-full">
                    <FaCalendar size={16} className="text-blue-600" />
                    <span className="sm:text-base font-semibold text-base-content text-sm">
                      {formatDate(newsDetail.sana)}
                    </span>
                  </div>
                  {newsDetail.views && (
                    <div className="flex items-center gap-3 px-4 py-2 bg-base-200 rounded-full">
                      <FaEye size={16} className="text-blue-600" />
                      <span className="text-base font-semibold text-base-content">
                        {newsDetail.views} ko'rildi
                      </span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-lg sm:text-3xl lg:text-4xl font-serif font-black mb-6 text-base-content leading-tight">
                  {newsDetail.title}
                </h1>

                {/* Content */}
                <div
                  className="text-justify prose prose-xl max-w-none text-base-content/90 leading-relaxed
                  prose-p:text-lg prose-p:leading-relaxed prose-p:mb-4
                  prose-headings:text-base-content prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-ul:list-none prose-ul:pl-0
                  prose-li:relative prose-li:pl-8 prose-li:mb-3
                  prose-li:before:content-['✦'] prose-li:before:absolute prose-li:before:left-0
                  prose-li:before:text-blue-600 prose-li:before:font-bold prose-li:before:text-xl
                  prose-strong:text-base-content prose-strong:font-bold
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: newsDetail.text }}
                />
              </div>
            </article>
          </div>

          {/* Sidebar - Related News */}
          <div className="hidden xl:block lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-xl sm:text-2xl font-serif font-bold mb-6 bg-linear-to-r from-blue-700 via-blue-600 to-blue-500 bg-clip-text text-transparent">
                O'xshash yangiliklar
              </h2>

              <div className="space-y-4">
                {relatedNews.length > 0 ? (
                  relatedNews.map((news) => {
                    const newsStyle = getCategoryStyle(news.kategoriya);
                    return (
                      <Link
                        key={news.id}
                        to={`/news/${news.id}`}
                        className="block group"
                      >
                        <div className="bg-base-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-base-300 transition-all duration-300 hover:-translate-y-1">
                          {/* Image */}
                          <div className="relative h-50 overflow-hidden">
                            <img
                              src={news.image}
                              alt={news.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                            {/* Category Badge */}
                            <div
                              className={`absolute top-2 left-2 px-2 py-1 rounded-full bg-linear-to-r ${newsStyle.gradient} flex items-center gap-1.5 shadow-lg`}
                            >
                              <span className="text-white text-xs">
                                {newsStyle.icon}
                              </span>
                              <span className="text-white text-xs font-semibold">
                                {news.kategoriya}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-4">
                            <div className="flex items-center gap-2 text-base-content/60 mb-2">
                              <FaCalendar size={10} />
                              <span className="text-xs">
                                {formatDate(news.sana)}
                              </span>
                            </div>
                            <h3 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors">
                              {news.title}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-base-content/60">
                    <FaNewspaper className="text-4xl mx-auto mb-2 opacity-30" />
                    <p className="text-sm">O'xshash yangiliklar topilmadi</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsDetail;