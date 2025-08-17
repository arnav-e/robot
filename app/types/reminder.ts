export interface Reminder {
  id?: string;
  title: string;
  time: string;
  repeatMode: 'today' | 'everyday';
  completed: boolean;
  createdAt: Date;
  userId?: string | undefined;
}

export interface ReminderFormData {
  title: string;
  time: string;
  repeatMode: 'today' | 'everyday';
}
