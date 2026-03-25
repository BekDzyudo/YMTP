import { useState } from "react";
import {
  FaFileAlt,
  FaFilePdf,
  FaDownload,
  FaSearch,
  FaCalendar,
  FaHome,
} from "react-icons/fa";
import Divider from "../../components/Dvider";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { Link } from "react-router-dom";
import useGetFetch from "../../hooks/useGetFetch";
import Pagination from "../../components/Pagination";

function NormativDocuments() {
  const { theme } = useGlobalContext();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // API URL ni build qilish
  const buildUrl = () => {
    let url = `${import.meta.env.VITE_BASE_URL}/shared_app/hujjatlar/?page=${currentPage}`;
    
    if (activeCategory !== "all") {
      url += `&category=${activeCategory}`;
    }
    
    if (searchQuery.trim()) {
      url += `&search=${encodeURIComponent(searchQuery)}`;
    }
    
    return url;
  };

  const { data, isPending, error } = useGetFetch(buildUrl());

  const categories = [
    { id: "all", name: "Barchasi" },
    { id: "qonun", name: "Qonunlar" },
    { id: "qaror", name: "Qarorlar" },
    { id: "farmon", name: "Farmonlar" },
    { id: "buyruq", name: "Buyruqlar" },
    { id: "yuriqnoma", name: "Yo'riqnomalar" },
  ];

  // Kategoriya yoki qidiruv o'zgarganda sahifani 1ga qaytarish
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Sanani formatlash funksiyasi
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
      "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const documents = data?.results || [];
  const totalPages = data?.total_pages || 1;
  const currentPageData = data?.current_page || 1;

  return (
    <section className="w-full bg-base-100 rounded-xl sm:rounded-2xl border border-base-300 p-3 sm:p-4 md:p-6 lg:p-8 min-h-105 mb-25 sm:mb-35">
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
            <li>
              <Link className="text-base-content/70 hover:text-blue-700 transition-colors">
                Institut
              </Link>
            </li>
            <li className="text-blue-700 font-semibold">Me'yoriy hujjatlar</li>
          </ul>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif">
          Me'yoriy hujjatlar
        </h1>
      </div>

      {/* Search and Filter */}
      <div className="my-8">
        {/* Search Bar */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Hujjatlarni qidirish..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="input input-bordered w-full pl-12 rounded-full outline-0"
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Category Tabs - Mobile: Select, Desktop: Buttons */}
        {/* Mobile Select */}
        <div className="sm:hidden">
          <select
            value={activeCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="select select-bordered w-full rounded-xl outline-0"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden sm:flex items-center justify-center gap-2 md:gap-5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`btn btn-sm md:btn-md rounded-xl ${
                activeCategory === cat.id ? "bg-gradient-to-br from-[#194882] to-info text-white" : "btn-outline"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Documents List */}
      <div className="grid gap-4">
        {/* Loading State */}
        {isPending && (
          <div className="text-center py-12">
            <span className="loading loading-spinner loading-lg text-blue-600"></span>
            <p className="text-lg opacity-70 mt-4">Yuklanmoqda...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Xatolik yuz berdi: {error}</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isPending && !error && documents.length === 0 && (
          <div className="text-center py-12">
            <FaFileAlt className="mx-auto text-6xl opacity-30 mb-4" />
            <p className="text-lg opacity-70">Hujjatlar topilmadi</p>
          </div>
        )}

        {/* Documents */}
        {!isPending && !error && documents.length > 0 && (
          <>
            {documents.map((doc) => (
              <div
                key={doc.id}
                className={`p-5 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ${
                  theme === "night" ? "bg-gray-700" : "bg-base-200"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <FaFilePdf className="text-red-500 text-2xl mt-1 shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          {doc.title}
                        </h3>
                        <p className="text-sm opacity-70 mb-2">
                          {doc.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm opacity-60">
                          <FaCalendar className="text-xs" />
                          <span>{formatDate(doc.date)}</span>
                          <span className="badge badge-sm badge-secondary text-white ml-2">
                            {categories.find((c) => c.id === doc.category)?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={doc.file}
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

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                current_page={currentPageData}
                total_pages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>

      {/* Info Alert */}
      <div className="alert bg-gradient-to-br from-[#194882] to-info text-white mt-8">
        <FaFileAlt className="text-base md:text-4xl"/>
        <div>
          <h4 className="font-semibold">Eslatma</h4>
          <p className="text-sm">
            Barcha hujjatlar rasmiy manbalarda e'lon qilingan va qonuniy kuchga
            ega. Hujjatlarning asl nusxasi tegishli davlat organlarining rasmiy
            veb-saytlarida mavjud.
          </p>
        </div>
      </div>
    </section>
  );
}

export default NormativDocuments;
