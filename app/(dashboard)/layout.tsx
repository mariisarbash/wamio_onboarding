'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Sidebar } from '@/components/sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { owner, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !owner) {
      router.push('/login')
    }
  }, [owner, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!owner) return null

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
