import { useMemo } from 'react';
import { Timeline } from 'components';
import { MOCK_TIMELINE_EVENTS } from 'mocks/timeline.ts';
import { groupEventsByDate } from '../utils/groupEvents';
import styles from './TimelineDemo.module.css';

export const TimelineDemo = () => {
  const groupedData = useMemo(() => {
    return groupEventsByDate(MOCK_TIMELINE_EVENTS);
  }, []);

  return (
    <div className={styles.demoContainer}>
      <Timeline
        data={groupedData}
        onEventClick={(event) => {
          alert(`Selected event: ${event.title}`);
        }}
      />
    </div>
  );
};
