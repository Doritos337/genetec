import {
  MantineProvider as MantineProviderM,
  type MantineProviderProps,
  createTheme,
} from '@mantine/core';

export const MantineProvider = ({ ...rest }: MantineProviderProps) => (
  <MantineProviderM
    theme={createTheme({
      colors: {
        blue: [
          '#ebf3ff',
          '#d3e2fa',
          '#a2c3f7',
          '#6fa2f6',
          '#4886f5',
          '#3475f5',
          '#00265f',
          '#0026ff',
          '#0026ff',
          '#0026ff',
        ],
      },
      components: {
        Avatar: {
          defaultProps: {
            radius: 'sm',
          },
        },
      },
      primaryColor: 'blue',
      spacing: {
        xxs: '0.31rem',
      },
    })}
    {...rest}
  />
);
