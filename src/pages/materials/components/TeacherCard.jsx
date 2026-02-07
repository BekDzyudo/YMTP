import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { FaDownload, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GiMaterialsScience } from "react-icons/gi";
import { Link } from "react-router-dom";

const getThemeClasses = (theme) =>
  theme === "night"
    ? "bg-gray-800 border-gray-500"
    : "bg-slate-100 border-gray-300";

const getStarColor = (theme) =>
  theme === "night" ? "bg-amber-500" : "bg-indigo-700";

const TeacherCard = React.memo(function TeacherCard({ item, theme }) {
  const avgRate = useMemo(() => Math.round(item?.avg_rate || 0), [item?.avg_rate]);
  const teacher = item?.uqutuvchi || {};
  const subject = item?.fan?.name || "Fan nomi yo'q";
  const region = teacher?.region?.name || "Viloyat aniqlanmadi";
  const teacherName = `${teacher?.last_name || ""} ${teacher?.first_name || ""}`.trim();

  return (
    <Link
      to={`${item?.uqutuvchi?.id}`}
      className={`border ${getThemeClasses(theme)} group p-2 sm:p-4 rounded-md sm:rounded-2xl transition-colors duration-150`}
      tabIndex={0}
      aria-label={`O'qituvchi: ${teacherName}`}
    >
      <div className="h-24 sm:h-44 mb-2">
        <img
          src={teacher?.image || "/default-teacher.png"}
          loading="eager"
          decoding="async"
          alt={teacherName || "O'qituvchi rasmi"}
          className="rounded-t-lg h-full w-full object-cover transition-transform duration-150 ease-out group-hover:scale-105"
          width={320}
          height={176}
          style={{ willChange: 'transform' }}
        />
      </div>
      <div className="relative">
        <div
          className="h-[1px] w-full"
          style={{
            background: `linear-gradient(to right, transparent, ${theme === "night" ? "orange" : "blue"}, transparent)`,
            opacity: 0.6,
          }}
        />
      </div>
      <div className="mt-2">
        <div className="flex flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-3">
          <div className="flex items-center">
            <div className="w-[65px] sm:w-[90px] md:w-[100px] flex items-center">
              <div
                className="rating rating-sm pointer-events-none origin-left scale-60 sm:scale-80 md:scale-90"
                aria-label={`O'rtacha baho: ${avgRate} yulduz`}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    className={`mask mask-star ${getStarColor(theme)}`}
                    checked={star <= avgRate}
                    readOnly
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </div>
          <h4 className="flex items-center gap-2 justify-end font-semibold text-xs sm:text-base p-0">
            <span className="hidden sm:block">Yuklanishlar:</span>
            <span className="bg-base-100 px-2 sm:px-3 py-0 sm:py-1 rounded">
              <span className="font-bold text-amber-600 text-xs gap-1 sm:text-base flex items-center">
                <span className="sm:hidden block">
                  <FaDownload />
                </span>
                <span className="sm:hidden block">/</span>
                {item.download_count}
              </span>
            </span>
          </h4>
        </div>
        <h3 className="font-semibold flex items-start gap-2 md:gap-3 mb-2 text-xs sm:text-base leading-snug">
          <GiMaterialsScience className="shrink-0 text-md md:text-xl mt-[2px]" />
          <span>{subject}</span>
        </h3>
        <h3 className="font-semibold flex items-center gap-2 md:gap-3 mb-2 leading-4 sm:leading-5 text-xs sm:text-base">
          
          <FaUser className="text-md md:text-xl" />
          {teacherName}
        </h3>
        <h3 className="font-semibold flex items-center gap-2 md:gap-3 mb-2 leading-4 sm:leading-5 text-xs sm:text-base">
          <FaLocationDot className="text-md md:text-xl" />
          {region}
        </h3>
      </div>
    </Link>
  );
});

TeacherCard.propTypes = {
  item: PropTypes.shape({
    avg_rate: PropTypes.number,
    download_count: PropTypes.number,
    fan: PropTypes.shape({
      name: PropTypes.string,
    }),
    uqutuvchi: PropTypes.shape({
      image: PropTypes.string,
      last_name: PropTypes.string,
      first_name: PropTypes.string,
      region: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  }).isRequired,
  theme: PropTypes.string,
};

export default TeacherCard;
