import { lazy, StrictMode, Suspense, useEffect, useState, type ComponentType } from 'react';
import { createRoot } from 'react-dom/client';

// Nothing here is site-specific. Every screen is built in outputs/<screen>/app/Page.tsx (npm run port -- <screen>)
// and found by this glob. One screen per route, addressed the way `npm run verify -- <screen>` opens it: /#/<screen>
const pages = import.meta.glob<{ default: ComponentType }>('../outputs/*/app/Page.tsx');
const ROUTES = Object.fromEntries(Object.entries(pages).map(([file, load]) => [file.split('/')[2], lazy(load)]));

function App() {
  const [hash, setHash] = useState(() => globalThis.location.hash);
  useEffect(() => {
    const on = () => setHash(globalThis.location.hash);
    globalThis.addEventListener('hashchange', on);
    return () => globalThis.removeEventListener('hashchange', on);
  }, []);
  const screen = hash.replace(/^#\/?/, '').split(/[?&]/)[0];
  const Page = ROUTES[screen];
  if (Page) return <Suspense fallback={null}><Page /></Suspense>;
  return (
    <ul style={{ fontFamily: 'system-ui', padding: 24 }}>
      {Object.keys(ROUTES).map((r) => (
        <li key={r}><a href={`#/${r}`}>{r}</a></li>
      ))}
    </ul>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
