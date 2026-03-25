import React, { useState } from 'react';
import { useCalendar } from '../context/CalendarContext';
import { useNavigate } from 'react-router-dom';

function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { openCalendar } = useCalendar();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCalendarClick = () => {
    openCalendar();
    setIsOpen(false); // Close speed dial when option is selected
  };

  return (
    <>
      {/* Backdrop when open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 animate-fadeIn"
          onClick={toggleMenu}
        ></div>
      )}

      {/* FAB Container */}
      <div className="fixed bottom-[48px] right-6 z-50 flex flex-col items-end gap-2.5">
        {/* Speed Dial Options */}
        {isOpen && (
          <div className="flex flex-col items-end gap-2.5 animate-slideUp">
            {/* Calendar Button */}
            <button
              onClick={handleCalendarClick}
              className="group flex items-center gap-3 transition-all duration-200 hover:scale-105"
              title="Voqealar kalendari"
            >
              {/* Label */}
              <span className="bg-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Voqealar kalendari
              </span>
              
              {/* Icon Button */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
              </div>
            </button>

            {/* Messages Button */}
            {/* <button
              className="group flex items-center gap-3 transition-all duration-200 hover:scale-105"
              title="Xabarlar"
            >
              <span className="bg-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Xabarlar
              </span>
              
              <div className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-200">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
                  />
                </svg>
              </div>
            </button> */}

            {/* Notifications Button */}
            <button
              onClick={() => {/* TODO: Add functionality */}}
              className="group flex items-center gap-3 transition-all duration-200 hover:scale-105"
              title="Bildirishnomalar"
            >
              <span className="bg-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Bildirishnomalar
              </span>
              
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 relative">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                  />
                </svg>
                {/* Notification Badge */}
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold">3</span>
              </div>
            </button>

            {/* Help/Support Button */}
            <button
              onClick={()=>navigate('/contact')}
              className="group flex items-center gap-3 transition-all duration-200 hover:scale-105"
              title="Yordam"
            >
              <span className="bg-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Yordam
              </span>
              
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-200">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
            </button>
          </div>
        )}

        {/* Main FAB Button */}
        <button
          onClick={toggleMenu}
          className={`bg-gradient-to-br from-[#194882] to-info hover:from-[#15396b] hover:to-blue-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${
            isOpen ? 'rotate-45' : 'rotate-0'
          }`}
          title={isOpen ? 'Yopish' : 'Ochish'}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4v16m8-8H4" 
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default FloatingActionButton;
