import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import toast, { Toaster } from 'react-hot-toast';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
          <Toaster />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
