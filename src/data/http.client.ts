import { QueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

export const queryClient = new QueryClient();

// IIFE to make it a singleton
export const httpClient = (() => {
    return axios.create({
        baseURL: import.meta.env.VITE_API_URL,
    })
})();

httpClient.interceptors.request.use(
    (req) => {
        return req
    },
    (err) => {
        if (err instanceof AxiosError) {
            console.error(
                `[AXIOS] ${err.code} ${err.config?.method} ${err.config?.url}: `,
                { cause: err.cause, stack: err.stack },
            );
        }
    },
);

httpClient.interceptors.response.use(
    (res) => {
        if (process.env.NODE_ENV === "development") {
            console.log(`[AXIOS][${res.config.method?.toUpperCase()} ${res.config.url}]: `, res.data);
        }
        return res.data;
    },
    (err) => {
        if (err instanceof AxiosError) {
            console.error(
                `[AXIOS] ${err.code} ${err.config?.method} ${err.config?.url}: `,
                { cause: err.cause, stack: err.stack },
            );
        }
    },
);
