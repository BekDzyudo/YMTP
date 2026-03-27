import React from "react";
import { Link } from "react-router-dom";
// import useGetFetch from "../../hooks/useGetFetch";
import { FaHome, FaMapMarkerAlt, FaCalendarAlt, FaEye, FaUsers, FaBriefcase, FaMoneyBillWave, FaClock, FaLanguage } from "react-icons/fa";
import { MdWork } from "react-icons/md";

// Statik ma'lumotlar - keyinchalik API dan olinadi
const vacancyData = [
  {
    id: 1,
    department: "Kadrlar bo'limi",
    description: "Kadrlar bilan ishlash, xodimlarni ro'yxatga olish va boshqarish",
    position: "HR Menejeri",
    salary: "6,000,000 - 8,000,000 so'm",
    rate: "1 stavka",
    experience: "3 yildan ortiq",
    workDays: "Dushanba - Juma",
    language: "O'zbek, Rus, Ingliz",
    location: "Toshkent, Yunusobod tumani",
    publishedDate: "2024-03-15",
    deadlineDate: "2024-04-15",
    views: 245,
    applicants: 18
  },
  {
    id: 2,
    department: "Axborot texnologiyalari bo'limi",
    description: "Dasturiy ta'minot va tizimlarni boshqarish, texnik yordam ko'rsatish",
    position: "Full Stack Developer",
    salary: "8,000,000 - 12,000,000 so'm",
    rate: "1 stavka",
    experience: "2 yildan ortiq",
    workDays: "Dushanba - Shanba",
    language: "O'zbek, Ingliz",
    location: "Toshkent, Chilonzor tumani",
    publishedDate: "2024-03-20",
    deadlineDate: "2024-04-20",
    views: 432,
    applicants: 34
  },
  {
    id: 3,
    department: "Ta'lim sifatini nazorat qilish boshqarmasi",
    description: "Ta'lim jarayonini monitoring qilish va sifatni baholash",
    position: "Monitoring mutaxassisi",
    salary: "5,500,000 - 7,000,000 so'm",
    rate: "0.75 stavka",
    experience: "1 yildan ortiq",
    workDays: "Dushanba - Juma",
    language: "O'zbek, Rus",
    location: "Toshkent, Olmazor tumani",
    publishedDate: "2024-03-10",
    deadlineDate: "2024-04-10",
    views: 187,
    applicants: 12
  },
  {
    id: 4,
    department: "Moliya-iqtisod bo'limi",
    description: "Moliyaviy hisobotlar tayyorlash va byudjetni boshqarish",
    position: "Buxgalter",
    salary: "4,500,000 - 6,000,000 so'm",
    rate: "1 stavka",
    experience: "2 yildan ortiq",
    workDays: "Dushanba - Juma",
    language: "O'zbek",
    location: "Toshkent, Mirobod tumani",
    publishedDate: "2024-03-18",
    deadlineDate: "2024-04-18",
    views: 156,
    applicants: 9
  }
];

function Vacancy() {
  // const { data, isPending, error } = useGetFetch(
  //   `${import.meta.env.VITE_BASE_URL}/shared_app/institut/vacansy/`
  // );

  return (
    <section className="w-full bg-base-100 rounded-2xl border border-base-300 p-4 sm:p-6 lg:p-8 min-h-105">
      <div className="rounded-2xl mb-8 px-6 pt-3 pb-6 bg-slate-100 border-t-8 border-blue-800">
        <div className="breadcrumbs hidden md:block text-base mb-5">
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
              <Link className="text-base-content/70 hover:text-blue-700 transition-colors">
                Institut
              </Link>
            </li>
            <li className="text-blue-700 font-semibold">Bo'sh ish o'rinlari</li>
          </ul>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif">Bo'sh ish o'rinlari</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {vacancyData.map((vacancy) => (
          <div
            key={vacancy.id}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300"
          >
            {/* Header */}
            <div className="card-body p-6">
              <div className="border-b border-base-300 pb-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <MdWork className="w-6 h-6 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <h2 className="card-title text-xl font-bold text-blue-700 mb-2">
                      {vacancy.department}
                    </h2>
                    <p className="text-base-content/70 text-sm">
                      {vacancy.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
                  <FaBriefcase className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-base-content/60 mb-1">Lavozim</p>
                    <p className="font-semibold text-base-content">
                      {vacancy.position}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <FaMoneyBillWave className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="text-xs text-base-content/60">Ish haqi</p>
                      <p className="font-medium text-sm">{vacancy.salary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaClock className="w-4 h-4 text-orange-600" />
                    <div>
                      <p className="text-xs text-base-content/60">Stavka</p>
                      <p className="font-medium text-sm">{vacancy.rate}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <FaBriefcase className="w-4 h-4 text-purple-600" />
                    <div>
                      <p className="text-xs text-base-content/60">Ish staji</p>
                      <p className="font-medium text-sm">{vacancy.experience}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-xs text-base-content/60">Ish kunlari</p>
                      <p className="font-medium text-sm">{vacancy.workDays}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FaLanguage className="w-4 h-4 text-indigo-600" />
                  <div>
                    <p className="text-xs text-base-content/60">Tillar</p>
                    <p className="font-medium text-sm">{vacancy.language}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="w-4 h-4 text-red-600" />
                  <div>
                    <p className="text-xs text-base-content/60">Joylashuv</p>
                    <p className="font-medium text-sm">{vacancy.location}</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-base-300 pt-4 mt-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-base-content/60 mb-1">E'lon sanasi</p>
                    <p className="text-sm font-medium">{vacancy.publishedDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60 mb-1">Tugash sanasi</p>
                    <p className="text-sm font-medium text-red-600">{vacancy.deadlineDate}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm">
                      <FaEye className="w-4 h-4 text-base-content/60" />
                      <span className="font-medium">{vacancy.views}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <FaUsers className="w-4 h-4 text-base-content/60" />
                      <span className="font-medium">{vacancy.applicants}</span>
                    </div>
                  </div>

                  <button className="btn btn-primary btn-sm">
                    Ariza yuborish
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Vacancy;
