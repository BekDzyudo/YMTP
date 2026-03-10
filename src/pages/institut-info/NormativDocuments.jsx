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

function NormativDocuments() {
  const { theme } = useGlobalContext();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "Barchasi" },
    { id: "qonun", name: "Qonunlar" },
    { id: "qaror", name: "Qarorlar" },
    { id: "farmon", name: "Farmonlar" },
    { id: "buyruq", name: "Buyruqlar" },
    { id: "yuriqnoma", name: "Yo'riqnomalar" },
  ];

  // Demo data - bu yerda backend dan keladi
  const documents = [
    {
      id: 1,
      title: "O'zbekiston Respublikasi Kasbiy ta'lim to'g'risidagi qonuni",
      category: "qonun",
      date: "2023-05-15",
      fileUrl: "/documents/sample.pdf",
      description: "Kasbiy ta'lim tizimining huquqiy asoslari",
    },
    {
      id: 2,
      title: "Kasbiy ta'lim muassasalarini rivojlantirish to'g'risida qaror",
      category: "qaror",
      date: "2024-01-20",
      fileUrl: "/documents/sample.pdf",
      description:
        "Kasbiy ta'lim muassasalarini modernizatsiya qilish chora-tadbirlari",
    },
    {
      id: 3,
      title: "Ta'lim tizimini yanada takomillashtirish to'g'risida farmon",
      category: "farmon",
      date: "2024-09-10",
      fileUrl: "/documents/sample.pdf",
      description: "Ta'lim tizimida zamonaviy texnologiyalarni joriy etish",
    },
    {
      id: 4,
      title: "O'qituvchilar malakasini oshirish tartibi to'g'risida yo'riqnoma",
      category: "yuriqnoma",
      date: "2024-11-05",
      fileUrl: "/documents/sample.pdf",
      description:
        "O'qituvchilarning muntazam ravishda malaka oshirish tartibi",
    },
    {
      id: 5,
      title:
        "Kasbiy ta'lim muassasalarida dual ta'lim tizimini joriy etish buyrug'i",
      category: "buyruq",
      date: "2025-03-15",
      fileUrl: "/documents/sample.pdf",
      description: "Dual ta'lim tizimini joriy etish bo'yicha ko'rsatmalar",
    },
    {
      id: 6,
      title: "Raqamli ta'lim resurslarini yaratish va qo'llash tartibi",
      category: "yuriqnoma",
      date: "2025-06-20",
      fileUrl: "/documents/sample.pdf",
      description: "RTR yaratish va platformaga yuklash tartibi",
    },
  ];

  const filteredDocuments = documents.filter((doc) => {
    const matchesCategory =
      activeCategory === "all" || doc.category === activeCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full pl-12 rounded-full outline-0"
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Category Tabs - Mobile: Select, Desktop: Buttons */}
        {/* Mobile Select */}
        <div className="sm:hidden">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
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
              onClick={() => setActiveCategory(cat.id)}
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
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-12">
            <FaFileAlt className="mx-auto text-6xl opacity-30 mb-4" />
            <p className="text-lg opacity-70">Hujjatlar topilmadi</p>
          </div>
        ) : (
          filteredDocuments.map((doc) => (
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
                        <span>
                          {new Date(doc.date).toLocaleDateString("uz-UZ", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <span className="badge badge-sm badge-secondary text-white ml-2">
                          {categories.find((c) => c.id === doc.category)?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn bg-gradient-to-br from-[#194882] to-info text-white btn-sm sm:btn-md"
                  >
                    <FaDownload />
                    Yuklab olish
                  </a>
                </div>
              </div>
            </div>
          ))
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
