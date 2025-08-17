'use client';

import { useState } from 'react';
import { useReminders } from '../hooks/useReminders';
import { ReminderFormData } from '../types/reminder';
import { useLanguage } from '../hooks/useLanguage';

export default function ReminderForm() {
  const { texts } = useLanguage();
  const { addReminder, isLoading } = useReminders();
  const [formData, setFormData] = useState<ReminderFormData>({
    title: '',
    time: '',
    repeatMode: 'today'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.time) return;

    await addReminder(formData);
    setFormData({
      title: '',
      time: '',
      repeatMode: 'today'
    });
  };

  return (
    <div className="space-y-8">
      {/* Premium Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
          {texts.formTitle}
        </h2>
        <p className="text-gray-400 text-lg">
          {texts.formSubtitle}
        </p>
      </div>

      {/* Premium Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div className="space-y-3">
          <label className="block text-white font-semibold text-lg">
            {texts.titleLabel}
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder={texts.titlePlaceholder}
            className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 hover:bg-white/15 focus:scale-[1.02]"
            required
          />
        </div>

        {/* Time Input */}
        <div className="space-y-3">
          <label className="block text-white font-semibold text-lg">
            {texts.timeLabel}
          </label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 hover:bg-white/15 focus:scale-[1.02]"
            required
          />
        </div>

        {/* Repeat Mode */}
        <div className="space-y-3">
          <label className="block text-white font-semibold text-lg">
            {texts.repeatLabel}
          </label>
          <select
            name="repeatMode"
            value={formData.repeatMode}
            onChange={handleChange}
            className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 hover:bg-white/15 focus:scale-[1.02]"
          >
            <option value="today">{texts.repeatOptions.today}</option>
            <option value="everyday">{texts.repeatOptions.everyday}</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 p-0.5 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="relative flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 rounded-2xl transition-all duration-300 group-hover:bg-slate-800">
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="text-white font-semibold text-lg">
                  {texts.creating}
                </span>
              </>
            ) : (
              <>
                <span className="text-white font-semibold text-lg">
                  {texts.submitButton}
                </span>
                <svg className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </div>
          
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </button>
      </form>

      {/* Premium Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="text-white font-semibold mb-2">{texts.features.instant}</h3>
          <p className="text-gray-400 text-sm">{texts.features.instantDesc}</p>
        </div>
        
        <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
          <div className="text-3xl mb-3">🎯</div>
          <h3 className="text-white font-semibold mb-2">{texts.features.smart}</h3>
          <p className="text-gray-400 text-sm">{texts.features.smartDesc}</p>
        </div>
        
        <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
          <div className="text-3xl mb-3">✨</div>
          <h3 className="text-white font-semibold mb-2">{texts.features.premium}</h3>
          <p className="text-gray-400 text-sm">{texts.features.premiumDesc}</p>
        </div>
      </div>
    </div>
  );
}
