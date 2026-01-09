import React from "react";
import useGetFetch from "../../hooks/useGetFetch";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdReportGmailerrorred } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";

function Districts() {
  const { districtId } = useParams();
  const navigate = useNavigate();

  const { data, isPending, error } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL}/district/${districtId}`
  );

  return (
    <section className="relative mt-24 md:mt-35 px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12">
      {isPending && (
        <span className="loading loading-ring loading-xl sm:w-24 w-10 sm:h-24 h-10 absolute sm:left-1/2 left-1/2 sm:top-1/3 top-1/4"></span>
      )}
      {error && <div>{error}</div>}
      {data && (
        <>
          <h2 className="text-center text-2xl sm:text-4xl font-bold mb-10">
            <Link
              onClick={() => navigate(-1)}
              className="flex items-center text-md absolute left-0 text-lg gap-2 text-primary px-5 lg:flex hidden"
            >
              <IoArrowBack className="text-lg" /> orqaga
            </Link>{" "}
            {data.name}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 h-min">
            {data.districts.length > 0 ? (
              data.districts.map((district) => {
                return (
                  <Link
                    to={`collages/${district.id}`}
                    key={district.id}
                    className="card rounded-md bg-base-300 p-0 xl:p-4 hover:shadow-xl"
                  >
                    <div className="p-2 xl:p-0">
                      <h4 className="font-bold text-sm md:text-xl mb-2 text-center xl:text-start">
                        {district.name}
                      </h4>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="text-primary text-sm sm:text-2xl font-bold text-center w-full opacity-90 absolute top-40 sm:top-52 flex justify-center">
                <div className="flex items-center gap-3">
                  <MdReportGmailerrorred className="text-2xl sm:text-5xl" />{" "}
                  <p>Tumanlar kiritilmagan</p>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default Districts;
