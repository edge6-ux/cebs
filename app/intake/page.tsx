'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, Calendar, Check, CheckCircle, Target, Sparkles, Upload } from 'lucide-react'
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

  // Step 6
  existingSiteIssues: string
  competitorSites: string
  pagesNeeded: string[]
  hasCopy: string
  hasPhotos: string
  referenceSites: string
  idealCustomer: string
  brandWords: string
}

const inputClass =
  'w-full border border-[#E5E7EB] rounded-xl px-4 py-3 font-body text-[15px] text-[#0D0D0D] bg-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B2FC9] focus:border-[#8B2FC9] transition-all duration-150'

const labelClass = 'block font-body text-[#0D0D0D] text-sm font-medium mb-1.5'

const STEP_LABELS = ['Business', 'Presence', 'Services', 'Setup', 'Goals']

type SchemaInput = {
  businessName: string; businessType: string; industry: string
  phone: string; email: string; website: string
  address: string; city: string; state: string; zip: string
  serviceAreas: string; servicesOffered: string; priceRange: string
  mondayHours: string; tuesdayHours: string; wednesdayHours: string
  thursdayHours: string; fridayHours: string; saturdayHours: string
  sundayHours: string; reviewRating: string; reviewCount: string; logoUrl: string
}

function generateSchema(d: SchemaInput): Record<string, unknown> {
  const hours = [
    d.mondayHours && `Mo ${d.mondayHours}`,
    d.tuesdayHours && `Tu ${d.tuesdayHours}`,
    d.wednesdayHours && `We ${d.wednesdayHours}`,
    d.thursdayHours && `Th ${d.thursdayHours}`,
    d.fridayHours && `Fr ${d.fridayHours}`,
    d.saturdayHours && `Sa ${d.saturdayHours}`,
    d.sundayHours && `Su ${d.sundayHours}`,
  ].filter(Boolean)
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: d.businessName,
    description: d.businessType || d.industry,
    ...(d.website && { url: d.website }),
    telephone: d.phone,
    email: d.email,
    ...(d.logoUrl && { image: d.logoUrl }),
    ...(d.address && { address: { '@type': 'PostalAddress', streetAddress: d.address, addressLocality: d.city, addressRegion: d.state, postalCode: d.zip } }),
    ...(d.serviceAreas && { areaServed: d.serviceAreas }),
    ...(hours.length && { openingHours: hours }),
    ...(d.servicesOffered && { hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Services', description: d.servicesOffered } }),
    ...(d.reviewRating && { aggregateRating: { '@type': 'AggregateRating', ratingValue: d.reviewRating, ...(d.reviewCount && { reviewCount: d.reviewCount }) } }),
    ...(d.priceRange && { priceRange: d.priceRange }),
  }
}

function IntakeForm() {
  const [step, setStep] = useState(1)
  const [interestedIn, setInterestedIn] = useState('')
  const [interestedCategory, setInterestedCategory] = useState('')

  const searchParams = useSearchParams()

  useEffect(() => {
    document.title = 'Get Started | Honed Ops'
  }, [])

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

    // Step 6
    existingSiteIssues: '',
    competitorSites: '',
    pagesNeeded: [],
    hasCopy: '',
    hasPhotos: '',
    referenceSites: '',
    idealCustomer: '',
    brandWords: '',
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

  async function handleSubmit() {
    setSubmitting(true)
    setError(null)

    const schemaJson = generateSchema({
      businessName: form.businessName, businessType: form.businessType, industry: form.industry,
      phone: form.phone, email: form.email, website: form.website,
      address: form.address, city: form.city, state: form.state, zip: form.zip,
      serviceAreas: form.serviceAreas, servicesOffered: form.servicesOffered, priceRange: form.priceRange,
      mondayHours: form.mondayHours, tuesdayHours: form.tuesdayHours, wednesdayHours: form.wednesdayHours,
      thursdayHours: form.thursdayHours, fridayHours: form.fridayHours, saturdayHours: form.saturdayHours,
      sundayHours: form.sundayHours, reviewRating: form.reviewRating, reviewCount: form.reviewCount,
      logoUrl: form.logoUrl,
    })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.businessName,
          businessName: form.businessName,
          email: form.email,
          phone: form.phone,
          industry: form.industry,
          businessType: form.businessType,
          website: form.website,
          address: form.address,
          city: form.city,
          state: form.state,
          zip: form.zip,
          serviceAreas: form.serviceAreas,
          socialLinks: { facebook: form.facebook, instagram: form.instagram, other: form.otherSocial },
          trustBadges: form.trustBadges,
          reviewRating: form.reviewRating,
          reviewCount: form.reviewCount,
          logoUrl: form.logoUrl,
          brandColors: [form.primaryColor, form.secondaryColor].filter(c => c !== '#000000'),
          ctaPreference: form.ctaPreference,
          servicesOffered: form.servicesOffered,
          priceRange: form.priceRange,
          openingHours: {
            monday: form.mondayHours, tuesday: form.tuesdayHours, wednesday: form.wednesdayHours,
            thursday: form.thursdayHours, friday: form.fridayHours, saturday: form.saturdayHours,
            sunday: form.sundayHours,
          },
          currentTools: form.currentTools,
          monthlySpend: form.monthlySpend,
          whatIsWorking: form.whatIsWorking,
          challenge: form.biggestChallenge,
          timeSink: form.timeSink,
          previousAgency: form.previousAgency,
          previousAttempts: form.previousAttempts,
          successDefinition: form.successDefinition,
          timeline: form.timeline,
          budgetRange: form.budgetRange,
          hearAboutUs: form.hearAboutUs,
          additionalNotes: form.additionalNotes,
          interestedIn,
          interestedCategory,
          schemaJson,
          source: 'intake',
          existingSiteIssues: form.existingSiteIssues,
          competitorSites: form.competitorSites,
          pagesNeeded: form.pagesNeeded,
          hasCopy: form.hasCopy,
          hasPhotos: form.hasPhotos,
          referenceSites: form.referenceSites,
          idealCustomer: form.idealCustomer,
          brandWords: form.brandWords,
        }),
      })

      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or contact us directly at contact@honedops.com')
      setSubmitting(false)
    }
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

  const showStep6 =
    interestedCategory === 'Web Presence' ||
    interestedIn.toLowerCase().includes('website') ||
    form.servicesOffered.toLowerCase().includes('website')

  const totalSteps = showStep6 ? 6 : 5

  const stepLabels = showStep6
    ? ['Business', 'Presence', 'Services', 'Setup', 'Goals', 'Website']
    : ['Business', 'Presence', 'Services', 'Setup', 'Goals']

  const fillPct = ((step - 1) / (totalSteps - 1)) * 100

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-12 shadow-sm text-center max-w-lg w-full">
          <CheckCircle size={64} className="text-[#8B2FC9] mx-auto mb-6" />
          <h2 className="font-heading font-bold text-[#0D0D0D] text-[28px] mb-3">
            We&apos;ll be in touch.
          </h2>
          <p className="font-body text-[#6B7280] text-[16px] leading-[1.7] mb-8 max-w-sm mx-auto">
            Thanks for taking the time to fill this out{form.businessName ? `, ${form.businessName}` : ''}. We&apos;ve received your information and will reach out within one business day.
          </p>
          <Link
            href="/"
            className="inline-block font-heading font-bold text-[14px] uppercase text-white bg-[#0D0D0D] px-6 py-3 rounded-xl hover:bg-[#333333] transition-colors duration-150"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Header ── */}
      <header className="bg-white border-b border-[#E5E7EB] px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/honedopsnobg.png" alt="Honed Ops" width={30} height={30} className="shrink-0" />
            <div className="flex flex-col leading-tight">
              <span className="font-body font-bold text-base tracking-tight text-[#1A1A1A]">Honed Ops</span>
              <span className="font-body font-medium text-[11px] tracking-wide uppercase text-brand-purple">Operate With an Edge</span>
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
            {stepLabels.map((label, i) => (
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
          {step === 5 && (
            <Step5
              form={form}
              onChange={handleChange}
              onSetField={handleSetField}
              onBack={() => goToStep(4)}
              onSubmit={handleSubmit}
              onContinue={() => goToStep(6)}
              showStep6={showStep6}
              submitting={submitting}
              error={error}
            />
          )}
          {step === 6 && showStep6 && (
            <Step6
              form={form}
              onChange={handleChange}
              onSetField={handleSetField}
              onBack={() => goToStep(5)}
              onSubmit={handleSubmit}
              submitting={submitting}
              error={error}
            />
          )}

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
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload-logo', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Upload failed')
      onSetField('logoUrl', json.url)
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

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

          {/* Logo */}
          <div>
            <p className="font-body text-[#4A4A4A] text-[14px] font-medium mb-1">Logo</p>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-3">Upload your business logo</p>
            {form.logoUrl ? (
              <div className="flex items-center gap-4 p-4 border border-[#E5E7EB] rounded-xl bg-[#F9F9F9]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.logoUrl}
                  alt="Logo preview"
                  className="object-contain rounded-lg border border-[#E5E7EB] bg-white shrink-0"
                  style={{ width: 56, height: 56 }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-body text-[#0D0D0D] text-[14px] font-medium">Logo uploaded</p>
                  <p className="font-body text-[#9CA3AF] text-[12px] mt-0.5 truncate">{form.logoUrl.split('/').pop()}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onSetField('logoUrl', '')}
                  className="font-body text-[#9CA3AF] text-[13px] hover:text-[#E24B4A] transition-colors duration-150 shrink-0"
                >
                  Remove
                </button>
              </div>
            ) : (
              <label className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl px-4 py-8 cursor-pointer transition-colors duration-150 ${uploading ? 'border-[#8B2FC9] bg-[rgba(139,47,201,0.04)]' : 'border-[#E5E7EB] hover:border-[#8B2FC9] bg-white hover:bg-[rgba(139,47,201,0.02)]'}`}>
                {uploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#8B2FC9] border-t-transparent rounded-full animate-spin" />
                    <span className="font-body text-[#8B2FC9] text-[14px]">Uploading...</span>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-xl bg-[rgba(139,47,201,0.08)] flex items-center justify-center">
                      <Upload size={18} className="text-[#8B2FC9]" />
                    </div>
                    <span className="font-body text-[#0D0D0D] text-[14px] font-medium">Upload your logo</span>
                    <span className="font-body text-[#9CA3AF] text-[12px]">PNG, JPG, SVG up to 5MB</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  disabled={uploading}
                  onChange={handleLogoUpload}
                />
              </label>
            )}
            {uploadError && (
              <p className="font-body text-[#E24B4A] text-[13px] mt-2">{uploadError}</p>
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

interface Step5Props {
  form: FormState
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  onSetField: <K extends keyof FormState>(key: K, value: FormState[K]) => void
  onBack: () => void
  onSubmit: () => void
  onContinue: () => void
  showStep6: boolean
  submitting: boolean
  error: string | null
}

function Step5({ form, onChange, onSetField, onBack, onSubmit, onContinue, showStep6, submitting, error }: Step5Props) {
  return (
    <>
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm mb-6">

        <div className="mb-6">
          <p className="font-body text-[#8B2FC9] text-[12px] font-semibold uppercase mb-1" style={{ letterSpacing: '0.08em' }}>
            Step 5 of 5
          </p>
          <h2 className="font-heading font-bold text-[#0D0D0D] text-[22px] mb-1">Your Goals</h2>
          <p className="font-body text-[#6B7280] text-[14px] leading-[1.5]">
            Help us understand what you want to achieve so we can make the most of our first conversation.
          </p>
        </div>

        <div className="space-y-5">

          {/* Success definition */}
          <div>
            <label className={labelClass}>What Does Success Look Like?</label>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-2">In 6–12 months, what would a great outcome look like?</p>
            <textarea
              name="successDefinition"
              rows={3}
              placeholder="e.g. Cut software costs in half, get more online bookings, stop losing customers to follow-up..."
              value={form.successDefinition}
              onChange={onChange}
              className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 font-body text-[15px] text-[#0D0D0D] bg-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B2FC9] focus:border-[#8B2FC9] transition-all duration-150 resize-none"
            />
          </div>

          {/* Timeline */}
          <div>
            <label className={labelClass}>Timeline</label>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-2">When are you hoping to get started?</p>
            <div className="flex gap-3 flex-wrap mt-1">
              {[
                { value: 'asap', label: 'ASAP' },
                { value: '1_3_months', label: '1–3 months' },
                { value: '3_6_months', label: '3–6 months' },
                { value: 'just_exploring', label: 'Just exploring' },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onSetField('timeline', value)}
                  className={`font-body text-[14px] font-medium px-5 py-2.5 rounded-full cursor-pointer border-[1.5px] transition-all duration-150 ${
                    form.timeline === value
                      ? 'bg-[#0D0D0D] border-[#0D0D0D] text-white'
                      : 'bg-white border-[#E5E7EB] text-[#4A4A4A] hover:border-[#8B2FC9] hover:text-[#8B2FC9]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Budget range */}
          <div>
            <label className={labelClass}>Budget Range</label>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-2">What are you thinking in terms of investment?</p>
            <div className="flex gap-3 flex-wrap mt-1">
              {[
                { value: 'under_1k', label: 'Under $1k' },
                { value: '1k_3k', label: '$1k – $3k' },
                { value: '3k_7k', label: '$3k – $7k' },
                { value: '7k_15k', label: '$7k – $15k' },
                { value: '15k_plus', label: '$15k+' },
                { value: 'not_sure', label: 'Not sure yet' },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onSetField('budgetRange', value)}
                  className={`font-body text-[14px] font-medium px-5 py-2.5 rounded-full cursor-pointer border-[1.5px] transition-all duration-150 ${
                    form.budgetRange === value
                      ? 'bg-[#0D0D0D] border-[#0D0D0D] text-white'
                      : 'bg-white border-[#E5E7EB] text-[#4A4A4A] hover:border-[#8B2FC9] hover:text-[#8B2FC9]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* How did you hear */}
          <div>
            <label className={labelClass}>How Did You Hear About Us?</label>
            <select
              name="hearAboutUs"
              value={form.hearAboutUs}
              onChange={onChange}
              className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 font-body text-[15px] text-[#0D0D0D] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B2FC9] focus:border-[#8B2FC9] transition-all duration-150"
            >
              <option value="">Select one</option>
              <option value="google">Google search</option>
              <option value="social_media">Social media</option>
              <option value="referral">Referral from someone I know</option>
              <option value="word_of_mouth">Word of mouth</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Additional notes */}
          <div>
            <label className={labelClass}>Anything Else?</label>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-2">Anything else you want us to know before we reach out?</p>
            <textarea
              name="additionalNotes"
              rows={3}
              placeholder="e.g. We've tried this before and it didn't work. We have a tight deadline. We need mobile-first..."
              value={form.additionalNotes}
              onChange={onChange}
              className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 font-body text-[15px] text-[#0D0D0D] bg-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B2FC9] focus:border-[#8B2FC9] transition-all duration-150 resize-none"
            />
          </div>

        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          disabled={submitting}
          className="font-body text-[14px] text-[#4A4A4A] bg-white border border-[#E5E7EB] px-6 py-3 rounded-xl hover:border-[#8B2FC9] hover:text-[#8B2FC9] transition-colors duration-150 disabled:opacity-50"
        >
          ← Back
        </button>
        {showStep6 ? (
          <button
            onClick={onContinue}
            disabled={submitting}
            className="font-heading font-bold text-[14px] uppercase text-white bg-[#8B2FC9] px-8 py-3 rounded-xl hover:bg-[#7A28B8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Continue →
          </button>
        ) : (
          <button
            onClick={onSubmit}
            disabled={submitting}
            className="font-heading font-bold text-[14px] uppercase text-white bg-[#8B2FC9] px-8 py-3 rounded-xl hover:bg-[#7A28B8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : 'Submit →'}
          </button>
        )}
      </div>
      {!showStep6 && error && (
        <p className="font-body text-[#E24B4A] text-sm mt-3 text-center">{error}</p>
      )}
    </>
  )
}

const PAGE_OPTIONS = [
  'Home', 'Services', 'About', 'Contact', 'Gallery / Portfolio',
  'Blog', 'Booking', 'Reviews / Testimonials', 'FAQ', 'Other',
]

interface Step6Props {
  form: FormState
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  onSetField: <K extends keyof FormState>(key: K, value: FormState[K]) => void
  onBack: () => void
  onSubmit: () => void
  submitting: boolean
  error: string | null
}

function Step6({ form, onChange, onSetField, onBack, onSubmit, submitting, error }: Step6Props) {
  function togglePage(page: string) {
    const updated = form.pagesNeeded.includes(page)
      ? form.pagesNeeded.filter((p) => p !== page)
      : [...form.pagesNeeded, page]
    onSetField('pagesNeeded', updated)
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm mb-6">

        <div className="mb-6">
          <p className="font-body text-[#8B2FC9] text-[12px] font-semibold uppercase mb-1" style={{ letterSpacing: '0.08em' }}>
            Step 6 of 6
          </p>
          <h2 className="font-heading font-bold text-[#0D0D0D] text-[22px] mb-1">Your Website</h2>
          <p className="font-body text-[#6B7280] text-[14px] leading-[1.5]">
            Help us understand exactly what you need so we can hit the ground running.
          </p>
        </div>

        <div className="space-y-5">

          {/* Existing site issues */}
          <div>
            <label className={labelClass}>Current Website Issues</label>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-2">What do you hate about your current site? Leave blank if you don&apos;t have one.</p>
            <textarea
              name="existingSiteIssues"
              rows={3}
              placeholder="Hard to find on Google, looks outdated, no way to book online, not mobile friendly..."
              value={form.existingSiteIssues}
              onChange={onChange}
              className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 font-body text-[15px] text-[#0D0D0D] bg-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B2FC9] focus:border-[#8B2FC9] transition-all duration-150 resize-none"
            />
          </div>

          {/* Competitor sites */}
          <div>
            <label className={labelClass}>Competitor Websites</label>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-2">Who are your top competitors? What do their sites do well?</p>
            <textarea
              name="competitorSites"
              rows={2}
              placeholder="Competitor name and what stands out about their website..."
              value={form.competitorSites}
              onChange={onChange}
              className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 font-body text-[15px] text-[#0D0D0D] bg-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B2FC9] focus:border-[#8B2FC9] transition-all duration-150 resize-none"
            />
          </div>

          {/* Pages needed */}
          <div>
            <label className={labelClass}>Pages You Need</label>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-2">Select all that apply</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {PAGE_OPTIONS.map((page) => {
                const checked = form.pagesNeeded.includes(page)
                return (
                  <div
                    key={page}
                    className="flex items-center gap-2.5 cursor-pointer py-1"
                    onClick={() => togglePage(page)}
                  >
                    <div
                      className={`w-[18px] h-[18px] rounded-md shrink-0 flex items-center justify-center border-[1.5px] transition-all duration-150 ${
                        checked ? 'bg-[#8B2FC9] border-[#8B2FC9]' : 'bg-white border-[#D1D5DB]'
                      }`}
                    >
                      {checked && <Check size={12} className="text-white" strokeWidth={3} />}
                    </div>
                    <span className="font-body text-[#4A4A4A] text-[14px] select-none">{page}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Has copy */}
          <div>
            <label className={labelClass}>Do you have copy written for the site?</label>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-2">Copy = the text content for each page</p>
            <div className="flex gap-3 flex-wrap mt-1">
              {[
                { value: 'yes', label: 'Yes, ready' },
                { value: 'partial', label: 'Partially' },
                { value: 'no', label: 'No — need help' },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onSetField('hasCopy', value)}
                  className={`font-body text-[14px] font-medium px-5 py-2.5 rounded-full cursor-pointer border-[1.5px] transition-all duration-150 ${
                    form.hasCopy === value
                      ? 'bg-[#0D0D0D] border-[#0D0D0D] text-white'
                      : 'bg-white border-[#E5E7EB] text-[#4A4A4A] hover:border-[#8B2FC9] hover:text-[#8B2FC9]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Has photos */}
          <div>
            <label className={labelClass}>Do you have photos?</label>
            <div className="flex gap-3 flex-wrap mt-1">
              {[
                { value: 'professional', label: 'Professional' },
                { value: 'phone', label: 'Phone photos' },
                { value: 'none', label: 'Need stock photos' },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onSetField('hasPhotos', value)}
                  className={`font-body text-[14px] font-medium px-5 py-2.5 rounded-full cursor-pointer border-[1.5px] transition-all duration-150 ${
                    form.hasPhotos === value
                      ? 'bg-[#0D0D0D] border-[#0D0D0D] text-white'
                      : 'bg-white border-[#E5E7EB] text-[#4A4A4A] hover:border-[#8B2FC9] hover:text-[#8B2FC9]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Reference sites */}
          <div>
            <label className={labelClass}>Sites You Like the Look Of</label>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-2">Any industry — just for design reference</p>
            <textarea
              name="referenceSites"
              rows={3}
              placeholder={"https://example.com — love the clean layout\nhttps://example2.com — like the color scheme"}
              value={form.referenceSites}
              onChange={onChange}
              className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 font-body text-[15px] text-[#0D0D0D] bg-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B2FC9] focus:border-[#8B2FC9] transition-all duration-150 resize-none"
            />
          </div>

          {/* Ideal customer */}
          <div>
            <label className={labelClass}>Your Ideal Customer</label>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-2">Who is your best customer? Be specific.</p>
            <textarea
              name="idealCustomer"
              rows={2}
              placeholder="Homeowners in Hall County, age 35–60, own their home, dual income, need emergency services..."
              value={form.idealCustomer}
              onChange={onChange}
              className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 font-body text-[15px] text-[#0D0D0D] bg-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B2FC9] focus:border-[#8B2FC9] transition-all duration-150 resize-none"
            />
          </div>

          {/* Brand words */}
          <div>
            <label className={labelClass}>3 Words for Your Site</label>
            <p className="font-body text-[#9CA3AF] text-[12px] mb-2">What should visitors feel when they land on your website?</p>
            <input
              name="brandWords"
              type="text"
              placeholder="e.g. trustworthy, local, professional"
              value={form.brandWords}
              onChange={onChange}
              className={inputClass}
            />
          </div>

        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          disabled={submitting}
          className="font-body text-[14px] text-[#4A4A4A] bg-white border border-[#E5E7EB] px-6 py-3 rounded-xl hover:border-[#8B2FC9] hover:text-[#8B2FC9] transition-colors duration-150 disabled:opacity-50"
        >
          ← Back
        </button>
        <button
          onClick={onSubmit}
          disabled={submitting}
          className="font-heading font-bold text-[14px] uppercase text-white bg-[#8B2FC9] px-8 py-3 rounded-xl hover:bg-[#7A28B8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {submitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </>
          ) : 'Submit →'}
        </button>
      </div>
      {error && (
        <p className="font-body text-[#E24B4A] text-sm mt-3 text-center">{error}</p>
      )}
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
