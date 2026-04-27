'use client'

import Link from 'next/link'
import { Building2, CircleUserRound, LayoutGrid, LogOut, Plus, Sparkles } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { cn } from '@/lib/utils'

const nav = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    caption: 'Panoramica live',
    icon: LayoutGrid,
  },
  {
    href: '/properties/new',
    label: 'Nuova proprietà',
    caption: 'Setup rapido',
    icon: Plus,
  },
  {
    href: '/leads',
    label: 'Lead',
    caption: 'Richieste e follow-up',
    icon: Sparkles,
  },
  {
    href: '/profile',
    label: 'Profilo',
    caption: 'Brand e contatti',
    icon: CircleUserRound,
  },
]

function initials(name?: string) {
  if (!name) return 'WA'
  return name
    .split(' ')
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function Sidebar() {
  const pathname = usePathname()
  const { owner, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <aside className="w-full shrink-0 border-b border-[var(--border)] bg-[var(--sidebar)]/90 backdrop-blur-xl md:sticky md:top-0 md:h-screen md:w-[288px] md:border-b-0 md:border-r">
      <div className="flex h-full flex-col gap-5 px-4 py-4 md:px-5 md:py-5">
        <div className="panel-soft px-4 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="eyebrow mb-3">Wamio</p>
              <Link href="/dashboard" className="flex items-center gap-3 text-[1.45rem] font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[var(--shadow-soft)]">
                  <Building2 className="h-5 w-5" />
                </span>
                <span>wamio</span>
              </Link>
              <p className="mt-3 max-w-[18rem] text-sm leading-6 text-[var(--muted-foreground)]">
                Gestione affitti più chiara, più fresca, più immediata.
              </p>
            </div>
            <span className="rounded-full border border-[var(--border)] bg-white/55 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[var(--muted-strong)] dark:bg-white/5">
              Milano
            </span>
          </div>
        </div>

        <nav className="grid gap-2">
          {nav.map(item => {
            const active =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn('sidebar-link', active && 'sidebar-link-active')}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-[var(--border)] bg-white/60 text-[var(--foreground)] dark:bg-white/5">
                  <item.icon className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold tracking-[-0.02em]">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-xs text-[var(--muted-foreground)]">
                    {item.caption}
                  </span>
                </span>
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto panel p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,rgba(167,215,180,0.55),rgba(242,212,183,0.55))] text-sm font-semibold text-[var(--foreground)]">
              {initials(owner?.name)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold tracking-[-0.02em] text-[var(--foreground)]">
                {owner?.nickname || owner?.name}
              </p>
              <p className="truncate text-xs text-[var(--muted-foreground)]">
                {owner?.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="btn-ghost mt-4 w-full justify-between px-4 py-3"
          >
            <span>Esci</span>
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
