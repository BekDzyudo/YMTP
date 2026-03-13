import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHero } from '../../context/HeroContext';
import useGetFetch from '../../hooks/useGetFetch';

function Adabiyotlar() {
  const navigate = useNavigate();
  const { setOnHero } = useHero();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    year: '',
    degree: '',
    field: '',
    education: '',
    direction: '',
    profession: '',
    responsible: ''
  });

  // Namunali ma'lumotlar
  const literatureData = [
    {
      id: 1,
      name: '"B" toifadagi avtotransport vositalarining tuzilishi va ularga servis xizmat ko\'rsatish',
      code: '40811202-Gidromeлiorativ mashina va jihozlaridan foydalanish va ularga texnik xizmat ko\'rsatish mexanigi',
      hours: '40 - soat',
      materials: '—',
      responsible: '',
      group: 'Ko\'rish'
    },
    {
      id: 2,
      name: '"B" va "BC" toifadagi avtotransport vositalarining tuzilishi va ularga servis xizmat ko\'rsatish',
      code: '40711606-Avtomobillarni yig\'ish va sinash',
      hours: '80 - soat',
      materials: '—',
      responsible: 'Fatbullayev Nurilla',
      group: 'Ko\'rish'
    },
    {
      id: 3,
      name: 'Administrator faoliyatini tashkil etish',
      code: '41010302-Mehmonxona xo\'jaligini tashkil qilish va boshqarish',
      hours: '282 - soat',
      materials: '—',
      responsible: '',
      group: 'Ko\'rish'
    },
    {
      id: 4,
      name: 'Aerodinamika',
      code: '41040103-Havo kemaLariga xizmat ko\'rsatish (aeroport xizmatlari)',
      hours: '60 - soat',
      materials: '—',
      responsible: '',
      group: 'Ko\'rish'
    },
    {
      id: 5,
      name: 'Agrokimyo',
      code: '40810203-Agrokimyo va tuproqshunoslik agronomi',
      hours: '110 - soat',
      materials: '—',
      responsible: '',
      group: 'Ko\'rish'
    },
    {
      id: 6,
      name: 'Agrokimyo va tuproqshunoslik',
      code: '40810203-Agrokimyo va tuproqshunoslik agronomi',
      hours: '240 - soat',
      materials: '—',
      responsible: '',
      group: 'Ko\'rish'
    }
  ];

  const totalCount = 2485;

  // Header uchun hero holatini o'rnatish
  useEffect(() => {
    setOnHero(false);
  }, [setOnHero]);

  const tabs = [
    { id: 'all', name: 'Barchasi' },
    { id: 'general', name: 'Umumta\'lim fanlar' },
    { id: 'vocational', name: 'Umumkasbiy fanlar' },
    { id: 'special', name: 'Maxsus fanlar' },
    { id: 'practice', name: 'O\'quv amaliyoti' },
    { id: 'professional', name: 'Professional modul' },
    { id: 'natural', name: 'Tabiiy modul' },
    { id: 'maxsus', name: 'Maxsus modul' },
    { id: 'humanities', name: 'Tabiiy gumanitar modul' }
  ];

  const handleRowClick = (id) => {
    // Detail sahifaga o'tish - keyinroq amalga oshiriladi
    console.log('Clicked row:', id);
    // navigate(`/adabiyotlar/${id}`);
  };

  const clearFilters = () => {
    setFilters({
      year: '',
      degree: '',
      field: '',
      education: '',
      direction: '',
      profession: '',
      responsible: ''
    });
    setSearchTerm('');
  };

  const [darajaa, setDaraja] = useState("");
  const [yil, setYil] = useState("");
  const [bilim, setBilim] = useState("");
  const [talim, setTalim] = useState("");
  const [yunalish, setYunalish] = useState("");
  const [kasb, setKasb] = useState("");
  const [masullarr, setMasullar] = useState("");
  const [blok, setBlok] = useState("");
  const [activeBtn, setActiveBtn] = useState(-1);
  const [page, setPage] = useState(1);

  const { data: darajalar } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL_ADABIYOTLAR}/talim-darajalari/`
  );

  const { data: uquv_yili } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL_ADABIYOTLAR}/oquv-yillari`
  );

  const { data: bilim_soha } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL_ADABIYOTLAR}/bilim-sohalar/`
  );

  const { data: talim_soha } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL_ADABIYOTLAR}/talim-sohalar/?bilim_soha=${bilim}`
  );
  const { data: talim_yunalish } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL_ADABIYOTLAR}/talim-yonalishlar/?talim_soha=${talim}`
  );

  const { data: kasb_mutaxassislik } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL_ADABIYOTLAR}/kasblar/?talim_yunalish=${yunalish}`
  );
  const { data: masullar } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL_ADABIYOTLAR}/masullar/?talim_soha=${talim}`
  );
  const { data: bloklar } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL_ADABIYOTLAR}/bloklar/`
  );

  return (
    <div className='min-h-screen bg-slate-100'>
        <div className=" w-full mx-5 xl:max-w-7xl 2xl:max-w-10/12 mx-auto pt-35">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-6 rounded-t-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Kasbiy ta'lim tizimida o'qitiladigan adabiyotlar

        </h1>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Ta'lim sohasini tanlash</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
                <select
                  onChange={(e) => setYil(e.target.value)}
                  value={yil}
                  className="select !bg-white text-black !select-neutral"
                >
                  <option value="" disabled={true}>
                    O‘quv yili
                  </option>
                  {uquv_yili &&
                    uquv_yili.map((item) => {
                      return (
                        <option
                          key={item.id}
                          value={item.id}
                          className="!text-black"
                        >
                          {item.yil}
                        </option>
                      );
                    })}
                </select>
                <select
                  value={darajaa}
                  className="select !bg-white text-black !select-neutral"
                  onChange={(e) => setDaraja(e.target.value)}
                >
                  <option disabled={true} value="">
                    Ta'lim darajasi
                  </option>
                  {darajalar &&
                    darajalar.map((item) => {
                      return (
                        <option
                          key={item.id}
                          value={item.id}
                          className="!text-black"
                        >
                          {item.nomi}
                        </option>
                      );
                    })}
                </select>
                <select
                  value={bilim}
                  className="select !bg-white text-black !select-neutral"
                  onChange={(e) => setBilim(e.target.value)}
                >
                  <option value="" disabled={true}>
                    Bilim sohasi
                  </option>
                  {bilim_soha &&
                    bilim_soha.map((item) => {
                      return (
                        <option
                          key={item.id}
                          value={item.id}
                          className="!text-black"
                        >
                          {item.nomi}
                        </option>
                      );
                    })}
                </select>
                <select
                  value={talim}
                  className="select !bg-white text-black !select-neutral"
                  onChange={(e) => setTalim(e.target.value)}
                >
                  <option value="" disabled={true}>
                    Ta'lim sohasi
                  </option>
                  {talim_soha &&
                    talim_soha.map((item) => {
                      return (
                        <option
                          key={item.id}
                          value={item.id}
                          className="!text-black"
                        >
                          {item.nomi}
                        </option>
                      );
                    })}
                </select>
                <select
                 value={yunalish}
                  className="select !bg-white text-black !select-neutral"
                  onChange={(e) => setYunalish(e.target.value)}
                >
                  <option value="" disabled={true}>
                    Ta'lim yo'nalish
                  </option>
                  {talim_yunalish &&
                    talim_yunalish.map((item) => {
                      return (
                        <option
                          key={item.id}
                          value={item.id}
                          className="!text-black"
                        >
                          {item.nomi}
                        </option>
                      );
                    })}
                </select>
                <select
                  value={kasb}
                  className="select !bg-white text-black !select-neutral"
                  onChange={(e) => setKasb(e.target.value)}
                >
                  <option value="" disabled={true}>
                    Kasb va mutaxasislik
                  </option>
                  {kasb_mutaxassislik &&
                    kasb_mutaxassislik.map((item) => {
                      return (
                        <option
                          key={item.id}
                          value={item.id}
                          className="!text-black"
                        >
                          {item.nomi}
                        </option>
                      );
                    })}
                </select>
                <select
                  value={masullarr}
                  className="select !bg-white text-black !select-neutral"
                  onChange={(e) => setMasullar(e.target.value)}
                >
                  <option value="" disabled={true}>
                    Mas’ullar
                  </option>
                  {masullar &&
                    masullar.map((item) => {
                      return (
                        <option
                          key={item.id}
                          value={item.id}
                          className="!text-black"
                        >
                          {item.ism}
                        </option>
                      );
                    })}
                </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <button
            onClick={() => {
                    setBilim(""),
                      setDaraja(""),
                      setKasb(""),
                      setMasullar(""),
                      setSearch(""),
                      setTalim(""),
                      setYil(""),
                      setYunalish("");
                    setActiveBtn(-1)
                    setBlok("")
                  }}
            className="w-full sm:w-auto px-6 py-2 bg-green-700 hover:bg-green-800 text-white font-medium rounded-lg transition-colors cursor-pointer text-sm"
          >
            Filterlarni tozalash
          </button>
          <div className="flex flex-col sm:flex-row gap-3 items-center w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Izlash..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex items-center gap-2 bg-[#194882] text-white px-4 py-2 rounded-lg text-sm font-medium">
              <span>Jami fanlar soni</span>
              <span className="bg-white text-[#194882] px-2 py-0.5 rounded font-bold">{totalCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-blue-800 text-white px-4 py-3 font-semibold text-center">
                Barchasi
              </div>
              <div className="divide-y divide-gray-200">
                {tabs.slice(1).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full px-4 py-3 text-left text-sm hover:bg-blue-50 transition-colors cursor-pointer ${
                      activeTab === tab.id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-x-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-w-full">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider w-8">
                      №
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Fanning nomi
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Kodi darajalar kesimida
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Soati darajalar kesimida
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      O'quv adabiyotlari
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Institutdan mas'ulning F.I.O.
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Ishchi guruh a'zolari
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider w-16">
                      
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {literatureData.map((item, index) => (
                    <tr 
                      key={item.id}
                      onClick={() => handleRowClick(item.id)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {item.code}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {item.hours}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {item.materials}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {item.responsible}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <a 
                          href="#" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRowClick(item.id);
                          }}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          {item.group}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            // Menu options
                          }}
                          className="text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination placeholder */}
            <div className="mt-4 flex justify-center">
              <div className="text-sm text-gray-600">
                1-6 dan 2485 ta natija
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Adabiyotlar;