import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  let cookieStore: any

  try {
    cookieStore = await cookies()
  } catch (error) {
    // cookies() might fail in static generation or non-request contexts
    console.warn('Failed to get cookies, using empty store (this is expected during static build):', error)
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore?.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore?.set({ name, value, ...options })
          } catch (error) {
            // The `cookies().set()` method can only be called in a Server Action or Route Handler
            // https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore?.set({ name, value: '', ...options })
          } catch (error) {
            // The `cookies().set()` method can only be called in a Server Action or Route Handler
            // https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options
          }
        },
      },
    }
  )
}
