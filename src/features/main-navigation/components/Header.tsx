import { Link, useLocation } from '@tanstack/react-router';
import { Burger, Button, Drawer, Title } from 'ui';
import { useDisclosure } from 'ui';
import { EventFormModal } from 'features/event-form';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { to: '/datagrid', label: 'DataGrid' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/form', label: 'Event Form Demo' },
] as const;

export const Header = () => {
  const [drawerOpened, drawerHandlers] = useDisclosure(false);
  const [modalOpened, modalHandlers] = useDisclosure(false);

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className={styles.headerContainer}>
      <Title order={3}>Genetec Task</Title>

      <nav className={styles.desktopNav} aria-label="Primary">
        {NAV_ITEMS.map((item) => (
          <Button
            key={item.to}
            component={Link}
            to={item.to}
            variant="subtle"
            disabled={currentPath === item.to}
          >
            {item.label}
          </Button>
        ))}
        <Button onClick={modalHandlers.open} variant="filled" color="blue" ml="sm">
          New Event
        </Button>
      </nav>

      <Burger
        opened={drawerOpened}
        onClick={drawerHandlers.toggle}
        size="sm"
        className={styles.burgerButton}
        aria-label="Toggle navigation"
      />

      <Drawer
        opened={drawerOpened}
        onClose={drawerHandlers.close}
        size="xs"
        padding="md"
        title="Menu"
        position="right"
      >
        <nav className={styles.mobileNav} aria-label="Mobile primary">
          {NAV_ITEMS.map((item) => (
            <Button
              key={item.to}
              component={Link}
              to={item.to}
              variant="subtle"
              onClick={drawerHandlers.close}
              disabled={currentPath === item.to}
              fullWidth
              justify="flex-start"
            >
              {item.label}
            </Button>
          ))}
          <Button
            onClick={() => {
              drawerHandlers.close();
              modalHandlers.open();
            }}
            variant="filled"
            color="blue"
            fullWidth
            mt="md"
          >
            New Event
          </Button>
        </nav>
      </Drawer>

      <EventFormModal opened={modalOpened} onClose={modalHandlers.close} />
    </header>
  );
};
