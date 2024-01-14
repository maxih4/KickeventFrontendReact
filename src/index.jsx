import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    <ReactQueryDevtools initialIsOpen={true}/>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

