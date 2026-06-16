import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import NetworkBackground from '@/components/home/NetworkBackground'

export const metadata: Metadata = {
  title: 'Our Approach',
  description: 'Every engagement starts with an honest audit. We assess, optimize, and build — in that order.',
  alternates: { canonical: 'https://honedops.com/services' },
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex gap-3 items-start">
      <CheckCircle size={18} className="text-brand-green shrink-0 mt-0.5" />
      <span className="font-body text-[#4A4A4A] text-[15px] leading-[1.5]">{text}</span>
    </li>
  )
}

function CheckItemLight({ text }: { text: string }) {
  return (
    <li className="flex gap-3 items-start">
      <CheckCircle size={18} className="text-brand-green shrink-0 mt-0.5" />
      <span className="font-body text-white/70 text-[15px] leading-[1.5]">{text}</span>
    </li>
  )
}

export default function ServicesPage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-brand-dark pt-32 md:pt-40 pb-16 md:pb-24 px-4 md:px-6 text-center">
        <NetworkBackground />

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="font-body text-brand-blue text-[13px] font-semibold uppercase tracking-[0.08em] mb-4">
            Our Approach
          </p>
          <h1 className="font-heading font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] mb-6">
            Every engagement starts with the truth.
          </h1>
          <p className="font-body text-white/60 text-base md:text-xl max-w-2xl mx-auto leading-[1.7]">
            We don&apos;t sell packages. We assess what the business actually needs and work
            from there. Sometimes that starts with a consultation. Sometimes it&apos;s a full
            custom build. Usually it&apos;s both.
          </p>
        </div>
      </section>

      {/* ── 01 Audit & Strategy ── */}
      <section id="audit-strategy" className="scroll-mt-20 bg-brand-light py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: text */}
          <div>
            <p className="font-body text-brand-green font-bold text-[13px] mb-2">01</p>
            <h2 className="font-heading font-bold text-brand-dark text-3xl md:text-[40px] tracking-[-0.02em] mb-6">
              Audit &amp; Strategy
            </h2>
            <p className="font-body text-brand-muted text-[17px] leading-[1.8] mb-8">
              We review every tool, subscription, and workflow the business runs on. We map
              what&apos;s working, what&apos;s redundant, and what&apos;s missing entirely. Then
              we deliver a clear report with specific actionable recommendations.
              <br /><br />
              No commitment required. This is where every engagement starts.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Full software stack audit',
                'Monthly spend analysis',
                'Gap and redundancy report',
                'Specific tool recommendations',
                'Estimated monthly savings',
                'Proposed next steps',
              ].map((item) => <CheckItem key={item} text={item} />)}
            </ul>
          </div>

          {/* Right: detail card */}
          <div className="bg-brand-dark rounded-2xl p-6 md:p-8">
            <p className="font-body text-white/30 text-[11px] uppercase tracking-[0.08em] mb-6">
              What We Look At
            </p>
            <ol className="space-y-5">
              {[
                {
                  n: '1',
                  title: 'Current Tools',
                  body: 'Every subscription and what it actually costs',
                },
                {
                  n: '2',
                  title: 'Workflows',
                  body: 'How work moves through the business today',
                },
                {
                  n: '3',
                  title: 'Integrations',
                  body: 'What connects and what requires manual work',
                },
                {
                  n: '4',
                  title: 'Opportunities',
                  body: 'Where technology can save time and money',
                },
              ].map(({ n, title, body }, i, arr) => (
                <li
                  key={n}
                  className={`flex gap-4 items-start pb-5 ${i < arr.length - 1 ? 'border-b border-white/[0.06]' : ''}`}
                >
                  <div className="w-7 h-7 rounded-full border border-brand-green shrink-0 flex items-center justify-center">
                    <span className="font-heading font-bold text-brand-green text-xs">{n}</span>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-white text-sm mb-1">{title}</p>
                    <p className="font-body text-white/40 text-[13px] leading-[1.5]">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── 02 Optimize & Consolidate ── */}
      <section id="optimize-consolidate" className="scroll-mt-20 bg-white py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Results card — desktop: left col; mobile: below text */}
          <div className="order-2 lg:order-1 bg-[rgba(0,212,160,0.06)] border border-[rgba(0,212,160,0.15)] rounded-2xl p-6 md:p-8">
            <p className="font-body text-brand-blue text-[11px] uppercase tracking-[0.08em] mb-8">
              Typical Results
            </p>
            <div className="space-y-8">
              <div>
                <p className="font-heading font-bold text-brand-green text-3xl md:text-[42px] leading-none">
                  30–50%
                </p>
                <p className="font-body text-brand-muted text-sm mt-2 leading-[1.5]">
                  reduction in monthly software spend
                </p>
              </div>
              <div>
                <p className="font-heading font-bold text-brand-green text-3xl md:text-[42px] leading-none">
                  2–3 systems
                </p>
                <p className="font-body text-brand-muted text-sm mt-2 leading-[1.5]">
                  integrated, instead of fragmented processes
                </p>
              </div>
              <div>
                <p className="font-heading font-bold text-brand-green text-3xl md:text-[42px] leading-none">
                  Hours back
                </p>
                <p className="font-body text-brand-muted text-sm mt-2 leading-[1.5]">
                  every week from eliminated manual work
                </p>
              </div>
            </div>
          </div>

          {/* Text — desktop: right col; mobile: first */}
          <div className="order-1 lg:order-2">
            <p className="font-body text-brand-green font-bold text-[13px] mb-2">02</p>
            <h2 className="font-heading font-bold text-brand-dark text-3xl md:text-[40px] tracking-[-0.02em] mb-6">
              Optimize &amp; Consolidate
            </h2>
            <p className="font-body text-brand-muted text-[17px] leading-[1.8] mb-8">
              Once we know what the business is working with we get to work. We implement
              better tools, eliminate redundant subscriptions, and connect systems that should
              have been talking to each other from the start.
              <br /><br />
              For most businesses this phase alone pays for itself within the first month.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Tool consolidation and migration',
                'Subscription cancellation and renegotiation',
                'Workflow automation setup',
                'System integration and data syncing',
                'Team training and handoff',
                '30-day follow-up support',
              ].map((item) => <CheckItem key={item} text={item} />)}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 03 Build ── */}
      <section id="build" className="scroll-mt-20 bg-brand-dark py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: text */}
          <div>
            <p className="font-body text-white/30 font-bold text-[13px] mb-2">03</p>
            <h2 className="font-heading font-bold text-white text-3xl md:text-[40px] tracking-[-0.02em] mb-6">
              Build
            </h2>
            <p className="font-body text-white/50 text-[17px] leading-[1.8] mb-8">
              For businesses that have outgrown what&apos;s available off the shelf we build from
              scratch. Custom software designed for the specific business — not adapted from a
              generic template.
              <br /><br />
              This is where the real edge is created. When a competitor can&apos;t
              replicate what you have because it was built specifically for you.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Custom web applications',
                'Admin and operations dashboards',
                'Customer portals and account systems',
                'AI-powered tools and automations',
                'Booking and scheduling systems',
                "Anything the business needs that doesn't exist yet",
              ].map((item) => <CheckItemLight key={item} text={item} />)}
            </ul>
          </div>

          {/* Right: case study card */}
          <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 md:p-8">
            <p className="font-body text-white/30 text-[11px] uppercase tracking-[0.08em] mb-6">
              Recent Build
            </p>
            <p className="font-body text-brand-green text-[13px] font-semibold mb-6">
              Gordon Pro Tree Service
            </p>
            <ul className="space-y-4">
              {[
                'AI-powered tree assessment app with dual customer and operator outputs',
                'Full admin dashboard replacing Thryv, FobFlo, and Bluehost',
                'Customer portal with job tracking, quotes, and direct messaging',
                'Saved $2,000–$3,000/month in software costs',
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green shrink-0 mt-2" />
                  <span className="font-body text-white/60 text-sm leading-[1.6]">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/work"
              className="block mt-6 font-body text-brand-green text-sm font-medium hover:text-brand-green transition-colors"
            >
              Read the full case study →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-brand-green py-16 md:py-20 px-4 md:px-6 text-center">
        <h2 className="font-heading font-bold text-white text-3xl md:text-[40px] tracking-[-0.02em] mb-4">
          Not sure which tier fits your business?
        </h2>
        <p className="font-body text-white/80 text-base md:text-lg max-w-xl mx-auto leading-[1.7] mb-8">
          Start with a free consultation. We&apos;ll review where your business stands
          and show you exactly where we can make the biggest impact.
        </p>
        <Link
          href="/contact"
          className="inline-block font-heading font-bold text-base text-brand-green bg-white px-8 py-4 rounded-xl hover:bg-white/90 transition-colors w-full sm:w-auto text-center"
        >
          Get a Free Consultation
        </Link>
      </section>
    </div>
  )
}


