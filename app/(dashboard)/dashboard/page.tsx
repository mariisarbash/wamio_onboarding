'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth'
import { mockProperties, mockLeads } from '@/lib/data'
import { LeadStatus } from '@/lib/types'

function statusLabel(s: LeadStatus) {
  if (s === 'qualificato') return { text: 'Qualificato', cls: 'bg-black text-white' }
  if (s === 'non_adatto') return { text: 'Non adatto', cls: 'bg-zinc-100 text-zinc-500' }
  return { text: 'Da valutare', cls: 'bg-zinc-200 text-zinc-700' }
}

export default function DashboardPage() {
  const { owner } = useAuth()
  const properties = mockProperties
  const leads = mockLeads

  const activeBots = properties.filter(p => p.botActive).length
  const qualifiedLeads = leads.filter(l => l.status === 'qualificato').length
  const pendingVisits = leads.filter(l => l.visitRequested).length
  const incompleteProps = properties.filter(p => p.completionPercent < 80).length

  return (
    <div className="px-10 py-8 max-w-6xl">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          Ciao, {owner?.nickname || owner?.name}
        </h2>
        <p className="text-sm text-zinc-500 mt-1">
          Ecco cosa sta succedendo oggi
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-px bg-zinc-200 border border-zinc-200 mb-10">
        {[
          { label: 'Proprietà', value: properties.length },
          { label: 'Bot attivi', value: `${activeBots}/${properties.length}` },
          { label: 'Lead qualificati', value: qualifiedLeads },
          { label: 'Visite richieste', value: pendingVisits },
        ].map(stat => (
          <div key={stat.label} className="bg-white px-6 py-5">
            <p className="text-3xl font-semibold tracking-tight">{stat.value}</p>
            <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Properties */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-400">
            Proprietà
          </h3>
          <Link
            href="/properties/new"
            className="text-xs text-zinc-900 underline underline-offset-4 hover:text-zinc-600"
          >
            Aggiungi nuova
          </Link>
        </div>

        <div className="border border-zinc-100">
          {properties.map((p, i) => (
            <Link
              key={p.id}
              href={`/properties/${p.id}`}
              className={`flex items-center justify-between px-5 py-4 hover:bg-zinc-50 transition-colors ${i > 0 ? 'border-t border-zinc-100' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{p.zone} · {p.price.toLocaleString('it-IT')}€/mese</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                {/* Completion */}
                <div className="text-right">
                  <p className="text-xs text-zinc-400">{p.completionPercent}% completo</p>
                  <div className="w-24 h-0.5 bg-zinc-100 mt-1">
                    <div
                      className="h-0.5 bg-black transition-all"
                      style={{ width: `${p.completionPercent}%` }}
                    />
                  </div>
                </div>
                {/* Bot status */}
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${p.botActive ? 'bg-black' : 'bg-zinc-300'}`} />
                  <span className="text-xs text-zinc-500">{p.botActive ? 'Attivo' : 'Inattivo'}</span>
                </div>
                <span className="text-zinc-300">›</span>
              </div>
            </Link>
          ))}
        </div>

        {incompleteProps > 0 && (
          <p className="mt-3 text-xs text-zinc-400">
            {incompleteProps} {incompleteProps === 1 ? 'proprietà ha' : 'proprietà hanno'} un profilo incompleto. <Link href="/properties/1" className="underline underline-offset-2 text-zinc-600">Completa ora</Link>
          </p>
        )}
      </section>

      {/* Recent Leads */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-400">
            Lead recenti
          </h3>
          <Link
            href="/leads"
            className="text-xs text-zinc-900 underline underline-offset-4 hover:text-zinc-600"
          >
            Vedi tutti
          </Link>
        </div>

        <div className="border border-zinc-100">
          {leads.slice(0, 4).map((lead, i) => {
            const s = statusLabel(lead.status)
            return (
              <div
                key={lead.id}
                className={`flex items-center justify-between px-5 py-3.5 ${i > 0 ? 'border-t border-zinc-100' : ''}`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{lead.name}</p>
                    <p className="text-xs text-zinc-400 mt-0.5 truncate">
                      {lead.propertyName} · {lead.profile}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs px-2 py-0.5 font-medium ${s.cls}`}>
                    {s.text}
                  </span>
                  <span className="text-xs text-zinc-400">{lead.firstContact}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
