import React, { useContext, useEffect, useState } from "react";
import { useGlobalContext } from "../../../hooks/useGlobalContext";
import { AuthContext } from "../../../context/AuthContext";
import { TiMessages } from "react-icons/ti";
import { GrFormNextLink } from "react-icons/gr";
import { Link } from "react-router-dom";

function TeacherProfil() {
  const { theme } = useGlobalContext();
  const { userData, auth } = useContext(AuthContext);

  const [Materiallar, setMateriallar] = useState(null);
  const [page, setPage] = useState(1);

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
  }, []);

  function handlePagination(e, p) {
    setPage(p);
  }
  console.log(userData);
  console.log(Materiallar);

  return (
    <section className="relative mt-24 md:mt-35 px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-10/12">
      <div
        className={`p-3 md:p-5 rounded-md ${
          theme == "night" ? "bg-gray-700" : "bg-slate-300"
        }`}
      >
        <div className="flex justify-between mb-10">
          <h2 className="text-2xl font-bold">Materiallar</h2>
          <div className="flex gap-5">
            <select
              defaultValue="Pick a text editor"
              className="select bg-none outline-0"
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
            <button className="btn btn-primary">+ Qo‘shish</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table md:text-[15px] lg:text-[17px] text-center">
            {/* head */}
            <thead className="bg-base-300">
              <tr className="uppercase font-bold md:text-[14px] lg:text-[16px]">
                <th>№</th>
                <th>Fan nomi</th>
                <th>Material turi</th>
                <th>Holati</th>
                <th>Muhokama</th>
                <th>Materialni ko'rish</th>
              </tr>
            </thead>
            <tbody>
              {Materiallar?.results?.map((item, index) => {
                return (
                  <tr key={item.id} className="">
                    <td className="font-semibold">{index + 1}</td>
                    <td>{item.fan?.name}</td>
                    <td>{item.kategoriya_material?.name}</td>
                    <td className="">
                      {
                        item.holat == "yangi" && (
                          <div className="flex justify-center">
                        <span className="badge bg-blue-500 border-0 badge-md">Yangi</span>
                      </div>
                        )
                      }
                      {
                        item.holat == "rad_etildi" && (
                          <div className="flex justify-center">
                        <span className="badge bg-red-500 border-0 badge-md">Rad etildi</span>
                      </div>
                        )
                      }
                      {
                        item.holat == "tasdiqlandi" && (
                          <div className="flex justify-center">
                        <span className="badge bg-green-600 badge-md border-0">Tasdiqlandi</span>
                      </div>
                        )
                      }
                      
                      <div className="text-sm text-center opacity-70">17.01.2026</div>
                    </td>
                    <td className="flex items-center gap-1">
                      <div className="indicator">
                        <span className="indicator-item badge badge-primary">
                          2
                        </span>
                        <button className="btn btn-md bg-none">Chat <TiMessages className="text-xl" /></button>
                      </div>
                    </td>
                    <td>
                      <Link className="link text-sm md:text-lg flex items-center justify-center hover:text-primary">o‘tish <GrFormNextLink/></Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default TeacherProfil;
