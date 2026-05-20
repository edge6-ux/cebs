'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, Calendar, Check } from 'lucide-react'

interface FormState {
  // Step 1
  businessName: string
  businessType: string
  industry: string
  phone: string
  email: string
  website: string
  address: string
  city: string
  state: string
  zip: string
  serviceAreas: string

  // Step 2
  facebook: string
  instagram: string
  otherSocial: string
  reviewRating: string
  reviewCount: string
  trustBadges: string[]
  logoUrl: string
  primaryColor: string
  secondaryColor: string
  ctaPreference: string

  // Step 3
  servicesOffered: string
  priceRange: string
  mondayHours: string
  tuesdayHours: string
  wednesdayHours: string
  thursdayHours: string
  fridayHours: string
  saturdayHours: string
  sundayHours: string
}

const inputClass =
  'w-full border border-[#E5E7EB] rounded-xl px-4 py-3 font-body text-[15px] text-[#0D0D0D] bg-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B2FC9] focus:border-[#8B2FC9] transition-all duration-150'

const labelClass = 'block font-body text-[#0D0D0D] text-sm font-medium mb-1.5'

const STEP_LABELS = ['Business', 'Presence', 'Services', 'Setup', 'Goals']

export default function IntakePage() {
  const [step, setStep] = useState(1)

  const [form, setForm] = useState<FormState>({
    // Step 1
    businessName: '',
    businessType: '',
    industry: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    serviceAreas: '',

    // Step 2
    facebook: '',
    instagram: '',
    otherSocial: '',
    reviewRating: '',
    reviewCount: '',
    trustBadges: [],
    logoUrl: '',
    primaryColor: '#000000',
    secondaryColor: '#000000',
    ctaPreference: '',

    // Step 3
    servicesOffered: '',
    priceRange: '',
    mondayHours: '',
    tuesdayHours: '',
    wednesdayHours: '',
    thursdayHours: '',
    fridayHours: '',
    saturdayHours: '',
    sundayHours: '',
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleToggleBadge(badge: string) {
    setForm((prev) => ({
      ...prev,
      trustBadges: prev.trustBadges.includes(badge)
        ? prev.trustBadges.filter((b) => b !== badge)
        : [...prev.trustBadges, badge],
    }))
  }

  function handleSetField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function goToStep(n: number) {
    window.scrollTo(0, 0)
    setStep(n)
  }

  const step1Complete =
    form.businessName.trim() !== '' &&
    form.businessType !== '' &&
    form.industry !== '' &&
    form.phone.trim() !== '' &&
    form.email.trim() !== '' &&
    form.address.trim() !== '' &&
    form.city.trim() !== '' &&
    form.state.trim() !== '' &&
    form.zip.trim() !== ''

  const fillPct = ((step - 1) / 4) * 100

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Header ── */}
      <header className="bg-white border-b border-[#E5E7EB] px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.jpg"
              alt="Competitive Edge Business Solutions"
              width={32}
              height={32}
              className="rounded-full object-contain"
            />
            <span className="font-heading font-bold text-[16px] text-[#0D0D0D]">
              Cutting Edge
            </span>
          </Link>
          <Link
            href="/contact"
            className="font-body text-[#8B2FC9] text-[14px] hover:underline"
          >
            Quick form instead →
          </Link>
        </div>
      </header>

      {/* ── Progress Bar ── */}
      <div className="bg-white border-b border-[#E5E7EB] px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex mb-3">
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="flex-1 text-center">
                <span
                  className={`font-body text-[12px] ${
                    step >= i + 1
                      ? 'text-[#8B2FC9] font-semibold'
                      : 'text-[#9CA3AF]'
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="relative h-2 bg-[#E5E7EB] rounded-full">
            <div
              className="absolute left-0 top-0 h-full bg-[#8B2FC9] rounded-full transition-[width] duration-300"
              style={{ width: `${fillPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <main className="flex-1 bg-[#F5F5F5]">
        <div className="max-w-3xl mx-auto px-4 py-8">

          {step === 1 && (
            <Step1
              form={form}
              onChange={handleChange}
              onContinue={() => goToStep(2)}
              canContinue={step1Complete}
            />
          )}
          {step === 2 && (
            <Step2
              form={form}
              onChange={handleChange}
              onToggleBadge={handleToggleBadge}
              onSetField={handleSetField}
              onBack={() => goToStep(1)}
              onContinue={() => goToStep(3)}
              canContinue={form.ctaPreference !== ''}
            />
          )}
          {step === 3 && <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm mb-6">Step 3 — coming soon</div>}
          {step === 4 && <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm mb-6">Step 4 — coming soon</div>}
          {step === 5 && <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm mb-6">Step 5 — coming soon</div>}

        </div>
      </main>

    </div>
  )
}

const BADGES = [
  'Licensed', 'Insured', 'Bonded', 'BBB Accredited',
  'Veteran-Owned', 'Woman-Owned', 'Minority-Owned', 'Family-Owned',
  'Google Guaranteed', 'Background Checked',
]

interface Step2Props {
  form: FormState
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  onToggleBadge: (badge: string) => void
  onSetField: <K extends keyof FormState>(key: K, value: FormState[K]) => void
  onBack: () => void
  onContinue: () => void
  canContinue: boolean
}

function Step2({ form, onChange, onToggleBadge, onSetField, onBack, onContinue, canContinue }: Step2Props) {
  const [imgError, setImgError] = useState(false)

  let logoUrlValid = false
  try { new URL(form.logoUrl); logoUrlValid = true } catch { /* invalid */ }

  function handleColorText(field: 'primaryColor' | 'secondaryColor', value: string) {
    if (value.startsWith('#')) onSetField(field, value)
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm mb-6">

        <div className="mb-6">
          <p className="font-body text-[#8B2FC9] text-[12px] font-semibold uppercase mb-1" style={{ letterSpacing: '0.08em' }}>
            Step 2 of 5
          </p>
          <h2 className="font-heading font-bold text-[#0D0D0D] text-[22px] mb-1">
            Your Online Presence
          </h2>
          <p className="font-body text-[#6B7280] text-[14px] leading-[1.5]">
            Help us understand how you currently show up online and what your brand looks like.
          </p>
        </div>

        <div className="space-y-6">

          {/* Social Media */}
          <div>
            <p className="font-body text-[#4A4A4A] text-[14px] font-medium mb-1">Social Media</p>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-3">Add any profiles that apply</p>
            <div className="space-y-3">
              <div>
                <p className="font-body text-[#6B7280] text-[13px] mb-1">Facebook</p>
                <div className="flex items-center">
                  <span className="font-body text-[#9CA3AF] text-[14px] bg-[#F9F9F9] border border-[#E5E7EB] border-r-0 rounded-l-xl px-3 py-3 shrink-0 whitespace-nowrap">
                    fb.com/
                  </span>
                  <input
                    name="facebook"
                    type="text"
                    placeholder="your-page-name"
                    value={form.facebook}
                    onChange={onChange}
                    className="flex-1 border border-[#E5E7EB] border-l-0 rounded-r-xl px-4 py-3 font-body text-[15px] text-[#0D0D0D] bg-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B2FC9] transition-all duration-150"
                  />
                </div>
              </div>

              <div>
                <p className="font-body text-[#6B7280] text-[13px] mb-1">Instagram</p>
                <div className="flex items-center">
                  <span className="font-body text-[#9CA3AF] text-[14px] bg-[#F9F9F9] border border-[#E5E7EB] border-r-0 rounded-l-xl px-3 py-3 shrink-0 whitespace-nowrap">
                    instagram.com/
                  </span>
                  <input
                    name="instagram"
                    type="text"
                    placeholder="your-handle"
                    value={form.instagram}
                    onChange={onChange}
                    className="flex-1 border border-[#E5E7EB] border-l-0 rounded-r-xl px-4 py-3 font-body text-[15px] text-[#0D0D0D] bg-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B2FC9] transition-all duration-150"
                  />
                </div>
              </div>

              <div>
                <p className="font-body text-[#6B7280] text-[13px] mb-1">Other</p>
                <p className="font-body text-[#9CA3AF] text-[12px] mb-1">LinkedIn, TikTok, YouTube, or any other URL</p>
                <input
                  name="otherSocial"
                  type="text"
                  placeholder="https://linkedin.com/in/..."
                  value={form.otherSocial}
                  onChange={onChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Google Reviews */}
          <div>
            <p className="font-body text-[#4A4A4A] text-[14px] font-medium mb-1">Google Reviews</p>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-3">If you have a Google Business Profile add your current rating and review count — optional but helpful</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="reviewRating" className={labelClass}>Rating</label>
                <input
                  id="reviewRating"
                  name="reviewRating"
                  type="number"
                  min={0}
                  max={5}
                  step={0.1}
                  placeholder="4.8"
                  value={form.reviewRating}
                  onChange={onChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="reviewCount" className={labelClass}>Review Count</label>
                <input
                  id="reviewCount"
                  name="reviewCount"
                  type="number"
                  min={0}
                  placeholder="127"
                  value={form.reviewCount}
                  onChange={onChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div>
            <p className="font-body text-[#4A4A4A] text-[14px] font-medium mb-1">Trust Badges &amp; Certifications</p>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-3">Select all that apply</p>
            <div className="grid grid-cols-2 gap-2">
              {BADGES.map((badge) => {
                const checked = form.trustBadges.includes(badge)
                return (
                  <div
                    key={badge}
                    className="flex items-center gap-2.5 cursor-pointer py-1"
                    onClick={() => onToggleBadge(badge)}
                  >
                    <div
                      className={`w-[18px] h-[18px] rounded-md shrink-0 flex items-center justify-center transition-all duration-150 ${
                        checked
                          ? 'bg-[#8B2FC9] border-[1.5px] border-[#8B2FC9]'
                          : 'bg-white border-[1.5px] border-[#D1D5DB]'
                      }`}
                    >
                      {checked && <Check size={12} className="text-white" strokeWidth={3} />}
                    </div>
                    <span className="font-body text-[#4A4A4A] text-[14px] select-none">{badge}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Logo URL */}
          <div>
            <p className="font-body text-[#4A4A4A] text-[14px] font-medium mb-1">Logo</p>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-3">Direct link to your logo file if available</p>
            <input
              name="logoUrl"
              type="url"
              placeholder="https://yourbusiness.com/logo.png"
              value={form.logoUrl}
              onChange={(e) => { setImgError(false); onChange(e) }}
              className={inputClass}
            />
            {logoUrlValid && form.logoUrl !== '' && !imgError && (
              <div className="mt-3 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.logoUrl}
                  alt="Logo preview"
                  className="object-contain rounded-lg border border-[#E5E7EB] bg-[#F9F9F9]"
                  style={{ width: 48, height: 48 }}
                  onError={() => setImgError(true)}
                />
                <span className="font-body text-[#9CA3AF] text-[12px]">Logo preview</span>
              </div>
            )}
          </div>

          {/* Brand Colors */}
          <div>
            <p className="font-body text-[#4A4A4A] text-[14px] font-medium mb-1">Brand Colors</p>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-3">Your primary and secondary brand colors — optional</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-body text-[#4A4A4A] text-[13px] font-medium mb-2">Primary</p>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={form.primaryColor}
                    onChange={(e) => onSetField('primaryColor', e.target.value)}
                    className="w-[44px] h-[44px] rounded-xl border border-[#E5E7EB] cursor-pointer p-1 bg-white shrink-0"
                  />
                  <input
                    type="text"
                    placeholder="#000000"
                    value={form.primaryColor}
                    onChange={(e) => handleColorText('primaryColor', e.target.value)}
                    className={`${inputClass} flex-1`}
                  />
                </div>
              </div>
              <div>
                <p className="font-body text-[#4A4A4A] text-[13px] font-medium mb-2">Secondary</p>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={form.secondaryColor}
                    onChange={(e) => onSetField('secondaryColor', e.target.value)}
                    className="w-[44px] h-[44px] rounded-xl border border-[#E5E7EB] cursor-pointer p-1 bg-white shrink-0"
                  />
                  <input
                    type="text"
                    placeholder="#000000"
                    value={form.secondaryColor}
                    onChange={(e) => handleColorText('secondaryColor', e.target.value)}
                    className={`${inputClass} flex-1`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CTA Preference */}
          <div>
            <p className="font-body text-[#4A4A4A] text-[14px] font-medium mb-3">
              What do you want visitors to do when they land on your website?{' '}
              <span className="text-[#8B2FC9]">*</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: 'call', Icon: Phone, title: 'Call Us', desc: 'Visitors call you directly' },
                { value: 'form', Icon: Mail, title: 'Contact Form', desc: 'Visitors fill out a form' },
                { value: 'booking', Icon: Calendar, title: 'Book Online', desc: 'Visitors schedule themselves' },
              ].map(({ value, Icon, title, desc }) => {
                const selected = form.ctaPreference === value
                return (
                  <div
                    key={value}
                    onClick={() => onSetField('ctaPreference', value)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer text-center transition-all duration-150 ${
                      selected
                        ? 'border-[1.5px] border-[#8B2FC9] bg-[rgba(139,47,201,0.04)]'
                        : 'border-[1.5px] border-[#E5E7EB]'
                    }`}
                  >
                    <Icon size={28} className={selected ? 'text-[#8B2FC9]' : 'text-[#9CA3AF]'} />
                    <p className="font-body text-[#0D0D0D] text-[14px] font-semibold">{title}</p>
                    <p className="font-body text-[#6B7280] text-[12px] leading-[1.4]">{desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="font-body text-[14px] text-[#4A4A4A] bg-white border border-[#E5E7EB] px-6 py-3 rounded-xl hover:border-gray-300 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onContinue}
          disabled={!canContinue}
          className="font-heading font-bold text-[14px] uppercase text-white bg-[#8B2FC9] px-6 py-3 rounded-xl hover:bg-[#7A28B8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Continue →
        </button>
      </div>
    </>
  )
}

interface Step1Props {
  form: FormState
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  onContinue: () => void
  canContinue: boolean
}

function Step1({ form, onChange, onContinue, canContinue }: Step1Props) {
  return (
    <>
      {/* Card */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm mb-6">

        {/* Step header */}
        <div className="mb-6">
          <p
            className="font-body text-[#8B2FC9] text-[12px] font-semibold uppercase mb-1"
            style={{ letterSpacing: '0.08em' }}
          >
            Step 1 of 5
          </p>
          <h2 className="font-heading font-bold text-[#0D0D0D] text-[22px] mb-1">
            About Your Business
          </h2>
          <p className="font-body text-[#6B7280] text-[14px] leading-[1.5]">
            Tell us the basics. This is the foundation of everything we build for you.
          </p>
        </div>

        <div className="space-y-5">

          {/* Business name */}
          <div>
            <label htmlFor="businessName" className={labelClass}>
              Business Name <span className="text-[#8B2FC9]">*</span>
            </label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              required
              placeholder="Smith's Auto Repair"
              value={form.businessName}
              onChange={onChange}
              className={inputClass}
            />
          </div>

          {/* Business type */}
          <div>
            <label htmlFor="businessType" className={labelClass}>
              Business Type <span className="text-[#8B2FC9]">*</span>
            </label>
            <select
              id="businessType"
              name="businessType"
              required
              value={form.businessType}
              onChange={onChange}
              className={inputClass}
            >
              <option value="">Select type</option>
              <option>Sole Proprietor</option>
              <option>LLC</option>
              <option>Partnership</option>
              <option>Corporation</option>
              <option>Non-Profit</option>
              <option>Other</option>
            </select>
          </div>

          {/* Industry */}
          <div>
            <label htmlFor="industry" className={labelClass}>
              Industry <span className="text-[#8B2FC9]">*</span>
            </label>
            <select
              id="industry"
              name="industry"
              required
              value={form.industry}
              onChange={onChange}
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

          {/* Phone */}
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number <span className="text-[#8B2FC9]">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="(555) 000-0000"
              value={form.phone}
              onChange={onChange}
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address <span className="text-[#8B2FC9]">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@yourbusiness.com"
              value={form.email}
              onChange={onChange}
              className={inputClass}
            />
          </div>

          {/* Website */}
          <div>
            <label htmlFor="website" className={labelClass}>
              Current Website
            </label>
            <input
              id="website"
              name="website"
              type="url"
              placeholder="https://yourbusiness.com"
              value={form.website}
              onChange={onChange}
              className={inputClass}
            />
            <p className="font-body text-[#9CA3AF] text-[12px] mt-1">
              Leave blank if you don&apos;t have one yet
            </p>
          </div>

          {/* Street address */}
          <div>
            <label htmlFor="address" className={labelClass}>
              Street Address <span className="text-[#8B2FC9]">*</span>
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              autoComplete="street-address"
              placeholder="123 Main St"
              value={form.address}
              onChange={onChange}
              className={inputClass}
            />
          </div>

          {/* City / State / ZIP */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="city" className={labelClass}>
                City <span className="text-[#8B2FC9]">*</span>
              </label>
              <input
                id="city"
                name="city"
                type="text"
                required
                autoComplete="address-level2"
                placeholder="Gainesville"
                value={form.city}
                onChange={onChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="state" className={labelClass}>
                State <span className="text-[#8B2FC9]">*</span>
              </label>
              <input
                id="state"
                name="state"
                type="text"
                required
                autoComplete="address-level1"
                placeholder="GA"
                value={form.state}
                onChange={onChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="zip" className={labelClass}>
                ZIP <span className="text-[#8B2FC9]">*</span>
              </label>
              <input
                id="zip"
                name="zip"
                type="text"
                required
                autoComplete="postal-code"
                placeholder="30501"
                value={form.zip}
                onChange={onChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Service areas */}
          <div>
            <label htmlFor="serviceAreas" className={labelClass}>
              Service Areas
            </label>
            <textarea
              id="serviceAreas"
              name="serviceAreas"
              rows={2}
              placeholder="Cities or regions you serve, e.g. Gainesville, Hall County, North Georgia"
              value={form.serviceAreas}
              onChange={onChange}
              className={`${inputClass} resize-none`}
            />
            <p className="font-body text-[#9CA3AF] text-[12px] mt-1">
              Separate with commas
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end">
        <button
          onClick={onContinue}
          disabled={!canContinue}
          className="font-heading font-bold text-[14px] uppercase text-white bg-[#8B2FC9] px-6 py-3 rounded-xl hover:bg-[#7A28B8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Continue →
        </button>
      </div>
    </>
  )
}
