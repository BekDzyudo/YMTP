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
      ></div>
    </section>
  );
}

export default TeacherProfil;
