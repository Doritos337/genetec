import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { INITIAL_EVENTS } from 'mocks/events';
import { type AppEvent, type NewEventInput } from './events.types';

interface EventsState {
  events: AppEvent[];
  addEvent: (event: NewEventInput) => AppEvent;
}

export const useEventsStore = create<EventsState>()(
  persist(
    (set) => ({
      events: INITIAL_EVENTS,
      addEvent: (newEvent) => {
        const created: AppEvent = { ...newEvent, id: crypto.randomUUID() };
        set((state) => ({ events: [created, ...state.events] }));
        return created;
      },
    }),
    {
      name: 'genetec-events-storage',
    },
  ),
);
