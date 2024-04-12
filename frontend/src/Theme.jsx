import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
      background: {
        default: '#fff' // Your desired background color
      },
      primary: {
        main: '#4746eb', // Example primary color
        dark:'#3931d3',
        darkest: '##2900af',
        light:'#8083f5',
        lighter:'#cac9fa',
        background: '#eaeafd',
        contrastText:'#fff'
      },
      secondary: {
        main: '#111c30', // Example secondary color
        light:'#252e3e',
        contrastText:'#555'
      },
      white:'#fff'
    },
    typography: {
      fontFamily: [
        'Poppins', // Your desired font family
        '"Helvetica Neue"',
        'Arial',
        'sans-serif'
      ].join(','),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: '1rem',
          },
        },
      },
    },
  });

  export default theme;