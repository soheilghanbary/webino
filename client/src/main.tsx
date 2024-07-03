import '@/assets/app.css';
import { QueryProvider } from '@/components/providers/query-provider.tsx';
import { RouteProvider } from '@/components/providers/route-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ToastProvider } from '@/components/providers/toast-provider';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="theme">
      <QueryProvider>
        <section className="container h-dvh border-x bg-background">
          <RouteProvider />
        </section>
        <ToastProvider />
      </QueryProvider>
    </ThemeProvider>
  </StrictMode>,
);
