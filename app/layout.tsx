// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required

import { Manrope } from 'next/font/google'
import { DM_Sans } from 'next/font/google'
import './styles.css'
import { ReactNode } from 'react'

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
})
const dm_sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm_sans',
})

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={manrope.variable + ' ' + dm_sans.variable}>
        {children}
      </body>
    </html>
  )
}