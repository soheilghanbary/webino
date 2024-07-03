import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

const qc = new QueryClient();

export const QueryProvider = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={qc}>{children}</QueryClientProvider>
);
