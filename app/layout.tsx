import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://honedops.com'),
  title: 'Honed Ops',
  description: 'Custom technology and strategy for businesses that want to operate with an edge.',
  openGraph: {
    title: 'Honed Ops',
    description: 'Custom technology and strategy for businesses that want to operate with an edge.',
    siteName: 'Honed Ops',
    images: [
      {
        url: '/honedopsthumb.png',
        width: 1200,
        height: 630,
        alt: 'Honed Ops',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Honed Ops',
    description: 'Custom technology and strategy for businesses that want to operate with an edge.',
    images: ['/honedopsthumb.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
