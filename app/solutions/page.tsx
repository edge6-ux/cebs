import Link from 'next/link'
import SolutionImage from '@/components/solutions/SolutionImage'
import FluidBackgroundUltraVioletStatic from '@/components/home/FluidBackgroundUltraVioletStatic'
import {
  Globe,
  LayoutDashboard,
  Sparkles,
  Zap,
  ArrowRight,
} from 'lucide-react'

export const metadata = {
  title: 'Solutions',
  description: 'See what we build — websites, booking systems, admin dashboards, AI assessment tools, customer portals, and more. Each solution built for local businesses.',
  alternates: { canonical: 'https://honedops.com/solutions' },
}

type Solution = {
  name: string
  description: string
  bullets: string[]
  tag: string
  hasScreenshot: boolean
  screenshot?: string
  hidden?: boolean
}

type Category = {
  name: string
  description: string
  color: string
  icon: string
  solutions: Solution[]
}

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe size={28} />,
  LayoutDashboard: <LayoutDashboard size={28} />,
  Sparkles: <Sparkles size={28} />,
  Zap: <Zap size={28} />,
}

const iconMapSm: Record<string, React.ReactNode> = {
  Globe: <Globe size={24} />,
  LayoutDashboard: <LayoutDashboard size={24} />,
  Sparkles: <Sparkles size={24} />,
  Zap: <Zap size={24} />,
}

const tagStyles: Record<string, { backgroundColor: string; color: string }> = {
  'Real Build':    { backgroundColor: '#D1FAE5', color: '#065F46' },
  'Most Popular':  { backgroundColor: '#EDE9FE', color: '#6D28D9' },
  'Quick Win':     { backgroundColor: '#FEF3C7', color: '#92400E' },
}

const categories: Category[] = [
  {
    name: 'Web Presence',
    description:
      'Your digital front door. Fast, optimized, and built to convert visitors into customers.',
    color: '#1D4ED8',
    icon: 'Globe',
    solutions: [
      {
        name: 'Starter Website',
        tag: 'Most Popular',
        hasScreenshot: true,
        screenshot: '/starterwebsite.png',
        description:
          'A fast, mobile-optimized website that represents the business professionally and converts visitors into leads.',
        bullets: [
          'Built on Next.js — fast by default',
          'SEO optimized with local schema markup',
          'Contact form with automated notifications',
          'Mobile-first design',
        ],
      },
      {
        name: 'Landing Page',
        tag: '',
        hasScreenshot: true,
        screenshot: '/landingpageexample.png',
        description:
          'A single high-converting page for a specific service, campaign, or offer.',
        bullets: [
          'Single focused CTA',
          'Fast load time',
          'A/B test ready',
          'Analytics integrated',
        ],
      },
      {
        name: 'Local SEO Setup',
        tag: 'Quick Win',
        hasScreenshot: true,
        screenshot: '/seoexample.png',
        description:
          'Everything needed to show up when local customers search for your services on Google.',
        bullets: [
          'Google Business Profile optimization',
          'Local schema markup',
          'Citation building',
          'Review request system',
        ],
      },
    ],
  },
  {
    name: 'Operations & Admin',
    description:
      'Internal tools that replace spreadsheets and disconnected apps with one system built for how your team works.',
    color: '#8B2FC9',
    icon: 'LayoutDashboard',
    solutions: [
      {
        name: 'Custom Admin Dashboard',
        tag: 'Real Build',
        hasScreenshot: true,
        screenshot: '/admindashboard.png',
        description:
          'A full internal operations hub — leads, jobs, customers, revenue, and team management in one place.',
        bullets: [
          'Lead pipeline with AI analysis',
          'Job tracking from quote to delivery',
          'Customer records and history',
          'Revenue and retainer reporting',
        ],
      },
      {
        name: 'Customer Portal',
        tag: '',
        hasScreenshot: true,
        screenshot: '/customerportal.png',
        description:
          'A branded portal where customers can track jobs, view proposals, approve quotes, and message the team.',
        bullets: [
          'Job status tracking',
          'Proposal review and approval',
          'Secure messaging',
          'Document storage',
        ],
      },
      {
        name: 'Scheduling & Dispatch',
        tag: '',
        hasScreenshot: true,
        screenshot: '/scheduling.png',
        description:
          'Custom scheduling built around your team — assign jobs, manage availability, and dispatch crews from one screen.',
        bullets: [
          'Drag-and-drop scheduling',
          'Crew assignment and tracking',
          'Customer notifications',
          'Mobile-friendly for field teams',
        ],
      },
      {
        name: 'Invoicing & Payments',
        tag: '',
        hidden: true,
        hasScreenshot: false,
        description:
          'Generate professional invoices and accept payments online — integrated into your existing workflow.',
        bullets: [
          'Invoice generation from job records',
          'Stripe payment processing',
          'Automated reminders',
          'Revenue reporting',
        ],
      },
    ],
  },
  {
    name: 'AI Powered',
    description:
      'Tools that use AI to automate decisions, generate assessments, and give your business capabilities that used to require a full team.',
    color: '#6D28D9',
    icon: 'Sparkles',
    solutions: [
      {
        name: 'AI Assessment Tool',
        tag: 'Real Build',
        hasScreenshot: true,
        description:
          'Customers submit photos or answer questions and receive a professional assessment instantly — powered by Claude.',
        bullets: [
          'Photo or form-based input',
          'AI-generated report in seconds',
          'Dual output — customer and operator versions',
          'Lead capture built in',
        ],
      },
      {
        name: 'AI Customer Service Chatbot',
        tag: '',
        hasScreenshot: false,
        description:
          'A chatbot trained on the business that handles common questions, captures leads, and routes inquiries 24/7.',
        bullets: [
          'Trained on your services and FAQs',
          'Lead capture and qualification',
          'Handoff to human when needed',
          'Works on any website',
        ],
      },
      {
        name: 'AI Lead Qualification',
        tag: 'Real Build',
        hasScreenshot: true,
        description:
          'Automatically scores and prioritizes incoming leads based on fit, budget, and intent.',
        bullets: [
          'Priority scoring 0–100',
          'Tier recommendation',
          'Talking points for sales calls',
          'Upsell opportunity detection',
        ],
      },
      {
        name: 'Automated Reporting',
        tag: '',
        hasScreenshot: false,
        description:
          'A live dashboard and scheduled reports that surface the metrics that actually matter.',
        bullets: [
          'Custom KPI tracking',
          'Weekly or monthly email reports',
          'Visual charts and trend analysis',
          'No manual data entry',
        ],
      },
    ],
  },
  {
    name: 'Automation',
    description:
      'Repetitive tasks handled automatically so the team spends time on work that actually requires a human.',
    color: '#065F46',
    icon: 'Zap',
    solutions: [
      {
        name: 'Booking System',
        tag: '',
        hasScreenshot: false,
        description:
          'Online appointment scheduling that syncs with the business calendar and sends automatic confirmations.',
        bullets: [
          'Calendar integration',
          'Automated confirmations and reminders',
          'Service and staff selection',
          'No-show reduction',
        ],
      },
      {
        name: 'Review Request Automation',
        tag: 'Quick Win',
        hasScreenshot: false,
        description:
          'Automatically asks satisfied customers for a Google review at the right moment.',
        bullets: [
          'Triggered after job completion',
          'Personalized message',
          'Google review direct link',
          'Tracks review growth',
        ],
      },
      {
        name: 'Follow-up Sequence',
        tag: '',
        hasScreenshot: false,
        description:
          "Automated email sequence that nurtures leads who expressed interest but haven't committed yet.",
        bullets: [
          'Triggered on form submission',
          'Multi-step sequence',
          'Personalized per industry',
          'Stops when lead responds',
        ],
      },
    ],
  },
]

export default function SolutionsPage() {
  return (
    <main>
      {/* Hero */}
      <section
        style={{ backgroundColor: '#0D0D0D' }}
        className="relative overflow-hidden px-6 py-24 text-center"
      >
        <FluidBackgroundUltraVioletStatic />
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        <div className="relative z-[1] max-w-3xl mx-auto">
          <p
            className="font-body font-semibold uppercase mb-4"
            style={{ color: '#A78BFA', fontSize: '13px', letterSpacing: '0.1em' }}
          >
            What We Build
          </p>

          <h1
            className="font-heading font-bold text-white mb-6"
            style={{ fontSize: '52px', lineHeight: '1.1' }}
          >
            Custom solutions for businesses that are ready to grow.
          </h1>

          <p
            className="font-body mb-8 max-w-xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.6)', fontSize: '20px', lineHeight: '1.6' }}
          >
            Every solution is built around how your business actually works.
          </p>

          <Link
            href="/intake"
            className="inline-block font-heading font-bold uppercase text-white rounded-xl px-8 py-4 transition-colors bg-[#8B2FC9] hover:bg-[#7A28B8]"
            style={{ fontSize: '15px' }}
          >
            Get a Free Consultation
          </Link>
        </div>
      </section>

      {/* Categories */}
      <div style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">

          {categories.map((cat) => (
            <section key={cat.name}>

              {/* Category header */}
              <div className="flex gap-4 items-start flex-wrap mb-10">
                <div className="flex-1">
                  {/* Pill */}
                  <span
                    className="inline-flex font-body font-semibold uppercase mb-3 px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: cat.color + '18',
                      color: cat.color,
                      fontSize: '12px',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {cat.name}
                  </span>

                  <h2
                    className="font-heading font-bold mb-3"
                    style={{ color: '#0D0D0D', fontSize: '32px', lineHeight: '1.1' }}
                  >
                    {cat.name}
                  </h2>

                  <p
                    className="font-body max-w-xl"
                    style={{ color: '#6B7280', fontSize: '17px', lineHeight: '1.6' }}
                  >
                    {cat.description}
                  </p>
                </div>

                <div className="flex-shrink-0 self-end pb-1">
                  <span
                    className="font-body"
                    style={{ color: '#9CA3AF', fontSize: '14px' }}
                  >
                    {cat.solutions.length} solution{cat.solutions.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* Solutions grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {cat.solutions.filter((s) => !s.hidden).map((solution) => (
                  <div
                    key={solution.name}
                    className="flex flex-col h-full bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-md hover:border-[#D1D5DB] transition-all duration-200"
                  >
                    {/* Visual area — img tags use: className="w-full h-full object-cover object-top" */}
                    <div className="h-44 flex-shrink-0 relative">
                      {solution.hasScreenshot ? (
                        <div className="bg-[#0D0D0D] h-full w-full relative">
                          {solution.screenshot ? (
                            <SolutionImage src={solution.screenshot} alt={solution.name} />
                          ) : (
                            <div className="h-full w-full flex flex-col items-center justify-center">
                              <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center mb-3"
                                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'white' }}
                              >
                                {iconMapSm[cat.icon]}
                              </div>
                              <p
                                className="font-body text-center mt-2"
                                style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}
                              >
                                Screenshot coming soon
                              </p>
                            </div>
                          )}
                          <div
                            className="absolute top-3 right-3 px-2 py-1 rounded-full"
                            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                          >
                            <span
                              className="font-body font-semibold uppercase text-white"
                              style={{ fontSize: '10px' }}
                            >
                              Live Build
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="h-full w-full flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${cat.color}15 0%, ${cat.color}08 100%)`,
                          }}
                        >
                          <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center"
                            style={{ backgroundColor: cat.color + '20', color: cat.color }}
                          >
                            {iconMap[cat.icon]}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card body */}
                    <div className="p-6 flex flex-col flex-1">
                      {/* Name + tag */}
                      <div className="flex items-start justify-between mb-3">
                        <h3
                          className="font-heading font-bold flex-1 pr-2"
                          style={{ color: '#0D0D0D', fontSize: '18px', lineHeight: '1.2' }}
                        >
                          {solution.name}
                        </h3>
                        {solution.tag && (
                          <span
                            className="flex-shrink-0 ml-2 font-body font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                            style={{ fontSize: '11px', ...tagStyles[solution.tag] }}
                          >
                            {solution.tag}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p
                        className="font-body mb-5"
                        style={{ color: '#6B7280', fontSize: '14px', lineHeight: '1.6' }}
                      >
                        {solution.description}
                      </p>

                      {/* Bullets */}
                      <ul className="space-y-2 mb-6 flex-1">
                        {solution.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-2.5 items-start">
                            <span
                              className="rounded-full mt-[7px] flex-shrink-0"
                              style={{
                                width: '5px',
                                height: '5px',
                                backgroundColor: cat.color,
                              }}
                            />
                            <span
                              className="font-body"
                              style={{ color: '#4A4A4A', fontSize: '13px', lineHeight: '1.5' }}
                            >
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <Link
                        href={`/intake?service=${encodeURIComponent(solution.name)}&category=${encodeURIComponent(cat.name)}`}
                        className="mt-auto flex items-center gap-2 group"
                        style={{ color: cat.color, fontSize: '14px' }}
                      >
                        <span className="font-body font-semibold">Get this built</span>
                        <ArrowRight
                          size={14}
                          className="group-hover:translate-x-1 transition-transform duration-150"
                        />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Bottom CTA */}
          <div
            className="mt-20 rounded-3xl px-8 py-16 text-center"
            style={{ backgroundColor: '#0D0D0D' }}
          >
            <div className="max-w-2xl mx-auto">
              <p
                className="font-body font-semibold uppercase mb-4"
                style={{ color: '#A78BFA', fontSize: '13px', letterSpacing: '0.1em' }}
              >
                Where to Start
              </p>

              <h2
                className="font-heading font-bold text-white mb-4"
                style={{ fontSize: '36px', lineHeight: '1.2' }}
              >
                Not sure what you need?
              </h2>

              <p
                className="font-body mb-8"
                style={{ color: 'rgba(255,255,255,0.6)', fontSize: '17px', lineHeight: '1.7' }}
              >
                Start with a free consultation. We&apos;ll look at what you have, identify
                what&apos;s costing you the most time or money, and tell you exactly what
                we&apos;d recommend — no commitment required.
              </p>

              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href="/intake"
                  className="font-heading font-bold uppercase text-white rounded-xl px-8 py-4 transition-colors bg-[#8B2FC9] hover:bg-[#7A28B8]"
                  style={{ fontSize: '15px' }}
                >
                  Get a Free Consultation
                </Link>

                <Link
                  href="/contact"
                  className="font-heading font-bold uppercase text-white rounded-xl px-8 py-4 transition-colors hover:bg-white/5 border"
                  style={{
                    fontSize: '15px',
                    borderColor: 'rgba(255,255,255,0.2)',
                    backgroundColor: 'transparent',
                  }}
                >
                  Quick Contact
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
