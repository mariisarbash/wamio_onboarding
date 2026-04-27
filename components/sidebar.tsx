'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: '▦' },
  { href: '/properties/new', label: 'Aggiungi proprietà', icon: '+', highlight: true },
  { href: '/leads', label: 'Lead', icon: '◎' },
  { href: '/profile', label: 'Profilo', icon: '◷' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { owner, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <aside className="w-56 shrink-0 border-r border-zinc-100 flex flex-col h-screen sticky top-0">
      <div className="px-6 py-6 border-b border-zinc-100">
        <Link href="/dashboard" className="text-xl font-semibold tracking-tight">
          wamio
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 text-sm rounded-none transition-colors',
              item.highlight
                ? 'text-zinc-900 hover:bg-zinc-50'
                : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50',
              (pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href)))
                ? 'text-zinc-900 bg-zinc-100'
                : ''
            )}
          >
            <span className="text-base leading-none w-4 text-center">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-zinc-100">
        <p className="text-xs font-medium text-zinc-900 truncate">{owner?.name}</p>
        <p className="text-xs text-zinc-400 truncate">{owner?.email}</p>
        <button
          onClick={handleLogout}
          className="mt-3 text-xs text-zinc-400 hover:text-zinc-900 transition-colors"
        >
          Esci
        </button>
      </div>
    </aside>
  )
}
