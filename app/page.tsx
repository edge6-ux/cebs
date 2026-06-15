import type { Metadata } from 'next'
import Link from 'next/link'
import {
  DollarSign, Puzzle, Clock,
  Wrench, Utensils, TreePine, Building2, Car, Heart, Scale, Zap,
  Sparkles, Lock,
} from 'lucide-react'
import NetworkBackground from '@/components/home/NetworkBackground'

export const metadata: Metadata = {
  title: { absolute: 'Honed Ops — Operate With An edge' },
  description: 'Custom technology and strategy for local businesses. Websites, automation, AI tools, and operations systems built around how your business actually works.',
  alternates: { canonical: 'https://honedops.com' },
}

export default function Home() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Honed Ops',
            url: 'https://honedops.com',
            email: 'contact@honedops.com',
            description: 'Custom technology and strategy for local businesses.',
            slogan: 'Operate With An edge',
            areaServed: 'United States',
            serviceType: [
              'Web Design',
              'Business Automation',
              'AI Tools',
              'Operations Consulting',
            ],
            knowsAbout: [
              'Local Business Technology',
              'Website Development',
              'Business Process Automation',
              'Artificial Intelligence',
              'Local SEO',
            ],
          }),
        }}
      />
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden min-h-screen px-6 py-24"
        style={{ backgroundColor: '#070b12' }}
      >
        <NetworkBackground />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-14 items-center">

          {/* LEFT — copy */}
          <div className="flex flex-col items-start gap-8">

            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4a0] animate-pulse" />
              <span className="font-body text-white/50 text-[13px] font-semibold uppercase tracking-[0.1em]">
                Business Technology &amp; Strategy
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-heading font-bold leading-[1.05] tracking-[-0.02em] text-[44px] lg:text-[64px]">
              <span className="text-white">Operate with</span>
              <br />
              <span className="text-[#00d4a0]">an edge.</span>
            </h1>

            {/* Subheadline */}
            <p className="font-body text-white/60 text-[18px] leading-[1.7] max-w-md">
              Custom technology and strategy for local businesses ready to cut waste, save time, and grow revenue.
            </p>

            {/* Stats row */}
            <div className="flex gap-4 sm:gap-8">
              {[
                { value: '22+', label: 'Services offered' },
                { value: 'Free', label: 'Initial consultation' },
                { value: '5+', label: 'Solution categories' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-heading font-bold text-white text-[28px]">{value}</p>
                  <p className="font-body text-white/40 text-[11px] sm:text-[13px] mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/intake"
                className="font-heading font-bold text-[15px] text-white bg-gradient-to-r from-[#1a8fff] to-[#00d4a0] hover:brightness-110 px-8 py-4 rounded-xl uppercase transition-all duration-150"
              >
                Get a Free Consultation
              </Link>
              <Link
                href="/solutions"
                className="font-heading font-bold text-[15px] text-white bg-transparent border border-white/20 hover:border-white/40 hover:bg-white/5 px-8 py-4 rounded-xl uppercase transition-all duration-150"
              >
                See Our Solutions →
              </Link>
            </div>
          </div>

          {/* RIGHT — dashboard mockup */}
          <div className="relative lg:-mt-8 hidden lg:block">
            {/* Glow behind browser */}
            <div
              aria-hidden="true"
              className="absolute pointer-events-none"
              style={{
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(0,212,160,0.3) 0%, transparent 70%)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                filter: 'blur(60px)',
              }}
            />

            {/* Browser frame */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                backgroundColor: '#1A1A1A',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
              }}
            >
              {/* Browser chrome */}
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{
                  backgroundColor: '#111111',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FEBC2E' }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#28C840' }} />
                </div>
                <div
                  className="flex-1 flex items-center gap-2 rounded-lg px-3 py-1.5"
                  style={{ backgroundColor: '#0D0D0D' }}
                >
                  <Lock size={10} className="text-white/30" />
                  <span className="font-body text-white/30 text-[12px]">app.honedops.com/dashboard</span>
                </div>
              </div>

              {/* Dashboard — sidebar + main */}
              <div style={{ display: 'flex', backgroundColor: '#f0f2f5' }}>

                {/* Sidebar */}
                <div style={{ width: '165px', backgroundColor: '#0D0A1A', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '14px', borderBottom: '0.5px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: '9px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#00d4a0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Sparkles size={13} className="text-white" />
                    </div>
                    <div>
                      <div className="font-heading" style={{ fontSize: '13px', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Honed Ops</div>
                      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>Dashboard</div>
                    </div>
                  </div>
                  <div style={{ padding: '10px 9px', flex: 1 }}>
                    <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.25)', padding: '0 6px', marginTop: '8px', marginBottom: '5px' }}>Main</div>
                    {[
                      { label: 'Dashboard', active: true },
                      { label: 'Customers', badge: '8' },
                      { label: 'Jobs' },
                      { label: 'Invoices', badge: '3' },
                      { label: 'Reports' },
                    ].map(({ label, active, badge }) => (
                      <div
                        key={label}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '6px 9px', borderRadius: '6px', fontSize: '12px', marginBottom: '2px', cursor: 'default',
                          color: active ? '#fff' : 'rgba(255,255,255,0.5)',
                          backgroundColor: active ? 'rgba(0,212,160,0.3)' : 'transparent',
                        }}
                      >
                        <span>{label}</span>
                        {badge && (
                          <span style={{ backgroundColor: '#00d4a0', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '1px 6px', borderRadius: '8px' }}>{badge}</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '10px 9px', borderTop: '0.5px solid rgba(255,255,255,0.07)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 6px' }}>
                      <div style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#00d4a0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>MC</div>
                      <div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>M. Cole</div>
                        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>Owner</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main area */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                  {/* Topbar */}
                  <div style={{ backgroundColor: '#fff', borderBottom: '0.5px solid #e2e8f0', padding: '0 16px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                    <div className="font-heading" style={{ fontSize: '14px', fontWeight: 700, color: '#0D0D0D' }}>Service Dashboard</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '11px', color: '#888' }}>Jun 2, 2026</span>
                      <div style={{ backgroundColor: '#00d4a0', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '6px' }}>+ New</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '16px 18px', overflow: 'hidden' }}>

                    {/* KPI row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginBottom: '12px' }}>
                      {[
                        { label: 'Revenue', value: '$24.8k', trend: '+18%', up: true },
                        { label: 'Customers', value: '47', trend: '+5', up: true },
                        { label: 'Jobs', value: '18', trend: '+4', up: true },
                        { label: 'Outstanding', value: '$2.1k', trend: '2 open', up: false },
                      ].map(({ label, value, trend, up }) => (
                        <div key={label} style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '13px', border: '0.5px solid #e2e8f0' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '7px' }}>
                            <span style={{ fontSize: '10px', fontWeight: 700, color: up ? '#16a34a' : '#d97706', backgroundColor: up ? '#dcfce7' : '#fef3c7', borderRadius: '7px', padding: '2px 6px' }}>{trend}</span>
                          </div>
                          <div className="font-heading" style={{ fontSize: '22px', fontWeight: 700, color: '#0D0D0D', lineHeight: 1, marginBottom: '4px' }}>{value}</div>
                          <div style={{ fontSize: '11px', color: '#888' }}>{label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom panels */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '10px' }}>

                      {/* Projects table */}
                      <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '13px', border: '0.5px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '9px' }}>
                          <div>
                            <div className="font-heading" style={{ fontSize: '12px', fontWeight: 700, color: '#0D0D0D' }}>Active jobs</div>
                            <div style={{ fontSize: '10px', color: '#aaa' }}>Next 7 days</div>
                          </div>
                          <span style={{ fontSize: '10px', backgroundColor: '#dbeafe', color: '#1e40af', fontWeight: 700, padding: '3px 8px', borderRadius: '8px' }}>8 active</span>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr>
                              {(['Customer', 'Status', 'Value'] as const).map((h, i) => (
                                <th key={h} style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#aaa', fontWeight: 600, paddingBottom: '7px', textAlign: i === 2 ? 'right' : 'left', borderBottom: '0.5px solid #f0f0f0' }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { client: 'Henderson Home', type: 'HVAC tune-up', status: 'In progress', sBg: '#dcfce7', sColor: '#166534', value: '$380' },
                              { client: 'Oakwood Plaza', type: 'Plumbing repair', status: 'Scheduled', sBg: '#dbeafe', sColor: '#1e40af', value: '$840' },
                              { client: 'Torres Residence', type: 'Electrical install', status: 'In Review', sBg: '#fef3c7', sColor: '#92400e', value: '$2,200' },
                              { client: 'Kim Residence', type: 'Appliance repair', status: 'Completed', sBg: '#f1f5f9', sColor: '#64748b', value: '$520' },
                            ].map((row) => (
                              <tr key={row.client}>
                                <td style={{ padding: '6px 0', borderBottom: '0.5px solid #f5f5f5', fontSize: '11px', color: '#333', fontWeight: 500 }}>
                                  {row.client}
                                  <span style={{ display: 'block', fontSize: '10px', color: '#aaa', fontWeight: 400 }}>{row.type}</span>
                                </td>
                                <td style={{ padding: '6px 0', borderBottom: '0.5px solid #f5f5f5' }}>
                                  <span style={{ fontSize: '10px', padding: '2px 7px', borderRadius: '8px', fontWeight: 600, backgroundColor: row.sBg, color: row.sColor, whiteSpace: 'nowrap' as const }}>{row.status}</span>
                                </td>
                                <td style={{ padding: '6px 0', borderBottom: '0.5px solid #f5f5f5', fontSize: '11px', fontWeight: 700, color: '#0D0D0D', textAlign: 'right' as const }}>{row.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Lead pipeline */}
                      <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '13px', border: '0.5px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '9px' }}>
                          <div>
                            <div className="font-heading" style={{ fontSize: '12px', fontWeight: 700, color: '#0D0D0D' }}>Lead pipeline</div>
                            <div style={{ fontSize: '10px', color: '#aaa' }}>$28.6k potential</div>
                          </div>
                          <span style={{ fontSize: '10px', backgroundColor: '#fef3c7', color: '#92400e', fontWeight: 700, padding: '3px 8px', borderRadius: '8px' }}>7 leads</span>
                        </div>
                        {[
                          { init: 'RW', bg: '#dc2626', name: 'R. Walsh', type: 'Full HVAC system', value: '$6,800', heat: 'Hot' },
                          { init: 'SB', bg: '#d97706', name: 'S. Burke', type: 'Bathroom remodel', value: '$4,900', heat: 'Hot' },
                          { init: 'JM', bg: '#2563eb', name: 'J. Morales', type: 'Kitchen plumbing', value: '$3,400', heat: 'Warm' },
                          { init: 'LP', bg: '#7c3aed', name: 'L. Park', type: 'Electrical rewire', value: '$2,800', heat: 'Warm' },
                          { init: 'TC', bg: '#64748b', name: 'T. Chen', type: 'HVAC maintenance', value: '$1,800', heat: 'Warm' },
                          { init: 'AR', bg: '#0891b2', name: 'A. Ross', type: 'Drain cleaning', value: '$480', heat: 'Cold' },
                        ].map((lead) => (
                          <div key={lead.init} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', borderBottom: '0.5px solid #f5f5f5' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: lead.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>{lead.init}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: '11px', fontWeight: 600, color: '#0D0D0D' }}>{lead.name}</div>
                              <div style={{ fontSize: '10px', color: '#aaa', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{lead.type}</div>
                            </div>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: '#0D0D0D' }}>{lead.value}</div>
                            <span style={{
                              fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '7px',
                              backgroundColor: lead.heat === 'Hot' ? '#fee2e2' : lead.heat === 'Warm' ? '#fef3c7' : '#dbeafe',
                              color: lead.heat === 'Hot' ? '#991b1b' : lead.heat === 'Warm' ? '#92400e' : '#1e40af',
                            }}>{lead.heat}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Problem Section ── */}
      <section className="bg-brand-light py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <p className="font-body text-brand-green text-[13px] font-semibold uppercase tracking-widest mb-4">
              The Problem
            </p>
            <h2 className="font-heading font-bold text-brand-dark text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] mb-6">
              Most small businesses are overpaying for tools that don&apos;t work together.
            </h2>
            <p className="font-body text-brand-muted text-base md:text-lg max-w-2xl mx-auto leading-[1.7]">
              The average small business runs 6 to 8 separate software subscriptions. They
              don&apos;t integrate. Nobody fully understands them. And the business pays for all
              of it every single month.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[rgba(0,212,160,0.08)] flex items-center justify-center">
                <DollarSign size={22} className="text-brand-green" />
              </div>
              <h3 className="font-heading font-bold text-brand-dark text-xl mt-5 mb-3">
                Overpaying
              </h3>
              <p className="font-body text-brand-muted text-[15px] leading-[1.7]">
                Multiple subscriptions charging $50–$300/month each for tools that duplicate
                each other&apos;s functionality.
              </p>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[rgba(0,212,160,0.08)] flex items-center justify-center">
                <Puzzle size={22} className="text-brand-green" />
              </div>
              <h3 className="font-heading font-bold text-brand-dark text-xl mt-5 mb-3">
                Disconnected
              </h3>
              <p className="font-body text-brand-muted text-[15px] leading-[1.7]">
                Tools that don&apos;t talk to each other force manual work, create gaps, and
                cost time the business doesn&apos;t have.
              </p>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[rgba(0,212,160,0.08)] flex items-center justify-center">
                <Clock size={22} className="text-brand-green" />
              </div>
              <h3 className="font-heading font-bold text-brand-dark text-xl mt-5 mb-3">
                No Time to Fix It
              </h3>
              <p className="font-body text-brand-muted text-[15px] leading-[1.7]">
                Running a business leaves no bandwidth to audit, research, and implement
                better solutions. So nothing changes.
              </p>
            </div>
          </div>

          {/* Transition statement */}
          <div className="mt-16 md:mt-20 flex justify-center">
            <div className="bg-brand-dark rounded-2xl px-6 md:px-10 py-6 md:py-8 max-w-3xl w-full text-center">
              <p className="font-heading font-bold text-white text-xl md:text-2xl leading-[1.4]">
                That&apos;s what we fix.
              </p>
              <p className="font-body text-white/60 text-base mt-3 leading-relaxed">
                We come in, audit everything, cut what&apos;s wasteful, and build what&apos;s
                missing. The businesses we work with come out sharper, leaner, and harder to
                compete against.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Do ── */}
      <section id="what-we-do" className="bg-brand-dark py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <p className="font-body text-brand-blue text-[13px] font-semibold uppercase tracking-[0.08em] mb-4">
              What We Do
            </p>
            <h2 className="font-heading font-bold text-white text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] mb-6 max-w-3xl">
              Three ways we work with businesses.
            </h2>
            <p className="font-body text-white/50 text-base md:text-lg max-w-2xl leading-[1.7]">
              Every engagement starts with an honest assessment of where the business is.
              From there we go as deep as needed.
            </p>
          </div>

          {/* Service tier cards */}
          <div className="mt-10 md:mt-16 space-y-6">
            {/* 01 */}
            <Link
              href="/services"
              className="flex flex-col md:flex-row gap-6 md:gap-8 items-start bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 md:p-8 hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.15)] transition-all duration-200 cursor-pointer"
            >
              <div className="shrink-0">
                <span className="font-heading font-bold text-white/10 text-[56px] md:text-[80px] leading-none">01</span>
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center border border-brand-green bg-[rgba(0,212,160,0.1)] rounded-full px-3 py-1 mb-4">
                  <span className="font-body text-brand-green text-xs font-semibold">Audit &amp; Strategy</span>
                </div>
                <h3 className="font-heading font-bold text-white text-[22px] md:text-[26px] tracking-[-0.01em] mb-3">
                  We start with a free consultation.
                </h3>
                <p className="font-body text-white/50 text-base leading-[1.7] mb-5">
                  Before we recommend anything we look at what the business is actually spending
                  and what it&apos;s getting in return. Most businesses are surprised by what we find.
                </p>
                <span className="font-body text-brand-green text-sm font-medium hover:text-brand-green transition-colors">
                  Learn more →
                </span>
              </div>
            </Link>

            {/* 02 */}
            <Link
              href="/services"
              className="flex flex-col md:flex-row gap-6 md:gap-8 items-start bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 md:p-8 hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.15)] transition-all duration-200 cursor-pointer"
            >
              <div className="shrink-0">
                <span className="font-heading font-bold text-white/10 text-[56px] md:text-[80px] leading-none">02</span>
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center border border-brand-green bg-[rgba(0,212,160,0.1)] rounded-full px-3 py-1 mb-4">
                  <span className="font-body text-brand-green text-xs font-semibold">Optimize &amp; Consolidate</span>
                </div>
                <h3 className="font-heading font-bold text-white text-[22px] md:text-[26px] tracking-[-0.01em] mb-3">
                  We cut the waste and connect the gaps.
                </h3>
                <p className="font-body text-white/50 text-base leading-[1.7] mb-5">
                  We consolidate redundant tools, implement better alternatives, and connect
                  systems that should be talking to each other. Most clients see immediate
                  monthly savings.
                </p>
                <span className="font-body text-brand-green text-sm font-medium hover:text-brand-green transition-colors">
                  Learn more →
                </span>
              </div>
            </Link>

            {/* 03 */}
            <Link
              href="/services"
              className="flex flex-col md:flex-row gap-6 md:gap-8 items-start bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 md:p-8 hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.15)] transition-all duration-200 cursor-pointer"
            >
              <div className="shrink-0">
                <span className="font-heading font-bold text-white/10 text-[56px] md:text-[80px] leading-none">03</span>
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center border border-brand-green bg-[rgba(0,212,160,0.1)] rounded-full px-3 py-1 mb-4">
                  <span className="font-body text-brand-green text-xs font-semibold">Build</span>
                </div>
                <h3 className="font-heading font-bold text-white text-[22px] md:text-[26px] tracking-[-0.01em] mb-3">
                  We build what doesn&apos;t exist yet.
                </h3>
                <p className="font-body text-white/50 text-base leading-[1.7] mb-5">
                  When off-the-shelf solutions aren&apos;t enough we build custom software —
                  dashboards, portals, AI tools, and systems designed specifically for the business.
                </p>
                <span className="font-body text-brand-green text-sm font-medium hover:text-brand-green transition-colors">
                  Learn more →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-brand-green py-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            <div className="border border-white/20 rounded-2xl p-6 bg-white/[0.05] text-center">
              <p className="font-heading font-bold text-white text-[36px] md:text-[42px] leading-none">
                $1,000–$2,000
              </p>
              <p className="font-body text-white/70 text-[15px] mt-2 leading-relaxed">
                saved on average per month
              </p>
            </div>

            <div className="border border-white/20 rounded-2xl p-6 bg-white/[0.05] text-center">
              <p className="font-heading font-bold text-white text-[36px] md:text-[42px] leading-none">
                multiple platforms
              </p>
              <p className="font-body text-white/70 text-[15px] mt-2 leading-relaxed">
                replaced with integrated custom systems
              </p>
            </div>

            <div className="border border-white/20 rounded-2xl p-6 bg-white/[0.05] text-center">
              <p className="font-heading font-bold text-white text-[36px] md:text-[42px] leading-none">
                100% custom
              </p>
              <p className="font-body text-white/70 text-[15px] mt-2 leading-relaxed">
                built for the business, not the other way around
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who We Work With ── */}
      <section className="bg-brand-light py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <p className="font-body text-brand-blue text-[13px] font-semibold uppercase tracking-[0.08em] mb-4">
              Who We Work With
            </p>
            <h2 className="font-heading font-bold text-brand-dark text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] mb-6 max-w-2xl mx-auto">
              Built for businesses that are serious about winning.
            </h2>
            <p className="font-body text-brand-muted text-base md:text-lg max-w-xl mx-auto leading-[1.7]">
              We work with blue-collar industries, local operators, and owner-run companies
              that have real ambition and need real solutions.
            </p>
          </div>

          {/* Industry grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 md:mt-16">
            {[
              { Icon: Wrench,    label: 'Trades & Contractors' },
              { Icon: Utensils,  label: 'Restaurants & Hospitality' },
              { Icon: TreePine,  label: 'Home Services' },
              { Icon: Building2, label: 'Local Retail' },
              { Icon: Car,       label: 'Auto Services' },
              { Icon: Heart,     label: 'Health & Wellness' },
              { Icon: Scale,     label: 'Professional Services' },
              { Icon: Zap,       label: 'Any business ready to compete' },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-4 md:p-6 text-center hover:border-brand-green hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[rgba(0,212,160,0.08)] flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Icon size={20} className="text-brand-green" />
                </div>
                <p className="font-heading font-bold text-brand-dark text-[13px] md:text-[15px]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative overflow-hidden bg-brand-dark py-16 md:py-24 px-4 md:px-6 text-center">
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            bottom: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,212,160,0.15) 0%, rgba(0,212,160,0) 70%)',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="font-body text-brand-blue text-[13px] font-semibold uppercase tracking-[0.08em] mb-6">
            Get Started
          </p>
          <h2 className="font-heading font-bold text-white text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] mb-6">
            Find out what your business is leaving on the table.
          </h2>
          <p className="font-body text-white/60 text-base md:text-lg max-w-xl mx-auto leading-[1.7] mb-10">
            The audit is free. The conversation is honest. The results are real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="font-heading font-bold text-base text-white bg-brand-green px-8 py-4 rounded-xl hover:bg-[#00b88a] transition-colors duration-200 text-center"
            >
              Get Your Free Consultation
            </Link>
            <Link
              href="#what-we-do"
              className="font-heading text-base text-white border border-white/20 px-8 py-4 rounded-xl hover:border-white/40 hover:bg-white/5 transition-all duration-200 text-center"
            >
              What We Do
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}


