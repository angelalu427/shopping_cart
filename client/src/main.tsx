import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './providers/ThemeProvider.tsx';
import { CurrencyProvider } from './providers/CurrencyProvider.tsx';
import './assets/index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <CurrencyProvider>
        <App />
      </CurrencyProvider>
    </ThemeProvider>
  </StrictMode>,
);
