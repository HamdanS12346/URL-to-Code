import type { ComponentType } from 'react'
import ParabankHome from './parabank-home/ParabankHome'

export type Page = { path: string; title: string; component: ComponentType }

// To add a screen: create src/pages/<name>/, import it here, add one line.
export const pages: Page[] = [
  { path: 'parabank-home', title: 'ParaBank Home', component: ParabankHome },
]
