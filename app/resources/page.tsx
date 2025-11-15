'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import AuthGuard from '@/components/AuthGuard'

type Resource = {
  id: string
  title: string
  category: string | null
  url: string | null
  description: string | null
  audience: string | null
  cost: string | null
  location: string | null
}

export default function ResourcesPage() {
  const [items, setItems] = useState<Resource[]>([])
  const [q, setQ] = useState('')

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('Resources')
        .select('*')
        .order('created_at', { ascending: false })
    if (error) {
  console.error('Supabase error:', error)
}

      if (!error && data) {
        setItems(data as Resource[])
      }
    }
    load()
  }, [])

  const filtered = items.filter((r) =>
    (r.title || '').toLowerCase().includes(q.toLowerCase()) ||
    (r.category || '').toLowerCase().includes(q.toLowerCase()) ||
    (r.location || '').toLowerCase().includes(q.toLowerCase())
  )

  return (
    <AuthGuard>
      <main style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ marginBottom: '1rem' }}>Resources</h1>

        <input
          placeholder="Search by title, category, or location..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ width: '100%', padding: '0.6rem', marginBottom: '1rem' }}
        />

        {filtered.length === 0 ? (
          <p>No resources yet.</p>
        ) : (
          <ul style={{ display: 'grid', gap: '1rem', listStyle: 'none', padding: 0 }}>
            {filtered.map((r) => (
              <li
                key={r.id}
                style={{
                  border: '1px solid #eee',
                  borderRadius: 12,
                  padding: '1rem',
                }}
              >
                <h3 style={{ margin: '0 0 0.4rem 0' }}>{r.title}</h3>
                <p style={{ margin: '0 0 0.5rem 0', color: '#666' }}>{r.description}</p>

                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                    fontSize: 14,
                  }}
                >
                  {r.category && <span><strong>Category:</strong> {r.category}</span>}
                  {r.audience && <span> • <strong>Audience:</strong> {r.audience}</span>}
                  {r.cost && <span> • <strong>Cost:</strong> {r.cost}</span>}
                  {r.location && <span> • <strong>Location:</strong> {r.location}</span>}
                </div>

                {r.url && (
                  <p style={{ marginTop: '0.6rem' }}>
                    <a href={r.url} target="_blank" rel="noreferrer">
                      Visit resource ↗
                    </a>
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </AuthGuard>
  )
}

