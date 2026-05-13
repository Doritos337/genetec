import { createFileRoute } from '@tanstack/react-router';
import { Title } from 'ui';

export const Route = createFileRoute('/form')({
  component: FormRoute,
});

function FormRoute() {
  return <Title order={2}>Event Form Component</Title>;
}
