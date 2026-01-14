import { Link, useParams } from "react-router-dom";
import useGetFetch from "../../../hooks/useGetFetch";
import { MdReportGmailerrorred } from "react-icons/md";
import { useGlobalContext } from "../../../hooks/useGlobalContext";
import { FaDownload } from "react-icons/fa";

function DualEducationDetail() {

      const { theme } = useGlobalContext();
        const { DualsId } = useParams();
        const {
        data,
        isPending,
        error,
      } = useGetFetch(
        `${import.meta.env.VITE_BASE_URL}/world-skills/${DualsId}`
      );
    
       const month = [
        "Yanvar",
        "Fevral",
        "Mart",
        "Aprel",
        "May",
        "Iyun",
        "Iyul",
        "Avgust",
        "Sentabr",
        "Oktabr",
        "Noyabr",
        "Dekabr",
      ];

  return (
    <div className="w-full">
          {isPending && (
            <span className="loading loading-ring loading-xl sm:w-24 w-10 sm:h-24 h-10 absolute sm:left-1/2 left-1/2 sm:top-1/3 top-1/4"></span>
          )}
          {error && <div>{error}</div>}
          {data ? (
            <div
              className={`p-3 md:p-5 rounded-md ${
                theme == "night" ? "bg-gray-700" : "bg-slate-300"
              }`}
            >
              <h1 className="font-bold mb-5 text-primary md:text-lg">
                {data?.name}
              </h1>
              <div className="grid grid-cols-3 gap-10">
                <div className="hidden md:block md:grid-span-1">
                  <div className="max-h-56">
                    <img
                      src={data?.image}
                      alt=""
                      className="rounded-xl w-full h-full object-cover shadow-xl"
                    />
                  </div>
                </div>
                <div className="col-span-3 md:col-span-2 flex flex-col gap-3 md:gap-5">
                  {data.files.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 md:gap-5 bg-base-200 rounded-lg py-2 px-4 shadow-sm md:shadow-md"
                      >
                        <div className="talim_detail-title">
                          <p className="font-bold text-sm md:text-md">
                            {item.name}
                          </p>
                          <span className="text-sm md:text-md">
                            So'ngi o'zgartirilgan sana:{" "}
                            {new Date(item.created_at).getDate() < 10
                              ? "0" + new Date(item.created_at).getDate()
                              : new Date(item.created_at).getDate()}
                            -{month[new Date(item.created_at).getMonth()]},{" "}
                            {new Date(item.created_at).getFullYear()}-yil
                          </span>
                        </div>
    
                        <Link
                          target="blanck"
                          to={item.file}
                          className="btn btn-primary btn-sm md:btn-md"
                        >
                          <FaDownload /> Yuklash
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-primary text-sm sm:text-2xl font-bold text-center w-full opacity-90 absolute left-0 top-40 sm:top-52 flex justify-center">
              <div className="flex items-center gap-3">
                <MdReportGmailerrorred className="text-2xl sm:text-5xl" />{" "}
                <p>Malumot hozircha kiritilmagan</p>
              </div>
            </div>
          )}
        </div>
  )
}

export default DualEducationDetail