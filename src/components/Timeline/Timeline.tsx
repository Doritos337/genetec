import { MantineTimeline, Text, Paper, Title } from 'ui';
import { type ReactNode, useRef, useState, type KeyboardEvent } from 'react';
import styles from './Timeline.module.css';
import { type TimelineProps, type EventCategory } from './Timeline.types';

const CATEGORY_COLORS: Record<EventCategory, string> = {
  info: 'blue',
  success: 'green',
  warning: 'orange',
  error: 'red',
};

export const Timeline = ({ data, onEventClick }: TimelineProps): ReactNode => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [announcement, setAnnouncement] = useState<string>('');
  const groups = Object.entries(data);

  if (groups.length === 0) {
    return <Text c="dimmed">No events found.</Text>;
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const navKeys = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'];

    if (!navKeys.includes(e.key)) {
      return;
    }

    const nodes = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>('[role="button"]') || [],
    );
    const currentIndex = nodes.indexOf(document.activeElement as HTMLElement);

    if (currentIndex === -1) {
      if (nodes.length > 0) {
        e.preventDefault();
        nodes[0].focus();
      }
      return;
    }

    e.preventDefault();

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      const nextNode = nodes[currentIndex + 1];
      if (nextNode) {
        nextNode.focus();
      }
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      const prevNode = nodes[currentIndex - 1];
      if (prevNode) {
        prevNode.focus();
      }
    }
  };

  return (
    <div ref={containerRef} className={styles.timelineWrapper} onKeyDown={handleKeyDown}>
      <div aria-live="polite" className={styles.srOnly}>
        {announcement}
      </div>

      {groups.map(([label, events]) => (
        <div key={label} className={styles.groupContainer}>
          <Title order={5} className={styles.groupLabel} aria-hidden="true">
            {label}
          </Title>

          <MantineTimeline bulletSize={16} lineWidth={2}>
            {events.map((event) => {
              const timeString = new Date(event.timestamp).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <MantineTimeline.Item
                  key={event.id}
                  title={event.title}
                  color={CATEGORY_COLORS[event.category]}
                >
                  <Paper
                    p="xs"
                    mt="xs"
                    withBorder
                    className={onEventClick ? styles.eventCard : undefined}
                    onClick={() => {
                      if (onEventClick) {
                        onEventClick(event);
                      }
                    }}
                    role={onEventClick ? 'button' : undefined}
                    tabIndex={onEventClick ? 0 : undefined}
                    onFocus={() => {
                      setAnnouncement(
                        `Group: ${label}. Event: ${event.title}, ${event.description}`,
                      );
                    }}
                    onKeyDown={(e) => {
                      if (onEventClick && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        onEventClick(event);
                      }
                    }}
                    aria-label={`${event.title}, at ${timeString}`}
                  >
                    <Text size="sm">{event.description}</Text>
                    <Text size="xs" c="dimmed" mt={4}>
                      {timeString}
                    </Text>
                  </Paper>
                </MantineTimeline.Item>
              );
            })}
          </MantineTimeline>
        </div>
      ))}
    </div>
  );
};
