import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  // The workshop pages are prerendered, so "which chapter is next" is decided
  // at build time and written into the static HTML. Exposing the build's clock
  // as a constant lets the client's first render start from that same answer
  // (clean hydration) before it re-checks against the visitor's own clock.
  // See src/data/workshopSchedule.ts.
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  server: {
    port: 3002,
    host: '0.0.0.0',
  },
});
