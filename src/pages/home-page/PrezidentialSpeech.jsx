import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next';

function PrezidentialSpeech() {
  const { t } = useTranslation();
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const sectionRef = useRef(null);
  const fullText = `"${t('presidential.quote')}"`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      let index = 0;
      const typingSpeed = 3000 / fullText.length; // 3 sekund / harf soni
      
      const interval = setInterval(() => {
        if (index <= fullText.length) {
          setDisplayedText(fullText.slice(0, index));
          index++;
        } else {
          setIsTypingComplete(true);
          clearInterval(interval);
        }
      }, typingSpeed);

      return () => clearInterval(interval);
    }
  }, [isVisible, fullText]);

  return (
    <div ref={sectionRef} className='relative w-full py-8 sm:py-10 md:py-12 lg:py-14 overflow-hidden mt-4 sm:mt-6 md:mt-8 lg:mt-10'>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/prezident-bg.jpg')",
        }}
      ></div>
      
      {/* Transparent Blue Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-[#002d6d]/90 via-[#003d7d]/85 to-[#002d6d]/90"></div>
      
     <div className='relative px-3.5 sm:px-5 mx-auto w-full 2xl:w-11/12 flex items-center justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-12 flex-col lg:flex-row'>
       <div className='flex flex-col gap-6 sm:gap-8 md:gap-10 text-white w-full lg:w-2/3'>
        <h1 
          className='text-center md:text-start text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-serif mb-2 sm:mb-4 text-white leading-relaxed sm:leading-14 min-h-20 sm:min-h-25 md:min-h-30'
          style={{
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.2)'
          }}
        >
          {displayedText}
          {!isTypingComplete && <span className='animate-pulse'>|</span>}
        </h1>
        <div 
          className={`flex items-center gap-3 sm:gap-4 md:gap-5 transition-all duration-1000 ${
            isTypingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <img src="/gerb.png" alt="gerb" className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 shrink-0'/>
          <div className='flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5'>
            <h2 className='text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white'>{t('presidential.fullName')}</h2>
            <p className='text-sm sm:text-base md:text-lg lg:text-2xl text-white'>{t('presidential.president')}</p>
          </div>
        </div>
      </div>
      <div 
        className={`relative z-10 w-full lg:w-1/3 transition-all duration-2000 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
        }`}
      >
        <img src="/president.jpg" alt="President" className='rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm lg:max-w-none mx-auto' />
      </div>
     </div>
    </div>
  )
}

export default PrezidentialSpeech