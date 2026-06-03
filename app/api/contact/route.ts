import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendAuditConfirmation, sendLeadNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const {
    fullName,
    businessName,
    email,
    phone,
    industry,
    challenge,
    monthlySpend,
    hearAboutUs,
    interestedIn,
    interestedCategory,
    businessType,
    website,
    address,
    city,
    state,
    zip,
    serviceAreas,
    socialLinks,
    trustBadges,
    reviewRating,
    reviewCount,
    logoUrl,
    brandColors,
    ctaPreference,
    servicesOffered,
    priceRange,
    openingHours,
    currentTools,
    whatIsWorking,
    timeSink,
    previousAgency,
    previousAttempts,
    successDefinition,
    timeline,
    budgetRange,
    additionalNotes,
    schemaJson,
    source,
    existingSiteIssues,
    competitorSites,
    pagesNeeded,
    hasCopy,
    hasPhotos,
    referenceSites,
    idealCustomer,
    brandWords,
  } = body

  const websiteNotes =
    existingSiteIssues || competitorSites || (Array.isArray(pagesNeeded) && pagesNeeded.length > 0)
      ? [
          existingSiteIssues ? `Site issues: ${existingSiteIssues}` : '',
          competitorSites ? `Competitors: ${competitorSites}` : '',
          Array.isArray(pagesNeeded) && pagesNeeded.length > 0 ? `Pages needed: ${(pagesNeeded as string[]).join(', ')}` : '',
          hasCopy ? `Has copy: ${hasCopy}` : '',
          hasPhotos ? `Has photos: ${hasPhotos}` : '',
          referenceSites ? `Reference sites: ${referenceSites}` : '',
          idealCustomer ? `Ideal customer: ${idealCustomer}` : '',
          brandWords ? `Brand words: ${brandWords}` : '',
        ].filter(Boolean).join('\n')
      : ''

  if (!fullName || !businessName || !email || !challenge) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  const { data: lead, error: dbError } = await supabaseAdmin
    .from('cebs_leads')
    .insert({
      full_name: fullName,
      business_name: businessName,
      email,
      phone: phone || '',
      industry: industry || '',
      challenge,
      monthly_spend: monthlySpend || '',
      hear_about_us: hearAboutUs || '',
      interested_in: interestedIn || '',
      interested_category: interestedCategory || '',
      business_type: businessType || '',
      website: website || '',
      address: address || '',
      city: city || '',
      state: state || '',
      zip: zip || '',
      service_areas: serviceAreas || '',
      social_links: socialLinks || {},
      trust_badges: trustBadges || '',
      review_rating: reviewRating ? parseFloat(reviewRating) : null,
      review_count: reviewCount ? parseInt(reviewCount) : null,
      logo_url: logoUrl || '',
      brand_colors: brandColors || [],
      cta_preference: ctaPreference || '',
      services_offered: servicesOffered || '',
      price_range: priceRange || '',
      opening_hours: openingHours || {},
      what_is_working: whatIsWorking || '',
      time_sink: timeSink || '',
      previous_agency: previousAgency || '',
      previous_attempts: previousAttempts || '',
      success_definition: successDefinition || '',
      timeline: timeline || '',
      budget_range: budgetRange || '',
      additional_notes: websiteNotes ? `${additionalNotes || ''}\n\nWebsite Details:\n${websiteNotes}`.trim() : (additionalNotes || ''),
      schema_json: schemaJson || null,
      source: source || 'contact',
      status: 'new',
    })
    .select('id')
    .single()

  if (dbError || !lead) {
    console.error('DB error:', dbError)
    return NextResponse.json(
      { error: 'Failed to save' },
      { status: 500 }
    )
  }

  try {
    const { data: existing } = await supabaseAdmin
      .from('customers')
      .select('id, email')
      .eq('email', email)
      .maybeSingle()

    if (existing) {
      await supabaseAdmin
        .from('customers')
        .update({ lead_id: lead.id, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
      console.log('Linked to existing customer:', existing.id)
    } else {
      await supabaseAdmin
        .from('customers')
        .insert({
          lead_id: lead.id,
          business_name: businessName,
          contact_name: fullName,
          email,
          phone: phone || '',
          industry: industry || '',
          website: website || '',
          status: 'active',
        })
      console.log('New customer created:', email)
    }
  } catch (err) {
    console.error('Customer auto-creation failed:', err)
  }

  try {
    await Promise.all([
      sendAuditConfirmation({ fullName, email, businessName }),
      sendLeadNotification({
        fullName,
        businessName,
        email,
        phone: phone || '',
        industry: industry || '',
        challenge,
        monthlySpend: monthlySpend || '',
        hearAboutUs: hearAboutUs || '',
      }),
    ])
  } catch (emailErr) {
    console.error('Email error:', emailErr)
  }

  return NextResponse.json({ success: true })
}
