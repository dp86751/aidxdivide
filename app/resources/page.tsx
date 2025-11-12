import AuthGuard from '@/components/AuthGuard'

export default function ResourcesPage() {
  return (
    <AuthGuard>
      <main style={{padding:'2rem'}}>
        <h1>Resources</h1>
        <p>This page is private. After you log in or sign up, you can see resources here.</p>
      </main>
    </AuthGuard>
  )
}
