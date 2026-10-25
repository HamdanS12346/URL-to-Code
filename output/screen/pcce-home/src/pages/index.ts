import type { ComponentType } from 'react'
import PcceHome from './pcce-home/PcceHome'

export type Page = { path: string; title: string; component: ComponentType }

// To add a screen: create src/pages/<name>/, import it here, add one line.
export const pages: Page[] = [
  { path: 'pcce-home', title: 'PCCE Home', component: PcceHome },
]
