import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// UI_SPEC §10 / tasks §5: stub for POST /api/login. It only acknowledges the
// submitted fields so the form submission has somewhere to land.
// ponytail: dev-server middleware, no auth, no session. Replace with the real
// endpoint when the backend exists; only the form's action has to change.
const loginStub: Plugin = {
  name: 'parabank-login-stub',
  configureServer(server) {
    server.middlewares.use('/api/login', (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405
        return res.end('Method Not Allowed')
      }
      let body = ''
      req.on('data', (c) => { body += c })
      req.on('end', () => {
        const f = new URLSearchParams(body)
        res.setHeader('Content-Type', 'text/html')
        res.end(
          `<!doctype html><title>Login</title><p>POST /api/login received` +
            ` username=${JSON.stringify(f.get('username') ?? '')}` +
            ` password=${f.get('password') ? '[provided]' : '[empty]'}` +
            `<p><a href="/#/parabank-home">Back</a>`,
        )
      })
    })
  },
}

export default defineConfig({ plugins: [react(), loginStub] })
