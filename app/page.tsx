import Link from 'next/link'
import HeroParticles from '@/components/home/HeroParticles'
import {
  ChevronDown, DollarSign, Puzzle, Clock, Search, Code2, TrendingDown,
  Wrench, Utensils, TreePine, Building2, Car, Heart, Scale, Zap,
} from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-brand-dark min-h-screen">
        {/* Glow — top center, purple */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '900px',
            height: '900px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(139,47,201,0.18) 0%, rgba(139,47,201,0) 70%)',
          }}
        />
        {/* Glow — bottom left, purple softer */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: '-10%',
            left: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(139,47,201,0.10) 0%, rgba(139,47,201,0) 70%)',
          }}
        />
        {/* Glow — top right, magenta accent */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-5%',
            right: '-5%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(224,64,251,0.07) 0%, rgba(224,64,251,0) 70%)',
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Particles */}
        <HeroParticles />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-4 md:px-6 pt-32 md:pt-40 pb-16 max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 border border-[rgba(139,47,201,0.4)] bg-[rgba(139,47,201,0.08)] rounded-full px-4 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
            <span className="font-body text-white/70 text-[13px] font-medium">
              Custom Technology &amp; Strategy
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading mb-6">
            <span className="block text-lg md:text-2xl font-medium text-white/50 tracking-normal mb-3">
              Give your business a
            </span>
            <span className="block font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em]">
              competitive{' '}
              <span className="text-brand-purple relative inline-block">
                edge
                <span
                  className="absolute left-0 w-full h-[4px] rounded-sm"
                  style={{
                    bottom: '-6px',
                    background: 'linear-gradient(90deg, #8B2FC9, #E040FB)',
                  }}
                />
              </span>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="font-body text-white/60 text-base md:text-xl leading-[1.6] mb-10 max-w-2xl mx-auto">
            Custom technology and strategy for businesses that want a competitive edge.
            No fluff. Just results.
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <Link
              href="/contact"
              className="font-heading font-bold text-base text-white bg-brand-purple px-8 py-4 rounded-xl hover:bg-[#7A28B8] hover:-translate-y-px transition-all duration-200 text-center"
            >
              Book a Free Consultation
            </Link>
            <Link
              href="/work"
              className="font-heading text-base text-white bg-transparent border border-white/20 px-8 py-4 rounded-xl hover:border-white/40 hover:bg-white/5 transition-all duration-200 text-center"
            >
              See Our Work
            </Link>
          </div>

          {/* Service tags */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-2">
              <Search size={13} className="text-brand-purple" />
              <span className="font-body text-white/60 text-[13px]">Audit &amp; Strategy</span>
            </div>
            <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-2">
              <Code2 size={13} className="text-brand-purple" />
              <span className="font-body text-white/60 text-[13px]">Custom Builds</span>
            </div>
            <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-2">
              <TrendingDown size={13} className="text-brand-purple" />
              <span className="font-body text-white/60 text-[13px]">Cost Reduction</span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-12 flex flex-col items-center gap-2">
            <span className="font-body text-white/30 text-xs uppercase tracking-widest">
              Scroll
            </span>
            <ChevronDown size={20} className="text-white/30 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-brand-purple py-12 px-4 md:px-6">
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

      {/* ── Problem Section ── */}
      <section className="bg-brand-light py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <p className="font-body text-brand-purple text-[13px] font-semibold uppercase tracking-widest mb-4">
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
              <div className="w-12 h-12 rounded-xl bg-[rgba(139,47,201,0.08)] flex items-center justify-center">
                <DollarSign size={22} className="text-brand-purple" />
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
              <div className="w-12 h-12 rounded-xl bg-[rgba(139,47,201,0.08)] flex items-center justify-center">
                <Puzzle size={22} className="text-brand-purple" />
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
              <div className="w-12 h-12 rounded-xl bg-[rgba(139,47,201,0.08)] flex items-center justify-center">
                <Clock size={22} className="text-brand-purple" />
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
      <section className="bg-brand-dark py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <p className="font-body text-brand-purple text-[13px] font-semibold uppercase tracking-[0.08em] mb-4">
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
                <div className="inline-flex items-center border border-brand-purple bg-[rgba(139,47,201,0.1)] rounded-full px-3 py-1 mb-4">
                  <span className="font-body text-brand-purple text-xs font-semibold">Audit &amp; Strategy</span>
                </div>
                <h3 className="font-heading font-bold text-white text-[22px] md:text-[26px] tracking-[-0.01em] mb-3">
                  We start with a free consultation.
                </h3>
                <p className="font-body text-white/50 text-base leading-[1.7] mb-5">
                  Before we recommend anything we look at what the business is actually spending
                  and what it&apos;s getting in return. Most businesses are surprised by what we find.
                </p>
                <span className="font-body text-brand-purple text-sm font-medium hover:text-brand-magenta transition-colors">
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
                <div className="inline-flex items-center border border-brand-magenta bg-[rgba(224,64,251,0.1)] rounded-full px-3 py-1 mb-4">
                  <span className="font-body text-brand-magenta text-xs font-semibold">Optimize &amp; Consolidate</span>
                </div>
                <h3 className="font-heading font-bold text-white text-[22px] md:text-[26px] tracking-[-0.01em] mb-3">
                  We cut the waste and connect the gaps.
                </h3>
                <p className="font-body text-white/50 text-base leading-[1.7] mb-5">
                  We consolidate redundant tools, implement better alternatives, and connect
                  systems that should be talking to each other. Most clients see immediate
                  monthly savings.
                </p>
                <span className="font-body text-brand-purple text-sm font-medium hover:text-brand-magenta transition-colors">
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
                <div className="inline-flex items-center border border-brand-purple bg-[rgba(139,47,201,0.1)] rounded-full px-3 py-1 mb-4">
                  <span className="font-body text-brand-purple text-xs font-semibold">Build</span>
                </div>
                <h3 className="font-heading font-bold text-white text-[22px] md:text-[26px] tracking-[-0.01em] mb-3">
                  We build what doesn&apos;t exist yet.
                </h3>
                <p className="font-body text-white/50 text-base leading-[1.7] mb-5">
                  When off-the-shelf solutions aren&apos;t enough we build custom software —
                  dashboards, portals, AI tools, and systems designed specifically for the business.
                </p>
                <span className="font-body text-brand-purple text-sm font-medium hover:text-brand-magenta transition-colors">
                  Learn more →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Who We Work With ── */}
      <section className="bg-brand-light py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <p className="font-body text-brand-purple text-[13px] font-semibold uppercase tracking-[0.08em] mb-4">
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
                className="bg-white border border-[#E5E7EB] rounded-2xl p-4 md:p-6 text-center hover:border-brand-purple hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[rgba(139,47,201,0.08)] flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Icon size={20} className="text-brand-purple" />
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
            background: 'radial-gradient(circle, rgba(139,47,201,0.15) 0%, rgba(139,47,201,0) 70%)',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="font-body text-brand-purple text-[13px] font-semibold uppercase tracking-[0.08em] mb-6">
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
              className="font-heading font-bold text-base text-white bg-brand-purple px-8 py-4 rounded-xl hover:bg-[#7A28B8] transition-colors duration-200 text-center"
            >
              Get Your Free Consultation
            </Link>
            <Link
              href="/work"
              className="font-heading text-base text-white border border-white/20 px-8 py-4 rounded-xl hover:border-white/40 hover:bg-white/5 transition-all duration-200 text-center"
            >
              See Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
