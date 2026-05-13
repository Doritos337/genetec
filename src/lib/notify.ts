import { notifications } from '@mantine/notifications';

export const notify = {
  success: (message: string, title = 'Success') =>
    notifications.show({ title, message, color: 'green' }),
  info: (message: string, title = 'Info') => notifications.show({ title, message, color: 'blue' }),
  warning: (message: string, title = 'Warning') =>
    notifications.show({ title, message, color: 'orange' }),
  error: (message: string, title = 'Error') => notifications.show({ title, message, color: 'red' }),
};
