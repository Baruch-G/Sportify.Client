import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
      primary: {
        main: '#FF5722', // Orange for primary actions
      },
      secondary: {
        main: '#2196F3', // Blue for secondary elements
      },
      background: {
        default: '#f5f5f5',
      },
    },
    typography: {
      fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 800,
      },
      h2: {
        fontWeight: 700,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            
          },
        },
      },
    },
  });



  export default theme;