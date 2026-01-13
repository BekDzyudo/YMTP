import React from "react";
import useGetFetch from "../../hooks/useGetFetch";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdReportGmailerrorred } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";

function Collages() {
  const { collageId } = useParams();
  const navigate = useNavigate();

  const {
    data: collages,
    isPending,
    error,
  } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL}/district-college/${collageId}`
  );

  return (
    <section className="relative mt-24 md:mt-35 px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12">
      {isPending && (
        <span className="loading loading-ring loading-xl sm:w-24 w-10 sm:h-24 h-10 absolute sm:left-1/2 left-1/2 sm:top-1/3 top-1/4"></span>
      )}
      {error && <div>{error}</div>}
      {collages ? (
        <>
          <h2 className="text-center text-2xl sm:text-4xl font-bold mb-10">
            <Link
              onClick={() => navigate(-1)}
              className="items-center text-md absolute left-0 text-lg gap-2 text-primary px-5 lg:flex hidden"
            >
              <IoArrowBack className="text-lg" /> orqaga
            </Link>{" "}
            Ta‘lim tashkilotlari
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 h-min">
            {collages.map((collage) => {
              return (
                <Link
                  key={collage.id}
                  to={`collage/${collage.id}`}
                  className="group card rounded-md bg-base-300 p-0 xl:p-4 hover:shadow-xl border border-gray-700"
                >
                  <div className="md:mb-3 mb-2 h-44 border">
                    <img
                      src={collage.image}
                      alt=""
                      className="rounded-t-md w-full h-full border object-cover group-hover:scale-105 transition-all duration-300"
                    />
                  </div>
                  <div className="p-2 xl:p-0 flex flex-col justify-between h-full">
                    <h4 className="font-bold text-sm md:text-xl mb-2 text-center xl:text-start lg:text-lg leading-4 md:leading-6">
                      {collage.name}
                    </h4>
                    <p className="stat-desc text-center xl:text-start">
                      Ko'rilganlar{" "}
                      <span className="text-amber-600 font-bold text-md">56</span>
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-primary text-sm sm:text-2xl font-bold text-center w-full opacity-90 absolute top-40 sm:top-52 flex justify-center">
          <div className="flex items-center gap-3">
            <MdReportGmailerrorred className="text-2xl sm:text-5xl" />{" "}
            <p>Texnikumlar kiritilmagan</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Collages;
