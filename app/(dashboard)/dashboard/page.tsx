'use client'

import { ArrowRight, Bot, CalendarClock, Home, MessageSquareText, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth'
import { mockLeads, mockProperties } from '@/lib/data'
import { LeadStatus } from '@/lib/types'

function leadBadge(status: LeadStatus) {
  if (status === 'qualificato') {
    return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200'
  }
  if (status === 'non_adatto') {
    return 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-200'
  }
  return 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200'
}

export default function DashboardPage() {
  const { owner } = useAuth()
  const properties = mockProperties
  const leads = mockLeads

  const activeBots = properties.filter(property => property.botActive).length
  const qualifiedLeads = leads.filter(lead => lead.status === 'qualificato').length
  const pendingVisits = leads.filter(lead => lead.visitRequested).length

  const stats = [
    {
      label: 'Proprietà attive',
      value: properties.length,
      note: 'Portfolio monitorato',
      icon: Home,
    },
    {
      label: 'Bot operativi',
      value: `${activeBots}/${properties.length}`,
      note: 'Conversazioni già in corsa',
      icon: Bot,
    },
    {
      label: 'Lead qualificate',
      value: qualifiedLeads,
      note: 'Pronte per follow-up',
      icon: Sparkles,
    },
    {
      label: 'Visite da confermare',
      value: pendingVisits,
      note: 'Richieste ad alta priorità',
      icon: CalendarClock,
    },
  ]

  return (
    <div className="page-shell">
      <section className="panel-strong overflow-hidden p-7 md:p-8">
          <p className="eyebrow mb-5">Panoramica di oggi</p>
          <h1 className="section-title max-w-[12ch]">
            Ciao, {owner?.nickname || owner?.name}. Tutto molto più chiaro.
          </h1>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/properties/new" className="btn-primary">
              Aggiungi proprietà
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/leads" className="btn-secondary">
              Apri lead
            </Link>
          </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(stat => (
          <div key={stat.label} className="panel p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="label-uc mb-4 block">{stat.label}</p>
                <p className="metric-value text-[var(--foreground)]">{stat.value}</p>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-[rgba(167,215,180,0.18)] text-[var(--accent-foreground)]">
                <stat.icon className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--muted-foreground)]">
              {stat.note}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
        <div className="panel p-6 md:p-7">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <p className="eyebrow mb-3">Proprietà</p>
              <h2 className="text-[1.55rem] font-semibold tracking-[-0.05em] text-[var(--foreground)]">
                Portfolio in evidenza
              </h2>
            </div>
            <Link href="/properties/new" className="text-sm font-medium text-[var(--muted-strong)] hover:text-[var(--foreground)]">
              Nuova scheda
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {properties.map(property => (
              <Link
                key={property.id}
                href={`/properties/${property.id}`}
                className="rounded-[26px] border border-[var(--border)] bg-[var(--card-strong)] p-5 shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:border-[var(--border-strong)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                      {property.name}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                      {property.zone} · {property.price.toLocaleString('it-IT')}€/mese
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      property.botActive
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200'
                        : 'bg-stone-200 text-stone-600 dark:bg-white/6 dark:text-stone-300'
                    }`}
                  >
                    {property.botActive ? 'Bot attivo' : 'In setup'}
                  </span>
                </div>

                <div className="mt-5 rounded-[20px] bg-[var(--card-soft)] p-4">
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="text-[var(--muted-strong)]">Completezza</span>
                    <span className="font-medium text-[var(--foreground)]">
                      {property.completionPercent}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--muted)]">
                    <div
                      className="h-2 rounded-full bg-[linear-gradient(90deg,var(--accent-strong),var(--accent-secondary))]"
                      style={{ width: `${property.completionPercent}%` }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="panel p-6">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <p className="eyebrow mb-3">Lead recenti</p>
                <h2 className="text-[1.35rem] font-semibold tracking-[-0.05em] text-[var(--foreground)]">
                  Le conversazioni da toccare oggi
                </h2>
              </div>
              <MessageSquareText className="h-5 w-5 text-[var(--muted-foreground)]" />
            </div>

            <div className="space-y-3">
              {leads.slice(0, 4).map(lead => (
                <div
                  key={lead.id}
                  className="rounded-[22px] border border-[var(--border)] bg-[var(--card-soft)] px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-[var(--foreground)]">
                        {lead.name}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[var(--muted-foreground)]">
                        {lead.propertyName} · {lead.profile}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.12em] ${leadBadge(
                        lead.status,
                      )}`}
                    >
                      {lead.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-4 text-xs text-[var(--muted-foreground)]">
                    <span>{lead.firstContact}</span>
                    {lead.visitRequested && <span>Visita richiesta</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
