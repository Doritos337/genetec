export type EventCategory = 'info' | 'success' | 'warning' | 'error';

export interface AppEvent {
  id: string;
  title: string;
  name: string;
  description: string;
  timestamp: string;
  category: EventCategory;
  department: string;
  role: string;
}

export type NewEventInput = Omit<AppEvent, 'id'>;
