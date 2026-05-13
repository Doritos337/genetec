import { type EventCategory } from 'lib/store';

export type { EventCategory };

export interface TimelineEventRecord {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  category: EventCategory;
}

export interface GroupedTimelineData {
  [groupLabel: string]: TimelineEventRecord[];
}

export interface TimelineProps {
  data: GroupedTimelineData;
  onEventClick?: (event: TimelineEventRecord) => void;
}
