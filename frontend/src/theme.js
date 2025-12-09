import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5C6BC0',
      contrastText: '#E8EAF6',
    },
    secondary: {
      main: '#9FA8DA',
    },
    background: {
      default: '#0A0E27',
      paper: '#121735',
    },
    text: {
      primary: '#E8EAF6',
      secondary: '#B8C1EC',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: '"Space Grotesk", "Inter", "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,
    h1: { fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700, letterSpacing: '-0.01em' },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0A0E27',
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(92, 107, 192, 0.08) 0, transparent 30%), radial-gradient(circle at 80% 0%, rgba(159, 168, 218, 0.08) 0, transparent 26%)',
          color: '#E8EAF6',
        },
        a: {
          color: 'inherit',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 16px 40px rgba(0,0,0,0.35)',
          backgroundImage: 'linear-gradient(145deg, rgba(255,255,255,0.02), rgba(255,255,255,0))',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: 'transparent',
      },
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 14, 39, 0.82)',
          backdropFilter: 'blur(16px)',
        },
      },
    },
  },
});

export default theme;
