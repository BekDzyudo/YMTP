import { useId } from "react";

// AI yordamchi robotchasi: oq korpus, to'q ko'k yuz-ekran, ko'k ko'zlar.
// Gradient id'lari har bir nusxa uchun alohida bo'lishi kerak (useId).

function useIds() {
  const raw = useId().replace(/:/g, "");
  return {
    shell: `ai-shell-${raw}`,
    visor: `ai-visor-${raw}`,
    cap: `ai-cap-${raw}`,
    glow: `ai-glow-${raw}`,
    book: `ai-book-${raw}`,
  };
}

function Defs({ ids }) {
  return (
    <defs>
      <radialGradient id={ids.shell} cx="35%" cy="25%" r="85%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="60%" stopColor="#eef3fa" />
        <stop offset="100%" stopColor="#c9d6e8" />
      </radialGradient>
      <linearGradient id={ids.visor} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#13306b" />
        <stop offset="100%" stopColor="#081a3d" />
      </linearGradient>
      <linearGradient id={ids.cap} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2a56b3" />
        <stop offset="100%" stopColor="#12306f" />
      </linearGradient>
      <linearGradient id={ids.book} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#21468f" />
        <stop offset="100%" stopColor="#0e2a5e" />
      </linearGradient>
      <filter id={ids.glow} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1.6" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

// Bosh: quloqchinlar, korpus, ekran, ko'zlar va tabassum (koordinatalar 200x200 tizimida)
function Head({ ids }) {
  return (
    <g>
      {/* Quloqchinlar */}
      {[48, 152].map((cx) => (
        <g key={cx}>
          <ellipse cx={cx} cy="92" rx="11" ry="17" fill="#163a80" />
          <ellipse cx={cx} cy="92" rx="6" ry="10" fill="none" stroke="#5ec8ff" strokeWidth="2.5" filter={`url(#${ids.glow})`} />
        </g>
      ))}
      {/* Korpus */}
      <rect x="50" y="50" width="100" height="82" rx="36" fill={`url(#${ids.shell})`} stroke="#c3d0e3" strokeWidth="1" />
      {/* Ekran */}
      <rect x="61" y="66" width="78" height="54" rx="25" fill={`url(#${ids.visor})`} />
      <path d="M70 76 q10 -6 24 -6" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Ko'zlar va tabassum */}
      <g stroke="#5ec8ff" strokeLinecap="round" fill="none" filter={`url(#${ids.glow})`}>
        <path d="M76 96 q8 -11 16 0" strokeWidth="5" className="ai-robot-eye" />
        <path d="M108 96 q8 -11 16 0" strokeWidth="5" className="ai-robot-eye" />
        <path d="M92 105 q8 7 16 0" strokeWidth="4" />
      </g>
    </g>
  );
}

// Faqat bosh (pastki o'ng burchakdagi tugma uchun)
export function RobotHead({ className = "" }) {
  const ids = useIds();
  return (
    <svg viewBox="34 44 132 96" className={className} aria-hidden="true">
      <Defs ids={ids} />
      <Head ids={ids} />
    </svg>
  );
}

// To'liq maskot: bitiruv shapkasi, kitob ushlagan va qo'l silkitayotgan robotcha
export function RobotMascot({ className = "" }) {
  const ids = useIds();
  return (
    <svg viewBox="20 6 170 200" className={className} aria-hidden="true">
      <Defs ids={ids} />

      {/* Bo'yin */}
      <rect x="88" y="128" width="24" height="12" rx="4" fill="#163a80" />

      {/* Silkitayotgan qo'l (orqada) */}
      <path d="M136 152 Q158 146 164 118" stroke="#c9d6e8" strokeWidth="17" strokeLinecap="round" fill="none" />
      <path d="M136 152 Q158 146 164 118" stroke={`url(#${ids.shell})`} strokeWidth="14" strokeLinecap="round" fill="none" />
      <g className="ai-robot-wave">
        <ellipse cx="167" cy="104" rx="11" ry="13" fill={`url(#${ids.shell})`} stroke="#c3d0e3" />
        <path d="M159 96 l-3 -9 M165 92 l0 -10 M171 92 l3 -9 M177 98 l6 -6" stroke="#dfe7f2" strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* Tana */}
      <path
        d="M66 140 q0 -6 8 -6 h52 q8 0 8 6 l7 44 q2 12 -11 12 h-60 q-13 0 -11 -12 z"
        fill={`url(#${ids.shell})`}
        stroke="#c3d0e3"
        strokeWidth="1"
      />
      <path d="M70 182 h60" stroke="#163a80" strokeWidth="6" strokeLinecap="round" />
      {/* Ko'krakdagi kitob belgisi */}
      <g fill="#1d4596">
        <path d="M86 150 q7 -3 13 4 v18 q-6 -6 -13 -4 z" />
        <path d="M114 150 q-7 -3 -13 4 v18 q6 -6 13 -4 z" />
        <path d="M100 146 l4 6 h-8 z" />
      </g>

      {/* Kitob ushlagan qo'l */}
      <path d="M68 146 Q50 154 52 172" stroke="#c9d6e8" strokeWidth="17" strokeLinecap="round" fill="none" />
      <path d="M68 146 Q50 154 52 172" stroke={`url(#${ids.shell})`} strokeWidth="14" strokeLinecap="round" fill="none" />
      <g transform="rotate(-14 50 172)">
        <rect x="30" y="146" width="38" height="50" rx="4" fill={`url(#${ids.book})`} />
        <rect x="64" y="148" width="5" height="46" rx="2" fill="#e8eef7" />
        <g fill="#8fb1e8" opacity="0.9">
          <path d="M41 166 q4 -2 8 2.5 v10 q-4 -3.5 -8 -2.5 z" />
          <path d="M57 166 q-4 -2 -8 2.5 v10 q4 -3.5 8 -2.5 z" />
        </g>
      </g>
      <ellipse cx="60" cy="178" rx="10" ry="9" fill={`url(#${ids.shell})`} stroke="#c3d0e3" />

      <Head ids={ids} />

      {/* Bitiruv shapkasi */}
      <path d="M72 46 v12 q28 12 56 0 v-12 z" fill="#0f2a63" />
      <path d="M100 18 L162 40 L100 62 L38 40 Z" fill={`url(#${ids.cap})`} />
      <path d="M100 18 L162 40 L100 26 L38 40 Z" fill="#ffffff" opacity="0.12" />
      <circle cx="100" cy="40" r="3.5" fill="#0f2a63" />
      {/* Popuk */}
      <path d="M100 40 Q66 40 50 46 L50 66" stroke="#f2b632" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M45 64 h10 l2 18 h-14 z" fill="#f2b632" />
      <path d="M47 68 v13 M50 68 v13 M53 68 v13" stroke="#d48f10" strokeWidth="1" />
      <rect x="44" y="62" width="12" height="4" rx="2" fill="#e09a14" />
    </svg>
  );
}
