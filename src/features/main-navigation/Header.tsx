import { Button, Title, Burger, Drawer } from 'ui';
import { useDisclosure } from 'ui/hooks/useDisclosure.ts';
import { Link, useLocation } from '@tanstack/react-router';
import styles from './Header.module.css';

export const Header = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const location = useLocation();
  const current = location.pathname;

  return (
    <header className={styles.headerContainer}>
      <Title order={3}>Genetec Task</Title>

      <nav className={styles.desktopNav}>
        <Button component={Link} to="/datagrid" variant="subtle" disabled={current === '/datagrid'}>
          DataGrid
        </Button>
        <Button component={Link} to="/timeline" variant="subtle" disabled={current === '/timeline'}>
          Timeline
        </Button>
        <Button component={Link} to="/form" variant="subtle" disabled={current === '/form'}>
          Event Form
        </Button>
      </nav>

      <Burger
        opened={opened}
        onClick={toggle}
        size="sm"
        className={styles.burgerButton}
        aria-label="Toggle navigation"
      />

      <Drawer
        opened={opened}
        onClose={close}
        size="xs"
        padding="md"
        title={<Title order={4}>Menu</Title>}
        position="right"
      >
        <nav className={styles.mobileNav}>
          <Button
            component={Link}
            to="/datagrid"
            variant="subtle"
            onClick={close}
            disabled={current === '/datagrid'}
            fullWidth
            justify="flex-start"
          >
            DataGrid
          </Button>
          <Button
            component={Link}
            to="/timeline"
            variant="subtle"
            onClick={close}
            disabled={current === '/timeline'}
            fullWidth
            justify="flex-start"
          >
            Timeline
          </Button>
          <Button
            component={Link}
            to="/form"
            variant="subtle"
            onClick={close}
            disabled={current === '/form'}
            fullWidth
            justify="flex-start"
          >
            Event Form
          </Button>
        </nav>
      </Drawer>
    </header>
  );
};
