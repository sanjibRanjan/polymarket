import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { AlchemyAccountProvider } from '@account-kit/react';
import { config, queryClient } from './alchemyconfig.ts';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <QueryClientProvider client={queryClient}>
        <AlchemyAccountProvider config={config} queryClient={queryClient}>
          <App />
        </AlchemyAccountProvider>
      </QueryClientProvider>
  </StrictMode>
);
