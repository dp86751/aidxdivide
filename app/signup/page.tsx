'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setError(error.message)
    else router.push('/resources')
  }

  return (
    <main style={{padding:'2rem', maxWidth:600}}>
      <h1>Create account</h1>
      <form onSubmit={handleSignUp} style={{display:'grid', gap:'0.75rem', marginTop:'1rem'}}>
        <label>Email<br/>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </label>
        <label>Password<br/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </label>
        <button type="submit">Sign up</button>
        {error && <p style={{color:'red'}} aria-live="polite">{error}</p>}
      </form>
      <p style={{marginTop:'0.5rem'}}>Already have an account? <a href="/login">Log in</a></p>
    </main>
  )
}
