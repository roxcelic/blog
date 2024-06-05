import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: process.env.NODE_ENV === 'production' && process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://blog.roxcelic.love',
});