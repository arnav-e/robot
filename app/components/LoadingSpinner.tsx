'use client';

import { useLanguage } from '../hooks/useLanguage';

export default function LoadingSpinner() {
  const { texts } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Multi-ring Loading Animation */}
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
        
        {/* Middle Ring */}
        <div className="absolute inset-2 w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        
        {/* Inner Ring */}
        <div className="absolute inset-4 w-8 h-8 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
        
        {/* Center Dot */}
        <div className="absolute inset-6 w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
      </div>
      
      {/* Loading Text */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-2">
          {texts.loading}
        </h3>
        <p className="text-gray-400 text-sm">
          {texts.loadingDesc}
        </p>
      </div>
      
      {/* Floating Dots */}
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
}
