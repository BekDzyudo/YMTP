import React, { useState, useEffect, useRef } from 'react'

function PrezidentialSpeech() {
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const sectionRef = useRef(null);
  const fullText = `"O'g'il-qizlarimizni mehnat bozorida talab yuqori bo'lgan zamonaviy kasb-hunarlarga o'rgatishga ustuvor ahamiyat qaratamiz."`;

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
  }, [isVisible]);

  return (
    <div ref={sectionRef} className='relative w-full py-10 sm:py-14 overflow-hidden mt-10 sm:mt-20'>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/prezident-bg.jpg')",
        }}
      ></div>
      
      {/* Transparent Blue Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-[#002d6d]/90 via-[#003d7d]/85 to-[#002d6d]/90"></div>
      
     <div className='relative px-3.5 sm:px-5 mx-auto w-full 2xl:w-11/12 flex items-center justify-between gap-12 flex-col lg:flex-row'>
       <div className='flex flex-col gap-10 text-white w-2/3'>
        <h1 
          className='text-4xl font-bold text-start font-serif mb-4 text-white leading-14 min-h-[120px]'
          style={{
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.2)'
          }}
        >
          {displayedText}
          {!isTypingComplete && <span className='animate-pulse'>|</span>}
        </h1>
        <div 
          className={`flex items-center gap-5 transition-all duration-1000 ${
            isTypingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <img src="/gerb.png" alt="gerb" className='w-28 h-28'/>
          <div className='flex flex-col gap-5'>
            <h2 className='text-2xl font-bold text-white'>Shavkat Mirziyoyev</h2>
            <p className='text-2xl text-white'>O'zbekiston Respublikasi Prezidenti</p>
          </div>
        </div>
      </div>
      <div 
        className={`relative z-10 w-1/3 transition-all duration-2000 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
        }`}
      >
        <img src="/president.jpg" alt="President" className='rounded-3xl shadow-2xl' />
      </div>
     </div>
    </div>
  )
}

export default PrezidentialSpeech