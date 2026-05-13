import { createFileRoute } from '@tanstack/react-router';
import { GridDemo } from 'features/data-grid';

export const Route = createFileRoute('/datagrid')({
  component: DatagridRoute,
});

function DatagridRoute() {
  return <GridDemo />;
}
