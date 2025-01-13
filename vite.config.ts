import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
    process.env = loadEnv(mode, process.cwd(), '')
    return defineConfig({
        plugins: [react()],
        server: {
            port: parseInt(process.env.VITE_PORT!) || 3000
        },
        resolve: {
            alias: {
                '@/': resolve(__dirname, 'src/'),
            },
        },
        envDir: process.cwd(),
        keepProcessEnv: true
    });
}
