import React, { useContext, useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../../hooks/useGlobalContext";
import { AuthContext } from "../../../context/AuthContext";
import { TiMessages } from "react-icons/ti";
import { GrFormNextLink } from "react-icons/gr";
import { Link } from "react-router-dom";
import ChatTeacher from "../../../components/ChatTeacher";
import useGetFetchProfile from "../../../hooks/useGetFetchProfile";

function TeacherProfil() {
  const { theme } = useGlobalContext();
  const { userData, auth } = useContext(AuthContext);
  const [Materiallar, setMateriallar] = useState(null);
  const [page, setPage] = useState(1);
  const [detailId, setDetailId] = useState(null);
  const [addandget, setAddandGet] = useState(true)

  // add material
  let regTeacherFileForm = useRef();
  let hujjatTuri = useRef();
  let fanNomi = useRef();
  let addFile = useRef();
  let komment = useRef();
  let saveBtn = useRef();

   function AddSaveTeacherFile(e) {
    e.preventDefault()
    let newObj = {
      hujjatTuri: hujjatTuri.current.value,
      fanNomi: fanNomi.current.value,
      addFile: addFile.current.files[0],
      komment: komment.current.value,
      // themaNumber: themaNumber.current.value
    };
    
    let errorArr = Object.keys(newObj).filter((key) => {
      if(key !== "komment") return !newObj[key];
    });
    errorArr.forEach((item) => {
      document.getElementById(`${item}`).classList.add("border-red-500");
    });
    Array.from(regTeacherFileForm.current).forEach((item) => {
      item.addEventListener("change", (e) => {
        if (e.target.value) {
          item.classList.remove("border-red-500");
        } else {
          item.classList.add("border-red-500");
        }
      });
    });
    const formData = new FormData();
    
    if (errorArr.length == 0) {

      formData.append("teacher_id", userData?.userId);
      formData.append("kategoriya_material_id", newObj.hujjatTuri);
      formData.append("fan_id", newObj.fanNomi);
      formData.append("file", newObj.addFile, newObj.addFile.name);
      formData.append("comment", newObj.komment);
      // formData.append("themaNumber", newObj.themaNumber);

      fetch(
        `${import.meta.env.VITE_BASE_URL}/birlashma/material-create/`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.accessToken,
          },
        }
      )
        .then((res) => {
          if (!res.ok)
            {
            return res.json().then(err => {
              console.log(err);
          });
          }
          return res.json();
        })
        .then((data) => {
          // console.log(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          regTeacherFileForm.current.reset();
          document.getElementById("add_material").close()
          setAddandGet(!addandget)
          // saveBtn.current.innerHTML = "Saqlash";
          // window.location.reload()
        });
      // saveBtn.current.innerHTML = `<span className="loading loading-ring loading-md"></span>`;
    }
  }

  // ==
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BASE_URL}/birlashma/material/${
        userData?.userId
      }/?page=${page}`,
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
        setMateriallar(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [addandget]);

  function handlePagination(e, p) {
    setPage(p);
  }

  const { data: hujjatlar } = useGetFetchProfile(
    `${import.meta.env.VITE_BASE_URL}/birlashma/kategoriya-material/`,
  );
  const { data: fanlar } = useGetFetchProfile(
    `${import.meta.env.VITE_BASE_URL}/shared_app/fanlar/${userData?.userId}`,
  );

  return (
    <section className="relative mt-28 md:mt-35 px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-10/12">
      <div
        className={`p-3 md:p-5 rounded-md ${
          theme == "night" ? "bg-gray-700" : "bg-slate-300"
        }`}
      >
        <div className="flex flex-col sm:flex-row justify-between mb-5 sm:mb-6 md:mb-10">
          <h2 className="text-lg mb-1 text-center sm:text-start sm:mb-0 md:text-2xl font-bold">
            Materiallar
          </h2>
          <div className="flex gap-2 md:gap-5">
            <select
              defaultValue="Pick a text editor"
              className="select select-sm md:select-md bg-none outline-0"
            >
              <option disabled={true}>Material turi</option>
              <option>O‘qitish materiallari to‘plami</option>
              <option>Maruzalar to‘plami</option>
              <option>Yo‘riqli texnologik xarita</option>
              <option>Taqdimot materiallari</option>
              <option>Testlar to‘plami</option>
              <option>Didaktik ko‘rgazmali materiallar to‘plami</option>
              <option>Glossary</option>
            </select>

            <button
              className="btn btn-sm md:btn-md btn-primary"
              onClick={() =>
                document.getElementById("add_material").showModal()
              }
            >
              + Qo‘shish
            </button>
            <dialog id="add_material" className="modal">
              <div className="modal-box">
                <form method="dialog" className="mb-10">
                  <h2 className="absolute left-3 top-3 text-sm sm:text-lg text-primary font-semibold">
                    Material qo‘shish
                  </h2>
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <form
                  action=""
                  ref={regTeacherFileForm}
                  className="grid grid-cols-1 gap-5"
                >
                  <div className="flex flex-col">
                    <label className="label text-sm" htmlFor="datatype">
                      Material turi*
                    </label>
                    <select
                      className="select outline-0 w-full border"
                      name="datatype"
                      id="hujjatTuri"
                      defaultValue=""
                      ref={hujjatTuri}
                    >
                      <option value="" disabled={true}>
                        Material turini tanlang
                      </option>
                      {hujjatlar &&
                        hujjatlar.map((hujjat) => {
                          return (
                            <option key={hujjat.id} value={hujjat.id}>
                              {hujjat.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="label text-sm" htmlFor="fanNomi">
                      Fan nomi*
                    </label>
                    <select
                    ref={fanNomi}
                      className="select outline-0 w-full border"
                      name="fanNomi"
                      id="fanNomi"
                      defaultValue=""
                    >
                      <option value="" disabled={true}>
                        Fan nomini tanlang
                      </option>
                      {fanlar &&
                        fanlar.map((fan) => {
                          return (
                            <option key={fan.id} value={fan.id}>
                              {fan.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div>
                    <fieldset className="fieldset">
                      <legend className="label text-sm">Fayl biriktirish <span style={{ color: "red" }}>(.pdf)</span></legend>
                      <input type="file" id="addFile" className="file-input w-full outline-0 border" accept=".pdf" ref={addFile}/>
                      <label className="label">Max size 2MB</label>
                    </fieldset>
                  </div>
                  <div>
                    <textarea ref={komment} id="komment" className="textarea w-full border" placeholder="Izoh kiriting..."></textarea>
                  </div>
                  <div className="flex justify-center">
                  <button
                    className="btn btn-primary btn-sm sm:btn-md mt-5 text-sm sm:text-md w-1/3"
                    type="submit"
                    ref={saveBtn}
                    onClick={AddSaveTeacherFile}
                  >
                    Saqlash
                  </button>
                </div>
                </form>
              </div>
            </dialog>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table text-[12px] md:text-[15px] lg:text-[17px] text-center">
            {/* head */}
            <thead className="bg-base-300">
              <tr className="uppercase font-bold text-[12px] md:text-[14px] lg:text-[16px]">
                <th>№</th>
                <th>Fan nomi</th>
                <th>Material turi</th>
                <th>Holati</th>
                <th>Muhokama</th>
                <th>ko'rish</th>
              </tr>
            </thead>
            <tbody>
              {Materiallar?.results?.map((item, index) => {
                return (
                  <tr key={item.id} className="">
                    <td className="font-bold">{index + 1}</td>
                    <td>{item.fan?.name}</td>
                    <td>{item.kategoriya_material?.name}</td>
                    <td className="">
                      {item.holat == "yangi" && (
                        <div className="flex justify-center">
                          <span className="badge bg-blue-500 border-0 badge-md min-w-22 sm:min-w-24 text-black">
                            Yangi
                          </span>
                        </div>
                      )}
                      {item.holat == "rad_etildi" && (
                        <div className="flex justify-center">
                          <span className="badge bg-red-500 border-0 badge-md min-w-22 sm:min-w-24 text-black">
                            Rad etildi
                          </span>
                        </div>
                      )}
                      {item.holat == "tasdiqlandi" && (
                        <div className="flex justify-center">
                          <span className="badge bg-green-600 badge-md border-0 min-w-22 sm:min-w-24 text-black">
                            Tasdiqlandi
                          </span>
                        </div>
                      )}

                      <div className="text-[12px] sm:text-sm text-center opacity-70">
                        {new Date(item.created_at).getDate() < 10
                          ? "0" + new Date(item.created_at).getDate()
                          : new Date(item.created_at).getDate()}
                        .{new Date(item.created_at).getMonth() + 1}.
                        {new Date(item.created_at).getFullYear()}
                      </div>
                    </td>
                    <td className="">
                      {/* You can open the modal using document.getElementById('ID').showModal() method */}
                      <div
                        className="indicator"
                        onClick={() => {
                          document.getElementById("my_modal_3").showModal();
                          setDetailId(item.id);
                        }}
                      >
                        <span className="indicator-item badge badge-sm badge-primary text-sm">
                          2
                        </span>
                        <button className="btn btn-sm md:btn-md bg-none">
                          Chat <TiMessages className="text-xl" />
                        </button>
                      </div>
                      {/* <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                          <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                              ✕
                            </button>
                          </form>
                          <Chat materialId={item.id}/>
                        </div>
                      </dialog> */}
                    </td>
                    <td>
                      <Link
                        to={item.file}
                        target="_blanck"
                        className="link text-sm md:text-lg flex items-center justify-center hover:text-primary"
                      >
                        o‘tish <GrFormNextLink />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <ChatTeacher materialId={detailId} />
        </div>
      </dialog>
    </section>
  );
}

export default TeacherProfil;
