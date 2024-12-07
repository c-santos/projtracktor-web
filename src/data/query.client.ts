import { QueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

export const queryClient = new QueryClient();

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use(
    (req) => {
        console.log(`[${req.method} ${req.url}]: `, req.data)
        return req
    },
    (err) => {
        if (err instanceof AxiosError) {
            console.error(
                `${err.code} ${err.config?.method} ${err.config?.url}: `,
                { cause: err.cause, stack: err.stack },
            );
        }
    },
);

apiClient.interceptors.response.use(
    (res) => {
        console.log(`[${res.config.method} ${res.config.url}]: `, res.data);
        return res;
    },
    (err) => {
        if (err instanceof AxiosError) {
            console.error(
                `${err.code} ${err.config?.method} ${err.config?.url}: `,
                { cause: err.cause, stack: err.stack },
            );
        }
    },
);
