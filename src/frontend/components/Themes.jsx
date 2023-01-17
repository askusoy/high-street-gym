import { createTheme, ThemeProvider } from '@mui/material/styles';

export const themeOptions = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#bf360c',
      },
      secondary: {
        main: '#6a1b9a',
      },
      error: {
        main: '#f44336',
      },
    },
    typography: {
      fontFamily: 'Raleway',
    },
    overrides: {
      MuiButton: {
        root: {
          background: 'linear-gradient(#bf360c 15%, #EF6C00 85%)',
          border: 0,
          borderRadius: 11,
          boxShadow: '0 3px 5px 2px rgba(208, 64, 129, .4)',
          color: 'white',
          height: 48,
          padding: '0 30px',
        },
      },
    },
  });
