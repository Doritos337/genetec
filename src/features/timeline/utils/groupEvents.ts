import { type TimelineEventRecord, type GroupedTimelineData } from 'components';

export const groupEventsByDate = (events: TimelineEventRecord[]): GroupedTimelineData => {
  const sorted = [...events].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  return sorted.reduce<GroupedTimelineData>((acc, event) => {
    const date = new Date(event.timestamp);
    const label = date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    if (!acc[label]) {
      acc[label] = [];
    }
    acc[label].push(event);

    return acc;
  }, {});
};
