import Link from 'next/link'
import {
  Globe, Cpu, LayoutDashboard, FileText,
  Users, Mail, Map, Shield,
} from 'lucide-react'

const replacedPlatforms = [
  {
    name: 'Thryv',
    cost: '$300+/month',
    body: 'CRM, scheduling, and customer communication. Replaced by the custom admin dashboard and automated email system.',
  },
  {
    name: 'JobFlow',
    cost: '$200+/month',
    body: 'Job management platform. Replaced by a custom pipeline with role-based access for admin, sales, crew leaders, and crew.',
  },
  {
    name: 'Bluehost',
    cost: '$50+/month',
    body: 'Web hosting for a generic website. Replaced by a custom-built Next.js site optimized for local SEO and lead generation.',
  },
]

const builtItems = [
  {
    Icon: Globe,
    title: 'Custom Website',
    body: 'Built from scratch on Next.js, optimized for local SEO across six North Georgia counties.',
  },
  {
    Icon: Cpu,
    title: 'AI Assessment Tool',
    body: 'Customers upload tree photos and get an instant species ID, hazard flags, and service recommendation.',
  },
  {
    Icon: LayoutDashboard,
    title: 'Admin Dashboard',
    body: 'Full CRM with role-based access — admin, sales, crew leaders, and crew each see only what they need.',
  },
  {
    Icon: FileText,
    title: 'Digital Quote Builder',
    body: 'Replaces paper contracts with a mobile quote tool including site mapping, equipment lists, and digital signature.',
  },
  {
    Icon: Users,
    title: 'Customer Portal',
    body: 'Customers track jobs, review quotes, accept or decline, and message the office directly.',
  },
  {
    Icon: Mail,
    title: 'Automated Email System',
    body: '6-email sequence from submission through job completion and 30-day re-engagement.',
  },
  {
    Icon: Map,
    title: 'Site Mapping Tool',
    body: 'Sales agents drop pins on satellite imagery during site visits — replaces hand-drawn property maps.',
  },
  {
    Icon: Shield,
    title: 'Role-Based Permissions',
    body: 'Master, admin, sales, crew leader, and crew member roles with appropriate access levels.',
  },
]

export default function WorkPage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-brand-dark pt-40 pb-24 px-6 text-center">
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
            Our Work
          </p>
          <h1 className="font-heading font-bold text-white text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.02em] mb-6">
            The proof is in the work.
          </h1>
          <p className="font-body text-white/60 text-xl max-w-2xl mx-auto leading-[1.7]">
            We don&apos;t make promises we can&apos;t back up. Here&apos;s what we&apos;ve
            actually built and what it replaced.
          </p>
        </div>
      </section>

      {/* ── Case Study: Gordon Pro ── */}
      <section className="bg-brand-light py-24 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex justify-between items-start flex-wrap gap-6 mb-16">
            <div>
              <p className="font-body text-brand-purple text-xs font-semibold uppercase tracking-widest mb-3">
                Case Study — 01
              </p>
              <h2 className="font-heading font-bold text-brand-dark text-[44px] tracking-[-0.02em] mb-4 leading-[1.05]">
                Gordon Pro<br />Tree Service
              </h2>
              <div className="flex flex-wrap gap-6 font-body text-brand-muted text-sm">
                <span>Industry: Tree Service</span>
                <span>Location: North Georgia</span>
                <span>Service: Build</span>
              </div>
            </div>
            <div className="bg-[rgba(139,47,201,0.08)] border border-[rgba(139,47,201,0.2)] rounded-2xl px-6 py-4 text-center">
              <p className="font-heading font-bold text-brand-purple text-[36px] leading-none">
                $2–3K
              </p>
              <p className="font-body text-brand-purple text-[13px] mt-1">
                saved per month
              </p>
            </div>
          </div>

          {/* The Challenge */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm mb-16">
            <p className="font-body text-brand-purple text-[11px] font-semibold uppercase tracking-widest mb-4">
              The Challenge
            </p>
            <p className="font-body text-[#4A4A4A] text-base leading-[1.8]">
              Gordon Pro Tree Service was running their business across multiple disconnected
              platforms — Thryv for CRM and customer communication, JobFlow for job management,
              and Bluehost for web hosting. Combined these tools were costing $2,000 to $3,000
              per month and required constant manual work to keep synchronized.
            </p>
            <p className="font-body text-[#4A4A4A] text-base leading-[1.8] mt-4">
              On top of the software costs the sales process relied entirely on paper contracts
              — sales agents would drive to job sites, draw maps of the property by hand, and
              fill out contracts manually. No digital record. No automation. No visibility
              for the customer.
            </p>
          </div>

          {/* What Was Replaced */}
          <div className="mb-16">
            <h3 className="font-heading font-bold text-brand-dark text-[22px] mb-6">
              What Was Replaced
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {replacedPlatforms.map(({ name, cost, body }) => (
                <div
                  key={name}
                  className="bg-white rounded-2xl border border-[#E5E7EB] border-t-[3px] p-6 shadow-sm"
                  style={{ borderTopColor: '#E5E7EB' }}
                >
                  <p className="font-heading font-bold text-brand-dark text-lg mb-2">{name}</p>
                  <p className="font-body text-[#E24B4A] text-sm font-semibold mb-3">{cost}</p>
                  <p className="font-body text-brand-muted text-sm leading-[1.6]">{body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What Was Built */}
          <div className="mb-16">
            <h3 className="font-heading font-bold text-brand-dark text-[22px] mb-6">
              What Was Built
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {builtItems.map(({ Icon, title, body }) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm flex gap-4 items-start"
                >
                  <div className="w-10 h-10 rounded-xl bg-[rgba(139,47,201,0.08)] flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-brand-purple" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-brand-dark text-[15px] mb-1">{title}</p>
                    <p className="font-body text-brand-muted text-[13px] leading-[1.5]">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The Result */}
          <div className="bg-brand-dark rounded-2xl p-10">
            <p className="font-body text-white/30 text-[11px] uppercase tracking-widest mb-6">
              The Result
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <p className="font-heading font-bold text-white text-[42px] leading-none">$2–3K</p>
                <p className="font-body text-white/50 text-sm mt-2 leading-relaxed">
                  saved in monthly software costs
                </p>
              </div>
              <div>
                <p className="font-heading font-bold text-white text-[42px] leading-none">3 platforms</p>
                <p className="font-body text-white/50 text-sm mt-2 leading-relaxed">
                  replaced by one custom system
                </p>
              </div>
              <div>
                <p className="font-heading font-bold text-white text-[42px] leading-none">100% custom</p>
                <p className="font-body text-white/50 text-sm mt-2 leading-relaxed">
                  built for how Gordon Pro actually operates
                </p>
              </div>
            </div>
            <div className="border-t border-white/[0.08] pt-8">
              <p className="font-body text-white/50 text-base max-w-3xl leading-[1.8]">
                Gordon Pro went from a fragmented stack of expensive tools and paper contracts
                to a fully integrated system built around how they actually work. The sales team
                creates digital quotes on-site. Customers track their jobs in real time. The
                office manages everything from one dashboard.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── More Coming Soon ── */}
      <section className="bg-white py-20 px-6 text-center">
        <h2 className="font-heading font-bold text-brand-dark text-[36px] tracking-[-0.02em] mb-4">
          More case studies coming soon.
        </h2>
        <p className="font-body text-brand-muted text-[17px] max-w-lg mx-auto leading-[1.7] mb-8">
          We&apos;re early. Gordon Pro is the first of many. If you want to be next,
          start with a free consultation.
        </p>
        <Link
          href="/contact"
          className="inline-block font-heading font-bold text-[15px] text-white bg-brand-purple px-7 py-3.5 rounded-xl hover:bg-[#7A28B8] transition-colors"
        >
          Book a Free Consultation
        </Link>
      </section>
    </div>
  )
}
