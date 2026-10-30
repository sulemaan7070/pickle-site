'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

/**
 * Wires Material UI into the Next.js App Router:
 *  - AppRouterCacheProvider makes Material UI's styles render on the server (no flash)
 *  - ThemeProvider applies our colours and font
 *  - CssBaseline resets browser default styles
 */
export default function ThemeRegistry({ children }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
