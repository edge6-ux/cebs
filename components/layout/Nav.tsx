'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X, Target } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Our Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white border-b border-gray-200 shadow-[0_1px_12px_rgba(0,0,0,0.06)]'
            : 'bg-transparent border-none'
        }`}
      >
        <div className="w-full px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Target
              size={18}
              className={`shrink-0 transition-colors ${scrolled ? 'text-brand-purple' : 'text-white/70'}`}
            />
            <div className="flex flex-col leading-tight">
              <span
                className={`font-body font-bold text-base tracking-tight transition-colors ${
                  scrolled ? 'text-[#1A1A1A]' : 'text-white'
                }`}
              >
                Competitive Edge
              </span>
              <span
                className={`font-body font-medium text-[11px] tracking-wide uppercase transition-colors ${
                  scrolled ? 'text-brand-muted' : 'text-white/60'
                }`}
              >
                Business Solutions
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-sm font-medium transition-colors hover:text-brand-purple ${
                  scrolled ? 'text-[#4A4A4A]' : 'text-white/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden md:inline-block bg-brand-purple text-white font-heading text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#7A28B8] transition-colors"
            >
              <span className="hidden lg:inline">Get a Free Consultation</span>
              <span className="lg:hidden">Free Consultation</span>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className={`md:hidden p-2 -mr-2 transition-colors ${scrolled ? 'text-[#1A1A1A]' : 'text-white'}`}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-brand-dark flex flex-col items-center justify-center gap-2">
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="absolute top-3 right-4 p-2 text-white"
          >
            <X size={24} />
          </button>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="min-h-[44px] flex items-center font-heading font-bold text-[32px] text-white hover:text-brand-purple transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-6 min-h-[44px] flex items-center bg-brand-purple text-white font-heading text-lg font-semibold px-8 py-3 rounded-xl hover:bg-[#7A28B8] transition-colors"
          >
            Get a Free Consultation
          </Link>
        </div>
      )}
    </>
  )
}
