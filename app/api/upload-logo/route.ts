import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()
  const filename = `logos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const buffer = new Uint8Array(await file.arrayBuffer())

  const { error } = await supabaseAdmin.storage
    .from('intake-assets')
    .upload(filename, buffer, { contentType: file.type, upsert: false })

  if (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }

  const { data: { publicUrl } } = supabaseAdmin.storage
    .from('intake-assets')
    .getPublicUrl(filename)

  return NextResponse.json({ url: publicUrl })
}
