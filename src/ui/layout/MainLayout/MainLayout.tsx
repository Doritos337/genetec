import { AppShell } from 'ui';
import { Header } from 'features/main-navigation';
import { type ReactNode } from 'react';
import styles from './MainLayout.module.css';

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AppShell className={styles.appShell} header={{ height: 60 }}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
