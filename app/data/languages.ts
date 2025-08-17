import { LanguageTexts } from '../types/language';

export const languages: Record<string, LanguageTexts> = {
  en: {
    // Header
    title: 'AI Reminders',
    subtitle: 'Experience the future of productivity with our intelligent reminder system. Powered by cutting-edge AI and beautiful design.',
    stats: {
      lightning: 'Lightning Fast',
      smart: 'Smart AI',
      premium: 'Premium UX'
    },
    
    // Form
    formTitle: 'Create New Reminder',
    formSubtitle: 'Transform your productivity with intelligent reminders',
    titleLabel: 'What do you want to be reminded about?',
    titlePlaceholder: 'e.g., Take medicine, Call mom, Exercise',
    timeLabel: 'What time?',
    repeatLabel: 'Repeat',
    repeatOptions: {
      today: '📅 Just today',
      everyday: '🔄 Every day'
    },
    submitButton: 'Create Reminder',
    creating: 'Creating...',
    
    // Features
    features: {
      instant: 'Instant Sync',
      instantDesc: 'Real-time updates across all devices',
      smart: 'Smart AI',
      smartDesc: 'Intelligent reminder management',
      premium: 'Premium Design',
      premiumDesc: 'Beautiful, modern interface'
    },
    
    // Reminder List
    remindersTitle: 'Your Reminders',
    remindersSubtitle: 'Manage your intelligent reminders with ease',
    cleanupButton: 'Cleanup',
    pastDue: 'Past Due',
    allReminders: 'All Reminders',
    noReminders: 'No reminders yet',
    noRemindersDesc: 'Create your first reminder to experience the future of productivity',
    pastDueLabel: 'Past due',
    
    // Footer
    footer: 'Built with Next.js, Firebase & Tailwind CSS',
    
    // Loading
    loading: 'Loading Reminders',
    loadingDesc: 'Preparing your intelligent reminder system...'
  },
  
  hi: {
    // Header
    title: 'AI रिमाइंडर्स',
    subtitle: 'हमारी बुद्धिमान रिमाइंडर प्रणाली के साथ उत्पादकता के भविष्य का अनुभव करें। कटिंग-एज AI और सुंदर डिज़ाइन द्वारा संचालित।',
    stats: {
      lightning: 'बिजली की तेजी',
      smart: 'स्मार्ट AI',
      premium: 'प्रीमियम UX'
    },
    
    // Form
    formTitle: 'नया रिमाइंडर बनाएं',
    formSubtitle: 'बुद्धिमान रिमाइंडर्स के साथ अपनी उत्पादकता को बदलें',
    titleLabel: 'आप किस बारे में याद दिलाना चाहते हैं?',
    titlePlaceholder: 'जैसे, दवा लें, माँ को फोन करें, व्यायाम करें',
    timeLabel: 'किस समय?',
    repeatLabel: 'दोहराएं',
    repeatOptions: {
      today: '📅 सिर्फ आज',
      everyday: '🔄 हर दिन'
    },
    submitButton: 'रिमाइंडर बनाएं',
    creating: 'बना रहे हैं...',
    
    // Features
    features: {
      instant: 'तुरंत सिंक',
      instantDesc: 'सभी उपकरणों पर रीयल-टाइम अपडेट',
      smart: 'स्मार्ट AI',
      smartDesc: 'बुद्धिमान रिमाइंडर प्रबंधन',
      premium: 'प्रीमियम डिज़ाइन',
      premiumDesc: 'सुंदर, आधुनिक इंटरफेस'
    },
    
    // Reminder List
    remindersTitle: 'आपके रिमाइंडर्स',
    remindersSubtitle: 'अपने बुद्धिमान रिमाइंडर्स को आसानी से प्रबंधित करें',
    cleanupButton: 'सफाई',
    pastDue: 'समय बीत गया',
    allReminders: 'सभी रिमाइंडर्स',
    noReminders: 'अभी तक कोई रिमाइंडर नहीं',
    noRemindersDesc: 'उत्पादकता के भविष्य का अनुभव करने के लिए अपना पहला रिमाइंडर बनाएं',
    pastDueLabel: 'समय बीत गया',
    
    // Footer
    footer: 'Next.js, Firebase और Tailwind CSS के साथ बनाया गया',
    
    // Loading
    loading: 'रिमाइंडर्स लोड हो रहे हैं',
    loadingDesc: 'आपकी बुद्धिमान रिमाइंडर प्रणाली तैयार हो रही है...'
  }
};
