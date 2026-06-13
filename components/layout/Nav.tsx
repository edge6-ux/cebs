'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ArrowRight } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Our Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  if (pathname === '/intake') return null

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white border-b border-gray-200 shadow-[0_1px_12px_rgba(0,0,0,0.06)]'
            : 'bg-transparent border-none'
        }`}
      >
        <div className="w-full px-4 md:px-6 h-16 grid grid-cols-[1fr_auto] md:grid-cols-3 items-center">
          {/* Left: logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/honedops-icon.png" alt="Honed Ops" width={30} height={30} className="shrink-0" />
              <div className="flex flex-col leading-tight">
                <span
                  className={`font-body font-bold text-base tracking-tight whitespace-nowrap transition-colors ${
                    scrolled ? 'text-[#1A1A1A]' : 'text-white'
                  }`}
                >
                  Honed Ops
                </span>
                <span className="font-body font-medium text-[11px] tracking-wide uppercase text-brand-green whitespace-nowrap">
                  Operate With an Edge
                </span>
              </div>
            </Link>
          </div>

          {/* Center: desktop nav links */}
          <div className="hidden md:flex items-center justify-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-sm font-medium transition-colors hover:text-brand-green ${
                  scrolled ? 'text-[#4A4A4A]' : 'text-white/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: CTA + mobile hamburger */}
          <div className="flex items-center justify-end gap-3">
            <Link
              href="/contact"
              className="hidden md:inline-block bg-brand-green text-white font-heading text-sm font-semibold px-5 py-2.5 rounded-xl hover:brightness-110 transition-all"
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
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Slide-in panel */}
        <div
          className={`absolute inset-y-0 right-0 w-[85vw] max-w-[360px] bg-[#0D0818] flex flex-col shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Top gradient accent */}
          <div className="h-px bg-gradient-to-r from-brand-green via-brand-blue to-transparent" />

          {/* Panel header */}
          <div className="flex items-center justify-between px-6 h-16">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
              <Image src="/honedops-icon.png" alt="Honed Ops" width={26} height={26} className="shrink-0" />
              <div className="flex flex-col leading-tight">
                <span className="font-body font-bold text-sm tracking-tight text-white">Honed Ops</span>
                <span className="font-body font-medium text-[10px] tracking-wide uppercase text-brand-green">
                  Operate With an Edge
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all"
            >
              <X size={17} />
            </button>
          </div>

          <div className="mx-6 h-px bg-white/[0.06]" />

          {/* Nav links */}
          <nav className="flex-1 flex flex-col px-4 pt-6 gap-0.5">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`group flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-white/[0.06] transition-all duration-300 ${
                  mobileOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'
                }`}
                style={{ transitionDelay: mobileOpen ? `${i * 70 + 180}ms` : '0ms' }}
              >
                <span className="w-5 text-right font-mono text-[11px] text-white/20 group-hover:text-brand-green/60 transition-colors select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-heading font-bold text-xl text-white/75 group-hover:text-white transition-colors">
                  {link.label}
                </span>
                <ArrowRight
                  size={14}
                  className="ml-auto text-white/0 group-hover:text-brand-green/70 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                />
              </Link>
            ))}
          </nav>

          {/* Bottom CTA */}
          <div className="px-6 pb-10 pt-2">
            <div className="h-px bg-white/[0.06] mb-5" />
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-full bg-brand-green text-white font-heading font-semibold text-sm px-6 py-3.5 rounded-xl hover:brightness-110 transition-all"
            >
              Get a Free Consultation
            </Link>
            <p className="mt-3 text-center text-[11px] text-white/25 font-body">
              No commitment required
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

