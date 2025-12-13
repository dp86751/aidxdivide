import './globals.css'
import Nav from '../components/Nav'


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:shadow"
        >
          Skip to content
        </a>

        <Nav />

        <main id="main" className="mx-auto max-w-5xl px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  )
}
