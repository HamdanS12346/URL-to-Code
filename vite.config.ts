import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// outputs/<screen>/ holds hundreds of MB of captures; only outputs/<screen>/app is source, so don't watch the rest
const notApp = /[\\/]outputs[\\/][^\\/]+[\\/](?!app([\\/]|$))/;

// Serve outputs/<screen>/app/assets/** byte for byte. Captured images often have no file extension, and Vite
// parses an extensionless URL as a JS module (import analysis error, then an overlay over the page).
const rawAssets = (): Plugin => ({
  name: 'raw-screen-assets',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const m = /^\/(outputs\/[^/]+\/app\/assets\/[^?#]*)/.exec(req.url ?? '');
      const file = m && path.join(server.config.root, decodeURIComponent(m[1]));
      if (!file) return next();
      fs.stat(file, (err, st) => {
        if (err || !st.isFile()) return next();
        // the browser sniffs images with no extension; only the types it will not sniff need a header
        const type = { '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.json': 'application/json' }[path.extname(file).toLowerCase()];
        if (type) res.setHeader('Content-Type', type);
        fs.createReadStream(file).pipe(res);
      });
    });
  },
});

// hmr.overlay off: a compile error must show up as a wrong picture in `npm run verify`, not paint over it
export default defineConfig({ plugins: [rawAssets(), react()], server: { port: 5173, strictPort: true, hmr: { overlay: false }, watch: { ignored: [notApp] } } });
