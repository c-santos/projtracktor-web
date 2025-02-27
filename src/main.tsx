import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './data/http.client';
import { RouterProvider } from 'react-router-dom';
import { router } from './ui/pages/router';
import '@radix-ui/themes/styles.css';

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>,
);
