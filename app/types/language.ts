export type Language = 'en' | 'hi';

export interface LanguageTexts {
  // Header
  title: string;
  subtitle: string;
  stats: {
    lightning: string;
    smart: string;
    premium: string;
  };
  
  // Form
  formTitle: string;
  formSubtitle: string;
  titleLabel: string;
  titlePlaceholder: string;
  timeLabel: string;
  repeatLabel: string;
  repeatOptions: {
    today: string;
    everyday: string;
  };
  submitButton: string;
  creating: string;
  
  // Features
  features: {
    instant: string;
    instantDesc: string;
    smart: string;
    smartDesc: string;
    premium: string;
    premiumDesc: string;
  };
  
  // Reminder List
  remindersTitle: string;
  remindersSubtitle: string;
  cleanupButton: string;
  pastDue: string;
  allReminders: string;
  noReminders: string;
  noRemindersDesc: string;
  pastDueLabel: string;
  
  // Footer
  footer: string;
  
  // Loading
  loading: string;
  loadingDesc: string;
}
