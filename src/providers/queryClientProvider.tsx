'use client';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { PropsWithChildren } from 'react';

const queryClient = new QueryClient();

export function ReactQueryClientProvider({ children }: PropsWithChildren<{}>) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

