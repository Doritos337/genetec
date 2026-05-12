import { Title } from 'ui';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <div className={styles.headerMain}>
      <Title order={3}>Genetec Task</Title>
    </div>
  );
};
