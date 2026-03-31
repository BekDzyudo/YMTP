import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useGetFetch from "../../hooks/useGetFetch";
import CollegesHero from "./CollegesHero";
import {
  FaMapMarkerAlt,
  FaBuilding,
  FaGraduationCap,
  FaArrowRight,
  FaSearch,
  FaFilter,
} from "react-icons/fa";

function Region() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");

  // Statik texnikumlar ma'lumotlari
  const colleges = [
    {
      id: 1,
      name: "Toshkent kimyo-texnologiya texnikumi",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
      region: "Toshkent shahri",
      students: 1250,
      address: "Yunusobod tumani, Qorasuv ko'chasi 12",
    },
    {
      id: 2,
      name: "Andijon mashinasozlik texnikumi",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      region: "Andijon viloyati",
      students: 980,
      address: "Andijon shahri, Bobur ko'chasi 45",
    },
    {
      id: 3,
      name: "Samarqand transport va kommunikatsiya texnikumi",
      image:
        "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=300&fit=crop",
      region: "Samarqand viloyati",
      students: 1120,
      address: "Samarqand shahri, Amir Temur shoh ko'chasi 78",
    },
    {
      id: 4,
      name: "Buxoro pedagogika texnikumi",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
      region: "Buxoro viloyati",
      students: 850,
      address: "Buxoro shahri, M. Iqbol ko'chasi 23",
    },
    {
      id: 5,
      name: "Farg'ona politexnika texnikumi",
      image:
        "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop",
      region: "Farg'ona viloyati",
      students: 1340,
      address: "Farg'ona shahri, Al-Farg'oniy ko'chasi 56",
    },
    {
      id: 6,
      name: "Namangan to'qimachilik texnikumi",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      region: "Namangan viloyati",
      students: 890,
      address: "Namangan shahri, Istiqlol ko'chasi 34",
    },
    {
      id: 7,
      name: "Nukus qishloq xo'jaligi texnikumi",
      image:
        "https://images.unsplash.com/photo-1560264280-88b68371db39?w=400&h=300&fit=crop",
      region: "Qoraqalpog'iston Respublikasi",
      students: 720,
      address: "Nukus shahri, Ernazar Alakoz ko'chasi 12",
    },
    {
      id: 8,
      name: "Toshkent axborot texnologiyalari texnikumi",
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
      region: "Toshkent shahri",
      students: 1580,
      address: "Chilonzor tumani, Bunyodkor ko'chasi 90",
    },
    {
      id: 9,
      name: "Qashqadaryo qurilish texnikumi",
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop",
      region: "Qashqadaryo viloyati",
      students: 1050,
      address: "Qarshi shahri, Nasaf ko'chasi 67",
    },
    {
      id: 10,
      name: "Navoiy kon-metallurgiya texnikumi",
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
      region: "Navoiy viloyati",
      students: 950,
      address: "Navoiy shahri, G'alaba ko'chasi 28",
    },
    {
      id: 11,
      name: "Jizzax elektrotexnika texnikumi",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
      region: "Jizzax viloyati",
      students: 780,
      address: "Jizzax shahri, Sharof Rashidov ko'chasi 45",
    },
    {
      id: 12,
      name: "Xorazm sanoat texnikumi",
      image:
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&h=300&fit=crop",
      region: "Xorazm viloyati",
      students: 820,
      address: "Urganch shahri, Al-Xorazmiy ko'chasi 89",
    },
    {
      id: 13,
      name: "Surxondaryo tibbiyot texnikumi",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
      region: "Surxondaryo viloyati",
      students: 690,
      address: "Termiz shahri, Ibn Sino ko'chasi 23",
    },
    {
      id: 14,
      name: "Sirdaryo energetika texnikumi",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
      region: "Sirdaryo viloyati",
      students: 640,
      address: "Guliston shahri, Mustaqillik ko'chasi 56",
    },
    {
      id: 15,
      name: "Toshkent iqtisodiyot va turizm texnikumi",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
      region: "Toshkent viloyati",
      students: 1180,
      address: "Olmaliq shahri, Tinchlik ko'chasi 34",
    },
    {
      id: 16,
      name: "Buxoro tabiiy gazni qayta ishlash texnikumi",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      region: "Buxoro viloyati",
      students: 870,
      address: "Kogon shahri, Mustaqillik ko'chasi 12",
    },
  ];

  const navigate = useNavigate();

  // Hududlar ro'yxati filter uchun
  const regions = [...new Set(colleges.map((c) => c.region))].sort();

  // Search va filter
  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => {
      const matchesSearch = college.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesRegion =
        selectedRegion === "all" || college.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  const handleCollegeClick = (collegeId) => {
    // Keyinchalik detail sahifasiga o'tkaziladi
    navigate(`/college/${collegeId}`);
  };

  return (
    <>
      {/* Hero Section */}
      <CollegesHero colleges={colleges} regions={regions} />

      {/* Main Content Section */}
      <section className="relative flex flex-col mb-20 px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12 overflow-hidden -mt-10 z-20 pb-25 md:pb-35">
        <div className="bg-base-100 rounded-3xl p-6 sm:p-10 mb-12 shadow-2xl">
          {/* Search and Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Results Count */}
            <div className="text-gray-600 relative top-1/4">
              <span className="py-3 px-4 bg-blue-100 rounded-full">
                <span className="font-bold text-blue-600">
                  • {filteredColleges.length}
                </span>{" "}
                ta texnikum topildi
              </span>
            </div>
            {/* Region Filter */}
            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none" />
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors appearance-none bg-white cursor-pointer"
              >
                <option value="all">Barcha hududlar</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {/* Search Input */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Texnikum nomini qidiring..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredColleges.map((college) => (
            <div
              key={college.id}
              onClick={() => handleCollegeClick(college.id)}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
            >
              {/* College Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent"></div>

                {/* Region Badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-blue-500 flex items-center gap-2 shadow-lg">
                  <FaMapMarkerAlt className="text-white text-sm" />
                  <span className="text-white text-xs font-semibold">
                    {college.region}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* College Name */}
                <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 min-h-14">
                  {college.name}
                </h3>

                {/* Statistics */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaGraduationCap className="text-green-500" />
                      <span className="text-sm font-medium">O'quvchilar</span>
                    </div>
                    <span className="text-base font-bold text-gray-800">
                      {college.students.toLocaleString()}{" "}
                      <span className="font-light text-sm">nafar</span>
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-gray-600">
                    <FaMapMarkerAlt className="text-red-500 mt-1 shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 mb-0.5">
                        Manzil:
                      </p>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {college.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full mt-4 px-4 py-2.5 bg-gray-100 hover:bg-blue-500 text-gray-700 hover:text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3">
                  <span>Batafsil</span>
                  <FaArrowRight className="text-sm" />
                </button>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-2xl transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredColleges.length === 0 && (
          <div className="text-center py-16">
            <FaBuilding className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Texnikum topilmadi
            </h3>
            <p className="text-gray-500">
              Qidiruv natijasiga mos texnikum mavjud emas
            </p>
          </div>
        )}
      </section>
    </>
  );
}

export default Region;
