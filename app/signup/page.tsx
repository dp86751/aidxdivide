'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

 async function handleSignUp(e: React.FormEvent) {
  e.preventDefault()
  setError(null)
  setSuccess(null)

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/login"
          : "https://aidxdivide.vercel.app/login",
    },
  })

  if (error) {
    setError(error.message)
    return
  }

  // IMPORTANT: with email confirmation ON, user is not logged in yet
  setSuccess(
    "Account created. Please check your email and click the verification link. After verifying, return here and log in. (Check spam/junk too.)"
  )

  // Optional: clear fields so it's obvious signup submitted
  setEmail("")
  setPassword("")
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
        {success && <p style={{color:'green'}} aria-live="polite">{success}</p>}
        {success && (
  <p style={{ marginTop: "0.75rem" }}>
    After verifying, click here: <a href="/login">Log in</a>
  </p>
)}

      </form>
      <p style={{marginTop:'0.5rem'}}>Already have an account? <a href="/login">Log in</a></p>
    </main>
  )
}
