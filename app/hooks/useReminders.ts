import { useState, useEffect, useCallback } from 'react';
import { getReminders, createReminder, updateReminder, deleteReminder, cleanupReminders } from '../firebase/reminderService';
import { Reminder, ReminderFormData } from '../types/reminder';

export const useReminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReminders = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getReminders();
      setReminders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reminders');
      console.error('Error loading reminders:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addReminder = useCallback(async (reminderData: ReminderFormData) => {
    try {
      setError(null);
      const id = await createReminder(reminderData);
      await loadReminders(); // Reload to get the new reminder
      return id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create reminder');
      console.error('Error creating reminder:', err);
      throw err;
    }
  }, [loadReminders]);

  const updateReminderById = useCallback(async (id: string, updates: Partial<Reminder>) => {
    try {
      setError(null);
      await updateReminder(id, updates);
      await loadReminders(); // Reload to get updated data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update reminder');
      console.error('Error updating reminder:', err);
      throw err;
    }
  }, [loadReminders]);

  const deleteReminderById = useCallback(async (id: string) => {
    try {
      setError(null);
      await deleteReminder(id);
      await loadReminders(); // Reload to get updated data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete reminder');
      console.error('Error deleting reminder:', err);
      throw err;
    }
  }, [loadReminders]);

  const toggleComplete = useCallback(async (id: string, completed: boolean) => {
    try {
      await updateReminderById(id, { completed });
    } catch (err) {
      console.error('Error toggling reminder completion:', err);
    }
  }, [updateReminderById]);

  const manualCleanup = useCallback(async () => {
    try {
      setError(null);
      await cleanupReminders();
      await loadReminders(); // Reload to see the cleaned up data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cleanup reminders');
      console.error('Error cleaning up reminders:', err);
    }
  }, [loadReminders]);

  // Initial load
  useEffect(() => {
    loadReminders();
  }, [loadReminders]);

  // Automatic cleanup every minute
  useEffect(() => {
    const interval = setInterval(() => {
      // Only cleanup if we have reminders and we're not currently loading
      if (reminders.length > 0 && !isLoading) {
        cleanupReminders().then(() => {
          // Reload reminders to reflect any changes
          loadReminders();
        }).catch(console.error);
      }
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, [reminders.length, isLoading, cleanupReminders, loadReminders]);

  return {
    reminders,
    isLoading,
    error,
    addReminder,
    updateReminder: updateReminderById,
    deleteReminder: deleteReminderById,
    toggleComplete,
    refresh: loadReminders,
    cleanup: manualCleanup
  };
};
