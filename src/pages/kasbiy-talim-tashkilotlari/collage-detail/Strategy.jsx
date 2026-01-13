import React from 'react'
import useGetFetch from '../../../hooks/useGetFetch';
import { useParams } from 'react-router-dom';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { MdReportGmailerrorred } from 'react-icons/md';
import { useGlobalContext } from '../../../hooks/useGlobalContext';
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"
import { GlobalWorkerOptions } from 'pdfjs-dist';

GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

function Strategy() {
     const {Id} = useParams()
     const { theme } = useGlobalContext();
    const {
        data: collage,
        isPending,
        error,
      } = useGetFetch(
        `${import.meta.env.VITE_BASE_URL}/college-detail/${Id}`
      );
      const newPlugin = defaultLayoutPlugin()
      
  return (
     <div className="w-full">
          {isPending && (
            <span className="loading loading-ring loading-xl sm:w-24 w-10 sm:h-24 h-10 absolute sm:left-1/2 left-1/2 sm:top-1/3 top-1/4"></span>
          )}
          {error && <div>{error}</div>}
          {collage?.rivojlanish_strategiyasi ? (
            <div
              className={`p-3 md:p-5 h-[80vh] rounded-md ${
                theme == "night" ? "bg-gray-700" : "bg-slate-300"
              }`}
            >
              <Worker workerUrl={GlobalWorkerOptions.workerSrc}>
                <Viewer fileUrl={collage.rivojlanish_strategiyasi} plugins={[newPlugin]}/>
            </Worker>
            </div>
          ) : (
            <div className="text-primary text-sm sm:text-2xl font-bold text-center w-full opacity-90 absolute left-0 top-40 sm:top-52 flex justify-center">
              <div className="flex items-center gap-3">
                <MdReportGmailerrorred className="text-2xl sm:text-5xl" />{" "}
                <p>Hozircha fayl yuklanmagan</p>
              </div>
            </div>
          )}
        </div>
  )
}

export default Strategy