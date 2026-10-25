import { useSyncExternalStore } from 'react'
import { pages } from './pages'

const subscribe = (cb: () => void) => {
  window.addEventListener('hashchange', cb)
  return () => window.removeEventListener('hashchange', cb)
}

export default function App() {
  const path = useSyncExternalStore(subscribe, () => location.hash.replace(/^#\/?/, ''))
  const Page = pages.find((p) => p.path === path)?.component ?? pages[0].component
  return <Page />
}
