import { createElement, useMemo } from "react";
import DOMPurify from "dompurify";
import {
  FaBalanceScale,
  FaBook,
  FaBullseye,
  FaChalkboardTeacher,
  FaChartLine,
  FaCheck,
  FaClipboardCheck,
  FaCogs,
  FaFileAlt,
  FaFlask,
  FaGlobeAmericas,
  FaGraduationCap,
  FaHandshake,
  FaIndustry,
  FaLaptopCode,
  FaLightbulb,
  FaMapMarkedAlt,
  FaShieldAlt,
  FaSitemap,
  FaUserGraduate,
  FaUsers,
  FaAward,
  FaBriefcase,
  FaCalendarAlt,
} from "react-icons/fa";
import { useTranslation } from "../i18n/LanguageContext";

/**
 * Backenddan kelgan matnli HTML'ni infografikaga aylantiradi.
 * Mazmun tuzilishiga qarab:
 *  - matndagi raqamlar (… ta, … nafar, …%)  -> "Asosiy ko'rsatkichlar" kartochkalari
 *  - yil bilan boshlanadigan xatboshilar     -> vaqt chizig'i (timeline)
 *  - <ol> / "1)", "1." bilan boshlanuvchi qatorlar -> raqamlangan bosqichlar
 *  - <ul> / "-", "•" bilan boshlanuvchi qatorlar  -> ikonkali kartochkalar
 *  - sarlavhalar va faqat qalin matnli qatorlar  -> raqamli bo'lim sarlavhalari
 *  - birinchi xatboshi                         -> ajratilgan kirish matni
 * HTML avval DOMPurify bilan tozalanadi.
 */

// Kalit so'z -> ikonka (uz lotin/kirill, ru, en). Birinchi mos kelgani olinadi.
const ICON_RULES = [
  [/xalqaro|chet\s?el|xorij|международ|зарубеж|international|foreign/i, FaGlobeAmericas],
  [/hamkor|memorandum|kelishuv|сотруднич|партнер|partner|cooperat/i, FaHandshake],
  [/ilmiy|tadqiqot|innovats|научн|исследов|research|scien|innovat/i, FaFlask],
  [/raqamli|raqamlashtir|axborot|elektron|dastur|platforma|цифров|информац|электрон|digital|software|online|platform/i, FaLaptopCode],
  [/malaka|qayta tayyorla|повышени|переподготов|training|qualification/i, FaChalkboardTeacher],
  [/metodik|darslik|qo['ʻ‘’]?llanma|o['ʻ‘’]?quv adabiyot|методич|учебник|пособи|method|textbook/i, FaBook],
  [/pedagog|o['ʻ‘’]?qituvchi|kadr|xodim|mutaxassis|педагог|преподават|кадр|сотрудник|teacher|staff|personnel/i, FaUsers],
  [/talaba|tinglovchi|o['ʻ‘’]?quvchi|bitiruvchi|doktorant|студент|слушател|выпускник|student|graduate|trainee/i, FaUserGraduate],
  [/standart|me['ʻ‘’]?yor|qonun|huquq|hujjat|норматив|закон|прав|стандарт|law|legal|regulat|standard/i, FaBalanceScale],
  [/nazorat|monitoring|baholash|ekspertiza|sifat|контрол|мониторинг|оценк|качеств|quality|assess|control/i, FaClipboardCheck],
  [/tahlil|statistik|reyting|анализ|статист|рейтинг|analy|statist|rating/i, FaChartLine],
  [/korrupsiya|xavfsiz|himoya|коррупц|безопас|защит|corrupt|security|protect/i, FaShieldAlt],
  [/hudud|viloyat|filial|fakultet|регион|област|филиал|факультет|region|branch|facult/i, FaMapMarkedAlt],
  [/tuzilma|bo['ʻ‘’]?lim|kafedra|структур|отдел|кафедр|structur|department/i, FaSitemap],
  [/korxona|ish beruvchi|ishlab chiqarish|dual|предприят|работодат|производ|employer|industry|enterprise/i, FaIndustry],
  [/kasb|ish o['ʻ‘’]?rni|karyera|профес|карьер|career|profession|job/i, FaBriefcase],
  [/maqsad|vazifa|missiya|цель|задач|мисси|goal|mission|task|objective/i, FaBullseye],
  [/tanlov|g['ʻ‘’]?olib|mukofot|yutuq|конкурс|побед|наград|award|contest|winner/i, FaAward],
  [/ta['ʻ‘’]?lim|o['ʻ‘’]?qitish|образован|обучен|educat|teach|learn/i, FaGraduationCap],
  [/g['ʻ‘’]?oya|tashabbus|loyiha|иде|инициатив|проект|idea|initiative|project/i, FaLightbulb],
  [/tizim|jarayon|tashkil|систем|процесс|организ|system|process|organi/i, FaCogs],
  [/yil|sana|muddat|год|срок|year|date|deadline/i, FaCalendarAlt],
];

const iconFor = (text, fallback = FaCheck) => ICON_RULES.find(([re]) => re.test(text))?.[1] || fallback;

// Matn mazmuniga mos ikonka
function KeywordIcon({ text, fallback, size }) {
  return createElement(iconFor(text, fallback), { size });
}

// Kartochkalar uchun navbatma-navbat ranglar (to'liq sinf nomlari — Tailwind JIT topishi uchun)
const ACCENTS = [
  { icon: "bg-blue-600 text-white", ring: "border-blue-200", tint: "from-blue-50" },
  { icon: "bg-emerald-600 text-white", ring: "border-emerald-200", tint: "from-emerald-50" },
  { icon: "bg-amber-500 text-white", ring: "border-amber-200", tint: "from-amber-50" },
  { icon: "bg-violet-600 text-white", ring: "border-violet-200", tint: "from-violet-50" },
  { icon: "bg-rose-600 text-white", ring: "border-rose-200", tint: "from-rose-50" },
  { icon: "bg-cyan-600 text-white", ring: "border-cyan-200", tint: "from-cyan-50" },
];

const YEAR_LEAD = /^\s*(?:<[^>]+>\s*)*((?:19|20)\d{2})(?:\s*[-–—]\s*((?:19|20)?\d{2,4}))?\s*[-–—]?\s*(?:yil(?:da|dan|i|ning|lar)?|yy\.?|йил(?:лар)?|йй\.?|гг?\.|год[ау]?|y\.)?/i;
const BULLET_LEAD = /^\s*(?:[-–—•●▪➢✓✔*]|\d{1,2}[.)])\s+/;
const NUMBERED_LEAD = /^\s*\d{1,2}[.)]\s+/;
// Bundan uzun "sarlavha" teglari xatboshi deb hisoblanadi
const MAX_HEADING_LENGTH = 100;

// Raqamli ko'rsatkichlar: "150 nafar", "14 ta hududiy fakultet", "85%", "2 mingdan ortiq"
const STAT_RE = /(\d[\d\s.,]{0,9}\d|\d)\s*(%|\+|foiz|ta|nafar|ming|mln|million|mlrd|dan\s+ortiq|dan\s+ziyod|человек|тыс\.?|млн|более|%)?\s+([^\s.,;:!?()«»"]+(?:\s+[^\s.,;:!?()«»"]+){0,3})/giu;

// Alohida (inert) hujjat: ichidagi <img> lar yuklanmaydi, skriptlar ishlamaydi
let inertDoc = null;
const inertDiv = (html) => {
  inertDoc ||= document.implementation.createHTMLDocument("");
  const div = inertDoc.createElement("div");
  div.innerHTML = html;
  return div;
};

const textOf = (html) => (inertDiv(html).textContent || "").replace(/\s+/g, " ").trim();

// Xatboshi ichidagi <br> bilan ajratilgan "- ..." qatorlarini alohida qatorlarga bo'lish
const splitBrLines = (html) => html.split(/<br\s*\/?>/i).map((s) => s.trim()).filter(Boolean);

// "<strong>Sarlavha</strong> — matn" yoki "Sarlavha: matn" -> { title, body }
function splitLead(html) {
  const strong = html.match(/^\s*<(strong|b)>([\s\S]{2,120}?)<\/\1>\s*[:\-–—.]?\s*([\s\S]*)$/i);
  if (strong && textOf(strong[3]).length > 0) return { title: textOf(strong[2]).replace(/[:\-–—]\s*$/, ""), body: strong[3] };
  const plain = textOf(html);
  const colon = plain.match(/^([^:]{3,70}):\s+(.{10,})$/);
  if (colon) return { title: colon[1], body: colon[2] };
  return { title: null, body: html };
}

function extractStats(text) {
  const stats = [];
  for (const m of text.matchAll(STAT_RE)) {
    const raw = m[1].replace(/\s/g, "");
    const num = Number(raw.replace(",", "."));
    if (!Number.isFinite(num)) continue;
    // Yillar, sanalar va hujjat raqamlari ko'rsatkich emas
    if (!m[2] && num >= 1900 && num <= 2100) continue;
    if (/^(yil|йил|год|года|y\.|г\.|-?son|№|yanvar|fevral|mart|aprel|may|iyun|iyul|avgust|sentabr|oktabr|noyabr|dekabr)/i.test(m[3])) continue;
    if (num === 0) continue;
    const unit = (m[2] || "").replace(/\s+/g, " ").trim();
    // Birliksiz kichik raqamlar ("3 bosqich", "2 marta") ko'pincha ko'rsatkich emas
    if (!unit && num < 10) continue;
    const value = unit === "%" || unit === "foiz" ? `${raw}%` : /ortiq|ziyod|более|\+/.test(unit) ? `${raw}+` : raw;
    const label = `${["ta", "nafar", "ming", "mln", "million", "mlrd", "тыс.", "тыс", "млн", "человек"].includes(unit) ? `${unit} ` : ""}${m[3]}`;
    stats.push({ value, label: label.slice(0, 48) });
  }
  // Takrorlarni olib tashlash, eng ko'pi 4 ta
  const seen = new Set();
  return stats.filter((s) => !seen.has(s.value + s.label) && seen.add(s.value + s.label)).slice(0, 4);
}

// HTML -> bloklar
function parseBlocks(html) {
  const root = inertDiv(html);
  const nodes = [];

  // div/section o'ramlarini ochib, yuqori darajadagi elementlarni yig'ish
  const collect = (el) => {
    el.childNodes.forEach((n) => {
      if (n.nodeType === 3) {
        if (n.textContent.trim()) nodes.push({ tag: "p", html: n.textContent.trim() });
        return;
      }
      if (n.nodeType !== 1) return;
      const tag = n.tagName.toLowerCase();
      if (["div", "section", "article", "main", "span", "font"].includes(tag) && n.querySelector("p,ul,ol,h1,h2,h3,h4,h5,h6,table,div")) {
        collect(n);
      } else {
        nodes.push({ tag: tag === "span" || tag === "div" || tag === "font" ? "p" : tag, html: n.innerHTML.trim(), el: n });
      }
    });
  };
  collect(root);

  const blocks = [];
  const push = (b) => blocks.push(b);
  const last = () => blocks[blocks.length - 1];

  for (const node of nodes) {
    const { tag } = node;
    if (/^h[1-6]$/.test(tag)) {
      const text = textOf(node.html);
      if (!text) continue;
      // Backend ko'pincha butun xatboshini <h2>/<h4> ichida yuboradi. Uzun yoki <br> li "sarlavha"
      // aslida oddiy matn — uni qalin sarlavha emas, odatiy xatboshi sifatida ko'rsatamiz.
      if (text.length > MAX_HEADING_LENGTH || /<br\s*\/?>/i.test(node.html)) {
        if (last()?.type === "text") last().paras.push(node.html);
        else push({ type: "text", paras: [node.html], noLead: true });
        continue;
      }
      push({ type: "heading", text });
      continue;
    }
    if (tag === "ul" || tag === "ol") {
      const items = [...node.el.children].filter((li) => li.tagName === "LI").map((li) => li.innerHTML.trim()).filter((h) => textOf(h));
      if (items.length) push({ type: tag === "ol" ? "steps" : "cards", items });
      continue;
    }
    if (tag === "table") {
      push({ type: "table", html: node.el.outerHTML });
      continue;
    }
    if (tag === "img" || tag === "figure" || tag === "iframe" || tag === "blockquote" || tag === "hr") {
      push({ type: "raw", html: node.el.outerHTML });
      continue;
    }
    if (tag !== "p" && tag !== "li") {
      push({ type: "raw", html: node.el?.outerHTML || node.html });
      continue;
    }

    // Xatbosh: <br> bilan bo'lingan qatorlarni alohida ko'rib chiqamiz
    const lines = splitBrLines(node.html);
    for (const line of lines) {
      const text = textOf(line);
      if (!text || text === " ") continue;

      // Faqat qalin matnli qisqa qator — sarlavha
      const onlyBold = /^\s*<(strong|b)>[\s\S]*<\/\1>\s*$/i.test(line) && text.length <= 120;
      if (onlyBold || (text.length <= 80 && /:\s*$/.test(text) && !BULLET_LEAD.test(text))) {
        push({ type: "heading", text: text.replace(/:\s*$/, "") });
        continue;
      }

      // "-", "•", "1)" bilan boshlangan qatorlar — ro'yxat
      if (BULLET_LEAD.test(text)) {
        const type = NUMBERED_LEAD.test(text) ? "steps" : "cards";
        const item = line.replace(/^(\s*(?:<[^>]+>\s*)*)(?:[-–—•●▪➢✓✔*]|\d{1,2}[.)])\s+/, "$1");
        if (last()?.type === type && last().fromText) last().items.push(item);
        else push({ type, items: [item], fromText: true });
        continue;
      }

      // Yil bilan boshlangan xatboshilar — vaqt chizig'i
      const year = text.match(YEAR_LEAD);
      if (year && text.length > year[0].length + 15) {
        const label = year[2] ? `${year[1]}–${year[2]}` : year[1];
        const body = text.slice(year[0].length).replace(/^[\s,:\-–—]+/, "");
        const item = { year: label, body: body.charAt(0).toUpperCase() + body.slice(1) };
        if (last()?.type === "timeline") last().items.push(item);
        else push({ type: "timeline", items: [item] });
        continue;
      }

      if (last()?.type === "text") last().paras.push(line);
      else push({ type: "text", paras: [line] });
    }
  }

  // Bitta elementli yil bloki timeline emas — oddiy matnga qaytaramiz
  return blocks.map((b) =>
    b.type === "timeline" && b.items.length < 2
      ? { type: "text", paras: b.items.map((i) => `<strong>${i.year}</strong> — ${i.body}`) }
      : b
  );
}

// @tailwindcss/typography o'rnatilmagan, shuning uchun matn stillari qo'lda beriladi
const proseClass =
  "text-sm sm:text-base leading-relaxed text-base-content text-justify [&_p]:mb-3 [&_p:last-child]:mb-0 [&_a]:text-blue-700 [&_a]:underline [&_strong]:font-semibold [&_strong]:text-base-content [&_b]:font-semibold [&_em]:italic [&_img]:max-w-full [&_img]:h-auto [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-xl [&_blockquote]:border-l-4 [&_blockquote]:border-info [&_blockquote]:pl-4 [&_blockquote]:italic";

function Html({ html, className = "" }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function StatsStrip({ stats, title }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#002d6d] via-[#194882] to-info p-4 sm:p-5 text-white shadow-lg">
      <p className="text-[11px] font-bold uppercase tracking-widest text-white/70 mb-3">{title}</p>
      <div className={`grid gap-3 grid-cols-2 ${stats.length > 2 ? "@2xl:grid-cols-4" : ""}`}>
        {stats.map((s, i) => (
          <div key={i} className="rounded-xl bg-white/10 border border-white/15 px-3 py-3">
            <p className="text-2xl sm:text-3xl font-black leading-none">{s.value}</p>
            <p className="text-xs sm:text-sm text-white/80 mt-1.5 leading-snug first-letter:uppercase">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({ text, index }) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <span className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#194882] to-info text-white shadow-md shrink-0">
        <KeywordIcon text={text} fallback={FaFileAlt} size={18} />
      </span>
      <div className="flex-1 min-w-0">
        <span className="block text-[11px] font-bold tracking-widest text-info">{String(index).padStart(2, "0")}</span>
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0d3a7a] leading-snug">{text}</h3>
      </div>
    </div>
  );
}

function Cards({ items }) {
  const short = items.every((h) => textOf(h).length < 90);
  return (
    <div className={`grid gap-3 ${short ? "@lg:grid-cols-2 @4xl:grid-cols-3" : "@2xl:grid-cols-2"}`}>
      {items.map((html, i) => {
        const { title, body } = splitLead(html);
        const text = textOf(html);
        const accent = ACCENTS[i % ACCENTS.length];
        return (
          <div
            key={i}
            className={`group flex gap-3 rounded-2xl border ${accent.ring} bg-gradient-to-br ${accent.tint} to-white p-3.5 sm:p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg`}
          >
            <span className={`grid place-items-center w-10 h-10 rounded-xl shrink-0 shadow-sm ${accent.icon} transition-transform group-hover:scale-110`}>
              <KeywordIcon text={text} size={16} />
            </span>
            <div className="min-w-0 flex-1 text-sm sm:text-[15px] leading-relaxed text-base-content">
              {title && <p className="font-bold text-base-content mb-0.5">{title}</p>}
              <Html html={body.replace(/[;,]\s*$/, "")} className="first-letter:uppercase [&_a]:text-blue-700 [&_a]:underline" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Steps({ items, stepLabel }) {
  return (
    <ol className="relative space-y-3">
      {items.map((html, i) => {
        const { title, body } = splitLead(html);
        return (
          <li key={i} className="relative flex gap-4">
            {i < items.length - 1 && <span className="absolute left-5 top-11 bottom-[-0.75rem] w-0.5 bg-gradient-to-b from-info/60 to-info/10" />}
            <span className="relative z-10 grid place-items-center w-10 h-10 rounded-full bg-white border-2 border-info text-[#0d3a7a] font-black shrink-0 shadow-sm">
              {i + 1}
            </span>
            <div className="flex-1 rounded-2xl bg-base-100 border border-base-300 p-3.5 sm:p-4 shadow-sm text-sm sm:text-[15px] leading-relaxed text-base-content">
              <p className="text-[10px] font-bold uppercase tracking-widest text-info mb-0.5">
                {stepLabel} {i + 1}
              </p>
              {title && <p className="font-bold text-base-content mb-0.5">{title}</p>}
              <Html html={body} className="[&_a]:text-blue-700 [&_a]:underline" />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Timeline({ items }) {
  return (
    <div className="relative pl-6 @2xl:pl-0">
      <span className="absolute left-2 @2xl:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#194882] via-info to-sky-200 @2xl:-translate-x-1/2" />
      <div className="space-y-5">
        {items.map((item, i) => {
          const right = i % 2 === 1;
          return (
            <div key={i} className="relative @2xl:grid @2xl:grid-cols-2 @2xl:gap-10">
              <span className="absolute -left-[1.3rem] @2xl:left-1/2 top-3 w-4 h-4 rounded-full bg-white border-4 border-info @2xl:-translate-x-1/2 z-10" />
              <div className={`${right ? "@2xl:col-start-2" : "@2xl:text-right"}`}>
                <div className="inline-block rounded-2xl bg-base-100 border border-base-300 shadow-sm p-4 text-left max-w-full">
                  <span className="inline-block rounded-full bg-gradient-to-r from-[#194882] to-info text-white text-sm font-black px-3 py-0.5 mb-2">
                    {item.year}
                  </span>
                  <p className="text-sm @2xl:text-[15px] leading-relaxed text-base-content">{item.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InfographicContent({ html, showStats = true, className = "" }) {
  const { t } = useTranslation();

  const { blocks, stats } = useMemo(() => {
    const clean = DOMPurify.sanitize(html || "");
    let headingIndex = 0;
    let leadUsed = false;
    const parsed = parseBlocks(clean).map((b, i) => {
      if (b.type === "heading") return { ...b, index: ++headingIndex };
      if (b.type === "text" && !b.noLead && !leadUsed && i <= 1) {
        leadUsed = true;
        return { ...b, lead: true };
      }
      return b;
    });
    return { blocks: parsed, stats: showStats ? extractStats(textOf(clean)) : [] };
  }, [html, showStats]);

  if (!blocks.length) return null;

  return (
    <div className={`@container space-y-5 sm:space-y-6 ${className}`}>
      {stats.length >= 2 && <StatsStrip stats={stats} title={t("info.keyFacts")} />}

      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return <SectionHeading key={i} text={block.text} index={block.index} />;
          case "cards":
            return <Cards key={i} items={block.items} />;
          case "steps":
            return <Steps key={i} items={block.items} stepLabel={t("info.step")} />;
          case "timeline":
            return <Timeline key={i} items={block.items} />;
          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-2xl border border-base-300 shadow-sm">
                <Html
                  html={block.html}
                  className="[&_table]:w-full [&_table]:text-sm [&_td]:p-3 [&_th]:p-3 [&_th]:bg-[#194882] [&_th]:text-white [&_th]:text-left [&_tr:nth-child(even)]:bg-base-200 [&_td]:border-t [&_td]:border-base-300"
                />
              </div>
            );
          case "text": {
            const isLead = block.lead;
            const [first, ...others] = block.paras;
            return (
              <div key={i} className="space-y-3">
                {isLead ? (
                  <div className="relative rounded-2xl bg-gradient-to-r from-blue-50 to-transparent border-l-4 border-info pl-4 sm:pl-5 pr-3 py-3 sm:py-4">
                    <Html html={first} className={`${proseClass} sm:text-lg text-base-content`} />
                  </div>
                ) : (
                  <Html html={`<p>${first}</p>`} className={proseClass} />
                )}
                {others.map((p, j) => (
                  <Html key={j} html={`<p>${p}</p>`} className={proseClass} />
                ))}
              </div>
            );
          }
          default:
            return <Html key={i} html={block.html} className={`${proseClass} [&_img]:rounded-xl`} />;
        }
      })}
    </div>
  );
}

export default InfographicContent;
