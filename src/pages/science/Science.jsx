import { useEffect, useState } from "react";
import {
  FaFileAlt,
  FaFilePdf,
  FaDownload,
  FaSearch,
  FaHome,
  FaExternalLinkAlt,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import SEO from "../../components/SEO";
import { scienceCategories, scienceData } from "../../data/scienceProfEdu";

const PAGE_SIZE = 10;

function Science() {
  const [activeCategory, setActiveCategory] = useState(scienceCategories[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const category = scienceCategories.find((c) => c.id === activeCategory);
  const allItems = scienceData[activeCategory] || [];

  const filteredItems = searchQuery.trim()
    ? allItems.filter((item) =>
        `${item.title} ${item.author || ""}`
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase())
      )
    : allItems;

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const pageItems = filteredItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <SEO
        title="Ilmiy faoliyat"
        description="Institut ilmiy faoliyati: me'yoriy-huquqiy hujjatlar, avtoreferatlar, nashr ishlar va ilmiy jurnallar"
        keywords="ilmiy faoliyat, doktorantura, avtoreferat, nashr ishlar, ilmiy jurnal, kasbiy ta'lim"
      />

      <section className="w-full bg-base-100 rounded-xl sm:rounded-2xl border border-base-300 p-3 sm:p-4 md:p-6 lg:p-8 min-h-105 mt-20 sm:mt-24 mb-25 sm:mb-35 mx-3 sm:mx-5 xl:max-w-7xl 2xl:max-w-10/12 xl:mx-auto">
        <div className="rounded-xl sm:rounded-2xl mb-6 sm:mb-8 px-4 sm:px-6 pt-2 sm:pt-3 pb-4 sm:pb-6 bg-slate-100 border-t-4 sm:border-t-8 border-blue-800">
          <div className="breadcrumbs hidden md:block text-sm sm:text-base mb-4 sm:mb-5">
            <ul>
              <li>
                <Link
                  to="/"
                  className="text-base-content/70 hover:text-blue-700 transition-colors"
                >
                  <FaHome className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Bosh sahifa
                </Link>
              </li>
              <li className="text-blue-700 font-semibold">Ilmiy faoliyat</li>
            </ul>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif">
            Ilmiy faoliyat
          </h1>
        </div>

        {/* Category Tabs - Mobile: Select, Desktop: Buttons */}
        <div className="mb-6 sm:mb-8">
          <div className="sm:hidden">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="select select-bordered w-full rounded-xl outline-0"
            >
              {scienceCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden sm:flex flex-wrap items-center gap-2 md:gap-3">
            {scienceCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`btn btn-sm rounded-xl ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-br from-[#194882] to-info text-white"
                    : "btn-outline"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search + source link */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 items-stretch sm:items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full pl-12 rounded-full outline-0"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <a
            href={category?.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm sm:btn-md rounded-full whitespace-nowrap"
          >
            <FaExternalLinkAlt className="text-xs" />
            Manba: ipitvet.uz
          </a>
        </div>

        {/* List */}
        <div className="grid gap-4">
          {pageItems.length === 0 && (
            <div className="text-center py-12">
              <FaFileAlt className="mx-auto text-6xl opacity-30 mb-4" />
              <p className="text-lg opacity-70">
                {allItems.length === 0
                  ? "Bu bo'lim bo'yicha institut sayti hozircha alohida ma'lumot joylamagan. To'liq ma'lumot uchun manba sahifasiga o'ting."
                  : "Hech narsa topilmadi"}
              </p>
              {allItems.length === 0 && (
                <a
                  href={category?.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-gradient-to-br from-[#194882] to-info text-white btn-sm rounded-lg mt-4"
                >
                  <FaExternalLinkAlt className="text-xs" />
                  Sahifaga o'tish
                </a>
              )}
            </div>
          )}

          {pageItems.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-base-200"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <FaFilePdf className="text-red-500 text-2xl mt-1 shrink-0" />
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-1">
                        {item.title}
                      </h3>
                      {item.author && (
                        <p className="text-sm opacity-70 flex items-center gap-2">
                          <FaUser className="text-xs" />
                          {item.author}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn bg-gradient-to-br from-[#194882] to-info text-white btn-sm sm:btn-md rounded-lg"
                  >
                    <FaDownload />
                    Yuklab olish
                  </a>
                </div>
              </div>
            </div>
          ))}

          {totalPages > 1 && (
            <Pagination
              current_page={currentPage}
              total_pages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>

        <div className="alert bg-gradient-to-br from-[#194882] to-info text-white mt-8">
          <FaFileAlt className="text-base md:text-4xl" />
          <div>
            <h4 className="font-semibold">Eslatma</h4>
            <p className="text-sm">
              Ushbu bo'limdagi ma'lumotlar va fayllar Kasbiy ta'limni
              rivojlantirish institutining rasmiy veb-sayti (ipitvet.uz)
              "Science.profedu" bo'limidan olingan. Fayllar asl manba
              serverida saqlanadi.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Science;
