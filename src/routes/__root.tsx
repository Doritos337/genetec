import { createRootRoute, Outlet } from '@tanstack/react-router';
import { MainLayout } from 'ui/layout/MainLayout/MainLayout';

export const Route = createRootRoute({
  component: () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
});
