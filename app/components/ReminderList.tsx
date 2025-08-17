'use client';

import { useReminders } from '../hooks/useReminders';
import { Reminder } from '../types/reminder';
import { useLanguage } from '../hooks/useLanguage';
import LoadingSpinner from './LoadingSpinner';

export default function ReminderList() {
  const { texts } = useLanguage();
  const { reminders, isLoading, toggleComplete, deleteReminder, cleanup } = useReminders();

  const handleCleanup = async () => {
    await cleanup();
  };

  const formatTime = (time: string): string => {
    try {
      if (typeof time !== 'string') return 'Invalid time';
      
      const [hours, minutes] = time.split(':');
      if (isNaN(Number(hours)) || isNaN(Number(minutes))) return 'Invalid time';
      
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      return `${displayHour}:${minutes} ${ampm}`;
    } catch (error) {
      return 'Invalid time';
    }
  };

  const hasTimePassed = (time: string): boolean => {
    try {
      if (typeof time !== 'string') return false;
      
      const [hours, minutes] = time.split(':');
      if (isNaN(Number(hours)) || isNaN(Number(minutes))) return false;
      
      const now = new Date();
      const reminderTime = new Date();
      reminderTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      return now > reminderTime;
    } catch (error) {
      return false;
    }
  };

  const isFromPreviousDay = (reminder: Reminder): boolean => {
    if (!reminder.createdAt) return false;
    const today = new Date();
    const createdDate = new Date(reminder.createdAt);
    return createdDate.toDateString() !== today.toDateString();
  };

  const pastDueReminders = reminders.filter(reminder => 
    !reminder.completed && hasTimePassed(reminder.time) && reminder.repeatMode === 'today'
  );

  const activeReminders = reminders.filter(reminder => 
    !reminder.completed && (!hasTimePassed(reminder.time) || reminder.repeatMode === 'everyday')
  );

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <LoadingSpinner />
        <p className="text-gray-400 mt-4">{texts.loading}</p>
        <p className="text-gray-500 text-sm">{texts.loadingDesc}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Premium Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
          {texts.remindersTitle}
        </h2>
        <p className="text-gray-400 text-lg">
          {texts.remindersSubtitle}
        </p>
      </div>

      {/* Cleanup Button */}
      <div className="flex justify-center">
        <button
          onClick={handleCleanup}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl border border-white/20 p-0.5 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25"
        >
          <div className="relative flex items-center gap-3 px-6 py-3 bg-slate-900/80 rounded-2xl transition-all duration-300 group-hover:bg-slate-800/80">
            <span className="text-green-400">🧹</span>
            <span className="text-white font-semibold">{texts.cleanupButton}</span>
          </div>
          
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </button>
      </div>

      {/* Past Due Section */}
      {pastDueReminders.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-red-400 flex items-center gap-3">
            <span>⏰</span>
            {texts.pastDue}
          </h3>
          <div className="grid gap-4">
            {pastDueReminders.map((reminder) => (
              <ReminderCard
                key={reminder.id}
                reminder={reminder}
                onToggleComplete={toggleComplete}
                onDelete={deleteReminder}
                formatTime={formatTime}
                texts={texts}
                isPastDue={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Reminders Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
          <span>📋</span>
          {texts.allReminders}
        </h3>
        
        {activeReminders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-2xl font-bold text-white mb-2">{texts.noReminders}</h3>
            <p className="text-gray-400">{texts.noRemindersDesc}</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {activeReminders.map((reminder) => (
              <ReminderCard
                key={reminder.id}
                reminder={reminder}
                onToggleComplete={toggleComplete}
                onDelete={deleteReminder}
                formatTime={formatTime}
                texts={texts}
                isPastDue={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface ReminderCardProps {
  reminder: Reminder;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  formatTime: (time: string) => string;
  texts: any;
  isPastDue: boolean;
}

function ReminderCard({ reminder, onToggleComplete, onDelete, formatTime, texts, isPastDue }: ReminderCardProps) {
  const getRepeatModeColor = (mode: string) => {
    return mode === 'everyday' ? 'from-blue-500/20 to-cyan-500/20' : 'from-purple-500/20 to-pink-500/20';
  };

  const getRepeatModeIcon = (mode: string) => {
    return mode === 'everyday' ? '🔄' : '📅';
  };

  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-gradient-to-r ${getRepeatModeColor(reminder.repeatMode)} backdrop-blur-xl border border-white/20 p-0.5 transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
      <div className="relative bg-slate-900/80 rounded-2xl p-6 transition-all duration-300 group-hover:bg-slate-800/80">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">⏰</span>
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${reminder.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                {reminder.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-sm px-2 py-1 rounded-full bg-gradient-to-r ${getRepeatModeColor(reminder.repeatMode)} border border-white/20`}>
                  {getRepeatModeIcon(reminder.repeatMode)} {reminder.repeatMode === 'everyday' ? 'Everyday' : 'Today'}
                </span>
                {isPastDue && (
                  <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                    {texts.pastDueLabel}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleComplete(reminder.id!, !reminder.completed)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                reminder.completed
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-white/10 text-gray-400 border border-white/20 hover:bg-green-500/20 hover:text-green-400 hover:border-green-500/30'
              }`}
            >
              {reminder.completed ? '✓' : '○'}
            </button>
            
            <button
              onClick={() => onDelete(reminder.id!)}
              className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center transition-all duration-300 hover:bg-red-500/30 hover:scale-110"
            >
              🗑️
            </button>
          </div>
        </div>

        {/* Time Display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🕐</span>
            <span className={`text-xl font-mono ${reminder.completed ? 'text-gray-400' : 'text-white'}`}>
              {formatTime(reminder.time)}
            </span>
          </div>
          
          {reminder.completed && (
            <span className="text-green-400 text-sm font-semibold">✓ Completed</span>
          )}
        </div>
      </div>
      
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${getRepeatModeColor(reminder.repeatMode)} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
    </div>
  );
}
