import { useState } from "react";
import { FaQuestionCircle, FaSearch, FaEnvelope, FaPhone, FaPlus, FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import { useTranslation } from "../../i18n/LanguageContext";

function Faq() {
  const { t } = useTranslation();
  const { theme } = useGlobalContext();
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: t("common.all") },
    { id: "general", name: t("faq.cat.general") },
    { id: "registration", name: t("faq.cat.registration") },
    { id: "materials", name: t("faq.cat.materials") },
    { id: "rating", name: t("faq.cat.rating") },
    { id: "technical", name: t("faq.cat.technical") }
  ];

  const faqs = [
    {
      category: "general",
      question: t("faq.q1"),
      answer: t("faq.a1")
    },
    {
      category: "registration",
      question: t("faq.q2"),
      answer: t("faq.a2")
    },
    {
      category: "registration",
      question: t("faq.q3"),
      answer: t("faq.a3")
    },
    {
      category: "materials",
      question: t("faq.q4"),
      answer: t("faq.a4")
    },
    {
      category: "materials",
      question: t("faq.q5"),
      answer: t("faq.a5")
    },
    {
      category: "materials",
      question: t("faq.q6"),
      answer: t("faq.a6")
    },
    {
      category: "rating",
      question: t("faq.q7"),
      answer: t("faq.a7")
    },
    {
      category: "rating",
      question: t("faq.q8"),
      answer: t("faq.a8")
    },
    {
      category: "general",
      question: t("faq.q9"),
      answer: t("faq.a9")
    },
    {
      category: "technical",
      question: t("faq.q10"),
      answer: t("faq.a10")
    },
    {
      category: "technical",
      question: t("faq.q11"),
      answer: t("faq.a11")
    },
    {
      category: "technical",
      question: t("faq.q12"),
      answer: t("faq.a12")
    },
    {
      category: "general",
      question: t("faq.q13"),
      answer: t("faq.a13")
    },
    {
      category: "materials",
      question: t("faq.q14"),
      answer: t("faq.a14")
    },
    {
      category: "general",
      question: t("faq.q15"),
      answer: t("faq.a15")
    }
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO 
        title={t("faq.seoTitle")}
        description={t("faq.seoDesc")}
        keywords="faq, savollar, javoblar, yordam, qo'llanma, platformadan foydalanish"
      />
      
      <section className="relative mt-28 md:mt-35 px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12 mb-35">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#0d4ea3]">
          {t("faq.title")}
        </h1>
        <p className="text-base sm:text-lg opacity-70 mt-2">
          {t("faq.subtitle")}
        </p>
      </div>

      {/* Mobile Search - Shows only on mobile */}
      <div className="lg:hidden mb-6">
        <div className={`p-5 rounded-lg shadow-md ${theme === "night" ? "bg-gray-700" : "bg-base-200"}`}>
          <h3 className="text-lg font-semibold mb-3 text-[#194882] flex items-center gap-2">
            <FaSearch className="text-[#194882]" />
            {t("common.search")}
          </h3>
          <div className="relative">
            <input
              type="text"
              placeholder={t("faq.search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered outline-0 w-full"
            />
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content - Left */}
        <div className="flex-1">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <FaQuestionCircle className="mx-auto text-6xl opacity-30 mb-4" />
              <p className="text-lg opacity-70">{t("faq.noResults")}</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-base-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                >
                  {/* Question Header */}
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between gap-4 p-4 sm:p-6 text-left cursor-pointer"
                  >
                    <h3 className="text-lg sm:text-xl lg:text-xl font-semibold pr-4">
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
                      <p className="text-sm sm:text-base lg:text-lg opacity-80 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar - Right */}
        <div className="lg:w-80 xl:w-96">
          <div className="sticky top-32 space-y-6">
            {/* Search - Desktop only */}
            <div className={`hidden lg:block p-5 rounded-lg shadow-md ${theme === "night" ? "bg-gray-700" : "bg-base-200"}`}>
              <h3 className="text-lg font-semibold mb-3 text-[#194882] flex items-center gap-2">
                <FaSearch className="text-[#194882]" />
                {t("common.search")}
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t("faq.search")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input input-bordered outline-0 w-full rounded-lg"
                />
              </div>
            </div>

            {/* Categories Filter */}
            <div className={`p-5 rounded-lg shadow-md ${theme === "night" ? "bg-gray-700" : "bg-base-200"}`}>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-[#194882]">
                <FaQuestionCircle className="text-[#194882]" />
                {t("faq.categories")}
              </h3>
              <div className="flex flex-col gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`btn btn-sm md:btn-md justify-start rounded-lg ${
                      activeCategory === cat.id ? "bg-gradient-to-br from-[#194882] to-info text-white" : "btn-ghost"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className={`p-5 rounded-lg shadow-md ${theme === "night" ? "bg-gray-700" : "bg-base-200"}`}>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-[#194882]">
                <FaQuestionCircle className="text-[#194882]" />
                {t("faq.needHelp")}
              </h3>
              <p className="text-sm opacity-80 mb-4">
                {t("faq.notFoundAnswer")}
              </p>
              <div className="flex flex-col gap-2">
                <Link to="/contact" className="btn bg-gradient-to-br from-[#194882] to-info text-white btn-sm md:btn-md rounded-lg">
                  <FaEnvelope />
                  {t("contact.sendMessage")}
                </Link>
                <a href="tel:+998711234567" className="btn btn-outline btn-sm md:btn-md rounded-lg">
                  <FaPhone />
                  +998 71 246 90 37
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default Faq;
