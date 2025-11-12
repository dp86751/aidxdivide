'use client'
import './globals.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

function Nav() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setLoggedIn(!!data.user))
    const { data: sub } = supabase.auth.onAuthStateChange((_, session) => {
      setLoggedIn(!!session?.user)
    })
    return () => { sub.subscription.unsubscribe() }
  }, [])

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <nav style={{display:'flex', gap:'1rem', padding:'1rem', borderBottom:'1px solid #eee'}}>
      <Link href="/">Home</Link>
      <Link href="/resources">Resources</Link>
      <Link href="/contact">Contact</Link>
      <span style={{flex:1}} />
      {loggedIn ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
          <Link href="/login">Log in</Link>
          <Link href="/signup">Sign up</Link>
        </>
      )}
    </nav>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" style={{position:'absolute',left:'-9999px'}}>Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
      </body>
    </html>
  )
}

