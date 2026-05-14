'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Search, BarChart2, MessageSquare,
  CheckCircle, Mail,
} from 'lucide-react'

interface FormData {
  fullName: string
  businessName: string
  email: string
  phone: string
  industry: string
  challenge: string
  monthlySpend: string
  hearAboutUs: string
}

const inputClass =
  'w-full border border-[#E5E7EB] rounded-xl px-4 py-3 font-body text-[16px] text-[#1A1A1A] bg-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition-all duration-150'

const labelClass = 'block font-body text-[#1A1A1A] text-sm font-medium mb-1.5'

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    industry: '',
    challenge: '',
    monthlySpend: '',
    hearAboutUs: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const requiredFilled =
    formData.fullName.trim() !== '' &&
    formData.businessName.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.challenge.trim() !== ''

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Submission failed')

      setSuccess(true)
    } catch {
      setError(
        'Something went wrong. Please try again or email us directly at edgerrinwashington@gmail.com'
      )
    } finally {
      setLoading(false)
    }
  }

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
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="font-body text-brand-purple text-[13px] font-semibold uppercase tracking-[0.08em] mb-4">
            Get in Touch
          </p>
          <h1 className="font-heading font-bold text-white text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.02em] mb-6">
            Let&apos;s talk about your business.
          </h1>
          <p className="font-body text-white/60 text-xl max-w-xl mx-auto leading-[1.7]">
            Start with a free consultation. No commitment, no pitch — just an honest look at
            where your business is and where it could be.
          </p>
        </div>
      </section>

      {/* ── Form Section ── */}
      <section className="bg-brand-light py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* ── Left: Form card ── */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm">
            {success ? (
              /* Success state */
              <div className="py-8">
                <CheckCircle
                  size={56}
                  className="text-brand-purple mx-auto mb-6 block"
                />
                <h2 className="font-heading font-bold text-brand-dark text-[28px] text-center mb-3">
                  We got it.
                </h2>
                <p className="font-body text-brand-muted text-base text-center leading-[1.7] mb-6">
                  We&apos;ll review your submission and reach out within 1–2 business days
                  with our honest take.
                </p>
                <div className="flex gap-4 justify-center mt-8 flex-wrap">
                  <Link
                    href="/work"
                    className="font-body text-brand-purple text-sm font-medium border border-brand-purple px-5 py-2.5 rounded-xl hover:bg-[rgba(139,47,201,0.05)] transition-colors"
                  >
                    See Our Work
                  </Link>
                  <Link
                    href="/about"
                    className="font-body text-[#4A4A4A] text-sm border border-[#E5E7EB] px-5 py-2.5 rounded-xl hover:border-gray-300 transition-colors"
                  >
                    About Us
                  </Link>
                </div>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} noValidate>
                <h2 className="font-heading font-bold text-brand-dark text-2xl mb-2">
                  Request a Free Consultation
                </h2>
                <p className="font-body text-brand-muted text-[15px] mb-8 leading-[1.6]">
                  Tell us about your business. We&apos;ll review it and come back with
                  honest recommendations.
                </p>

                <div className="space-y-5">
                  {/* Full name */}
                  <div>
                    <label htmlFor="fullName" className={labelClass}>
                      Full name <span className="text-brand-purple">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Jane Smith"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  {/* Business name */}
                  <div>
                    <label htmlFor="businessName" className={labelClass}>
                      Business name <span className="text-brand-purple">*</span>
                    </label>
                    <input
                      id="businessName"
                      name="businessName"
                      type="text"
                      required
                      autoComplete="organization"
                      placeholder="Smith's Auto Repair"
                      value={formData.businessName}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email address <span className="text-brand-purple">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="jane@yourbusiness.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone number{' '}
                      <span className="font-body text-brand-muted text-xs font-normal">
                        Optional
                      </span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="(555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  {/* Industry */}
                  <div>
                    <label htmlFor="industry" className={labelClass}>
                      Industry
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select your industry</option>
                      <option>Trades &amp; Contractors</option>
                      <option>Restaurants &amp; Hospitality</option>
                      <option>Home Services</option>
                      <option>Local Retail</option>
                      <option>Auto Services</option>
                      <option>Health &amp; Wellness</option>
                      <option>Professional Services</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* Challenge */}
                  <div>
                    <label htmlFor="challenge" className={labelClass}>
                      What&apos;s your biggest challenge right now?{' '}
                      <span className="text-brand-purple">*</span>
                    </label>
                    <textarea
                      id="challenge"
                      name="challenge"
                      required
                      rows={4}
                      placeholder="Tell us what's frustrating you — too many tools, no online presence, manual processes, anything..."
                      value={formData.challenge}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Monthly spend */}
                  <div>
                    <label htmlFor="monthlySpend" className={labelClass}>
                      Estimated monthly software spend
                    </label>
                    <select
                      id="monthlySpend"
                      name="monthlySpend"
                      value={formData.monthlySpend}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Prefer not to say</option>
                      <option>Under $500/month</option>
                      <option>$500–$1,000/month</option>
                      <option>$1,000–$2,000/month</option>
                      <option>$2,000–$5,000/month</option>
                      <option>$5,000+/month</option>
                    </select>
                  </div>

                  {/* How did you hear */}
                  <div>
                    <label htmlFor="hearAboutUs" className={labelClass}>
                      How did you hear about us?
                    </label>
                    <select
                      id="hearAboutUs"
                      name="hearAboutUs"
                      value={formData.hearAboutUs}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select one</option>
                      <option>Referral</option>
                      <option>Google Search</option>
                      <option>Social Media</option>
                      <option>Saw our work</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <p className="font-body text-[#9CA3AF] text-[13px] mt-6 leading-relaxed">
                  By submitting you agree that Competitive Edge Business Solutions may contact
                  you about your consultation request. We don&apos;t share your information.
                </p>

                <button
                  type="submit"
                  disabled={!requiredFilled || loading}
                  className="w-full mt-6 bg-brand-purple text-white font-heading font-bold text-base py-4 rounded-xl hover:bg-[#7A28B8] disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12" cy="12" r="10"
                          stroke="currentColor" strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </button>

                {error && (
                  <p className="font-body text-[#E24B4A] text-[13px] mt-3 leading-relaxed">
                    {error}
                  </p>
                )}
              </form>
            )}
          </div>

          {/* ── Right: Info panel ── */}
          <div className="space-y-10">

            {/* Why start with an audit */}
            <div>
              <p className="font-body text-brand-purple text-[11px] font-semibold uppercase tracking-widest mb-5">
                Why Start With a Consultation
              </p>
              <div className="space-y-5">
                {[
                  {
                    Icon: Search,
                    title: 'No commitment',
                    body: "The consultation is free. We look at your current setup and tell you exactly what we see. No obligation to go further.",
                  },
                  {
                    Icon: BarChart2,
                    title: 'Real numbers',
                    body: 'We identify specific tools, specific costs, and specific savings. Not estimates — actual line items.',
                  },
                  {
                    Icon: MessageSquare,
                    title: 'Honest recommendations',
                    body: "If you don't need us we'll tell you. We'd rather earn a referral than waste your time on a bad fit.",
                  },
                ].map(({ Icon, title, body }) => (
                  <div key={title} className="flex gap-4 items-start">
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

            {/* What happens next */}
            <div>
              <p className="font-body text-brand-purple text-[11px] font-semibold uppercase tracking-widest mb-5">
                What Happens Next
              </p>
              <div className="space-y-4">
                {[
                  {
                    n: '1',
                    title: 'You submit the form',
                    body: "Takes about 3 minutes. Tell us what you're working with.",
                  },
                  {
                    n: '2',
                    title: 'We review it',
                    body: "Within 1–2 business days we'll look at your current setup and identify opportunities.",
                  },
                  {
                    n: '3',
                    title: 'We get on a call',
                    body: "We walk you through what we found and what we'd recommend. No pressure, no pitch.",
                  },
                ].map(({ n, title, body }) => (
                  <div key={n} className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-full border border-brand-purple flex items-center justify-center shrink-0">
                      <span className="font-heading font-bold text-brand-purple text-xs">{n}</span>
                    </div>
                    <div>
                      <p className="font-body font-semibold text-brand-dark text-sm mb-1">{title}</p>
                      <p className="font-body text-brand-muted text-[13px] leading-[1.5]">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct contact */}
            <div>
              <p className="font-body text-brand-purple text-[11px] font-semibold uppercase tracking-widest mb-4">
                Direct Contact
              </p>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-brand-purple" />
                <span className="font-body text-[#4A4A4A] text-sm">
                  edgerrinwashington@gmail.com
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
