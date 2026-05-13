import { useMemo } from 'react';
import { Timeline, type TimelineEventRecord } from 'components';
import { useEventsStore } from 'lib/store';
import { notify } from 'lib/notify';
import { groupEventsByDate } from '../utils/groupEvents';
import styles from './TimelineDemo.module.css';

export const TimelineDemo = () => {
  const events = useEventsStore((state) => state.events);

  const groupedData = useMemo(() => {
    const records: TimelineEventRecord[] = events.slice(0, 50).map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      timestamp: event.timestamp,
      category: event.category,
    }));
    return groupEventsByDate(records);
  }, [events]);

  return (
    <div className={styles.demoContainer}>
      <Timeline
        data={groupedData}
        onEventClick={(event) => notify.info(event.title, 'Selected event')}
      />
    </div>
  );
};
