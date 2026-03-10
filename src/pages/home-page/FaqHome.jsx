import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";

function FaqHome() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Kasbiy ta'limni rivojlantirish instituti nima qiladi?",
      answer: "Institut kasbiy ta'lim tizimini rivojlantirish, o'qituvchilar malakasini oshirish, zamonaviy ta'lim dasturlari va metodikalarini ishlab chiqish bilan shug'ullanadi."
    },
    {
      question: "Platformaga qanday ro'yxatdan o'tish mumkin?",
      answer: "Saytning yuqori o'ng burchagidagi 'Kirish' tugmasini bosing va 'Ro'yxatdan o'tish' bo'limiga o'ting. Barcha zarur ma'lumotlarni to'ldiring va emailingizni tasdiqlang."
    },
    {
      question: "O'quv me'yoriy hujjatlar nima?",
      answer: "O'quv me'yoriy hujjatlar - bu davlat ta'lim standartlari, o'quv dasturlari, o'quv rejalar va boshqa rasmiy hujjatlar to'plami. Bu hujjatlar kasbiy ta'lim jarayonini tartibga soladi va o'qitish sifatini ta'minlaydi."
    },
    {
      question: "Metodik mahsulotlar bo'limida nima bor?",
      answer: "Metodik mahsulotlar bo'limida o'qituvchilar uchun turli metodik qo'llanmalar, o'quv-uslubiy majmualar, taqdimotlar, multimedia materiallari va amaliy mashg'ulotlar uchun materiallar mavjud."
    },
    {
      question: "RTR (Raqamli ta'lim resurslari) nima?",
      answer: "RTR - bu video darslar, taqdimotlar, ma'ruza matnlari va boshqa raqamli o'quv materiallarining keng kutubxonasi. Barcha o'qituvchilar va o'quvchilar uchun bepul mavjud."
    },
    {
      question: "Institut bilan qanday bog'lanish mumkin?",
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
          Tezkor savollarga javoblar
        </h2>
        <Link
          to="/faq"
          className="btn bg-gradient-to-br from-[#194882] to-info btn-md lg:btn-lg gap-2 text-white rounded-full"
        >
          Barcha savollar
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
                    Biz bilan <Link to="/contact" className="link link-primary font-semibold">Bog'lanish</Link> bo'limidan bog'lanishingiz yoki qo'ng'iroq qilishingiz mumkin.
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
