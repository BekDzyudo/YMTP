import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useGetFetch from "../../hooks/useGetFetch";
import SEO from "../../components/SEO";
import { toast } from "react-toastify";
import { 
  FaHome, FaChevronRight, FaUser, FaGraduationCap, FaBriefcase, 
  FaFileUpload, FaCheck, FaArrowLeft, FaArrowRight, FaCloudUploadAlt,
  FaTimes
} from "react-icons/fa";

function VacancyApply() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form data states
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    birthDate: "",
    phone: "",
    email: "",
    address: "",
    passportSeries: "",
    passportNumber: ""
  });

  const [educationInfo, setEducationInfo] = useState({
    degree: "",
    institution: "",
    specialty: "",
    graduationYear: "",
    additionalEducation: ""
  });

  const [workExperience, setWorkExperience] = useState({
    currentPosition: "",
    currentOrganization: "",
    experienceYears: "",
    achievements: "",
    additionalSkills: ""
  });

  const [documents, setDocuments] = useState({
    languageCert: null,
    resume: null,
    qualificationCert: null,
    diploma: null,
    passport: null,
    retrainingCert: null
  });

  const { data: vacancy, isPending, error } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL}/shared_app/vacancies/${id}/`
  );

  const steps = [
    { id: 1, name: "Shaxsiy ma'lumotlar", icon: FaUser },
    { id: 2, name: "Ta'lim ma'lumoti", icon: FaGraduationCap },
    { id: 3, name: "Mehnat faoliyati", icon: FaBriefcase },
    { id: 4, name: "Hujjatlar", icon: FaFileUpload }
  ];

  const handleFileChange = (fieldName, file) => {
    if (file) {
      setDocuments(prev => ({
        ...prev,
        [fieldName]: file
      }));
    }
  };

  const handleRemoveFile = (fieldName) => {
    setDocuments(prev => ({
      ...prev,
      [fieldName]: null
    }));
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (currentStep === 1) {
      // Personal Info validation
      if (!personalInfo.firstName.trim()) newErrors.firstName = "Ism to'ldirilishi shart";
      if (!personalInfo.lastName.trim()) newErrors.lastName = "Familiya to'ldirilishi shart";
      if (!personalInfo.birthDate) newErrors.birthDate = "Tug'ilgan sana to'ldirilishi shart";
      if (!personalInfo.phone.trim()) newErrors.phone = "Telefon raqami to'ldirilishi shart";
      if (!personalInfo.email.trim()) newErrors.email = "Email to'ldirilishi shart";
      if (!personalInfo.address.trim()) newErrors.address = "Manzil to'ldirilishi shart";
      if (!personalInfo.passportSeries.trim()) newErrors.passportSeries = "Passport seriyasi to'ldirilishi shart";
      if (!personalInfo.passportNumber.trim()) newErrors.passportNumber = "Passport raqami to'ldirilishi shart";
    } else if (currentStep === 2) {
      // Education Info validation
      if (!educationInfo.degree) newErrors.degree = "Ta'lim darajasi to'ldirilishi shart";
      if (!educationInfo.institution.trim()) newErrors.institution = "Ta'lim muassasasi to'ldirilishi shart";
      if (!educationInfo.specialty.trim()) newErrors.specialty = "Mutaxassislik to'ldirilishi shart";
      if (!educationInfo.graduationYear) newErrors.graduationYear = "Tugatgan yili to'ldirilishi shart";
    } else if (currentStep === 3) {
      // Work Experience validation - no required fields based on user requirements
    } else if (currentStep === 4) {
      // Documents validation
      if (!documents.resume) newErrors.resume = "Resume (CV) yuklash shart";
      if (!documents.diploma) newErrors.diploma = "Diplom yuklash shart";
      if (!documents.passport) newErrors.passport = "Passport nusxasi yuklash shart";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep() && currentStep < 4) {
      setErrors({});
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate step 4 before submitting
    if (!validateStep()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create FormData to handle file uploads
      const formData = new FormData();
      
      // Add vacancy ID
      formData.append('vacancy', id);
      
      // Add personal info
      formData.append('firstName', personalInfo.firstName);
      formData.append('lastName', personalInfo.lastName);
      if (personalInfo.middleName) formData.append('middleName', personalInfo.middleName);
      formData.append('birthDate', personalInfo.birthDate);
      formData.append('phone', personalInfo.phone);
      formData.append('email', personalInfo.email);
      formData.append('address', personalInfo.address);
      formData.append('passportSeries', personalInfo.passportSeries);
      formData.append('passportNumber', personalInfo.passportNumber);
      
      // Add education info
      formData.append('degree', educationInfo.degree);
      formData.append('institution', educationInfo.institution);
      formData.append('specialty', educationInfo.specialty);
      formData.append('graduationYear', parseInt(educationInfo.graduationYear, 10));
      if (educationInfo.additionalEducation) formData.append('additionalEducation', educationInfo.additionalEducation);
      
      // Add work experience
      if (workExperience.currentPosition) formData.append('currentPosition', workExperience.currentPosition);
      if (workExperience.currentOrganization) formData.append('currentOrganization', workExperience.currentOrganization);
      if (workExperience.experienceYears && workExperience.experienceYears !== "") {
        formData.append('experienceYears', parseInt(workExperience.experienceYears, 10));
      }
      if (workExperience.achievements) formData.append('achievements', workExperience.achievements);
      if (workExperience.additionalSkills) formData.append('additionalSkills', workExperience.additionalSkills);
      
      // Add documents (files)
      if (documents.languageCert) formData.append('languageCert', documents.languageCert);
      if (documents.resume) formData.append('resume', documents.resume);
      if (documents.qualificationCert) formData.append('qualificationCert', documents.qualificationCert);
      if (documents.diploma) formData.append('diploma', documents.diploma);
      if (documents.passport) formData.append('passport', documents.passport);
      if (documents.retrainingCert) formData.append('retrainingCert', documents.retrainingCert);
      
      // Debug: Log FormData contents
      // console.log('Sending data to API:');
      for (let [key, value] of formData.entries()) {
        // console.log(key, ':', value);
      }
      
      // Send POST request to API
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/shared_app/vacancies/${id}/apply/`, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header, browser will set it automatically with boundary for multipart/form-data
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Display specific field errors if available
        if (errorData && typeof errorData === 'object') {
          for (const [field, messages] of Object.entries(errorData)) {
            const errorMsg = Array.isArray(messages) ? messages.join(', ') : messages;
            toast.error(`${field}: ${errorMsg}`);
          }
          throw new Error('Ma\'lumotlarni tekshiring');
        }
        
        throw new Error(errorData.message || 'Arizani yuborishda xatolik yuz berdi');
      }
      
      const data = await response.json();
      
      toast.success("Ariza muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.");
      navigate(`/vacancy/${id}`);
      
    } catch (error) {
      console.error('Error submitting application:', error);
      if (error.message !== 'Ma\'lumotlarni tekshiring') {
        toast.error(error.message || "Arizani yuborishda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error || !vacancy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-error mb-2">Xatolik yuz berdi</h2>
          <p className="text-base-content/70">Vakansiya ma'lumotlari topilmadi</p>
          <Link to="/vacancy" className="btn btn-primary mt-4">
            Vakansiyalar ro'yxatiga qaytish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`Ariza yuborish - ${vacancy?.title} | KTRI`}
        description={`${vacancy?.title} lavozimiga ariza yuborish. ${vacancy?.department}`}
        keywords="ariza, vakansiya, ish, kasbiy ta'lim"
      />

      <section className="max-w-5xl mx-auto px-1 sm:px-6 lg:px-8 py-8 sm:py-12 mb-25 sm:mb-40">
        {/* Breadcrumb */}
        <div className="hidden md:flex items-center gap-2 text-sm mb-6">
          <Link to="/" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
            <FaHome /> Bosh sahifa
          </Link>
          <FaChevronRight className="w-3 h-3 text-base-content/50" />
          <Link to="/about" className="text-blue-600 hover:text-blue-700">
            Institut haqida
          </Link>
          <FaChevronRight className="w-3 h-3 text-base-content/50" />
          <Link to="/vacancy" className="text-blue-600 hover:text-blue-700">
            Vakansiyalar
          </Link>
          <FaChevronRight className="w-3 h-3 text-base-content/50" />
          <Link to={`/vacancy/${id}`} className="text-blue-600 hover:text-blue-700">
            {vacancy?.title}
          </Link>
          <FaChevronRight className="w-3 h-3 text-base-content/50" />
          <span className="text-base-content/70">Ariza yuborish</span>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-br from-[#194882] to-info text-white rounded-2xl p-6 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Ariza yuborish</h1>
          <p className="text-lg opacity-90">{vacancy?.title}</p>
          <p className="text-sm opacity-75 mt-1">{vacancy?.department}</p>
        </div>

        {/* Timeline/Steps */}
        <div className="mb-8 px-4">
          <div className="flex items-center justify-between relative">
            {/* Progress line */}
            <div className="absolute top-6 left-[10%] right-[10%] h-1 bg-base-300">
              <div 
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              ></div>
            </div>

            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex flex-col items-center flex-1 relative z-10">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-3 transition-all shadow-lg ${
                      isCompleted
                        ? "bg-green-600 text-white"
                        : isActive
                        ? "bg-blue-600 text-white ring-4 ring-blue-200"
                        : "bg-white text-base-content/50 border-2 border-base-300"
                    }`}
                  >
                    {isCompleted ? (
                      <FaCheck className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <p
                    className={`text-xs sm:text-sm text-center px-2 max-w-[100px] ${
                      isActive || isCompleted
                        ? "text-blue-600 font-semibold"
                        : "text-base-content/50"
                    }`}
                  >
                    {step.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-base-100 shadow-xl rounded-2xl p-6 sm:p-8">
            {/* Step 1: Shaxsiy ma'lumotlar */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
                  <FaUser className="w-6 h-6" />
                  Shaxsiy ma'lumotlar
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Ism *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ismingizni kiriting"
                      className={`input input-bordered w-full ${errors.firstName ? 'border-red-500 border-2' : ''}`}
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Familiya *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Familiyangizni kiriting"
                      className={`input input-bordered w-full ${errors.lastName ? 'border-red-500 border-2' : ''}`}
                      value={personalInfo.lastName}
                      onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Otasining ismi</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Otangizning ismi"
                      className="input input-bordered w-full"
                      value={personalInfo.middleName}
                      onChange={(e) => setPersonalInfo({...personalInfo, middleName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Tug'ilgan sana *</span>
                    </label>
                    <input
                      type="date"
                      className={`input input-bordered w-full ${errors.birthDate ? 'border-red-500 border-2' : ''}`}
                      value={personalInfo.birthDate}
                      onChange={(e) => setPersonalInfo({...personalInfo, birthDate: e.target.value})}
                    />
                    {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Telefon raqami *</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+998 90 123 45 67"
                      className={`input input-bordered w-full ${errors.phone ? 'border-red-500 border-2' : ''}`}
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Email *</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className={`input input-bordered w-full ${errors.email ? 'border-red-500 border-2' : ''}`}
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Yashash manzili *</span>
                  </label>
                  <textarea
                    className={`textarea textarea-bordered w-full ${errors.address ? 'border-red-500 border-2' : ''}`}
                    placeholder="To'liq yashash manzilingizni kiriting"
                    rows="2"
                    value={personalInfo.address}
                    onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
                  ></textarea>
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Passport seriyasi *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="AA"
                      className={`input input-bordered uppercase w-full ${errors.passportSeries ? 'border-red-500 border-2' : ''}`}
                      maxLength="2"
                      value={personalInfo.passportSeries}
                      onChange={(e) => setPersonalInfo({...personalInfo, passportSeries: e.target.value.toUpperCase()})}
                    />
                    {errors.passportSeries && <p className="text-red-500 text-sm mt-1">{errors.passportSeries}</p>}
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Passport raqami *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="1234567"
                      className={`input input-bordered w-full ${errors.passportNumber ? 'border-red-500 border-2' : ''}`}
                      maxLength="7"
                      value={personalInfo.passportNumber}
                      onChange={(e) => setPersonalInfo({...personalInfo, passportNumber: e.target.value})}
                    />
                    {errors.passportNumber && <p className="text-red-500 text-sm mt-1">{errors.passportNumber}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Ta'lim ma'lumoti */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
                  <FaGraduationCap className="w-6 h-6" />
                  Ta'lim ma'lumoti
                </h2>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Ta'lim darajasi *</span>
                  </label>
                  <select
                    className={`select select-bordered w-full ${errors.degree ? 'border-red-500 border-2' : ''}`}
                    value={educationInfo.degree}
                    onChange={(e) => setEducationInfo({...educationInfo, degree: e.target.value})}
                  >
                    <option value="">Tanlang</option>
                    <option value="bakalavr">Bakalavr</option>
                    <option value="magistr">Magistr</option>
                    <option value="phd">PhD / Doktorantura</option>
                  </select>
                  {errors.degree && <p className="text-red-500 text-sm mt-1">{errors.degree}</p>}
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Ta'lim muassasasi *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Universitet yoki institut nomi"
                    className={`input input-bordered w-full ${errors.institution ? 'border-red-500 border-2' : ''}`}
                    value={educationInfo.institution}
                    onChange={(e) => setEducationInfo({...educationInfo, institution: e.target.value})}
                  />
                  {errors.institution && <p className="text-red-500 text-sm mt-1">{errors.institution}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Mutaxassislik *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="O'qigan mutaxassislik"
                      className={`input input-bordered w-full ${errors.specialty ? 'border-red-500 border-2' : ''}`}
                      value={educationInfo.specialty}
                      onChange={(e) => setEducationInfo({...educationInfo, specialty: e.target.value})}
                    />
                    {errors.specialty && <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>}
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Tugatgan yili *</span>
                    </label>
                    <input
                      type="number"
                      placeholder="2020"
                      min="1950"
                      max={new Date().getFullYear()}
                      className={`input input-bordered w-full ${errors.graduationYear ? 'border-red-500 border-2' : ''}`}
                      value={educationInfo.graduationYear}
                      onChange={(e) => setEducationInfo({...educationInfo, graduationYear: e.target.value})}
                    />
                    {errors.graduationYear && <p className="text-red-500 text-sm mt-1">{errors.graduationYear}</p>}
                  </div>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Qo'shimcha ta'lim</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder="Kurslar, treninglar, sertifikatlar haqida ma'lumot"
                    rows="4"
                    value={educationInfo.additionalEducation}
                    onChange={(e) => setEducationInfo({...educationInfo, additionalEducation: e.target.value})}
                  ></textarea>
                </div>
              </div>
            )}

            {/* Step 3: Mehnat faoliyati */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center gap-2">
                  <FaBriefcase className="w-6 h-6" />
                  Mehnat faoliyati
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Hozirgi lavozim</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Lavozimingiz"
                      className="input input-bordered w-full"
                      value={workExperience.currentPosition}
                      onChange={(e) => setWorkExperience({...workExperience, currentPosition: e.target.value})}
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Hozirgi ish joyi</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Tashkilot nomi"
                      className="input input-bordered w-full"
                      value={workExperience.currentOrganization}
                      onChange={(e) => setWorkExperience({...workExperience, currentOrganization: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Umumiy ish tajribasi</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={workExperience.experienceYears}
                    onChange={(e) => setWorkExperience({...workExperience, experienceYears: e.target.value})}
                  >
                    <option value="">Tanlang</option>
                    <option value="0">1 yilgacha</option>
                    <option value="2">1-3 yil</option>
                    <option value="4">3-5 yil</option>
                    <option value="7">5-10 yil</option>
                    <option value="10">10 yildan ko'p</option>
                  </select>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Asosiy yutuqlar va tajriba</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder="Ish jarayonidagi yutuqlaringiz, amalga oshirgan loyihalar"
                    rows="4"
                    value={workExperience.achievements}
                    onChange={(e) => setWorkExperience({...workExperience, achievements: e.target.value})}
                  ></textarea>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Qo'shimcha ko'nikmalar</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder="Kompyuter dasturlari, tillar va boshqa ko'nikmalar"
                    rows="3"
                    value={workExperience.additionalSkills}
                    onChange={(e) => setWorkExperience({...workExperience, additionalSkills: e.target.value})}
                  ></textarea>
                </div>
              </div>
            )}

            {/* Step 4: Hujjatlar */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-orange-800 mb-6 flex items-center gap-2">
                  <FaFileUpload className="w-6 h-6" />
                  Hujjatlar va sertifikatlar
                </h2>

                <div className="alert alert-info">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span className="text-sm">Hujjatlarni PDF, JPG yoki PNG formatida yuklang. Maksimal hajm: 5MB</span>
                </div>

                {/* IELTS/TOEFL/DTM */}
                <FileUploadField
                  label="IELTS / TOEFL / DTM sertifikati"
                  fieldName="languageCert"
                  file={documents.languageCert}
                  onChange={handleFileChange}
                  onRemove={handleRemoveFile}
                  error={errors.languageCert}
                />

                {/* Obyektivka */}
                <FileUploadField
                  label="Obyektivka (Resume / CV)"
                  fieldName="resume"
                  file={documents.resume}
                  onChange={handleFileChange}
                  onRemove={handleRemoveFile}
                  required
                  error={errors.resume}
                />

                {/* Malaka toifa sertifikati */}
                <FileUploadField
                  label="Malaka toifa sertifikati"
                  fieldName="qualificationCert"
                  file={documents.qualificationCert}
                  onChange={handleFileChange}
                  onRemove={handleRemoveFile}
                  error={errors.qualificationCert}
                />

                {/* Diplom */}
                <FileUploadField
                  label="Oliy ma'lumot diplomi"
                  fieldName="diploma"
                  file={documents.diploma}
                  onChange={handleFileChange}
                  onRemove={handleRemoveFile}
                  required
                  error={errors.diploma}
                />

                {/* Passport */}
                <FileUploadField
                  label="Passport nusxasi"
                  fieldName="passport"
                  file={documents.passport}
                  onChange={handleFileChange}
                  onRemove={handleRemoveFile}
                  required
                  error={errors.passport}
                />

                {/* Qayta tayyorlov */}
                <FileUploadField
                  label="Qayta tayyorlovdan o'tganlik hujjati"
                  fieldName="retrainingCert"
                  file={documents.retrainingCert}
                  onChange={handleFileChange}
                  onRemove={handleRemoveFile}
                  error={errors.retrainingCert}
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-base-300">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="btn btn-outline gap-2"
              >
                <FaArrowLeft />
                Orqaga
              </button>

              <div className="text-sm text-base-content/60">
                {currentStep} / 4
              </div>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-primary gap-2"
                >
                  Keyingisi
                  <FaArrowRight />
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-success gap-2 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Yuborilmoqda...
                    </>
                  ) : (
                    <>
                      <FaCheck />
                      Yuborish
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

// File Upload Component
function FileUploadField({ label, fieldName, file, onChange, onRemove, required = false, error = null }) {
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check file size (5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("Fayl hajmi 5MB dan oshmasligi kerak!");
        return;
      }
      onChange(fieldName, selectedFile);
    }
  };

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-medium">
          {label} {required && <span className="text-error">*</span>}
        </span>
      </label>
      
      {!file ? (
        <label className={`w-full border-2 border-dashed rounded-lg p-6 hover:border-blue-500 hover:bg-blue-50/30 transition-all cursor-pointer bg-base-200/30 block ${error ? 'border-red-500' : 'border-base-300'}`}>
          <input
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleChange}
          />
          <div className="flex flex-col items-center gap-2 text-base-content/60">
            <FaCloudUploadAlt className="w-12 h-12" />
            <p className="text-sm font-medium">Faylni tanlash uchun bosing</p>
            <p className="text-xs">PDF, JPG, PNG (Max: 5MB)</p>
          </div>
        </label>
      ) : (
        <div className="w-full bg-green-50 border-2 border-green-300 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <FaCheck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-green-800">{file.name}</p>
              <p className="text-xs text-green-600">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onRemove(fieldName)}
            className="btn btn-ghost btn-sm text-red-600 hover:bg-red-100"
          >
            <FaTimes />
          </button>
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default VacancyApply;
