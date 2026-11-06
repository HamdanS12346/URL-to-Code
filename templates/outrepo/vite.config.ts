import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Captured assets live in public/assets/<screen>/ and are served as they are (many have no file extension).
// hmr.overlay off: a compile error must show up as a wrong picture in final-playwright's verify, not paint over the page.
export default defineConfig({
  plugins: [react()],
  server: { port: Number(process.env.PORT) || 5180, strictPort: true, hmr: { overlay: false } },
});
