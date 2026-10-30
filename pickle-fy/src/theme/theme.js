import { createTheme } from '@mui/material/styles';

/** Brand colours, also handy for inline styles. */
export const colors = {
  ink: '#273E10', // dark green – main text
  red: '#C31711', // buttons / prices
  orange: '#E79114', // accents
  cream: '#fbf6e9', // page background
};

const theme = createTheme({
  palette: {
    primary: { main: colors.ink },
    secondary: { main: colors.red },
    background: { default: colors.cream },
    text: { primary: colors.ink },
  },
  typography: {
    // --font-poppins is set up in app/layout.js
    fontFamily: 'var(--font-poppins), "Trebuchet MS", system-ui, sans-serif',
    button: { textTransform: 'none', fontWeight: 700 },
  },
  shape: { borderRadius: 16 },
});

export default theme;
