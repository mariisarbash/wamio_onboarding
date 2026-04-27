'use client'

import { use } from 'react'
import Link from 'next/link'
import { mockProperties, mockLeads } from '@/lib/data'
import { LeadStatus } from '@/lib/types'

function statusConfig(s: LeadStatus) {
  if (s === 'qualificato') return { text: 'Qualificato', cls: 'bg-black text-white' }
  if (s === 'non_adatto') return { text: 'Non adatto', cls: 'bg-zinc-100 text-zinc-500' }
  return { text: 'Da valutare', cls: 'bg-zinc-200 text-zinc-700' }
}

function Row({ label, value }: { label: string; value: string | number | boolean }) {
  const display = typeof value === 'boolean' ? (value ? 'Sì' : 'No') : value
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-zinc-50 last:border-b-0">
      <span className="text-sm text-zinc-500">{label}</span>
      <span className="text-sm font-medium">{display}</span>
    </div>
  )
}

export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const property = mockProperties.find(p => p.id === id)
  const propertyLeads = mockLeads.filter(l => l.propertyId === id)

  if (!property) {
    return (
      <div className="px-10 py-8">
        <p className="text-sm text-zinc-500">Proprietà non trovata.</p>
        <Link href="/dashboard" className="text-sm underline underline-offset-4 mt-2 inline-block">
          Torna alla dashboard
        </Link>
      </div>
    )
  }

  const listingTypeLabel: Record<string, string> = {
    appartamento: 'Appartamento intero',
    stanza: 'Stanza singola',
    piu_stanze: 'Più stanze',
  }
  const rentalTypeLabel: Record<string, string> = {
    breve: 'Affitto breve',
    lungo: 'Affitto lungo',
    entrambi: 'Breve + lungo',
  }
  const furnishedLabel: Record<string, string> = {
    completamente: 'Completamente arredato',
    parzialmente: 'Parzialmente arredato',
    no: 'Non arredato',
  }

  return (
    <div className="px-10 py-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/dashboard" className="text-xs text-zinc-400 hover:text-zinc-600">
              ← Dashboard
            </Link>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">{property.name}</h2>
          <p className="text-sm text-zinc-500 mt-1">{property.address}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`text-xs px-2 py-1 ${property.botActive ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-500'}`}>
            Bot {property.botActive ? 'attivo' : 'inattivo'}
          </div>
          <div className="text-xs text-zinc-500">
            {property.completionPercent}% completo
          </div>
        </div>
      </div>

      {/* Completion bar */}
      {property.completionPercent < 100 && (
        <div className="mb-8 p-4 border border-zinc-200 bg-zinc-50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium">Profilo incompleto</p>
            <p className="text-xs text-zinc-400">{property.completionPercent}/100</p>
          </div>
          <div className="w-full h-1 bg-zinc-200">
            <div className="h-1 bg-black" style={{ width: `${property.completionPercent}%` }} />
          </div>
          <p className="text-xs text-zinc-500 mt-2">
            Completa il profilo per migliorare le risposte del bot e attirare più lead qualificati.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-10">
        {/* Left column */}
        <div className="space-y-8">
          <section>
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">
              Tipo e disponibilità
            </h3>
            <div className="border border-zinc-100 px-4 divide-y divide-zinc-50">
              <Row label="Tipo annuncio" value={listingTypeLabel[property.listingType]} />
              <Row label="Tipo affitto" value={rentalTypeLabel[property.rentalType]} />
              <Row label="Disponibile dal" value={property.availableFrom} />
              <Row label="Visite possibili" value={property.visitsAllowed} />
            </div>
          </section>

          <section>
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">
              Proprietà
            </h3>
            <div className="border border-zinc-100 px-4 divide-y divide-zinc-50">
              <Row label="Zona" value={property.zone} />
              <Row label="Piano" value={property.floor} />
              <Row label="Ascensore" value={property.elevator} />
              <Row label="Superficie" value={`${property.sqm} m²`} />
              <Row label="Stanze" value={property.rooms} />
              <Row label="Bagni" value={property.bathrooms} />
              <Row label="Ospiti max" value={property.maxGuests} />
              <Row label="Arredamento" value={furnishedLabel[property.furnished]} />
            </div>
          </section>

          <section>
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">
              Regole
            </h3>
            <div className="border border-zinc-100 px-4 divide-y divide-zinc-50">
              <Row label="Fumo" value={property.smokingAllowed === 'si' ? 'Sì' : property.smokingAllowed === 'balcone' ? 'Solo balcone' : 'No'} />
              <Row label="Animali" value={property.petsAllowed === 'si' ? 'Sì' : property.petsAllowed === 'dipende' ? 'Dipende' : 'No'} />
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-8">
          <section>
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">
              Prezzo
            </h3>
            <div className="border border-zinc-100 px-4 divide-y divide-zinc-50">
              <Row label="Canone mensile" value={`${property.price.toLocaleString('it-IT')}€`} />
              <Row label="Deposito" value={`${property.deposit.toLocaleString('it-IT')}€`} />
              <Row label="Prezzo" value={property.priceNegotiable === 'fisso' ? 'Fisso' : property.priceNegotiable === 'trattabile' ? 'Trattabile' : 'Parzialmente trattabile'} />
              <div className="py-2.5">
                <span className="text-sm text-zinc-500">Spese incluse</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {property.expensesIncluded.length > 0
                    ? property.expensesIncluded.map(e => (
                        <span key={e} className="text-xs bg-zinc-100 px-2 py-0.5">{e}</span>
                      ))
                    : <span className="text-xs text-zinc-400">Nessuna</span>
                  }
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">
              Impostazioni bot
            </h3>
            <div className="border border-zinc-100 px-4 divide-y divide-zinc-50">
              <Row label="Stato" value={property.botActive ? 'Attivo' : 'Inattivo'} />
              <Row label="Tono" value={{ formale: 'Formale', neutro: 'Neutro', amichevole: 'Amichevole', premium: 'Premium' }[property.botTone]} />
              <Row label="Condivide foto" value={property.canSharePhotos} />
              <Row label="Foto caricate" value={`${property.photos} foto`} />
              <Row label="Escalation a" value={property.escalationContact || '—'} />
            </div>
          </section>

          {!property.botActive && (
            <div className="p-4 border border-zinc-200">
              <p className="text-sm font-medium mb-1">Bot non attivo</p>
              <p className="text-xs text-zinc-500 mb-3">
                {property.completionPercent < 80
                  ? 'Completa i campi obbligatori per attivare il bot.'
                  : 'Il bot è pronto. Attivalo per iniziare a ricevere lead.'}
              </p>
              <button className="text-xs bg-black text-white px-3 py-1.5 hover:bg-zinc-800 transition-colors">
                {property.completionPercent < 80 ? 'Completa profilo' : 'Attiva bot'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Leads */}
      {propertyLeads.length > 0 && (
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400">
              Lead per questa proprietà ({propertyLeads.length})
            </h3>
            <Link href="/leads" className="text-xs underline underline-offset-4 text-zinc-600 hover:text-zinc-900">
              Vedi tutti i lead
            </Link>
          </div>
          <div className="border border-zinc-100">
            {propertyLeads.map((lead, i) => {
              const s = statusConfig(lead.status)
              return (
                <div key={lead.id} className={`flex items-center justify-between px-5 py-3.5 ${i > 0 ? 'border-t border-zinc-100' : ''}`}>
                  <div>
                    <p className="text-sm font-medium">{lead.name}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">{lead.profile} · {lead.duration} · {lead.budget || 'budget n.d.'}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {lead.visitRequested && (
                      <span className="text-xs text-zinc-400">Visita: {lead.visitDays}</span>
                    )}
                    <span className={`text-xs px-2 py-0.5 font-medium ${s.cls}`}>
                      {s.text}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
