import { Link } from "react-router-dom";
import { FaHome, FaFilePdf, FaDownload, FaCalendar, FaTrophy } from "react-icons/fa";
import SEO from "../../components/SEO";

// Manba: https://ipitvet.uz/uz/ko'rik-tanlov/
const korikTanlovItems = [
  {
    id: 1,
    title:
      "Kasbiy ta'lim tizimida \"Eng yaxshi raqamli ta'lim resurslari\" Respublika ko'rik-tanlovini o'tkazish to'g'risida O'zbekiston Respublikasi Oliy ta'lim, fan va innovatsiyalar vazirligi huzuridagi Kasbiy ta'lim agentligi direktorining buyrug'i",
    date: "08-Sentabr, 2026",
    url: "https://ipitvet.uz/media/files/%D0%90%D0%B3%D0%B5%D0%BD%D1%82%D0%BB%D0%B8%D0%BA_%D0%B1%D1%83%D0%B9%D1%80%D1%83%D2%93%D0%B8_13_08_2026_%D0%B9_153_%D1%81%D0%BE%D0%BD%D0%BB%D0%B8_%D0%A0%D0%A2%D0%A0_%D0%BA%D1%9E%D1%80%D0%B8%D0%BA_%D1%82%D0%B0%D0%BD%D0%BB%D0%BE%D0%B2%D0%B8.pdf",
  },
  {
    id: 2,
    title:
      "\"Eng yaxshi raqamli ta'lim resurslari\" Respublika ko'rik-tanlovini o'tkazish bo'yicha tashkiliy qo'mita tarkibi",
    date: "08-Sentabr, 2026",
    url: "https://ipitvet.uz/media/files/2-ilova.pdf",
  },
  {
    id: 3,
    title: "\"Eng yaxshi raqamli ta'lim resurslari\" respublika ko'rik-tanlovini o'tkazish tartibi",
    date: "08-Sentabr, 2026",
    url: "https://ipitvet.uz/media/files/1-ilova.pdf",
  },
  {
    id: 4,
    title:
      "\"Eng yaxshi raqamli ta'lim resurslari\" Respublika ko'rik-tanlovida ishtirok etish uchun raqamli ta'lim resurslari ishlab chiqiladigan kasb va mutaxassisliklar ro'yxati",
    date: "08-Sentabr, 2026",
    url: "https://ipitvet.uz/media/files/3-ilova.pdf",
  },
];

function KorikTanlov() {
  return (
    <>
      <SEO
        title="Ko'rik-tanlov"
        description={"Kasbiy ta'lim tizimida \"Eng yaxshi raqamli ta'lim resurslari\" Respublika ko'rik-tanlovi bo'yicha hujjatlar"}
        keywords="ko'rik-tanlov, raqamli ta'lim resurslari, respublika tanlovi, kasbiy ta'lim"
      />

      <section className="w-full bg-base-100 rounded-xl sm:rounded-2xl border border-base-300 p-3 sm:p-4 md:p-6 lg:p-8 min-h-105 mb-25 sm:mb-35">
        <div className="rounded-xl sm:rounded-2xl mb-6 sm:mb-8 px-4 sm:px-6 pt-2 sm:pt-3 pb-4 sm:pb-6 bg-slate-100 border-t-4 sm:border-t-8 border-blue-800">
          <div className="breadcrumbs hidden md:block text-sm sm:text-base mb-4 sm:mb-5">
            <ul>
              <li>
                <Link to="/" className="text-base-content/70 hover:text-blue-700 transition-colors">
                  <FaHome className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Bosh sahifa
                </Link>
              </li>
              <li>
                <Link className="text-base-content/70 hover:text-blue-700 transition-colors">
                  Institut
                </Link>
              </li>
              <li className="text-blue-700 font-semibold">Ko'rik-tanlov</li>
            </ul>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif">
            Kasbiy ta'lim tizimida "Eng yaxshi raqamli ta'lim resurslari" Respublika ko'rik-tanlovi
          </h1>
        </div>

        <div className="grid gap-4">
          {korikTanlovItems.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-base-200"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <FaFilePdf className="text-red-500 text-2xl mt-1 shrink-0" />
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-2">{item.title}</h3>
                      <div className="flex items-center gap-2 text-sm opacity-60">
                        <FaCalendar className="text-xs" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn bg-gradient-to-br from-[#194882] to-info text-white btn-sm sm:btn-md rounded-lg"
                  >
                    <FaDownload />
                    Yuklab olish
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="alert bg-gradient-to-br from-[#194882] to-info text-white mt-8">
          <FaTrophy className="text-base md:text-4xl" />
          <div>
            <h4 className="font-semibold">Eslatma</h4>
            <p className="text-sm">
              Ushbu bo'limdagi hujjatlar Kasbiy ta'limni rivojlantirish institutining
              rasmiy veb-sayti (ipitvet.uz) "Ko'rik-tanlov" bo'limidan olingan. Fayllar
              asl manba serverida saqlanadi.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default KorikTanlov;
