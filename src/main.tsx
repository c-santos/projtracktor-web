import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './ui/pages/App'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './data/query.client'

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <StrictMode>
            <App />
        </StrictMode>,
    </QueryClientProvider>
)
