import { createFileRoute } from '@tanstack/react-router';
import { Title } from '@mantine/core';

export const Route = createFileRoute('/timeline')({
  component: TimelineRoute,
});

function TimelineRoute() {
  return <Title order={2}>Timeline Component</Title>;
}
