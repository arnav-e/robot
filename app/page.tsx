'use client';

import ReminderForm from './components/ReminderForm';
import ReminderList from './components/ReminderList';
import ErrorBoundary from './components/ErrorBoundary';
import LanguageSwitcher from './components/LanguageSwitcher';
import { LanguageProvider, useLanguage } from './hooks/useLanguage';

function HomeContent() {
  const { texts } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Language Switcher */}
      <LanguageSwitcher />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Premium Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl backdrop-blur-xl border border-white/10 mb-8">
            <h1 className="text-7xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6 leading-tight">
              {texts.title}
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {texts.subtitle}
          </p>
          
          {/* Premium Stats */}
          <div className="flex justify-center items-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">⚡</div>
              <div className="text-sm text-gray-400">{texts.stats.lightning}</div>
            </div>
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">🎯</div>
              <div className="text-sm text-gray-400">{texts.stats.smart}</div>
            </div>
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">✨</div>
              <div className="text-sm text-gray-400">{texts.stats.premium}</div>
            </div>
          </div>
        </div>

        {/* Main Content with Glassmorphism */}
        <div className="max-w-6xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl p-8 mb-8">
            <ReminderForm />
          </div>
          
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl p-8">
            <ReminderList />
          </div>
        </div>

        {/* Premium Footer */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full backdrop-blur-xl border border-white/10">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-gray-300 text-sm">{texts.footer}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <ErrorBoundary>
        <HomeContent />
      </ErrorBoundary>
    </LanguageProvider>
  );
}
