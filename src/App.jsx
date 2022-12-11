import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './styles.css';
import Layout from './Layout';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout />
        <ReactQueryDevtools initialIsOpen />
      </Router>
    </QueryClientProvider>
  );
}
