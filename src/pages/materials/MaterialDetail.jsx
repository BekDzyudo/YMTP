import React, { useContext } from "react";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Link, useParams } from "react-router-dom";
import useGetFetchProfile from "../../hooks/useGetFetchProfile";
import { AuthContext } from "../../context/AuthContext";

function MaterialDetail() {
  const materialDetailId = useParams("materialDetailId");
  const { auth, userData } = useContext(AuthContext);

  // get data
  const { data } = useGetFetchProfile(
    `${import.meta.env.VITE_BASE_URL}/birlashma/material-detail/${materialDetailId}/`,
  );

  // download pdf
  const handleDownload = async () => {
    await fetch(
      `${import.meta.env.VITE_BASE_URL}/birlashma/dowloand-material/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: userData.userId,
          material: materialDetailId,
        }),
      },
    )
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {});
        }
        return res.json();
      })
      .then((data) => {})
      .catch((err) => {});

    window.open(data?.file, "_blank");
  };

  // rating change
  const handleRatingChange = async (materialId, rating) => {
    try {
      await fetch(
        `${import.meta.env.VITE_BASE_URL}/birlashma/materials/${materialId}/rate/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ material_id: materialId, rate: rating }),
        },
      )
        .then((res) => {
          if (!res.ok) throw new Error("nimadir xato");
          return res.json();
        })
        .then((data) => {})
        .catch((err) => {});
    } catch (error) {
      console.error("Rating yuborishda xatolik:", error);
    }
  };

  const newPlugin = defaultLayoutPlugin();

  return (
    <section className="flex flex-col mt-24 sm:mt-35 px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-8/12">
      <div className="flex flex-col gap-5">
        <div className="breadcrumbs text-sm md:text-[16px] hidden md:block">
          <ul>
            <li>
              <Link to="/teachers">O‘qituvchilar</Link>
            </li>
            <li>
              <Link to={`/teachers`}>Materiallar</Link>
            </li>
          </ul>
        </div>
        <div className="w-full">
          {data?.file && (
            <div
              className={`p-3 md:p-5 h-[80vh] rounded-md ${
                theme == "night" ? "bg-gray-700" : "bg-slate-300"
              }`}
            >
              <Worker workerUrl={GlobalWorkerOptions.workerSrc}>
                <Viewer
                  fileUrl={collage.rivojlanish_strategiyasi}
                  plugins={[newPlugin]}
                />
              </Worker>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default MaterialDetail;
