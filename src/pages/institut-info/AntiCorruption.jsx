import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaHome,
  FaShieldAlt,
  FaPaperPlane,
  FaPaperclip,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaUserTie,
} from "react-icons/fa";
import SEO from "../../components/SEO";

// TODO: Ushbu endpoint hali platforma backendida mavjud emas.
// Backenddan tegishli POST API tayyor bo'lgach, shu manzilni almashtiring.
const ANTI_CORRUPTION_API_URL = `${import.meta.env.VITE_BASE_URL}/shared_app/anti-corruption/`;

const initialForm = {
  full_name: "",
  email: "",
  phone: "",
  address: "",
  workplace: "",
  position: "",
  subject: "",
  message: "",
};

function AntiCorruption() {
  const [formData, setFormData] = useState(initialForm);
  const [attachment, setAttachment] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Fayl hajmi 5MB dan oshmasligi kerak!");
        return;
      }
      setAttachment(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.full_name.trim()) newErrors.full_name = "F.I.Sh to'ldirilishi shart";
    if (!formData.email.trim()) newErrors.email = "Elektron pochta to'ldirilishi shart";
    if (!formData.subject.trim()) newErrors.subject = "Savol mavzusi to'ldirilishi shart";
    if (!formData.message.trim()) newErrors.message = "Savol matni to'ldirilishi shart";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const body = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) body.append(key, value);
      });
      if (attachment) body.append("attachment", attachment);

      const response = await fetch(ANTI_CORRUPTION_API_URL, {
        method: "POST",
        body,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (errorData && typeof errorData === "object") {
          for (const [field, messages] of Object.entries(errorData)) {
            const msg = Array.isArray(messages) ? messages.join(", ") : messages;
            toast.error(`${field}: ${msg}`);
          }
        }
        throw new Error("Murojaatni yuborishda xatolik yuz berdi");
      }

      toast.success("Murojaatingiz muvaffaqiyatli yuborildi!");
      setFormData(initialForm);
      setAttachment(null);
    } catch (error) {
      console.error("Anti-corruption form error:", error);
      toast.error(error.message || "Murojaatni yuborishda xatolik yuz berdi. Qaytadan urinib ko'ring.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Korrupsiyaga qarshi kurash"
        description="Xodimlar xatti-harakatiga oid korrupsiyani oldini olish bo'yicha murojaat yuborish"
        keywords="korrupsiya, murojaat, shikoyat, xodimlar xatti-harakati, kasbiy ta'lim"
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
              <li className="text-blue-700 font-semibold">Korrupsiyaga qarshi kurash</li>
            </ul>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif">
            Xodimlar xatti-harakatiga oid korrupsiyani oldini olish bo'yicha murojaat
          </h1>
        </div>

        <div className="alert bg-gradient-to-br from-[#194882] to-info text-white mb-8">
          <FaShieldAlt className="text-base md:text-3xl shrink-0" />
          <div>
            <p className="text-sm">
              Institut xodimlarining xatti-harakatida korrupsiyaga oid holatlarni
              kuzatgan bo'lsangiz, quyidagi forma orqali murojaat qoldiring. Barcha
              murojaatlar maxfiylik shartlariga rioya qilgan holda ko'rib chiqiladi.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                F.I.Sh <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="full_name"
                  placeholder="F.I.Sh"
                  maxLength={150}
                  value={formData.full_name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${errors.full_name ? "border-red-500" : "border-gray-300"}`}
                />
              </div>
              {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Elektron pochta <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  maxLength={254}
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${errors.email ? "border-red-500" : "border-gray-300"}`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Telefon</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="phone"
                  placeholder="+998 97 000-00-00"
                  maxLength={30}
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Manzil</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Manzil"
                  maxLength={255}
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Ish joyi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBriefcase className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="workplace"
                  placeholder="Ish joyi"
                  maxLength={255}
                  value={formData.workplace}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Lavozim</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUserTie className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="position"
                  placeholder="Lavozim"
                  maxLength={255}
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Savol mavzusi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subject"
              placeholder="Savol mavzusi"
              maxLength={255}
              value={formData.subject}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${errors.subject ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Savol matni <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              rows={6}
              maxLength={3000}
              placeholder="Matn kiriting"
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none ${errors.message ? "border-red-500" : "border-gray-300"}`}
            ></textarea>
            <div className="flex justify-between mt-1">
              {errors.message ? (
                <p className="text-red-500 text-sm">{errors.message}</p>
              ) : (
                <span />
              )}
              <span className="text-xs text-gray-400">{formData.message.length}/3000</span>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Fayl (ixtiyoriy)</label>
            {!attachment ? (
              <label className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50/30 transition-all cursor-pointer flex items-center gap-3 text-gray-500">
                <input type="file" className="hidden" onChange={handleFileChange} />
                <FaPaperclip className="text-lg" />
                <span className="text-sm">Faylni tanlash uchun bosing (Max: 5MB)</span>
              </label>
            ) : (
              <div className="w-full bg-green-50 border-2 border-green-300 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-green-800">
                  <FaPaperclip />
                  {attachment.name}
                </div>
                <button
                  type="button"
                  onClick={() => setAttachment(null)}
                  className="btn btn-ghost btn-sm text-red-600 hover:bg-red-100"
                >
                  <FaTimes />
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer w-full sm:w-auto px-8 py-4 text-white font-bold rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 bg-gradient-to-br from-[#194882] to-info"
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner"></span>
                Yuborilmoqda...
              </>
            ) : (
              <>
                <FaPaperPlane />
                Yuborish
              </>
            )}
          </button>
        </form>
      </section>
    </>
  );
}

export default AntiCorruption;
