# Firebase Setup Guide

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "robot-reminders")
4. Follow the setup wizard (you can disable Google Analytics if you don't need it)

## 2. Enable Firestore Database

1. In your Firebase project, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" for development (you can secure it later)
4. Select a location close to your users
5. Click "Done"

## 3. Get Your Firebase Config

1. In your Firebase project, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "robot-reminders-web")
6. Copy the config object

## 4. Set Environment Variables

Create a `.env.local` file in your project root and add your Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 5. Firestore Security Rules (Optional)

For production, you might want to secure your Firestore database. Go to Firestore Database > Rules and update them:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reminders/{reminderId} {
      allow read, write: if true; // For development - change this for production
    }
  }
}
```

## 6. Run Your App

```bash
npm run dev
```

Your reminder app should now be working with Firebase! 🎉

## Features

- ✅ **Simple Reminders**: Just title and time
- ✅ **Repeat Options**: Set for today or every day
- ✅ **Mark Complete**: Check off completed reminders
- ✅ **Delete Reminders**: Remove unwanted reminders
- ✅ **Real-time Data**: Firebase Firestore integration
- ✅ **Beautiful UI**: Modern design with Tailwind CSS
- ✅ **TypeScript**: Full type safety

## How It Works

1. **Create Reminder**: Enter what you want to be reminded about and when
2. **Choose Repeat**: Select "Just today" or "Every day"
3. **Automatic Queries**: Firebase automatically handles all database operations
4. **Real-time Updates**: See changes instantly across all devices

## Next Steps

- Add user authentication
- Implement push notifications
- Add reminder categories
- Create reminder history
- Add reminder search
