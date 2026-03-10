import { useState } from "react";
import { FaQuestionCircle, FaSearch, FaEnvelope, FaPhone, FaPlus, FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { Link } from "react-router-dom";

function Faq() {
  const { theme } = useGlobalContext();
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "Barchasi" },
    { id: "general", name: "Umumiy" },
    { id: "registration", name: "Ro'yxatdan o'tish" },
    { id: "materials", name: "Materiallar" },
    { id: "rating", name: "Reyting" },
    { id: "technical", name: "Texnik" }
  ];

  const faqs = [
    {
      category: "general",
      question: "Kasbiy ta'limni rivojlantirish instituti nima qiladi?",
      answer: "Institut kasbiy ta'lim tizimini rivojlantirish, o'qituvchilar malakasini oshirish, zamonaviy ta'lim dasturlari va metodikalarini ishlab chiqish bilan shug'ullanadi. Shuningdek, institut kasbiy ta'lim muassasalariga metodik yordam ko'rsatadi va o'qituvchilar uchun onlayn resurslar platformasini boshqaradi."
    },
    {
      category: "registration",
      question: "Platformaga qanday ro'yxatdan o'tish mumkin?",
      answer: "Saytning yuqori o'ng burchagidagi 'Kirish' tugmasini bosing va 'Ro'yxatdan o'tish' bo'limiga o'ting. Ism-familiya, email, parol va ishingiz joyi haqida ma'lumotlarni to'ldiring. Email manzilingizga tasdiqlash havolasi yuboriladi. Havolani bosing va hisobingiz faollashadi."
    },
    {
      category: "registration",
      question: "Ro'yxatdan o'tish bepulmi?",
      answer: "Ha, platformaga ro'yxatdan o'tish va barcha xizmatlardan foydalanish mutlaqo bepul. Bu O'zbekiston Respublikasi Kasbiy ta'limni rivojlantirish instituti tomonidan ta'minlanadi."
    },
    {
      category: "materials",
      question: "O'qituvchilar qanday material yuklashlari mumkin?",
      answer: "Ro'yxatdan o'tganingizdan so'ng, shaxsiy kabinetingizga kiring. 'Material yuklash' bo'limida material turini (darslik, taqdimot, test va h.k.) tanlang, fanni ko'rsating va faylni yuklang. Barcha materiallar ekspertlar tomonidan ko'rib chiqiladi va tasdiqlangandan keyin platformada e'lon qilinadi."
    },
    {
      category: "materials",
      question: "Qanday formatdagi fayllarni yuklash mumkin?",
      answer: "PDF, DOCX, PPTX, MP4 va ZIP formatlaridagi fayllarni yuklashingiz mumkin. Maksimal fayl hajmi 50 MB. Agar faylingiz kattaroq bo'lsa, uni siqishtirishni yoki bo'lib yuklashni tavsiya etamiz."
    },
    {
      category: "materials",
      question: "Material ko'rib chiqilishi qancha vaqt oladi?",
      answer: "Odatda materiallar 3-5 ish kuni ichida ko'rib chiqiladi. Agar material talablarga javob bermasa, expert izoh bilan qaytaradi. Siz tuzatishlar kiritib, qaytadan yuklashingiz mumkin."
    },
    {
      category: "rating",
      question: "Reyting tizimi qanday ishlaydi?",
      answer: "Reyting tizimida o'qituvchilarning yuklagan materiallari soni, materiallarga beriladigan baholar, platformadagi faolligi va ekspertlar bahosi asosida ball to'planadi. Har bir tasdiqlangan material uchun ball beriladi. Eng yuqori ball to'plagan o'qituvchilar reytingda birinchi o'rinlarda turadi."
    },
    {
      category: "rating",
      question: "Reytingda yuqori o'rinlarni egallash nima beradi?",
      answer: "Reytingda yuqori o'rinlarni egallagan o'qituvchilar diplom va sertifikatlar bilan taqdirlanadi. Shuningdek, ular institut tomonidan o'tkaziladigan maxsus tadbirlarda ishtirok etish imkoniyatiga ega bo'ladilar va professional rivojlanish uchun qo'shimcha imkoniyatlar oladilar."
    },
    {
      category: "general",
      question: "RTR (Raqamli ta'lim resurslari) nima?",
      answer: "RTR - bu video darslar, taqdimotlar, ma'ruza matnlari, testlar va boshqa raqamli o'quv materiallarining keng kutubxonasi. Barcha o'qituvchilar va o'quvchilar uchun bepul mavjud. RTR bo'limida fanlar va mavzular bo'yicha qidirish imkoniyati mavjud."
    },
    {
      category: "technical",
      question: "Parolimni unutib qo'ydim, nima qilish kerak?",
      answer: "Kirish sahifasida 'Parolni unutdingizmi?' tugmasini bosing. Email manzilingizni kiriting va sizga parolni tiklash havolasi yuboriladi. Havolani bosib yangi parol o'rnating."
    },
    {
      category: "technical",
      question: "Profilimni qanday tahrirlashim mumkin?",
      answer: "Shaxsiy kabinetingizga kiring va 'Profil sozlamalari' bo'limini tanlang. Bu yerda ism-familiya, telefon raqami, rasm va boshqa ma'lumotlarni o'zgartirishingiz mumkin."
    },
    {
      category: "technical",
      question: "Mobil qurilmada ishlash mumkinmi?",
      answer: "Ha, sayt barcha qurilmalarda - kompyuter, planshet va smartfonlarda qulay ishlaydi. Mobil qurilmalarda ham to'liq funksionallik mavjud."
    },
    {
      category: "general",
      question: "Institut bilan qanday bog'lanish mumkin?",
      answer: "Biz bilan 'Aloqa' bo'limidan hamda quyidagi usullar orqali bog'lanishingiz mumkin: Telefon: +998 71 123 45 67, Email: info@ktri.uz. Shuningdek, saytda onlayn chat mavjud (ish vaqti: Dush-Juma 9:00-18:00)."
    },
    {
      category: "materials",
      question: "Boshqa o'qituvchilarning materiallarini yuklab olish mumkinmi?",
      answer: "Ha, tasdiqlangan barcha materiallarni ko'rish va yuklab olish mumkin. Materiallar sahifasida qidiruv va filtrlash imkoniyatlari mavjud. Ammo mualliflik huquqlarini hurmat qilish zarur."
    },
    {
      category: "general",
      question: "Xalqaro hamkorlar bilan qanday loyihalar amalga oshirilmoqda?",
      answer: "Institut UNICEF, UNESCO, BIBB, RIPO va boshqa xalqaro tashkilotlar bilan hamkorlikda kasbiy ta'limni rivojlantirish bo'yicha turli loyihalar amalga oshirmoqda. Batafsil ma'lumot 'Xalqaro hamkorlik' bo'limida."
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
    <section className="relative mt-28 md:mt-35 px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12 mb-35">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#0d4ea3]">
          Ko'p so'raladigan savollar
        </h1>
        <p className="text-base sm:text-lg opacity-70 mt-2">
          Platformamiz haqida eng ko'p beriladigan savollarga javoblar
        </p>
      </div>

      {/* Mobile Search - Shows only on mobile */}
      <div className="lg:hidden mb-6">
        <div className={`p-5 rounded-lg shadow-md ${theme === "night" ? "bg-gray-700" : "bg-base-200"}`}>
          <h3 className="text-lg font-semibold mb-3 text-[#194882] flex items-center gap-2">
            <FaSearch className="text-[#194882]" />
            Qidirish
          </h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Savollarni qidirish..."
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
              <p className="text-lg opacity-70">Savollar topilmadi</p>
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
                Qidirish
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Savollarni qidirish..."
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
                Kategoriyalar
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
                Yordam kerakmi?
              </h3>
              <p className="text-sm opacity-80 mb-4">
                Savolingizga javob topmadingizmi? Biz bilan bog'laning!
              </p>
              <div className="flex flex-col gap-2">
                <Link to="/contact" className="btn bg-gradient-to-br from-[#194882] to-info text-white btn-sm md:btn-md rounded-lg">
                  <FaEnvelope />
                  Xabar yuborish
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
  );
}

export default Faq;
