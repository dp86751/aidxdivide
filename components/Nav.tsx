'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Nav() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setLoggedIn(!!data.user))

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session?.user)
    })

    return () => {
      sub.subscription.unsubscribe()
    }
  }, [])

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <nav className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3">
        <Link href="/" className="font-semibold text-slate-900">
          AIxDivide
        </Link>

        <Link href="/" className="text-slate-700 hover:underline">
          Home
        </Link>
        <Link href="/about" className="text-slate-700 hover:underline">
          About
        </Link>
        <Link href="/resources" className="text-slate-700 hover:underline">
          Resources
        </Link>
        <Link href="/contact" className="text-slate-700 hover:underline">
          Contact
        </Link>

        <span className="flex-1" />

        {loggedIn ? (
          <button
            onClick={logout}
            className="rounded-md border border-slate-300 px-3 py-1 text-sm text-slate-900 hover:bg-slate-50"
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-3">
            <Link href="/login" className="text-slate-700 hover:underline">
              Log in
            </Link>
            <Link href="/signup" className="text-slate-700 hover:underline">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
