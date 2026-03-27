import React, { useState } from "react";
import { Link } from "react-router-dom";
import useGetFetch from "../../hooks/useGetFetch";
import Pagination from "../../components/Pagination";
import SEO from "../../components/SEO";
import { JobPostingSchema } from "../../components/StructuredData";
import { FaHome, FaMapMarkerAlt, FaCalendarAlt, FaEye, FaUsers, FaBriefcase, FaMoneyBillWave, FaClock, FaLanguage } from "react-icons/fa";
import { MdWork } from "react-icons/md";

// Yordamchi funksiyalar
const formatCurrency = (amount) => {
  return amount?.toLocaleString('uz-UZ');
};

const formatSalaryRange = (min, max) => {
  return `${formatCurrency(min)} - ${formatCurrency(max)} so'm`;
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('uz-UZ', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  });
};

const formatRate = (rate) => {
  return `${rate} stavka`;
};

const formatExperience = (years) => {
  return `kamida ${years} yillik`;
};

function Vacancy() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isPending, error } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL}/shared_app/vacancies/?page=${currentPage}`
  );
  console.log(data);
  

  const vacancyData = data?.results || [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEO 
        title="Bo'sh ish o'rinlari"
        description="Kasbiy ta'limni rivojlantirish institutida bo'sh ish o'rinlari. HR, IT, ta'lim va boshqa lavozimlar uchun vakansiyalar. Ariza yuboring!"
        keywords="bo'sh ish o'rinlari, vakansiya, ish, kadrlar, hr, dasturchi, o'qituvchi, lavozim, o'zbekiston"
        type="website"
      />
      
      <section className="w-full bg-base-100 rounded-2xl border border-base-300 p-4 sm:p-6 lg:p-8 min-h-105 mb-25 sm:mb-40">
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
        {isPending ? (
          <div className="col-span-full flex justify-center items-center py-12">
            <div className="loading loading-spinner loading-lg text-blue-600"></div>
          </div>
        ) : error ? (
          <div className="col-span-full alert alert-error">
            <span>Ma'lumotlarni yuklashda xatolik yuz berdi</span>
          </div>
        ) : vacancyData.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-base-content/70 text-lg">
              Hozirda bo'sh ish o'rinlari mavjud emas
            </p>
          </div>
        ) : (
          vacancyData.map((vacancy) => (
            <div
              key={vacancy.id}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300"
            >
              {/* Structured Data for each job */}
              <JobPostingSchema job={vacancy} />
              
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
                        {vacancy.title}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <FaMoneyBillWave className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="text-xs text-base-content/60">Ish haqi</p>
                        <p className="font-medium text-sm">
                          {formatSalaryRange(vacancy.salary_min, vacancy.salary_max)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaClock className="w-4 h-4 text-orange-600" />
                      <div>
                        <p className="text-xs text-base-content/60">Stavka</p>
                        <p className="font-medium text-sm">{formatRate(vacancy.rate)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <FaBriefcase className="w-4 h-4 text-purple-600" />
                      <div>
                        <p className="text-xs text-base-content/60">Ish staji</p>
                        <p className="font-medium text-sm">
                          {formatExperience(vacancy.experience_years)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-xs text-base-content/60">Ish kunlari</p>
                        <p className="font-medium text-sm">{vacancy.work_days}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaLanguage className="w-4 h-4 text-indigo-600" />
                    <div>
                      <p className="text-xs text-base-content/60">Tillar</p>
                      <p className="font-medium text-sm">{vacancy.languages}</p>
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
                      <p className="text-sm font-medium">{formatDate(vacancy.created_at)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-base-content/60 mb-1">Tugash sanasi</p>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-red-600">
                          {formatDate(vacancy.deadline)}
                        </p>
                        {vacancy.days_left > 0 && (
                          <p className="text-xs text-orange-600 mt-1">
                            ({vacancy.days_left} kun qoldi)
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm">
                        <FaEye className="w-4 h-4 text-base-content/60" />
                        <span className="font-medium">{vacancy.view_count}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <FaUsers className="w-4 h-4 text-base-content/60" />
                        <span className="font-medium">{vacancy.applicants_count}</span>
                      </div>
                    </div>

                    <button className="btn btn-primary btn-sm">
                      Ariza yuborish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {!isPending && !error && data?.total_pages > 1 && (
        <Pagination
          current_page={currentPage}
          total_pages={data?.total_pages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
    </>
  );
}

export default Vacancy;
