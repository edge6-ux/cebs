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
  } = body

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
