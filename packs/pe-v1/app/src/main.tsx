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
  // bare: a page with its own header (a kit's home page); every other screen sits in the shared shell, which shows its title bar
  return route.bare ? <Page /> : <Shell title={route.title} module={route.module}><Page /></Shell>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
