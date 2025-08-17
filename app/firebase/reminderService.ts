import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy,
  Timestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from './config';
import { Reminder, ReminderFormData } from '../types/reminder';

const COLLECTION_NAME = 'reminders';

// Helper function to check if a reminder is from a previous day
const isFromPreviousDay = (createdAt: Date): boolean => {
  const today = new Date();
  const reminderDate = new Date(createdAt);
  
  return reminderDate.getDate() !== today.getDate() ||
         reminderDate.getMonth() !== today.getMonth() ||
         reminderDate.getFullYear() !== today.getFullYear();
};

// Helper function to check if reminder time has passed
const hasTimePassed = (time: any): boolean => {
  if (!time || typeof time !== 'string') return false;
  
  try {
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    
    if (isNaN(hours) || isNaN(minutes)) return false;
    
    const reminderTime = new Date();
    reminderTime.setHours(hours, minutes, 0, 0);
    
    return now > reminderTime;
  } catch (error) {
    console.error('Error checking if time has passed:', time, error);
    return false;
  }
};

// Clean up old "today" reminders and mark past time reminders as completed
export const cleanupReminders = async (): Promise<void> => {
  try {
    const batch = writeBatch(db);
    const remindersRef = collection(db, COLLECTION_NAME);
    
    // Get all reminders
    const querySnapshot = await getDocs(remindersRef);
    
    querySnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data();
      const reminderRef = doc(db, COLLECTION_NAME, docSnapshot.id);
      
      // Remove "today" reminders from previous days
      if (data.repeatMode === 'today' && isFromPreviousDay(data.createdAt.toDate())) {
        batch.delete(reminderRef);
      }
      
      // Mark reminders as completed if their time has passed and they're not already completed
      if (!data.completed && hasTimePassed(data.time)) {
        batch.update(reminderRef, { completed: true });
      }
    });
    
    // Execute all changes in a single batch
    await batch.commit();
  } catch (error) {
    console.error('Error cleaning up reminders:', error);
    throw error;
  }
};

// Create a new reminder
export const createReminder = async (reminderData: ReminderFormData, userId?: string): Promise<string> => {
  try {
    const reminderDataToSave: any = {
      title: reminderData.title,
      time: reminderData.time,
      repeatMode: reminderData.repeatMode,
      completed: false,
      createdAt: new Date()
    };

    // Only add userId if it's provided and not undefined
    if (userId) {
      reminderDataToSave.userId = userId;
    }
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), reminderDataToSave);
    return docRef.id;
  } catch (error) {
    console.error('Error creating reminder:', error);
    throw error;
  }
};

// Get all reminders for a user
export const getReminders = async (userId?: string): Promise<Reminder[]> => {
  try {
    // First, clean up old reminders
    await cleanupReminders();
    
    let q = collection(db, COLLECTION_NAME);
    
    if (userId) {
      q = query(q, where('userId', '==', userId));
    }
    
    q = query(q, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    const reminders: Reminder[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      reminders.push({
        id: doc.id,
        title: data.title,
        time: data.time,
        repeatMode: data.repeatMode,
        completed: data.completed,
        createdAt: data.createdAt.toDate(),
        userId: data.userId || undefined
      });
    });
    
    return reminders;
  } catch (error) {
    console.error('Error getting reminders:', error);
    throw error;
  }
};

// Update a reminder
export const updateReminder = async (id: string, updates: Partial<Reminder>): Promise<void> => {
  try {
    // Filter out undefined values
    const cleanUpdates: any = {};
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        cleanUpdates[key] = value;
      }
    });

    const reminderRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(reminderRef, cleanUpdates);
  } catch (error) {
    console.error('Error updating reminder:', error);
    throw error;
  }
};

// Delete a reminder
export const deleteReminder = async (id: string): Promise<void> => {
  try {
    const reminderRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(reminderRef);
  } catch (error) {
    console.error('Error deleting reminder:', error);
    throw error;
  }
};

// Mark reminder as completed
export const toggleReminderComplete = async (id: string, completed: boolean): Promise<void> => {
  try {
    await updateReminder(id, { completed });
  } catch (error) {
    console.error('Error toggling reminder completion:', error);
    throw error;
  }
};
