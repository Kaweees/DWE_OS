import "./main.css";
import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
// import { red } from '@mui/material/colors';

export const lightTheme = createTheme({
  typography: {
    fontFamily: "HelveticaNeueLight, sans-serif",
    fontWeightRegular: 400,
    fontWeightItalic: 400,
  },
  overrides: {
    MuiTypography: {
      styleOverrides: {
        root: {
          letterSpacing: "0.05em",
        },
      },
    },
    MuiCssBaseline: {
      "@global": {
        "@font-face": {
          fontFamily: "HelveticaNeueLight",
          fontStyle: "normal",
          fontWeight: 400,
          src: `
          local('HelveticaNeueLight'),
          local('HelveticaNeueLight'),
          url(./fonts/HelveticaNeue-Light.otf) format('opentype')
        `,
        },
      },
    },
  },
  palette: {
    grey: {
      main: grey[200],
      dark: grey[300],
    },
    primary: {
      dark: "#092037",
      main: "#15314d",
    },
  },
});

export const darkTheme = createTheme({
  typography: {
    fontFamily: "HelveticaNeueLight, sans-serif",
    fontWeightRegular: 400,
    fontWeightItalic: 400,
  },
  overrides: {
    MuiTypography: {
      styleOverrides: {
        root: {
          letterSpacing: "0.05em",
        },
      },
    },
    MuiCssBaseline: {
      "@global": {
        "@font-face": {
          fontFamily: "HelveticaNeueLight",
          fontStyle: "normal",
          fontWeight: 400,
          src: `
          local('HelveticaNeueLight'),
          local('HelveticaNeueLight'),
          url(./fonts/HelveticaNeue-Light.otf) format('opentype')
        `,
        },
      },
    },
  },
  palette: {
    mode: "dark",
  },
});

// export const roboto = Roboto({
//   weight: ['300', '400', '500', '700'],
//   subsets: ['latin'],
//   display: 'swap',
//   fallback: ['Helvetica', 'Arial', 'sans-serif'],
// });

// // Create a theme instance.
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#556cd6',
//     },
//     secondary: {
//       main: '#19857b',
//     },
//     error: {
//       main: red.A400,
//     },
//   },
//   typography: {
//     fontFamily: roboto.style.fontFamily,
//   },
// });

// export default theme;

// Custom palette for dark mode
// const getDesignTokens = (mode: PaletteMode) => ({
//   palette: {
//     mode,
//     ...(mode === 'light'
//       ? {
//           // palette values for light mode
//           primary: amber,
//           divider: amber[200],
//           text: {
//             primary: grey[900],
//             secondary: grey[800],
//           },
//         }
//       : {
//           // palette values for dark mode
//           primary: deepOrange,
//           divider: deepOrange[700],
//           background: {
//             default: deepOrange[900],
//             paper: deepOrange[900],
//           },
//           text: {
//             primary: '#fff',
//             secondary: grey[500],
//           },
//         }),
//   },
// });
