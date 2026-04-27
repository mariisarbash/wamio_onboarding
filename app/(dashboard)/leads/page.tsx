'use client'

import { ChevronDown, ExternalLink, MessageSquareText, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { mockLeads } from '@/lib/data'
import { LeadStatus } from '@/lib/types'
import { cn } from '@/lib/utils'

function statusBadge(status: LeadStatus) {
  if (status === 'qualificato') {
    return {
      text: 'Qualificato',
      className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200',
    }
  }

  if (status === 'non_adatto') {
    return {
      text: 'Non adatto',
      className: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-200',
    }
  }

  return {
    text: 'Da valutare',
    className: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200',
  }
}

function actionLabel(action: string) {
  if (action === 'contatta') return 'Contatta subito'
  if (action === 'rifiuta') return 'Archivia'
  return 'Richiedi info'
}

const profileLabel: Record<string, string> = {
  studente: 'Studente',
  lavoratore: 'Lavoratore',
  turista: 'Turista',
  famiglia: 'Famiglia',
  altro: 'Altro',
}

export default function LeadsPage() {
  const [filter, setFilter] = useState<LeadStatus | 'tutti'>('tutti')
  const [expanded, setExpanded] = useState<string | null>(null)

  const leads = mockLeads.filter(lead => filter === 'tutti' || lead.status === filter)

  const counts = {
    tutti: mockLeads.length,
    qualificato: mockLeads.filter(lead => lead.status === 'qualificato').length,
    da_valutare: mockLeads.filter(lead => lead.status === 'da_valutare').length,
    non_adatto: mockLeads.filter(lead => lead.status === 'non_adatto').length,
  }

  const tabs: { key: typeof filter; label: string }[] = [
    { key: 'tutti', label: 'Tutti' },
    { key: 'qualificato', label: 'Qualificati' },
    { key: 'da_valutare', label: 'Da valutare' },
    { key: 'non_adatto', label: 'Non adatti' },
  ]

  return (
    <div className="page-shell">
      <section className="panel-strong p-7 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-4">Inbox lead</p>
            <h1 className="section-title">Le richieste adesso respirano meglio.</h1>
            <p className="mt-4 max-w-[42rem] text-sm leading-7 text-[var(--muted-strong)] md:text-base">
              Ho trasformato la tabella scura in una vista a card più pulita,
              leggibile e contemporanea, così capisci subito chi seguire e chi no.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Lead totali', value: counts.tutti },
              { label: 'Da sentire', value: counts.qualificato + counts.da_valutare },
              { label: 'Visite richieste', value: mockLeads.filter(lead => lead.visitRequested).length },
            ].map(item => (
              <div key={item.label} className="rounded-[22px] border border-[var(--border)] bg-[var(--card)] px-4 py-4">
                <p className="label-uc mb-3 block">{item.label}</p>
                <p className="text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 panel p-5 md:p-6">
        <div className="flex flex-wrap gap-3">
          {tabs.map(tab => {
            const active = filter === tab.key

            return (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={cn(
                  'rounded-full px-4 py-3 text-sm font-medium',
                  active
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[var(--shadow-soft)]'
                    : 'border border-[var(--border)] bg-[var(--card-soft)] text-[var(--muted-strong)] hover:text-[var(--foreground)]',
                )}
              >
                {tab.label}
                <span className={cn('ml-2 text-xs', active ? 'text-[var(--primary-foreground)]/70' : 'text-[var(--subtle)]')}>
                  {counts[tab.key as keyof typeof counts]}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <section className="mt-6 space-y-4">
        {leads.map(lead => {
          const status = statusBadge(lead.status)
          const isExpanded = expanded === lead.id

          return (
            <article key={lead.id} className="panel overflow-hidden">
              <button
                onClick={() => setExpanded(isExpanded ? null : lead.id)}
                className="flex w-full flex-col gap-5 px-5 py-5 text-left md:px-6 md:py-6"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={cn('rounded-full px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.12em]', status.className)}>
                        {status.text}
                      </span>
                      {lead.visitRequested && (
                        <span className="rounded-full bg-[rgba(167,215,180,0.18)] px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-[var(--accent-foreground)]">
                          Visita richiesta
                        </span>
                      )}
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                        {lead.name}
                      </h2>
                      <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">
                        {lead.propertyName} · {profileLabel[lead.profile]} · {lead.startDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
                    <div className="rounded-full border border-[var(--border)] bg-[var(--card-soft)] px-4 py-2">
                      {actionLabel(lead.actionSuggested)}
                    </div>
                    <ChevronDown
                      className={cn(
                        'h-5 w-5 transition-transform',
                        isExpanded && 'rotate-180',
                      )}
                    />
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-4">
                  {[
                    ['Budget', lead.budget || 'Non indicato'],
                    ['Durata', lead.duration],
                    ['Primo contatto', lead.firstContact],
                    ['WhatsApp', lead.whatsapp],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[20px] border border-[var(--border)] bg-[var(--card-soft)] px-4 py-4">
                      <p className="label-uc-sm mb-2 block">{label}</p>
                      <p className="text-sm text-[var(--foreground)]">{value}</p>
                    </div>
                  ))}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-[var(--border)] bg-[var(--card-soft)] px-5 py-5 md:px-6">
                  <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr_0.8fr]">
                    <div className="rounded-[24px] border border-[var(--border)] bg-[var(--card-strong)] p-5">
                      <div className="mb-4 flex items-center gap-3">
                        <Sparkles className="h-4 w-4 text-[var(--accent-foreground)]" />
                        <p className="label-uc block">Riepilogo</p>
                      </div>
                      <p className="text-sm leading-7 text-[var(--muted-strong)]">
                        {lead.summary}
                      </p>
                    </div>

                    <div className="rounded-[24px] border border-[var(--border)] bg-[var(--card-strong)] p-5">
                      <div className="mb-4 flex items-center gap-3">
                        <MessageSquareText className="h-4 w-4 text-[var(--muted-foreground)]" />
                        <p className="label-uc block">Dettagli</p>
                      </div>
                      <div className="space-y-3 text-sm">
                        {[
                          ['Documenti', lead.documentsReady === 'non_specificato' ? 'Non specificato' : lead.documentsReady === 'si' ? 'Pronti' : 'Non pronti'],
                          ['Residenza', lead.residenceNeeded === 'non_specificato' ? 'Non specificato' : lead.residenceNeeded === 'si' ? 'Sì' : 'No'],
                          ['Ospiti', String(lead.guests)],
                          ...(lead.visitDays ? [['Visita', lead.visitDays]] : []),
                        ].map(([label, value]) => (
                          <div key={label} className="flex items-center justify-between gap-4">
                            <span className="text-[var(--muted-foreground)]">{label}</span>
                            <span className="font-medium text-[var(--foreground)]">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-[var(--border)] bg-[var(--primary)] p-5 text-[var(--primary-foreground)]">
                      <p className="eyebrow mb-4 text-[var(--primary-foreground)]/70">Contatto</p>
                      <p className="text-base font-semibold">{lead.whatsapp}</p>
                      <p className="mt-3 text-sm leading-7 text-[var(--primary-foreground)]/78">
                        Aggiornato {lead.lastUpdate}. Se vuoi puoi aprire subito la conversazione e continuare il follow-up.
                      </p>
                      <a
                        href={`https://wa.me/${lead.whatsapp.replace(/\s+/g, '').replace('+', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary mt-5 w-full justify-between border-white/12 bg-white/10 text-[var(--primary-foreground)] hover:bg-white/16"
                      >
                        Apri su WhatsApp
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </article>
          )
        })}

        {leads.length === 0 && (
          <div className="panel p-12 text-center text-sm text-[var(--muted-foreground)]">
            Nessun lead in questa categoria.
          </div>
        )}
      </section>
    </div>
  )
}
