import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Shell from './shell/Page';
import { routes } from './routes';

// Hash routes (#/ is the home page, #/<screen> the others): the app runs from any static host without server rewrites.
function App() {
  const [hash, setHash] = useState(() => globalThis.location.hash);
  useEffect(() => {
    const on = () => setHash(globalThis.location.hash);
    globalThis.addEventListener('hashchange', on);
    return () => globalThis.removeEventListener('hashchange', on);
  }, []);
  const path = hash.replace(/^#/, '').split('?')[0] || '/';
  const route = routes.find((r) => r.path === path) ?? routes[0];
  const Page = route.Page;
  return <Shell><Page /></Shell>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
