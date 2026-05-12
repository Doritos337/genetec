import { createFileRoute } from '@tanstack/react-router';
import { GridDemo } from 'features/data-grid';

export const Route = createFileRoute('/')({
  component: () => (
    <div>
      <GridDemo />
    </div>
  ),
});
