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
  title: 'Competitive Edge Business Solutions',
  description: 'Custom technology and strategy for businesses that want a competitive edge.',
  openGraph: {
    title: 'Competitive Edge Business Solutions',
    description: 'Custom technology and strategy for businesses that want a competitive edge.',
    images: [
      {
        url: '/cebsthumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Competitive Edge Business Solutions',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Competitive Edge Business Solutions',
    description: 'Custom technology and strategy for businesses that want a competitive edge.',
    images: ['/cebsthumbnail.png'],
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
