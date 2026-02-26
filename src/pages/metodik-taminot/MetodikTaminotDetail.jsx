import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendar,
  FaDownload,
  FaFileAlt,
  FaUser,
} from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import useGetFetch from "../../hooks/useGetFetch";
import { useHero } from "../../context/HeroContext";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

function MetodikTaminotDetail() {
  const { eduId } = useParams();
  const { setOnHero } = useHero();
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");

  const { data: globalData } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL_EDU}/kasb/${eduId}`,
  );
  

  useEffect(() => {
    setOnHero(false);
  }, [setOnHero]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL_EDU}/kasb-files/?kasb=${eduId}`,
        );
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Ma'lumot yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eduId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        
        // Agar foydalanuvchi login qilgan bo'lsa, token qo'shish
        if (auth?.accessToken) {
          headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL_EDU}/comments`,
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
              kasb: eduId,
              text: comment,
            }),
          }
        );

        if (response.ok) {
          setComment("");
          // Muvaffaqiyatli yuborilgandan keyin xabar ko'rsatish
          toast.success("Izoh muvaffaqiyatli yuborildi!");
        } else {
          toast.error("Izoh yuborishda xatolik yuz berdi!");
        }
      } catch (error) {
        console.error("Izoh yuborishda xatolik:", error);
        toast.error("Izoh yuborishda xatolik yuz berdi!");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Ma'lumot topilmadi
          </h2>
          <Link
            to="/metodik-taminot"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Orqaga qaytish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 sm:pt-35 pt-24 pb-8 sm:pb-12">
      <div className="bg-white w-full max-w-7xl mx-auto rounded-2xl shadow-lg border border-gray-200">
        {/* Hero Section */}
        <div className="bg-slate-200 border-t-8 border-blue-800 rounded-t-2xl py-3 sm:py-5 px-5 sm:px-8 flex items-center justify-between gap-5">
          <div className="">
            <Link
              to="/methodological-support"
              className="hidden sm:inline-flex items-center gap-2 mb-3 sm:mb-6 transition-colors link"
            >
              <FaArrowLeft />
              <span className="font-medium text-sm md:text-base">Orqaga qaytish</span>
            </Link>

            <div className="space-y-4">
              <h1 className="text-lg text-center sm:text-start md:text-3xl sm:text-2xl font-bold">
                {globalData?._id && `${globalData?._id} - `}
                {globalData?.name}
              </h1>

              <div className="flex justify-center sm:justify-start gap-4 text-sm sm:text-base">
                {globalData?.date && (
                  <div className="flex items-center gap-2 bg-slate-300 backdrop-blur-sm rounded-full px-4 py-2">
                    <FaCalendar className="text-blue-600" />
                    <span>
                      {new Date(globalData?.date).toLocaleDateString("ru-RU", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block md:w-1/2 lg:w-1/3">
            <div className="hover-3d">
              {/* content */}
              <figure className="w-full rounded-2xl border-2 border-blue-600 shadow">
                <img
                  src={globalData?.img}
                  alt=""
                  className="w-full h-auto"
                />
              </figure>
              {/* 8 empty divs needed for the 3D effect */}
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Files Section */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 border border-gray-100">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-300 to-blue-700 rounded-full"></div>
                  Hujjatlar
                </h2>

                <div className="grid gap-4">
                  {data?.map((file) => (
                    <div
                      key={file.id}
                      className="group bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-50 rounded-md sm:rounded-xl p-3 sm:p-5 border border-gray-200 hover:border-gray-300 transition-all duration-300"
                    >
                      <div className="flex sm:flex-row flex-col items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                          <div
                            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 hidden sm:flex items-center justify-center flex-shrink-0 shadow-md`}
                          >
                            <FaFileAlt className="text-white text-xl sm:text-2xl" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                              {file.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mt-1">
                              <MdDateRange className="flex-shrink-0" />
                              <span>So'ngi o'zgartirilgan sana: {(() => {
                                const months = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"];
                                const date = new Date(file.date);
                                const day = date.getDate();
                                const month = months[date.getMonth()];
                                const year = date.getFullYear();
                                return `${day}-${month} ${year}-yil`;
                              })()}</span>
                            </div>
                          </div>
                        </div>

                        <Link
                          to={file.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 sm:px-6 py-1 sm:py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-medium text-xs sm:text-base flex-shrink-0"
                        >
                          <FaDownload />
                          <span className="hidden sm:inline">Yuklab olish</span>
                          <span className="sm:hidden">Yuklash</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Additional Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Comments Section */}
              <div className="bg-white rounded-2xl shadow-lg py-6 px-3 sm:px-5 sm:py-8 border border-gray-100">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-300 to-blue-700 rounded-full"></div>
                  Izohlar
                </h2>

                {/* Comment Form */}
                <form onSubmit={handleCommentSubmit} className="mb-1 sm:mb-6">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Izoh yozing..."
                    rows="4"
                    className="w-full border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
                  />
                  <button
                    type="submit"
                    className="cursor-pointer mt-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white sm:px-6 px-3 py-2 sm:py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-sm sm:text-base"
                  >
                    Izoh yuborish
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MetodikTaminotDetail;
