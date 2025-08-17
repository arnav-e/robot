'use client';

import { useLanguage } from '../hooks/useLanguage';

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={toggleLanguage}
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-white/20 p-0.5 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
        title={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
      >
        <div className="relative flex items-center gap-3 px-4 py-3 bg-slate-900/80 rounded-2xl transition-all duration-300 group-hover:bg-slate-800/80">
          {/* Language Icon */}
          <div className="w-6 h-6 flex items-center justify-center">
            {language === 'en' ? (
              <span className="text-lg">🇮🇳</span>
            ) : (
              <span className="text-lg">🇺🇸</span>
            )}
          </div>
          
          {/* Language Text */}
          <span className="text-white font-semibold text-sm">
            {language === 'en' ? 'हिंदी' : 'English'}
          </span>
          
          {/* Arrow Icon */}
          <svg 
            className="w-4 h-4 text-gray-400 transform group-hover:rotate-180 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      </button>
    </div>
  );
}

