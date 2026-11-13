// group: "institut" (institut haqida), "ochiq" (ochiq ma'lumotlar), "tinglovchilarga" (ilmiy/o'quv faoliyat)
export const institutLinks = [
  { to: "/about", labelKey: "institutLinks.about", slug: "about", group: "institut" },
  { to: "/leadership", labelKey: "institutLinks.leadership", slug: "leadership", group: "institut" },
  { to: "/structure", labelKey: "institutLinks.structure", slug: "structure", group: "institut" },
  { to: "/hududiy-filiallar", labelKey: "institutLinks.hududiy", slug: "hududiy-filiallar", group: "institut" },
  { to: "/raqamlashtirish-laboratoriyasi", labelKey: "institutLinks.laboratoriya", slug: "raqamlashtirish-laboratoriyasi", group: "institut" },
  { to: "/oquv-metodik-birlashmalar", labelKey: "institutLinks.omb", slug: "oquv-metodik-birlashmalar", group: "institut" },
  { to: "/xalqaro-hamkorlik", labelKey: "institutLinks.xalqaro", slug: "xalqaro-hamkorlik", group: "institut" },

  { to: "/normativ-documents", labelKey: "institutLinks.normativ", slug: "normativ-documents", group: "ochiq" },
  { to: "/vacancy", labelKey: "institutLinks.vacancy", slug: "vacancy", group: "ochiq" },
  { to: "/anti-corruption", labelKey: "institutLinks.antiCorruption", slug: "anti-corruption", group: "ochiq" },
  { to: "/korik-tanlov", labelKey: "institutLinks.korikTanlov", slug: "korik-tanlov", group: "ochiq" },

  { to: "/karyera-rivojlantirish", labelKey: "institutLinks.karyera", slug: "karyera-rivojlantirish", group: "tinglovchilarga" },
  { to: "/ijtimoiy-emotsional-konikma", labelKey: "institutLinks.ijtimoiyEmotsional", slug: "ijtimoiy-emotsional-konikma", group: "tinglovchilarga" },
  { to: "/doktorantlar", labelKey: "institutLinks.doktorantlar", slug: "doktorantlar", group: "tinglovchilarga" },
  { to: "/ilmiy-qarorlar", labelKey: "institutLinks.ilmiyQarorlar", slug: "ilmiy-qarorlar", group: "tinglovchilarga" },
  { to: "/dars-jadvali", labelKey: "institutLinks.darsJadvali", slug: "dars-jadvali", group: "tinglovchilarga" },
  { to: "https://journal.ktri.uz/", labelKey: "institutLinks.journal", slug: "ilmiy-jurnal", group: "tinglovchilarga", external: true },
];

// Guruh tartibi va sarlavhalari (header mega-menyu, footer va yon panel shu tartibda ko'rsatadi)
export const institutLinkGroupOrder = ["institut", "ochiq", "tinglovchilarga"];

export const institutLinkGroupLabels = {
  institut: "institutLinks.group.institut",
  ochiq: "institutLinks.group.ochiq",
  tinglovchilarga: "institutLinks.group.tinglovchilarga",
};

// Header/Footer uchun tayyor guruhlangan ro'yxat: [{ group, labelKey, links }]
export const getGroupedInstitutLinks = () =>
  institutLinkGroupOrder.map((group) => ({
    group,
    labelKey: institutLinkGroupLabels[group],
    links: institutLinks.filter((link) => link.group === group),
  }));
