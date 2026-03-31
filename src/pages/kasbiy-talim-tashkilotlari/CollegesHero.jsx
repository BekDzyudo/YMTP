import { useState, useEffect, useRef } from "react";
import { useHero } from "../../context/HeroContext";
import { 
  FaMapMarkerAlt, 
  FaBuilding, 
  FaGraduationCap, 
} from "react-icons/fa";

function CollegesHero({ colleges, regions }) {
  const [showHeading, setShowHeading] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const { setOnHero } = useHero();
  const heroRef = useRef(null);

  // Scroll listener for header behavior
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
  
      const heroHeight = heroRef.current.offsetHeight;
      const headerHeight = 80; // Header balandligi
      setOnHero(window.scrollY < (heroHeight - headerHeight));
    };
  
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [setOnHero]);

  // Animated heading and description
  useEffect(() => {
    setShowHeading(false);
    setShowDesc(false);
    const headingTimeout = setTimeout(() => setShowHeading(true), 100);
    const descTimeout = setTimeout(() => setShowDesc(true), 350);
    return () => {
      clearTimeout(headingTimeout);
      clearTimeout(descTimeout);
    };
  }, []);

  // Animated numbers for statistics cards
  const cardTargets = [
    colleges.length,
    colleges.reduce((sum, c) => sum + c.students, 0),
    regions.length
  ];
  const [cardNumbers, setCardNumbers] = useState(cardTargets.map(() => 0));
  
  useEffect(() => {
    let frame = 0;
    const duration = 1500; // ms
    const steps = 60;
    const interval = duration / steps;
    function animate() {
      frame++;
      setCardNumbers(
        cardTargets.map((target) =>
          Math.round(target * Math.min(frame / steps, 1)),
        ),
      );
      if (frame < steps) setTimeout(animate, interval);
    }
    animate();
  }, []);

  return (
    <section ref={heroRef} className="relative w-full h-[65vh] md:h-[75vh] flex items-center px-5">
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/College.jpg"
          alt="Kasbiy ta'lim texnikumlari"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{
          background: "rgba(0,0,0,0.65)",
        }}
      ></div>
      <div className="flex flex-col w-full justify-center">
        <div className="w-full flex flex-col items-center z-20">
          <div className="w-4/5 mt-10">
            <h2
              className="text-4xl text-center sm:text-5xl md:text-6xl mb-5 lg:mb-10 font-bold text-white lg:leading-17 font-serif"
              style={{
                textShadow: "0 2px 8px rgba(0,0,0,0.7), 0 1px 0 #000",
                opacity: showHeading ? 1 : 0,
                transform: showHeading ? "translateY(0)" : "translateY(32px)",
                transition: "opacity 0.5s, transform 0.5s",
              }}
            >
              Kasbiy ta'lim tashkilotlari
            </h2>
            <p
              className="text-xs sm:text-sm md:text-[16px] lg:text-xl text-center w-full sm:max-w-[80%] mx-auto italic text-gray-200 font-medium"
              style={{
                textShadow: "0 2px 8px rgba(0,0,0,0.7), 0 1px 0 #000",
                opacity: showDesc ? 1 : 0,
                transform: showDesc ? "translateY(0)" : "translateY(32px)",
                transition: "opacity 0.5s, transform 0.5s",
              }}
            >
              O'zbekiston Respublikasi kasbiy ta'lim tashkilotlari haqida ma'lumotlar, statistikalar va yangiliklar bilan tanishing.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 mt-8 sm:mt-10 z-20 max-w-5xl mx-auto w-full sm:px-4">
            {[
              {
                icon: <FaBuilding size={22} />,
                desc: "Jami texnikumlar",
                gradient: "from-blue-600 to-cyan-600",
                glowColor: "rgba(37, 99, 235, 0.35)"
              },
              {
                icon: <FaGraduationCap size={22} />,
                desc: "Jami o'quvchilar",
                gradient: "from-green-600 to-emerald-600",
                glowColor: "rgba(21, 128, 61, 0.35)"
              },
              {
                icon: <FaMapMarkerAlt size={22} />,
                desc: "Hududlar soni",
                gradient: "from-purple-600 to-pink-600",
                glowColor: "rgba(147, 51, 234, 0.35)"
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="group relative"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${0.15 * idx}s both`
                }}
              >
                {/* Glow effect */}
                <div 
                  className={`absolute -inset-1 bg-linear-to-r ${card.gradient} rounded-3xl blur-md opacity-10 group-hover:opacity-25 transition duration-500`}
                />
                
                {/* Card */}
                <div className="relative backdrop-blur-md bg-black/60 hover:bg-black/70 rounded-3xl p-4 sm:p-6 flex flex-col items-center gap-3 border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 hover:scale-105 min-h-40 justify-center shadow-2xl">
                  
                  {/* Icon circle */}
                  <div className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br ${card.gradient} flex items-center justify-center shadow-xl transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                    <div className="absolute inset-0 rounded-full bg-linear-to-t from-black/20 to-transparent" />
                    <div className="text-white drop-shadow-2xl relative z-10">
                      {card.icon}
                    </div>
                  </div>

                  {/* Number */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-2xl sm:text-3xl lg:text-4xl font-black bg-linear-to-r ${card.gradient} bg-clip-text text-transparent drop-shadow-[0_2px_10px_${card.glowColor}]`}>
                        {idx === 1 ? cardNumbers[idx].toLocaleString() : cardNumbers[idx]}
                      </span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-16 h-1 rounded-full bg-gray-800/80 overflow-hidden mt-1">
                      <div 
                        className={`h-full bg-linear-to-r ${card.gradient} transition-all duration-1000 shadow-[0_0_6px_currentColor]`}
                        style={{
                          width: `${(cardNumbers[idx] / cardTargets[idx]) * 100}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-center text-gray-200 font-semibold leading-tight px-2 min-h-6 flex items-center">
                    {card.desc}
                  </p>

                  {/* Top shine effect */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-500/40 to-transparent" />
                  
                  {/* Bottom shine effect */}
                  <div className={`absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-500/20 to-transparent`} />
                </div>
              </div>
            ))}
          </div>

          <style>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-primary/5 via-transparent to-transparent" />
    </section>
  );
}

export default CollegesHero;
