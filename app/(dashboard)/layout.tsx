'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Sidebar } from '@/components/sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { owner, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !owner) router.push('/login')
  }, [owner, isLoading, router])

  if (isLoading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-[var(--background)]"
        suppressHydrationWarning
      >
        <div className="panel flex h-16 w-16 items-center justify-center">
          <div className="h-3.5 w-3.5 rounded-full bg-[var(--accent-strong)] animate-pulse" />
        </div>
      </div>
    )
  }

  if (!owner) return null

  return (
    <div className="min-h-screen bg-[var(--background)] md:flex" suppressHydrationWarning>
      <Sidebar />
      <main className="min-w-0 flex-1 overflow-auto">{children}</main>
    </div>
  )
}
