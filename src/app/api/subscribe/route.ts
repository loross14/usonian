import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}

// Simple email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase()
    const body = await request.json()
    const { email, source = 'website' } = body

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase().trim()

    if (!isValidEmail(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if already subscribed
    const { data: existing } = await supabase
      .from('subscribers')
      .select('id, status')
      .eq('email', normalizedEmail)
      .single()

    if (existing) {
      // If previously unsubscribed, reactivate
      if (existing.status === 'unsubscribed') {
        await supabase
          .from('subscribers')
          .update({
            status: 'active',
            unsubscribed_at: null,
            subscribed_at: new Date().toISOString()
          })
          .eq('id', existing.id)

        return NextResponse.json(
          { message: 'Welcome back! Your subscription has been reactivated.' },
          { status: 200 }
        )
      }

      // Already active
      return NextResponse.json(
        { message: 'You\'re already subscribed!' },
        { status: 200 }
      )
    }

    // Insert new subscriber
    const { error: insertError } = await supabase
      .from('subscribers')
      .insert({
        email: normalizedEmail,
        source,
        status: 'active',
        subscribed_at: new Date().toISOString()
      })

    if (insertError) {
      console.error('Subscribe error:', insertError)
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Successfully subscribed!' },
      { status: 201 }
    )

  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

// Unsubscribe endpoint
export async function DELETE(request: NextRequest) {
  try {
    const supabase = getSupabase()
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase().trim()

    const { error } = await supabase
      .from('subscribers')
      .update({
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString()
      })
      .eq('email', normalizedEmail)

    if (error) {
      console.error('Unsubscribe error:', error)
      return NextResponse.json(
        { error: 'Failed to unsubscribe. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Successfully unsubscribed.' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
