import Uzbekistan from "@react-map/uzbekistan";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useGetFetch from "../../hooks/useGetFetch";
import { 
  FaMapMarkerAlt, 
  FaBuilding, 
  FaGraduationCap, 
  FaUsers,
  FaArrowRight,
  FaCity
} from "react-icons/fa";

function Region() {
  // Statik hududlar ma'lumotlari
  const regions = [
    {
      id: 1,
      name: "Qoraqalpog'iston Respublikasi",
      code: "QR",
      color: "from-blue-500 to-cyan-500",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
      institutions: 12,
      students: 15420,
      teachers: 1240
    },
    {
      id: 2,
      name: "Andijon viloyati",
      code: "AN",
      color: "from-emerald-500 to-teal-500",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      institutions: 18,
      students: 24500,
      teachers: 1850
    },
    {
      id: 3,
      name: "Buxoro viloyati",
      code: "BU",
      color: "from-amber-500 to-orange-500",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop",
      institutions: 15,
      students: 19800,
      teachers: 1520
    },
    {
      id: 4,
      name: "Farg'ona viloyati",
      code: "FA",
      color: "from-violet-500 to-purple-500",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop",
      institutions: 22,
      students: 28900,
      teachers: 2180
    },
    {
      id: 5,
      name: "Jizzax viloyati",
      code: "JI",
      color: "from-pink-500 to-rose-500",
      image: "https://images.unsplash.com/photo-1623848648810-d2260e1a05c5?w=400&h=300&fit=crop",
      institutions: 14,
      students: 17600,
      teachers: 1340
    },
    {
      id: 6,
      name: "Xorazm viloyati",
      code: "XO",
      color: "from-indigo-500 to-blue-500",
      image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=300&fit=crop",
      institutions: 13,
      students: 16800,
      teachers: 1280
    },
    {
      id: 7,
      name: "Namangan viloyati",
      code: "NA",
      color: "from-green-500 to-emerald-500",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      institutions: 19,
      students: 25300,
      teachers: 1920
    },
    {
      id: 8,
      name: "Navoiy viloyati",
      code: "NV",
      color: "from-orange-500 to-red-500",
      image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=300&fit=crop",
      institutions: 11,
      students: 14200,
      teachers: 1090
    },
    {
      id: 9,
      name: "Qashqadaryo viloyati",
      code: "QA",
      color: "from-purple-500 to-pink-500",
      image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400&h=300&fit=crop",
      institutions: 20,
      students: 26700,
      teachers: 2040
    },
    {
      id: 10,
      name: "Samarqand viloyati",
      code: "SA",
      color: "from-cyan-500 to-blue-500",
      image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=400&h=300&fit=crop",
      institutions: 21,
      students: 27800,
      teachers: 2120
    },
    {
      id: 11,
      name: "Sirdaryo viloyati",
      code: "SI",
      color: "from-teal-500 to-green-500",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop",
      institutions: 10,
      students: 12500,
      teachers: 960
    },
    {
      id: 12,
      name: "Surxondaryo viloyati",
      code: "SU",
      color: "from-red-500 to-pink-500",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      institutions: 16,
      students: 21400,
      teachers: 1640
    },
    {
      id: 13,
      name: "Toshkent viloyati",
      code: "TO",
      color: "from-blue-500 to-indigo-500",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      institutions: 25,
      students: 32400,
      teachers: 2460
    },
    {
      id: 14,
      name: "Toshkent shahri",
      code: "TS",
      color: "from-indigo-600 to-purple-600",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop",
      institutions: 28,
      students: 36800,
      teachers: 2780,
      isCity: true
    }
  ];

  const navigate = useNavigate();

  const handleRegionClick = (regionId) => {
    // Keyinchalik dynamic route ga o'tkaziladi
    navigate(`/region/districts/${regionId}`);
  };
 
  return (
    <section className="relative flex flex-col mt-24 md:mt-35 mb-20 px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Animated gradient blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-0 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-green-200/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-orange-200/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Header Section */}
      <div className="relative text-center mb-12 p-8 sm:p-12 rounded-3xl bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-2xl overflow-hidden">
        {/* Animated circles background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
          <div className="absolute top-1/2 left-0 w-24 h-24 bg-white rounded-full -ml-12"></div>
          <div className="absolute bottom-0 right-1/3 w-40 h-40 bg-white rounded-full -mb-20"></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Kasbiy ta'lim tashkilotlari
          </h1>
          <p className="text-base sm:text-lg text-white/90 max-w-3xl mx-auto drop-shadow">
            O'zbekiston hududlari bo'yicha kasbiy ta'lim muassasalari va statistik ma'lumotlar
          </p>
        </div>
      </div>

      {/* Regions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {regions.map((region) => (
          <div
            key={region.id}
            onClick={() => handleRegionClick(region.id)}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
          >
            {/* Region Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={region.image} 
                alt={region.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>
              
              {/* Gradient Badge */}
              <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full bg-linear-to-r ${region.color} flex items-center gap-2 shadow-lg`}>
                {region.isCity ? <FaCity className="text-white text-sm" /> : <FaMapMarkerAlt className="text-white text-sm" />}
                <span className="text-white text-sm font-bold">{region.code}</span>
              </div>

              {/* Region Name Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white text-xl font-bold drop-shadow-lg line-clamp-2">
                  {region.name}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Statistics */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaBuilding className="text-blue-500" />
                    <span className="text-sm font-medium">Muassasalar</span>
                  </div>
                  <span className="text-lg font-bold text-gray-800">{region.institutions}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaGraduationCap className="text-green-500" />
                    <span className="text-sm font-medium">O'quvchilar</span>
                  </div>
                  <span className="text-lg font-bold text-gray-800">
                    {region.students.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaUsers className="text-purple-500" />
                    <span className="text-sm font-medium">O'qituvchilar</span>
                  </div>
                  <span className="text-lg font-bold text-gray-800">
                    {region.teachers.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full mt-4 px-4 py-3 bg-gray-100 hover:bg-blue-500 text-gray-700 hover:text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3">
                <span>Batafsil</span>
                <FaArrowRight className="text-sm" />
              </button>
            </div>

            {/* Hover Effect Border */}
            <div className={`absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-2xl transition-all duration-300 pointer-events-none`}></div>
          </div>
        ))}
      </div>

      {/* Summary Statistics */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-linear-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <FaBuilding className="text-3xl" />
            </div>
            <div>
              <div className="text-white/80 text-sm font-medium mb-1">Jami muassasalar</div>
              <div className="text-3xl font-bold">
                {regions.reduce((sum, r) => sum + r.institutions, 0)}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <FaGraduationCap className="text-3xl" />
            </div>
            <div>
              <div className="text-white/80 text-sm font-medium mb-1">Jami o'quvchilar</div>
              <div className="text-3xl font-bold">
                {regions.reduce((sum, r) => sum + r.students, 0).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <FaUsers className="text-3xl" />
            </div>
            <div>
              <div className="text-white/80 text-sm font-medium mb-1">Jami o'qituvchilar</div>
              <div className="text-3xl font-bold">
                {regions.reduce((sum, r) => sum + r.teachers, 0).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Region;
