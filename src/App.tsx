import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import 'mantine-datatable/styles.css';

import { RouterProvider, createRouter } from '@tanstack/react-router';
import { setDefaultOptions } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { Notifications } from '@mantine/notifications';
import { MantineProvider } from 'ui';
import { routeTree } from './routeTree.gen';

setDefaultOptions({ locale: enGB });

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const App = () => (
  <MantineProvider>
    <Notifications />
    <RouterProvider router={router} />
  </MantineProvider>
);

export default App;
