'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else router.push('/resources')
  }

  return (
    <main style={{padding:'2rem', maxWidth:600}}>
      <h1>Log in</h1>
      <form onSubmit={handleLogin} style={{display:'grid', gap:'0.75rem', marginTop:'1rem'}}>
        <label>Email<br/>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </label>
        <label>Password<br/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </label>
        <button type="submit">Log in</button>
        {error && <p style={{color:'red'}} aria-live="polite">{error}</p>}
      </form>
      <p style={{marginTop:'0.5rem'}}>New here? <a href="/signup">Create an account</a></p>
    </main>
  )
}
