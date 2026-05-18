import Link from 'next/link'
import Image from 'next/image'

const services = ['Audit & Strategy', 'Optimize & Consolidate', 'Build']
const company = [
  { label: 'Our Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer
      className="border-t border-gray-200 px-6 py-10"
      style={{ backgroundColor: '#FFF5F7' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="flex justify-between flex-wrap gap-8 pb-8 border-b border-gray-200">
          {/* Left: badge + tagline */}
          <div className="flex flex-col items-start gap-3">
            <Link href="/">
              <Image
                src="/cebs-logo.png"
                alt="Competitive Edge Business Solutions"
                width={100}
                height={100}
                className="rounded-full"
              />
            </Link>
            <p className="font-body text-brand-muted text-sm max-w-xs leading-relaxed">
              Custom technology and strategy for businesses that want a competitive edge.
            </p>
          </div>

          {/* Right: link columns */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            {/* Services column */}
            <div>
              <p className="font-body text-gray-400 text-[11px] uppercase tracking-widest mb-4">
                Services
              </p>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <Link
                      href="/services"
                      className="font-body text-brand-muted text-sm hover:text-brand-dark transition-colors"
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company column */}
            <div>
              <p className="font-body text-gray-400 text-[11px] uppercase tracking-widest mb-4">
                Company
              </p>
              <ul className="space-y-3">
                {company.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-body text-brand-muted text-sm hover:text-brand-dark transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex justify-between flex-wrap gap-4 pt-6">
          <p className="font-body text-gray-400 text-[13px]">
            © 2026 Competitive Edge Business Solutions. All rights reserved.
          </p>
          <p className="font-body text-gray-400 text-[13px]">
            Built by Competitive Edge
          </p>
        </div>
      </div>
    </footer>
  )
}
