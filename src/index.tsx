import React from 'react';
import ReactDOM from 'react-dom/client';
import { queryClient } from './services/QueryClient'
import { QueryClientProvider } from 'react-query'
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);