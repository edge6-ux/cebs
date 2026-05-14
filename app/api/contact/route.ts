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
  } = body

  if (!fullName || !businessName || !email || !challenge) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  const { error: dbError } = await supabaseAdmin
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
      status: 'new',
    })

  if (dbError) {
    console.error('DB error:', dbError)
    return NextResponse.json(
      { error: 'Failed to save' },
      { status: 500 }
    )
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
