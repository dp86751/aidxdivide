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
  const [q, setQ] = useState("")
  const [userId, setUserId] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [loadingFavs, setLoadingFavs] = useState(true)

  useEffect(() => {
    async function loadAll() {
      // A) Load resources
      const { data, error } = await supabase
        .from("Resources")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Supabase error loading resources:", error)
      } else {
        setItems((data || []) as Resource[])
      }

      // B) Load user + their favorites
      const { data: userData } = await supabase.auth.getUser()

      if (!userData?.user) {
        setUserId(null)
        setFavorites([])
        setLoadingFavs(false)
        return
      }

      setUserId(userData.user.id)

      const { data: favs, error: favErr } = await supabase
        .from("Favorites")
        .select("resource_id")
        .eq("user_id", userData.user.id)

      if (favErr) {
        console.error("Error loading favorites:", favErr)
        setFavorites([])
      } else {
        setFavorites((favs || []).map((f: any) => f.resource_id))
      }

      setLoadingFavs(false)
    }

    loadAll()
  }, [])

  const filtered = items.filter((r) =>
    (r.title || '').toLowerCase().includes(q.toLowerCase()) ||
    (r.category || '').toLowerCase().includes(q.toLowerCase()) ||
    (r.location || '').toLowerCase().includes(q.toLowerCase())
  )
// helper: check if a resource is favorited
function isFavorite(resourceId: string | number) {
  return favorites.includes(String(resourceId))
}

async function toggleFavorite(resourceId: string | number) {
  if (!userId) return

  const rid = String(resourceId)

  // If already favorited → delete
  if (favorites.includes(rid)) {
    const { error } = await supabase
      .from("Favorites")
      .delete()
      .eq("user_id", userId)
      .eq("resource_id", resourceId)

    if (error) {
      console.error("Error deleting favorite:", error)
      return
    }

    setFavorites((prev) => prev.filter((x) => x !== rid))
    return
  }

  // Otherwise → insert
  const { error } = await supabase.from("Favorites").insert([
    {
      user_id: userId,
      resource_id: resourceId,
    },
  ])

  if (error) {
    console.error("Error adding favorite:", error)
    return
  }

  setFavorites((prev) => [...prev, rid])
}
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
                <button
  onClick={() => toggleFavorite(r.id)}
  style={{
    marginBottom: "0.5rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1.1rem",
  }}
>
  {isFavorite(r.id) ? "★ Favorited" : "☆ Save"}
</button>

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

