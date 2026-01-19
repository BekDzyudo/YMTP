import React from "react";
import { useGlobalContext } from "../../../hooks/useGlobalContext";

function TeacherProfil() {
  const { theme } = useGlobalContext();

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
              className="select select-primary bg-none outline-0"
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
            <table className="table table-zebra md:text-[15px] lg:text-[17px]">
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
                    <tr>
                      <td>1</td>
                      <td>Surxondaryo</td>
                      <td>Surxondaryo</td>
                      <td>Surxondaryo</td>
                      <td>Surxondaryo</td>
                      <td className="text-primary font-bold text-sm md:text-lg">
                        5
                      </td>
                    </tr>
              </tbody>
            </table>
          </div>
      </div>
    </section>
  );
}

export default TeacherProfil;
