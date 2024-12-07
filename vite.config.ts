import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default ({ mode }: any) => {
    const env = loadEnv(mode, process.cwd());

    const PORT = parseInt(`${env.VITE_PORT ?? '3000'}`);

    return defineConfig({
        plugins: [react()],
        server: {
            port: PORT,
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
    });
};
