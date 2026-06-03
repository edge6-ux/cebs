'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { Phone, Mail, Calendar, Check, Target, Sparkles, Upload } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

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
  trustBadges: string
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

  // Step 4
  currentTools: string
  monthlySpend: string
  whatIsWorking: string
  biggestChallenge: string
  timeSink: string
  previousAgency: string
  previousAttempts: string

  // Step 5
  successDefinition: string
  timeline: string
  budgetRange: string
  hearAboutUs: string
  additionalNotes: string
}

const inputClass =
  'w-full border border-[#E5E7EB] rounded-xl px-4 py-3 font-body text-[15px] text-[#0D0D0D] bg-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B2FC9] focus:border-[#8B2FC9] transition-all duration-150'

const labelClass = 'block font-body text-[#0D0D0D] text-sm font-medium mb-1.5'

const STEP_LABELS = ['Business', 'Presence', 'Services', 'Setup', 'Goals']

function IntakeForm() {
  const [step, setStep] = useState(1)
  const [interestedIn, setInterestedIn] = useState('')
  const [interestedCategory, setInterestedCategory] = useState('')

  const searchParams = useSearchParams()

  useEffect(() => {
    const service = searchParams.get('service')
    const category = searchParams.get('category')
    if (service) setInterestedIn(service)
    if (category) setInterestedCategory(category)
  }, [searchParams])

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
    trustBadges: '',
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

    // Step 4
    currentTools: '',
    monthlySpend: '',
    whatIsWorking: '',
    biggestChallenge: '',
    timeSink: '',
    previousAgency: '',
    previousAttempts: '',

    // Step 5
    successDefinition: '',
    timeline: '',
    budgetRange: '',
    hearAboutUs: '',
    additionalNotes: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
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
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Target size={18} className="text-brand-purple shrink-0" />
            <div className="flex flex-col leading-tight">
              <span className="font-body font-bold text-base tracking-tight text-[#1A1A1A]">
                Honed Ops
              </span>
            </div>
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
              interestedIn={interestedIn}
              interestedCategory={interestedCategory}
              onClearInterest={() => { setInterestedIn(''); setInterestedCategory('') }}
            />
          )}
          {step === 2 && (
            <Step2
              form={form}
              onChange={handleChange}
              onSetField={handleSetField}
              onBack={() => goToStep(1)}
              onContinue={() => goToStep(3)}
              canContinue={form.ctaPreference !== ''}
            />
          )}
          {step === 3 && (
            <Step3
              form={form}
              onChange={handleChange}
              onSetField={handleSetField}
              onBack={() => goToStep(2)}
              onContinue={() => goToStep(4)}
              canContinue={form.servicesOffered.trim() !== ''}
            />
          )}
          {step === 4 && (
            <Step4
              form={form}
              onChange={handleChange}
              onSetField={handleSetField}
              onBack={() => goToStep(3)}
              onContinue={() => goToStep(5)}
            />
          )}
          {step === 5 && <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm mb-6">Step 5 — coming soon</div>}

        </div>
      </main>

    </div>
  )
}

interface Step2Props {
  form: FormState
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  onSetField: <K extends keyof FormState>(key: K, value: FormState[K]) => void
  onBack: () => void
  onContinue: () => void
  canContinue: boolean
}

function Step2({ form, onChange, onSetField, onBack, onContinue, canContinue }: Step2Props) {
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
            <label htmlFor="trustBadges" className={labelClass}>Trust Badges &amp; Certifications</label>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-2">List any certifications, licenses, or trust badges your business holds</p>
            <textarea
              id="trustBadges"
              name="trustBadges"
              rows={2}
              placeholder="e.g. Licensed, Insured, BBB Accredited, Google Guaranteed, Veteran-Owned..."
              value={form.trustBadges}
              onChange={onChange}
              className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 font-body text-[15px] text-[#0D0D0D] bg-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B2FC9] focus:border-[#8B2FC9] transition-all duration-150 resize-none"
            />
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
          className="font-body text-[14px] text-[#4A4A4A] bg-white border border-[#E5E7EB] px-6 py-3 rounded-xl hover:border-[#8B2FC9] hover:text-[#8B2FC9] transition-colors duration-150"
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

const PRICE_RANGE_OPTIONS = [
  { value: '$', label: '$' },
  { value: '$$', label: '$$' },
  { value: '$$$', label: '$$$' },
  { value: '$$$$', label: '$$$$' },
] as const

type HoursKey = 'mondayHours' | 'tuesdayHours' | 'wednesdayHours' | 'thursdayHours' | 'fridayHours' | 'saturdayHours' | 'sundayHours'

const DAYS: { label: string; key: HoursKey }[] = [
  { label: 'Monday', key: 'mondayHours' },
  { label: 'Tuesday', key: 'tuesdayHours' },
  { label: 'Wednesday', key: 'wednesdayHours' },
  { label: 'Thursday', key: 'thursdayHours' },
  { label: 'Friday', key: 'fridayHours' },
  { label: 'Saturday', key: 'saturdayHours' },
  { label: 'Sunday', key: 'sundayHours' },
]

interface Step3Props {
  form: FormState
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  onSetField: <K extends keyof FormState>(key: K, value: FormState[K]) => void
  onBack: () => void
  onContinue: () => void
  canContinue: boolean
}

function Step3({ form, onChange, onSetField, onBack, onContinue, canContinue }: Step3Props) {
  return (
    <>
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm mb-6">

        <div className="mb-6">
          <p className="font-body text-[#8B2FC9] text-[12px] font-semibold uppercase mb-1" style={{ letterSpacing: '0.08em' }}>
            Step 3 of 5
          </p>
          <h2 className="font-heading font-bold text-[#0D0D0D] text-[22px] mb-1">
            Your Services
          </h2>
          <p className="font-body text-[#6B7280] text-[14px] leading-[1.5]">
            Tell us what you offer, what you charge, and when you&apos;re open.
          </p>
        </div>

        <div className="space-y-6">

          {/* Services Offered */}
          <div>
            <p className="font-body text-[#4A4A4A] text-[14px] font-medium mb-1">
              Services You Offer <span className="text-[#8B2FC9]">*</span>
            </p>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-2">List the services your business provides</p>
            <textarea
              name="servicesOffered"
              rows={4}
              placeholder="e.g. Oil changes, tire rotations, brake repair, engine diagnostics, transmission service..."
              value={form.servicesOffered}
              onChange={onChange}
              className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 font-body text-[15px] text-[#0D0D0D] bg-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B2FC9] transition-all duration-150 resize-none"
            />
          </div>

          {/* Price Range */}
          <div>
            <p className="font-body text-[#4A4A4A] text-[14px] font-medium mb-1">Price Range</p>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-2">General pricing tier for your services</p>
            <div className="flex gap-3 flex-wrap mt-2">
              {PRICE_RANGE_OPTIONS.map(({ value, label }) => {
                const selected = form.priceRange === value
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => onSetField('priceRange', value)}
                    className={`font-body text-[15px] font-semibold px-6 py-2.5 rounded-full cursor-pointer border-[1.5px] transition-all duration-150 ${
                      selected
                        ? 'bg-[#0D0D0D] border-[#0D0D0D] text-white'
                        : 'bg-white border-[#E5E7EB] text-[#4A4A4A] hover:border-[#8B2FC9] hover:text-[#8B2FC9]'
                    }`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
            <p className="font-body text-[#9CA3AF] text-[12px] mt-2">
              $ Budget-friendly &nbsp;·&nbsp; $$ Moderate &nbsp;·&nbsp; $$$ Premium &nbsp;·&nbsp; $$$$ Luxury
            </p>
          </div>

          {/* Opening Hours */}
          <div>
            <p className="font-body text-[#4A4A4A] text-[14px] font-medium mb-1">Opening Hours</p>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-2">Enter your typical hours or &apos;Closed&apos; for days you&apos;re not open</p>
            <div className="space-y-2 mt-2">
              {DAYS.map((day) => (
                <div key={day.key} className="flex items-center gap-3">
                  <span className="font-body text-[#4A4A4A] text-[14px] font-medium w-28 shrink-0">
                    {day.label}
                  </span>
                  <input
                    name={day.key}
                    type="text"
                    placeholder="9:00 AM – 5:00 PM"
                    value={form[day.key]}
                    onChange={onChange}
                    className="flex-1 border border-[#E5E7EB] rounded-xl px-4 py-2.5 font-body text-[14px] text-[#0D0D0D] bg-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B2FC9] transition-all duration-150"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="font-body text-[14px] text-[#4A4A4A] bg-white border border-[#E5E7EB] px-6 py-3 rounded-xl hover:border-[#8B2FC9] hover:text-[#8B2FC9] transition-colors duration-150"
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
  interestedIn: string
  interestedCategory: string
  onClearInterest: () => void
}

function Step1({ form, onChange, onContinue, canContinue, interestedIn, interestedCategory, onClearInterest }: Step1Props) {
  return (
    <>
      {/* Card */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm mb-6">

        {/* Service intent banner */}
        {interestedIn && (
          <div
            className="rounded-xl px-4 py-3 mb-6 flex items-center justify-between"
            style={{ backgroundColor: 'rgba(139,47,201,0.06)', border: '1px solid rgba(139,47,201,0.2)' }}
          >
            <div className="flex items-center gap-3">
              <Sparkles size={16} className="text-[#8B2FC9] flex-shrink-0" />
              <div>
                <p className="font-body text-[#0D0D0D] text-[14px] font-semibold">
                  You&apos;re interested in:
                </p>
                <p className="font-body text-[#8B2FC9] text-[14px] font-medium mt-0.5">
                  {interestedIn}
                  {interestedCategory && (
                    <span
                      className="inline-flex ml-2 font-body font-semibold rounded-full px-2 py-0.5"
                      style={{ backgroundColor: '#F3F4F6', color: '#6B7280', fontSize: '11px' }}
                    >
                      {interestedCategory}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClearInterest}
              className="font-body text-[#9CA3AF] text-[13px] cursor-pointer hover:text-[#E24B4A] transition-colors duration-150"
            >
              Change
            </button>
          </div>
        )}

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

interface Step4Props {
  form: FormState
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  onSetField: <K extends keyof FormState>(key: K, value: FormState[K]) => void
  onBack: () => void
  onContinue: () => void
}

function Step4({ form, onChange, onSetField, onBack, onContinue }: Step4Props) {
  const canContinue = form.biggestChallenge.trim() !== ''

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm mb-6">

        <div className="mb-6">
          <p className="font-body text-[#8B2FC9] text-[12px] font-semibold uppercase mb-1" style={{ letterSpacing: '0.08em' }}>
            Step 4 of 5
          </p>
          <h2 className="font-heading font-bold text-[#0D0D0D] text-[22px] mb-1">
            Your Current Setup
          </h2>
          <p className="font-body text-[#6B7280] text-[14px] leading-[1.5]">
            Help us understand what you&apos;re working with so we know exactly where we can help.
          </p>
        </div>

        <div className="space-y-5">

          {/* Current Tools */}
          <div>
            <label className={labelClass}>Current Software &amp; Tools</label>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-2">What tools or software does your business currently pay for?</p>
            <textarea
              name="currentTools"
              rows={3}
              placeholder="e.g. QuickBooks, Thryv, Google Workspace, Jobber, Toast POS..."
              value={form.currentTools}
              onChange={onChange}
              className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 font-body text-[15px] text-[#0D0D0D] bg-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B2FC9] focus:border-[#8B2FC9] transition-all duration-150 resize-none"
            />
          </div>

          {/* Monthly Spend */}
          <div>
            <label className={labelClass}>Monthly Software Spend</label>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-2">Roughly how much do you spend on software and tech tools each month?</p>
            <select
              name="monthlySpend"
              value={form.monthlySpend}
              onChange={onChange}
              className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 font-body text-[15px] text-[#0D0D0D] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B2FC9] focus:border-[#8B2FC9] transition-all duration-150"
            >
              <option value="">Select a range</option>
              <option value="under_100">Under $100/month</option>
              <option value="100_300">$100 – $300/month</option>
              <option value="300_500">$300 – $500/month</option>
              <option value="500_1000">$500 – $1,000/month</option>
              <option value="1000_2000">$1,000 – $2,000/month</option>
              <option value="2000_5000">$2,000 – $5,000/month</option>
              <option value="5000_plus">$5,000+/month</option>
              <option value="not_sure">Not sure</option>
            </select>
          </div>

          {/* What Is Working */}
          <div>
            <label className={labelClass}>What&apos;s Working Well</label>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-2">What parts of your current setup are you happy with?</p>
            <textarea
              name="whatIsWorking"
              rows={2}
              placeholder="e.g. Our scheduling system works great, customers love our booking page..."
              value={form.whatIsWorking}
              onChange={onChange}
              className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 font-body text-[15px] text-[#0D0D0D] bg-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B2FC9] focus:border-[#8B2FC9] transition-all duration-150 resize-none"
            />
          </div>

          {/* Biggest Challenge */}
          <div>
            <label className={labelClass}>
              Biggest Challenge <span className="text-[#8B2FC9]">*</span>
            </label>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-2">What&apos;s the biggest operational pain point costing you time or money right now?</p>
            <textarea
              name="biggestChallenge"
              rows={3}
              placeholder="e.g. We spend hours every week manually following up with customers. Our online presence is basically nonexistent..."
              value={form.biggestChallenge}
              onChange={onChange}
              className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 font-body text-[15px] text-[#0D0D0D] bg-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B2FC9] focus:border-[#8B2FC9] transition-all duration-150 resize-none"
            />
          </div>

          {/* Time Sink */}
          <div>
            <label className={labelClass}>Biggest Time Sink</label>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-2">What takes the most time that could potentially be automated?</p>
            <input
              name="timeSink"
              type="text"
              placeholder="e.g. Scheduling, invoicing, customer follow-up, social media..."
              value={form.timeSink}
              onChange={onChange}
              className={inputClass}
            />
          </div>

          {/* Previous Agency */}
          <div>
            <label className={labelClass}>Have you worked with a web or marketing agency before?</label>
            <div className="flex gap-3 flex-wrap mt-1">
              {(['yes', 'no', 'not_sure'] as const).map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => onSetField('previousAgency', val)}
                  className={`font-body text-[14px] font-medium px-5 py-2.5 rounded-full cursor-pointer border-[1.5px] transition-all duration-150 ${
                    form.previousAgency === val
                      ? 'bg-[#0D0D0D] border-[#0D0D0D] text-white'
                      : 'bg-white border-[#E5E7EB] text-[#4A4A4A] hover:border-[#8B2FC9] hover:text-[#8B2FC9]'
                  }`}
                >
                  {val === 'yes' ? 'Yes' : val === 'no' ? 'No' : 'Not sure'}
                </button>
              ))}
            </div>
            {form.previousAgency === 'yes' && (
              <div className="mt-3 space-y-1.5">
                <label className={labelClass}>What happened?</label>
                <textarea
                  name="previousAttempts"
                  rows={2}
                  placeholder="What did they build? Did it work? Why did you stop?"
                  value={form.previousAttempts}
                  onChange={onChange}
                  className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 font-body text-[15px] text-[#0D0D0D] bg-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B2FC9] focus:border-[#8B2FC9] transition-all duration-150 resize-none"
                />
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="font-body text-[14px] text-[#4A4A4A] bg-white border border-[#E5E7EB] px-6 py-3 rounded-xl hover:border-[#8B2FC9] hover:text-[#8B2FC9] transition-colors duration-150"
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

export default function IntakePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#8B2FC9] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <IntakeForm />
    </Suspense>
  )
}
