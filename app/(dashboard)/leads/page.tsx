'use client'

import { useState } from 'react'
import { mockLeads } from '@/lib/data'
import { LeadStatus } from '@/lib/types'

function statusConfig(s: LeadStatus) {
  if (s === 'qualificato') return { text: 'Qualificato', cls: 'bg-black text-white' }
  if (s === 'non_adatto') return { text: 'Non adatto', cls: 'bg-zinc-100 text-zinc-500' }
  return { text: 'Da valutare', cls: 'bg-zinc-200 text-zinc-700' }
}

function actionConfig(a: string) {
  if (a === 'contatta') return { text: 'Contatta', cls: 'text-zinc-900 font-medium' }
  if (a === 'rifiuta') return { text: 'Rifiuta', cls: 'text-zinc-400' }
  return { text: 'Richiedi info', cls: 'text-zinc-600' }
}

function profileLabel(p: string) {
  const map: Record<string, string> = {
    studente: 'Studente',
    lavoratore: 'Lavoratore',
    turista: 'Turista',
    famiglia: 'Famiglia',
    altro: 'Altro',
  }
  return map[p] || p
}

export default function LeadsPage() {
  const [filter, setFilter] = useState<LeadStatus | 'tutti'>('tutti')
  const [expanded, setExpanded] = useState<string | null>(null)

  const leads = mockLeads.filter(l => filter === 'tutti' || l.status === filter)

  const counts = {
    tutti: mockLeads.length,
    qualificato: mockLeads.filter(l => l.status === 'qualificato').length,
    da_valutare: mockLeads.filter(l => l.status === 'da_valutare').length,
    non_adatto: mockLeads.filter(l => l.status === 'non_adatto').length,
  }

  return (
    <div className="px-10 py-8 max-w-6xl">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Lead</h2>
        <p className="text-sm text-zinc-500 mt-1">{mockLeads.length} contatti ricevuti dal bot</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-0 mb-6 border border-zinc-200 w-fit">
        {(['tutti', 'qualificato', 'da_valutare', 'non_adatto'] as const).map(f => {
          const labels: Record<string, string> = {
            tutti: 'Tutti',
            qualificato: 'Qualificati',
            da_valutare: 'Da valutare',
            non_adatto: 'Non adatti',
          }
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-xs font-medium transition-colors border-r border-zinc-200 last:border-r-0 ${
                filter === f ? 'bg-black text-white' : 'text-zinc-500 hover:text-zinc-900 bg-white'
              }`}
            >
              {labels[f]} ({counts[f as keyof typeof counts]})
            </button>
          )
        })}
      </div>

      {/* Table */}
      <div className="border border-zinc-100">
        {/* Header */}
        <div className="grid grid-cols-12 px-5 py-2.5 border-b border-zinc-100 bg-zinc-50">
          <span className="col-span-2 text-xs font-medium text-zinc-400 uppercase tracking-wider">Nome</span>
          <span className="col-span-2 text-xs font-medium text-zinc-400 uppercase tracking-wider">Proprietà</span>
          <span className="col-span-1 text-xs font-medium text-zinc-400 uppercase tracking-wider">Profilo</span>
          <span className="col-span-1 text-xs font-medium text-zinc-400 uppercase tracking-wider">Inizio</span>
          <span className="col-span-1 text-xs font-medium text-zinc-400 uppercase tracking-wider">Durata</span>
          <span className="col-span-1 text-xs font-medium text-zinc-400 uppercase tracking-wider">Budget</span>
          <span className="col-span-1 text-xs font-medium text-zinc-400 uppercase tracking-wider">Visita</span>
          <span className="col-span-1 text-xs font-medium text-zinc-400 uppercase tracking-wider">Stato</span>
          <span className="col-span-2 text-xs font-medium text-zinc-400 uppercase tracking-wider">Azione</span>
        </div>

        {leads.map((lead, i) => {
          const s = statusConfig(lead.status)
          const a = actionConfig(lead.actionSuggested)
          const isExpanded = expanded === lead.id

          return (
            <div key={lead.id} className={i > 0 ? 'border-t border-zinc-100' : ''}>
              <button
                onClick={() => setExpanded(isExpanded ? null : lead.id)}
                className="w-full grid grid-cols-12 px-5 py-3.5 hover:bg-zinc-50 transition-colors text-left"
              >
                <div className="col-span-2">
                  <p className="text-sm font-medium">{lead.name}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{lead.whatsapp}</p>
                </div>
                <p className="col-span-2 text-sm text-zinc-600 self-center truncate pr-2">{lead.propertyName}</p>
                <p className="col-span-1 text-sm text-zinc-600 self-center">{profileLabel(lead.profile)}</p>
                <p className="col-span-1 text-sm text-zinc-600 self-center">{lead.startDate}</p>
                <p className="col-span-1 text-sm text-zinc-600 self-center">{lead.duration}</p>
                <p className="col-span-1 text-sm text-zinc-600 self-center">{lead.budget || '—'}</p>
                <p className="col-span-1 text-sm self-center">{lead.visitRequested ? '✓' : '—'}</p>
                <div className="col-span-1 self-center">
                  <span className={`text-xs px-2 py-0.5 font-medium ${s.cls}`}>
                    {s.text}
                  </span>
                </div>
                <p className={`col-span-2 text-xs self-center ${a.cls}`}>{a.text}</p>
              </button>

              {isExpanded && (
                <div className="px-5 pb-4 border-t border-zinc-50 bg-zinc-50">
                  <div className="pt-3 grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Riepilogo</p>
                      <p className="text-sm text-zinc-700 leading-relaxed">{lead.summary}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Dettagli</p>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-xs text-zinc-500">Documenti pronti</span>
                          <span className="text-xs font-medium capitalize">{lead.documentsReady === 'non_specificato' ? 'Non spec.' : lead.documentsReady}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-zinc-500">Residenza</span>
                          <span className="text-xs font-medium capitalize">{lead.residenceNeeded === 'non_specificato' ? 'Non spec.' : lead.residenceNeeded}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-zinc-500">Ospiti</span>
                          <span className="text-xs font-medium">{lead.guests}</span>
                        </div>
                        {lead.visitDays && (
                          <div className="flex justify-between">
                            <span className="text-xs text-zinc-500">Visita</span>
                            <span className="text-xs font-medium">{lead.visitDays}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Contatto</p>
                      <p className="text-xs text-zinc-600">{lead.whatsapp}</p>
                      <p className="text-xs text-zinc-400 mt-1">Primo contatto: {lead.firstContact}</p>
                      <p className="text-xs text-zinc-400">Aggiornato: {lead.lastUpdate}</p>
                      <a
                        href={`https://wa.me/${lead.whatsapp.replace(/\s+/g, '').replace('+', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-xs bg-black text-white px-3 py-1.5 hover:bg-zinc-800 transition-colors"
                      >
                        Apri su WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {leads.length === 0 && (
          <div className="px-5 py-10 text-center text-sm text-zinc-400">
            Nessun lead in questa categoria.
          </div>
        )}
      </div>
    </div>
  )
}
