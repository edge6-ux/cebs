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
  title: {
    default: 'Honed Ops — Operate With An Edge',
    template: '%s | Honed Ops',
  },
  description: 'Custom technology and strategy for local businesses ready to cut waste, save time, and grow revenue. Websites, automation, AI tools, and operations systems.',
  keywords: [
    'small business technology',
    'local business website',
    'business automation',
    'AI tools for small business',
    'custom admin dashboard',
    'local SEO',
    'business operations',
    'Honed Ops',
  ],
  authors: [{ name: 'Honed Ops', url: 'https://honedops.com' }],
  creator: 'Honed Ops',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://honedops.com',
    siteName: 'Honed Ops',
    title: 'Honed Ops — Operate With An Edge',
    description: 'Custom technology and strategy for local businesses. Websites, automation, AI tools, and operations systems.',
    images: [
      {
        url: '/honedopsthumb2.png',
        width: 1200,
        height: 630,
        alt: 'Honed Ops — Operate With An Edge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Honed Ops — Operate With An Edge',
    description: 'Custom technology and strategy for local businesses.',
    images: ['/honedopsthumb2.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://honedops.com',
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
