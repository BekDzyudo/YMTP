import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import useGetFetch from "../../../hooks/useGetFetch";
import useGetFetchProfile from "../../../hooks/useGetFetchProfile";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../../hooks/useGlobalContext";
import { FiDownload } from "react-icons/fi";
import ExpertChat from "./ExpertChat";

function MaterialCheckingDetail() {
  const { materialId } = useParams();
  const { auth, lookAtActionMetodist } = useContext(AuthContext);
  const { theme } = useGlobalContext();
  let birlashmaLink = useRef();
  let incomingButtons = useRef();
  const [refresh, setRefresh] = useState("");

  const [Material, setMaterial] = useState(null);

  const { data } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL}/birlashma/material/${materialId}/muhokama-update/`,
  );

  function materialDetail() {
    if (!materialId) return;
    fetch(
      `${import.meta.env.VITE_BASE_URL}/birlashma/material-detail/${materialId}/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth?.accessToken,
        },
      },
    )
      .then((res) => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then((data) => {
        setMaterial(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // ==
  useEffect(() => {
    if (!materialId) return;
    materialDetail();
  }, [auth?.accessToken, materialId, refresh]);

  // ==
  const { data: notification } = useGetFetchProfile(
    `${import.meta.env.VITE_BASE_URL}/notification_app/notification-list`,
  );

  //==
  const elData = notification?.find((item) => item.material == Material?.id);
  useEffect(() => {
    if (!elData) return;
    fetch(
      `${import.meta.env.VITE_BASE_URL}/notification_app/notification-update/${
        elData?.id
      }`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_read: true,
        }),
      },
    )
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        lookAtActionMetodist();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [elData]);

  //   ==
  function qabulQilindi() {
    fetch(
      `${import.meta.env.VITE_BASE_URL}/birlashma/material-update/${materialId}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.accessToken,
        },
        body: JSON.stringify({ holat: "tasdiqlandi", is_clicked: true }),
      },
    )
      .then(async (res) => {
        const errorObj = await res.json();
        if (!res.ok) throw new Error(JSON.stringify(errorObj));
        return res;
      })
      .then((data) => {
        toast.success("Material tasdiqlandi");
        setRefresh(1);
        // navigate("/Document/documents");
      })
      .catch((err) => console.log(JSON.parse(err.message)))
      .finally(() => {
        //  incomingButtons.current.classList.remove("incoming_buttons")
        //  incomingButtons.current.classList.add("incoming_buttonsHidden")
      });
  }
  function radEtildi() {
    fetch(
      `${import.meta.env.VITE_BASE_URL}/birlashma/material-update/${materialId}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.accessToken,
        },
        body: JSON.stringify({ holat: "rad_etildi", is_clicked: true }),
      },
    )
      .then(async (res) => {
        const errorObj = await res.json();
        if (!res.ok) throw new Error(JSON.stringify(errorObj));
        return res;
      })
      .then((data) => {
        setRefresh(2);
        toast.success("Material rad etildi");
        // navigate("/Document/documents");
      })
      .catch((err) => console.log(JSON.parse(err.message)))
      .finally(() => {
        //   incomingButtons.current.classList.remove("incoming_buttons")
        //  incomingButtons.current.classList.add("incoming_buttonsHidden")
      });
  }

  function birlashmaFunc() {
    fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/birlashma/send-material-telegram-group/?material_id=${Material?.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.accessToken,
        },
        body: JSON.stringify({ is_sended_telegram_group: true }),
      },
    )
      .then(async (res) => {
        const errorObj = await res.json();
        if (!res.ok) throw new Error(JSON.stringify(errorObj));
        return res;
      })
      .then((data) => {
        setRefresh(3);
        toast.success("Material birlashmaga yuborildi");
        // navigate("/Document/documents");
      })
      .catch((err) => console.log(JSON.parse(err.message)))
      .finally(() => {
        // birlashmaLink.current.classList.remove("birlashmaBtn")
        // birlashmaLink.current.classList.add("birlashmaBtnHidden")
      });
  }

  return (
    <section className="relative mt-28 md:mt-35 px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12">
      <div
        className={`p-3 md:p-5 rounded-md ${
          theme == "night" ? "bg-gray-700" : "bg-slate-300"
        }`}
      >
        <div className="flex items-center gap-5 mb-5">
          {Material?.holat == "yangi" && (
            <span className="text-lg font-bold">Kiruvchi material</span>
          )}
          {Material?.holat == "rad_etildi" && (
            <span className="text-lg font-bold">Qaytgan material</span>
          )}
          {Material?.holat == "tasdiqlandi" && (
            <span className="text-lg font-bold">Tasdiqlangan material</span>
          )}
          {Material?.holat == "yangi" && (
            <span className="badge bg-blue-500 border-0 badge-md min-w-22 sm:min-w-24">
              Yangi
            </span>
          )}
          {Material?.holat == "rad_etildi" && (
            <span className="badge bg-red-500 border-0 badge-md min-w-22 sm:min-w-24">
              Rad etildi
            </span>
          )}
          {Material?.holat == "tasdiqlandi" && (
            <span className="badge bg-green-600 badge-md border-0 min-w-22 sm:min-w-24">
              Tasdiqlandi
            </span>
          )}
        </div>
        {Material && (
          <div className="grid grid-cols-3">
            <div className="flex flex-col gap-10">
              <div>
                <h2 className="uppercase font-semibold text-primary">
                  Jo'natuvchi hudud
                </h2>
                <div>
                  <p>{Material.teacher?.region?.name},</p>
                  <p>{Material.teacher?.district?.name}</p>
                  <p>{Material.teacher?.college?.name}</p>
                </div>
              </div>
              <div>
                <h2 className="uppercase font-semibold text-primary">
                  Yaratilgan vaqt
                </h2>
                <p>
                  {new Date(Material.created_at).getDate() < 10
                    ? "0" + new Date(Material.created_at).getDate()
                    : new Date(Material.created_at).getDate()}
                  .
                  {new Date(Material.created_at).getMonth() + 1 < 10
                    ? "0" + (new Date(Material.created_at).getMonth() + 1)
                    : new Date(Material.created_at).getMonth() + 1}
                  .{new Date(Material.created_at).getFullYear()}
                </p>
              </div>
              <div>
                <h2 className="uppercase font-semibold text-primary">
                  Biriktirilgan fayl
                </h2>
                <span className="flex gap-3">
                  <span>{Material?.kategoriya_material?.name}</span>

                  <Link
                    target="blanck"
                    to={Material.file}
                    className="flex items-center gap-1 link text-primary"
                  >
                    {" "}
                    <FiDownload className="w-4 h-4" /> Yuklab olish
                  </Link>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="uppercase font-semibold text-primary">
                  Muallif
                </h2>
                <p>
                  {Material?.teacher?.last_name +
                    " " +
                    Material?.teacher?.first_name}
                </p>
              </div>
              <div>
                <h2 className="uppercase font-semibold text-primary">
                  Fan nomi
                </h2>
                <p>{Material?.fan.name}</p>
              </div>
              {!Material.is_clicked && (
                <div>
                  {!Material.is_sended_telegram_group ? (
                    <Link
                      ref={birlashmaLink}
                      onClick={birlashmaFunc}
                      className="btn btn-primary px-5 py-2"
                    >
                      Birlashmaga yuborish
                    </Link>
                  ) : (
                    <Link
                      style={{ background: "gray" }}
                      className="btn btn-neutral px-5 py-2 disabled border-none"
                    >
                      Birlashmaga yuborildi
                    </Link>
                  )}
                </div>
              )}
              {!Material.is_clicked && (
                <div className="incoming_buttons" ref={incomingButtons}>
                  <div className="flex items-center gap-5">
                    <Link
                      className="btn bg-green-600 px-5 py-2 outline-0 border-0 text-white"
                      onClick={qabulQilindi}
                    >
                      Qabul qilish
                    </Link>
                    <Link
                      className="btn bg-red-500 px-5 py-2 outline-0 border-0 text-white"
                      onClick={radEtildi}
                    >
                      Rad etish
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div>
              <ExpertChat 
              userData={Material?.teacher}
              muhokama={Material?.muhokamalar}
              materialId={Material.id}
              materialDetail={materialDetail}/>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default MaterialCheckingDetail;
