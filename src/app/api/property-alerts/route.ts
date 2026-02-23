import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { isValidEmail, normalizeEmail } from '@/lib/validation/email'

// Initialize Supabase client with service role for bypassing RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

/**
 * POST: Create a property listing alert
 * Body: { email: string, property_id: string }
 */
export async function POST(request: NextRequest) {
  // Check if Supabase is configured
  if (!supabaseUrl || !supabaseServiceKey) {
    // In development without Supabase, just return success
    console.log('Supabase not configured. Property alert would be saved.')
    return NextResponse.json(
      { message: 'Alert created (dev mode)' },
      { status: 201 }
    )
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    const body = await request.json()
    const { email, property_id } = body

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Validate property_id
    if (!property_id || typeof property_id !== 'string') {
      return NextResponse.json(
        { error: 'Invalid property' },
        { status: 400 }
      )
    }

    const normalizedEmail = normalizeEmail(email)

    // Check if alert already exists
    const { data: existingAlert } = await supabase
      .from('property_alerts')
      .select('id, status')
      .eq('property_id', property_id)
      .eq('email', normalizedEmail)
      .single()

    if (existingAlert) {
      // Reactivate if previously unsubscribed
      if (existingAlert.status === 'unsubscribed') {
        const { error: updateError } = await supabase
          .from('property_alerts')
          .update({
            status: 'active',
            unsubscribed_at: null,
          })
          .eq('id', existingAlert.id)

        if (updateError) throw updateError

        return NextResponse.json(
          { message: 'Alert reactivated successfully' },
          { status: 200 }
        )
      }

      // Already subscribed and active
      return NextResponse.json(
        { message: 'You are already watching this property' },
        { status: 200 }
      )
    }

    // Create new alert
    const { error: insertError } = await supabase
      .from('property_alerts')
      .insert({
        property_id,
        email: normalizedEmail,
        status: 'active',
      })

    if (insertError) throw insertError

    return NextResponse.json(
      { message: 'Alert created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Property alert error:', error)
    return NextResponse.json(
      { error: 'Unable to create alert. Please try again.' },
      { status: 500 }
    )
  }
}

/**
 * DELETE: Unsubscribe from a property alert
 * Query: ?email=xxx&property_id=xxx
 */
export async function DELETE(request: NextRequest) {
  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json(
      { message: 'Unsubscribed (dev mode)' },
      { status: 200 }
    )
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const propertyId = searchParams.get('property_id')

    if (!email || !propertyId) {
      return NextResponse.json(
        { error: 'Email and property_id are required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('property_alerts')
      .update({
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString(),
      })
      .eq('email', normalizeEmail(email))
      .eq('property_id', propertyId)

    if (error) throw error

    return NextResponse.json(
      { message: 'Unsubscribed successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.json(
      { error: 'Unable to unsubscribe. Please try again.' },
      { status: 500 }
    )
  }
}
