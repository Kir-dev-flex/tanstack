import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import App from './App.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    }
  },
  queryCache: new QueryCache({
    onError: (error: Error) => {
      console.error('Глобальная ошибка запроса:', error.message);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: Error) => {
      console.error('Глобальная ошибка мутации:', error.message);
    },
  }),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  </StrictMode>,
)
