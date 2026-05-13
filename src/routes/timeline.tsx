import { createFileRoute } from '@tanstack/react-router';
import { TimelineDemo } from 'features/timeline';

export const Route = createFileRoute('/timeline')({
  component: TimelineRoute,
});

function TimelineRoute() {
  return <TimelineDemo />;
}
