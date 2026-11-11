import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useGetFetch from "../../hooks/useGetFetch";
import { useTranslation } from "../../i18n/LanguageContext";
import { tr, getCurrentLocale } from "../../i18n/i18n";
import SEO from "../../components/SEO";
import { JobPostingSchema } from "../../components/StructuredData";
import { 
  FaHome, FaMapMarkerAlt, FaCalendarAlt, FaEye, FaUsers, 
  FaBriefcase, FaMoneyBillWave, FaClock, FaLanguage, FaPrint,
  FaChevronRight, FaCheckCircle, FaFileAlt 
} from "react-icons/fa";
import { MdWork } from "react-icons/md";

// Yordamchi funksiyalar
const formatCurrency = (amount) => {
  return amount?.toLocaleString(getCurrentLocale());
};

const formatSalaryRange = (min, max) => {
  return tr("vac.salaryRange", { min: formatCurrency(min), max: formatCurrency(max) });
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString(getCurrentLocale(), { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  });
};

const formatTime = (timeString) => {
  if (!timeString) return '';
  return timeString.substring(0, 5); // "09:00:00" -> "09:00"
};

const formatRate = (rate) => {
  return tr("vac.rate", { rate });
};

const formatExperience = (years) => {
  return tr("vac.experience", { years });
};

// Countdown timer component
const CountdownTimer = ({ deadline }) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(deadline) - new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4">
      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-3 text-center text-white">
        <div className="text-2xl sm:text-3xl font-bold">{timeLeft.days}</div>
        <div className="text-xs sm:text-sm opacity-90">{t("vac.days")}</div>
      </div>
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-3 text-center text-white">
        <div className="text-2xl sm:text-3xl font-bold">{timeLeft.hours}</div>
        <div className="text-xs sm:text-sm opacity-90">{t("vac.hours")}</div>
      </div>
      <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg p-3 text-center text-white">
        <div className="text-2xl sm:text-3xl font-bold">{timeLeft.minutes}</div>
        <div className="text-xs sm:text-sm opacity-90">{t("vac.minutes")}</div>
      </div>
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-3 text-center text-white">
        <div className="text-2xl sm:text-3xl font-bold">{timeLeft.seconds}</div>
        <div className="text-xs sm:text-sm opacity-90">{t("vac.seconds")}</div>
      </div>
    </div>
  );
};

function VacancyDetail() {
  const { t } = useTranslation();
  const { id } = useParams();

  const { data: vacancy, isPending, error } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL}/shared_app/vacancies/${id}/`
  );

  const handlePrint = () => {
    window.print();
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-error mb-2">{t("common.error")}</h2>
          <p className="text-base-content/70">{error}</p>
          <Link to="/institut-info/vacancy" className="btn btn-primary mt-4">
            {t("vac.backToList")}
          </Link>
        </div>
      </div>
    );
  }

  // Agar data hali yuklanmagan bo'lsa
  if (!vacancy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const isExpired = vacancy?.days_left <= 0;

  return (
    <>
      <SEO
        title={t("vac.detailSeoTitle", { title: vacancy?.title })}
        description={`${t("vac.detailSeoDesc", { department: vacancy?.department, title: vacancy?.title, salary: formatSalaryRange(vacancy?.salary_min, vacancy?.salary_max) })} ${vacancy?.requirements?.substring(0, 150) || ""}...`}
        keywords={`${vacancy?.title}, vakansiya, ish o'rni, ${vacancy?.department}, kasbiy ta'lim, KTRI, ish topish`}
        type="article"
      />
      
      <JobPostingSchema job={vacancy} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 mb-25 sm:mb-40">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6 print:hidden">
          <Link to="/" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
            <FaHome /> {t("common.home")}
          </Link>
          <FaChevronRight className="w-3 h-3 text-base-content/50" />
          <Link to="/about" className="text-blue-600 hover:text-blue-700">
            {t("institutLinks.about")}
          </Link>
          <FaChevronRight className="w-3 h-3 text-base-content/50" />
          <Link to="/vacancy" className="text-blue-600 hover:text-blue-700">
            {t("institutLinks.vacancy")}
          </Link>
          <FaChevronRight className="w-3 h-3 text-base-content/50" />
          <span className="text-base-content/70">{vacancy?.title}</span>
        </div>

        <div className="bg-base-100 shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#194882] to-info text-white p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                    <MdWork className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                      {vacancy?.title}
                    </h1>
                    <h2 className="text-lg sm:text-xl opacity-90 mb-3">
                      {vacancy?.department}
                    </h2>
                    <p className="opacity-80 text-sm sm:text-base">
                      {vacancy?.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
                    <FaMoneyBillWave className="w-5 h-5 text-green-300" />
                    <div>
                      <p className="text-xs opacity-75 mb-1">{t("vac.salary")}</p>
                      <p className="font-semibold">{formatSalaryRange(vacancy?.salary_min, vacancy?.salary_max)}</p>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
                    <FaMapMarkerAlt className="w-5 h-5 text-red-300" />
                    <div>
                      <p className="text-xs opacity-75 mb-1">{t("vac.location")}</p>
                      <p className="font-semibold text-sm">{vacancy?.location}</p>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
                    <FaBriefcase className="w-5 h-5 text-purple-300" />
                    <div>
                      <p className="text-xs opacity-75 mb-1">{t("vac.experienceLabel")}</p>
                      <p className="font-semibold text-sm">{formatExperience(vacancy?.experience_years)}</p>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
                    <FaClock className="w-5 h-5 text-orange-300" />
                    <div>
                      <p className="text-xs opacity-75 mb-1">{t("vac.rateLabel")}</p>
                      <p className="font-semibold text-sm">{formatRate(vacancy?.rate)}</p>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
                    <FaLanguage className="w-5 h-5 text-indigo-300" />
                    <div>
                      <p className="text-xs opacity-75 mb-1">{t("vac.languages")}</p>
                      <p className="font-semibold text-sm">{vacancy?.languages}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="print:hidden">
                {!isExpired ? (
                  <Link 
                    to={`/vacancy/${id}/apply`}
                    className="btn btn-success btn-lg w-full lg:w-auto text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    {t("vac.apply")}
                  </Link>
                ) : (
                  <button 
                    className="btn btn-disabled btn-lg w-full lg:w-auto"
                    disabled
                  >
                    {t("vac.expired")}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Status Bar - Nomzodlar soni va countdown */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-base-300">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Nomzodlar soni */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-base-content/70 mb-3">
                    {t("vac.applicants")}
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-4 rounded-full">
                      <FaUsers className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-600">
                        {vacancy?.applicants_count}
                      </div>
                      <div className="text-sm text-base-content/60">
                        {vacancy?.applicants_count === 0 ? t("vac.noApplicants") : t("vac.candidates")}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Countdown */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-base-content/70 mb-3">
                    {isExpired ? t("vac.expired") : t("vac.timeLeft")}
                  </h3>
                  {!isExpired ? (
                    <CountdownTimer deadline={vacancy?.deadline} />
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-red-600 font-semibold text-lg">
                        {formatDate(vacancy?.deadline)} da tugagan
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Malaka talabi */}
              <div className="bg-blue-50/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                  <FaCheckCircle className="w-5 h-5" />
                  {t("vac.requirements")}
                </h3>
                <div className="prose prose-sm sm:prose-base max-w-none">
                  <p className="text-base-content/80 leading-relaxed whitespace-pre-wrap">
                    {vacancy?.requirements}
                  </p>
                </div>
              </div>

              {/* Lavozim majburiyatlari */}
              <div className="bg-green-50/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                  <FaFileAlt className="w-5 h-5" />
                  {t("vac.responsibilities")}
                </h3>
                <div className="prose prose-sm sm:prose-base max-w-none">
                  <p className="text-base-content/80 leading-relaxed whitespace-pre-wrap">
                    {vacancy?.responsibilities}
                  </p>
                </div>
              </div>

              {/* Ish sharoiti */}
              <div className="bg-purple-50/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                  <MdWork className="w-5 h-5" />
                  {t("vac.conditions")}
                </h3>
                <div className="prose prose-sm sm:prose-base max-w-none mb-4">
                  <p className="text-base-content/80 leading-relaxed whitespace-pre-wrap">
                    {vacancy?.work_conditions}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <FaCalendarAlt className="w-4 h-4 text-purple-600" />
                      <p className="text-xs text-base-content/60">{t("vac.workDays")}</p>
                    </div>
                    <p className="font-semibold text-base-content">{vacancy?.work_days}</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <FaClock className="w-4 h-4 text-purple-600" />
                      <p className="text-xs text-base-content/60">{t("vac.startTime")}</p>
                    </div>
                    <p className="font-semibold text-base-content">{formatTime(vacancy?.work_time_start)}</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <FaClock className="w-4 h-4 text-purple-600" />
                      <p className="text-xs text-base-content/60">{t("vac.endTime")}</p>
                    </div>
                    <p className="font-semibold text-base-content">{formatTime(vacancy?.work_time_end)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-base-200 p-6 border-t border-base-300">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-sm">
                    <FaEye className="w-4 h-4 text-base-content/60" />
                    <span className="font-medium">{vacancy?.view_count}</span>
                    <span className="text-base-content/60">{t("vac.views")}</span>
                  </div>
                  
                  <div className="text-sm text-base-content/70">
                    E'lon qilingan: {formatDate(vacancy?.created_at)}
                  </div>
                </div>

                <button 
                  onClick={handlePrint}
                  className="btn btn-outline btn-sm gap-2 print:hidden"
                >
                  <FaPrint className="w-4 h-4" />
                  {t("vac.print")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back button */}
        <div className="mt-8 print:hidden">
          <Link 
            to="/vacancy" 
            className="btn btn-outline gap-2"
          >
            <FaChevronRight className="w-4 h-4 rotate-180" />
            {t("vac.backToList")}
          </Link>
        </div>
      </section>
    </>
  );
}

export default VacancyDetail;
