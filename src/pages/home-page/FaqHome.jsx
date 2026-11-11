import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";
import { useTranslation } from "../../i18n/LanguageContext";

function FaqHome() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: t("home.faq.q1"),
      answer: t("home.faq.a1")
    },
    {
      question: t("home.faq.q2"),
      answer: t("home.faq.a2")
    },
    {
      question: t("home.faq.q3"),
      answer: t("home.faq.a3")
    },
    {
      question: t("home.faq.q4"),
      answer: t("home.faq.a4")
    },
    {
      question: t("home.faq.q5"),
      answer: t("home.faq.a5")
    },
    {
      question: t("home.faq.q6"),
      answer: null,
      isJSX: true
    }
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative px-4 sm:px-6 mx-auto w-full 2xl:w-11/12 bg-base-100 py-10 sm:py-25">
      {/* Header with title and button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#0d4ea3]">
          {t("home.faq.title")}
        </h2>
        <Link
          to="/faq"
          className="btn bg-gradient-to-br from-[#194882] to-info btn-md lg:btn-lg gap-2 text-white rounded-full"
        >
          {t("home.faq.all")}
          <MdArrowForward className="text-xl" />
        </Link>
      </div>

      {/* FAQ Items */}
      <div className="w-full grid gap-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-base-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Question Header */}
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex items-center justify-between gap-4 p-4 sm:p-6 text-left cursor-pointer"
            >
              <h3 className="text-base sm:text-xl lg:text-2xl font-semibold pr-4">
                {faq.question}
              </h3>
              <div className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                activeIndex === index ? 'bg-red-700' : 'bg-gradient-to-br from-[#194882] to-info'
              }`}>
                <div className="relative w-full h-full flex items-center justify-center">
                  <FaPlus 
                    className={`absolute text-white text-lg sm:text-xl transition-all duration-300 ${
                      activeIndex === index ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                    }`} 
                  />
                  <FaTimes 
                    className={`absolute text-white text-lg sm:text-xl transition-all duration-300 ${
                      activeIndex === index ? 'opacity-100 rotate-90 scale-100' : 'opacity-0 rotate-0 scale-0'
                    }`} 
                  />
                </div>
              </div>
            </button>

            {/* Answer Content */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeIndex === index ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                {faq.isJSX ? (
                  <p className="text-base sm:text-lg lg:text-xl opacity-80 leading-relaxed">
                    {t("home.faq.a6.before")} <Link to="/contact" className="link link-primary font-semibold">{t("home.faq.a6.link")}</Link> {t("home.faq.a6.after")}
                  </p>
                ) : (
                  <p className="text-sm sm:text-lg lg:text-xl opacity-80 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FaqHome;
