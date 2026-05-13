import { createFileRoute } from '@tanstack/react-router';
import { FormDemo } from 'features/event-form';

export const Route = createFileRoute('/form')({
  component: FormRoute,
});

function FormRoute() {
  return <FormDemo />;
}
