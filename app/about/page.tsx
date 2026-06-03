import Link from 'next/link'
import { Target, Lightbulb, Shield, Zap } from 'lucide-react'
import FluidBackgroundUltraVioletStatic from '@/components/home/FluidBackgroundUltraVioletStatic'

const values = [
  {
    Icon: Target,
    title: 'Results first',
    body: 'We measure success in dollars saved, hours freed, and outcomes delivered — not in deliverables handed off.',
  },
  {
    Icon: Lightbulb,
    title: 'Honest recommendations',
    body: "If the answer is to do nothing, we say that. We'd rather build a long relationship than a short invoice.",
  },
  {
    Icon: Shield,
    title: 'Built to last',
    body: "We don't build for the handoff. We build systems the business can own, understand, and grow with.",
  },
  {
    Icon: Zap,
    title: 'Speed matters',
    body: 'Every month a broken system runs is money out the door. We move fast and we stay until it works.',
  },
]

const steps = [
  {
    n: '01',
    title: 'Listen first',
    body: 'We spend time understanding the business — not just the technology. The problem is rarely what it appears to be on the surface.',
  },
  {
    n: '02',
    title: 'Diagnose honestly',
    body: "We map the full picture: every tool, every workflow, every cost. Then we tell you exactly what we see — even if it's not what you expected.",
  },
  {
    n: '03',
    title: 'Build what fits',
    body: "We don't force solutions. We build what the business actually needs — sometimes that's a new tool, sometimes it's cutting three.",
  },
  {
    n: '04',
    title: 'Stay until it works',
    body: "Delivery isn't the end. We stay in contact, monitor results, and make sure what we built is actually doing what it's supposed to.",
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-brand-dark pt-32 md:pt-40 pb-16 md:pb-24 px-4 md:px-6 text-center">
        <FluidBackgroundUltraVioletStatic />
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '800px',
            height: '800px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,47,201,0.15) 0%, rgba(139,47,201,0) 70%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="font-body text-brand-purple text-[13px] font-semibold uppercase tracking-[0.08em] mb-4">
            About Us
          </p>
          <h1 className="font-heading font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] mb-6">
            We help businesses compete on their own terms.
          </h1>
          <p className="font-body text-white/60 text-base md:text-xl max-w-2xl mx-auto leading-[1.7]">
            Honed Ops was built for the businesses that don&apos;t have a
            dedicated IT team or a venture-backed budget — but still want to win.
          </p>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="bg-brand-light py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text first on mobile */}
          <div>
            <p className="font-body text-brand-purple text-[13px] font-semibold uppercase tracking-[0.08em] mb-4">
              Our Mission
            </p>
            <h2 className="font-heading font-bold text-brand-dark text-3xl md:text-4xl tracking-[-0.02em] mb-6 leading-[1.1]">
              Level the playing field for small business.
            </h2>
            <p className="font-body text-brand-muted text-[17px] leading-[1.8] mb-6">
              Large companies have entire technology departments. Small businesses have the owner
              doing everything. That gap shows up in efficiency, cost, and competitive capability —
              and most small businesses don&apos;t have the time or expertise to close it.
            </p>
            <p className="font-body text-brand-muted text-[17px] leading-[1.8]">
              We exist to close it. We bring the same analytical rigor and custom technology that
              enterprise businesses take for granted — to the businesses that need it most.
            </p>
          </div>

          {/* Value cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[rgba(139,47,201,0.08)] flex items-center justify-center mb-3">
                  <Icon size={18} className="text-brand-purple" />
                </div>
                <p className="font-heading font-bold text-brand-dark text-[15px] mb-1">{title}</p>
                <p className="font-body text-brand-muted text-[13px] leading-[1.5]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="bg-white py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <p className="font-body text-brand-purple text-[13px] font-semibold uppercase tracking-[0.08em] mb-4">
              The Team
            </p>
            <h2 className="font-heading font-bold text-brand-dark text-3xl md:text-4xl tracking-[-0.02em]">
              Small team. Big results.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-brand-light border border-[#E5E7EB] rounded-2xl p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[rgba(139,47,201,0.1)] flex items-center justify-center mx-auto mb-4">
                <span className="font-heading font-bold text-brand-purple text-xl">EW</span>
              </div>
              <p className="font-heading font-bold text-brand-dark text-[17px] mb-1">Edgerrin Washington</p>
              <p className="font-body text-brand-purple text-[13px] font-semibold mb-3">Founder</p>
              <p className="font-body text-brand-muted text-[13px] leading-[1.6]">
                Strategy, technology, and operations. Edgerrin works directly with every client
                from audit through delivery.
              </p>
            </div>

            <div className="bg-brand-light border border-dashed border-[#E5E7EB] rounded-2xl p-6 flex flex-col items-center justify-center min-h-[200px]">
              <div className="w-16 h-16 rounded-full bg-[rgba(139,47,201,0.05)] border border-dashed border-[rgba(139,47,201,0.2)] flex items-center justify-center mx-auto mb-4">
                <span className="font-heading font-bold text-brand-purple/40 text-xl">+</span>
              </div>
              <p className="font-body text-brand-muted text-sm text-center">Growing team — stay tuned.</p>
            </div>

            <div className="bg-brand-light border border-dashed border-[#E5E7EB] rounded-2xl p-6 flex flex-col items-center justify-center min-h-[200px]">
              <div className="w-16 h-16 rounded-full bg-[rgba(139,47,201,0.05)] border border-dashed border-[rgba(139,47,201,0.2)] flex items-center justify-center mx-auto mb-4">
                <span className="font-heading font-bold text-brand-purple/40 text-xl">+</span>
              </div>
              <p className="font-body text-brand-muted text-sm text-center">Growing team — stay tuned.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How We Work ── */}
      <section className="bg-brand-dark py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 md:mb-12">
            <p className="font-body text-brand-purple text-[13px] font-semibold uppercase tracking-[0.08em] mb-4">
              How We Work
            </p>
            <h2 className="font-heading font-bold text-white text-3xl md:text-4xl tracking-[-0.02em]">
              Four steps. No surprises.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map(({ n, title, body }) => (
              <div
                key={n}
                className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 md:p-8"
              >
                <p className="font-heading font-bold text-brand-purple text-[13px] mb-3">{n}</p>
                <h3 className="font-heading font-bold text-white text-xl mb-3">{title}</h3>
                <p className="font-body text-white/50 text-[15px] leading-[1.7]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-brand-purple py-16 md:py-20 px-4 md:px-6 text-center">
        <h2 className="font-heading font-bold text-white text-3xl md:text-4xl tracking-[-0.02em] mb-4">
          Ready to see what we can do for your business?
        </h2>
        <p className="font-body text-white/80 text-base md:text-lg max-w-xl mx-auto leading-[1.7] mb-8">
          Start with a free consultation. No pitch, no commitment — just an honest look at where
          you stand.
        </p>
        <Link
          href="/contact"
          className="inline-block font-heading font-bold text-base text-brand-purple bg-white px-8 py-4 rounded-xl hover:bg-white/90 transition-colors w-full sm:w-auto text-center"
        >
          Get a Free Consultation
        </Link>
      </section>
    </div>
  )
}
