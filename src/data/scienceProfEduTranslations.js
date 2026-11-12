// scienceProfEdu.js dagi o'zbekcha sarlavhalarning ruscha/inglizcha tarjimalari (id bo'yicha).
// Manba sayt (ipitvet.uz) bu ma'lumotlarni faqat o'zbek tilida beradi.
// Shaxs ismlari va asl tili inglizcha/nemischa bo'lgan maqola nomlari tarjima qilinmaydi.

const OAK_239_9 = {
  ru: "Постановление Президиума ВАК от 31 мая 2017 года № 239/9 «О внесении изменений и дополнений в постановление «Об утверждении методических указаний по оценке внедрения в практику научных результатов докторских диссертаций»»",
  en: "Resolution of the Presidium of the Higher Attestation Commission No. 239/9 of 31 May 2017 \"On amendments and additions to the resolution 'On approval of methodological guidelines for assessing the implementation of scientific results of doctoral dissertations into practice'\"",
};

export const scienceTitleTranslations = {
  "hujjat-1": OAK_239_9,
  "hujjat-2": {
    ru: "Постановление Кабинета Министров Республики Узбекистан от 22 мая 2017 года № 304 «О мерах по дальнейшему совершенствованию системы послевузовского образования»",
    en: "Resolution of the Cabinet of Ministers of the Republic of Uzbekistan No. 304 of 22 May 2017 \"On measures to further improve the system of postgraduate education\"",
  },
  "hujjat-3": {
    ru: "Постановление Кабинета Министров Республики Узбекистан от 17 октября 2017 года № 839 «О создании материальных условий для занятия докторантов научно-исследовательской работой и дальнейшем стимулировании их трудовой деятельности»",
    en: "Resolution of the Cabinet of Ministers of the Republic of Uzbekistan No. 839 of 17 October 2017 \"On creating material conditions for doctoral students to engage in research and further encouraging their work\"",
  },
  "hujjat-4": {
    ru: "О мерах по дальнейшему расширению участия отраслей и сфер экономики в повышении качества подготовки специалистов с высшим образованием. Постановление Президента Республики Узбекистан от 27 июля 2017 года № ПП-3151",
    en: "On measures to further expand the participation of economic sectors and industries in improving the quality of training of specialists with higher education. Resolution of the President of the Republic of Uzbekistan No. PP-3151 of 27 July 2017",
  },
  "hujjat-5": {
    ru: "Постановление Президиума Высшей аттестационной комиссии при Кабинете Министров Республики Узбекистан от 31 мая 2017 года № 239/3 «Об утверждении Положения о научном совете по присуждению учёных степеней»",
    en: "Resolution of the Presidium of the Higher Attestation Commission under the Cabinet of Ministers of the Republic of Uzbekistan No. 239/3 of 31 May 2017 \"On approval of the Regulation on the scientific council awarding academic degrees\"",
  },
  "hujjat-6": {
    ru: "Постановление Президиума ВАК от 31 мая 2017 года № 239/8 «О внесении изменений и дополнений в постановление «Об утверждении правил оформления докторской диссертации и автореферата диссертации»»",
    en: "Resolution of the Presidium of the Higher Attestation Commission No. 239/8 of 31 May 2017 \"On amendments and additions to the resolution 'On approval of the rules for formatting a doctoral dissertation and its abstract'\"",
  },
  "hujjat-7": OAK_239_9,
  "malakaviy-8": {
    ru: "Требования к соискателям, поступающим в институты послевузовского образования",
    en: "Requirements for applicants to postgraduate education institutes",
  },
  "malakaviy-9": {
    ru: "В Институте педагогических инноваций проводится квалификационный экзамен по специальности 13.00.05 – «Теория и методика профессионального образования»",
    en: "The Institute of Pedagogical Innovations holds a qualification exam in specialty 13.00.05 \"Theory and Methodology of Vocational Education\"",
  },
  "nashr-46": {
    ru: "Реформы в системе повышения квалификации: инновационные идеи",
    en: "Reforms in the professional development education system: innovative ideas",
  },
  "nashr-47": {
    ru: "Значение коллективно-лидерской компетентности педагогических кадров профессиональных образовательных учреждений",
    en: "The importance of collective leadership competence among teaching staff of vocational education institutions",
  },
  "nashr-53": {
    ru: "Аспекты внедрения искусственного интеллекта в образование",
    en: "Aspects of introducing artificial intelligence into education",
  },
  "nashr-56": {
    ru: "Коренное реформирование профессионального образования – приоритетная задача",
    en: "Fundamental reform of vocational education is a priority task",
  },
  "nashr-57": {
    ru: "Условия повышения эффективности воспитательной деятельности руководителей групп профессиональных образовательных учреждений",
    en: "Conditions for improving the effectiveness of the educational work of group leaders in vocational education institutions",
  },
};

const JOURNAL_NAME = {
  ru: "Журнал «Профессиональное образование в Узбекистане»",
  en: "\"Professional Education in Uzbekistan\" journal",
};

const issueLabel = (lang, year, num) => {
  const parts = [];
  if (year) parts.push(lang === "ru" ? `${year} г.` : year);
  if (num) parts.push(lang === "ru" ? `№ ${num}` : `No. ${num}`);
  return parts.join(", ");
};

// "2024-yil, 1-son", "... jurnali 2023-yil 2-soni", "... jurnali nishona soni" kabi sarlavhalar
export const formatIssueTitle = (title, lang) => {
  if (lang !== "ru" && lang !== "en") return null;
  if (/jurnali/i.test(title)) {
    if (/nishona/i.test(title)) return `${JOURNAL_NAME[lang]}, ${lang === "ru" ? "пилотный выпуск" : "pilot issue"}`;
    const m = title.match(/(\d{4})[-\s]yil\s+(\d+)-soni/);
    return m ? `${JOURNAL_NAME[lang]}, ${issueLabel(lang, m[1], m[2])}` : null;
  }
  const m = title.trim().match(/^(?:(\d{4})-yil)?,?\s*(?:(\d+)-son)?$/);
  if (m && (m[1] || m[2])) return issueLabel(lang, m[1], m[2]);
  return null;
};
