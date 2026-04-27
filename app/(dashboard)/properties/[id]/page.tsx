'use client'

import { ArrowLeft, ArrowRight, Bot, House, Sparkles } from 'lucide-react'
import { use } from 'react'
import Link from 'next/link'
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

function DetailGroup({
  title,
  rows,
}: {
  title: string
  rows: Array<[string, string | number]>
}) {
  return (
    <section className="panel p-6">
      <p className="eyebrow mb-4">{title}</p>
      <div className="space-y-3">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-4 rounded-[18px] border border-[var(--border)] bg-[var(--card-soft)] px-4 py-3"
          >
            <span className="text-sm text-[var(--muted-foreground)]">{label}</span>
            <span className="text-sm font-medium text-[var(--foreground)]">{value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const property = mockProperties.find(item => item.id === id)
  const propertyLeads = mockLeads.filter(lead => lead.propertyId === id)

  if (!property) {
    return (
      <div className="page-shell">
        <div className="panel p-8">
          <p className="text-base text-[var(--muted-foreground)]">Proprietà non trovata.</p>
          <Link href="/dashboard" className="btn-secondary mt-6">
            <ArrowLeft className="h-4 w-4" />
            Torna alla dashboard
          </Link>
        </div>
      </div>
    )
  }

  const labelMap = {
    listingType: {
      appartamento: 'Appartamento intero',
      stanza: 'Stanza singola',
      piu_stanze: 'Più stanze',
    } as Record<string, string>,
    rentalType: {
      breve: 'Affitto breve',
      lungo: 'Affitto lungo',
      entrambi: 'Breve + lungo',
    } as Record<string, string>,
    furnished: {
      completamente: 'Completamente arredato',
      parzialmente: 'Parzialmente arredato',
      no: 'Non arredato',
    } as Record<string, string>,
    botTone: {
      formale: 'Formale',
      neutro: 'Neutro',
      amichevole: 'Amichevole',
      premium: 'Premium',
    } as Record<string, string>,
  }

  return (
    <div className="page-shell">
      <Link href="/dashboard" className="btn-ghost mb-4">
        <ArrowLeft className="h-4 w-4" />
        Dashboard
      </Link>

      <section className="panel-strong overflow-hidden p-7 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-4">Scheda proprietà</p>
            <h1 className="section-title">{property.name}</h1>
            <p className="mt-4 text-sm leading-7 text-[var(--muted-strong)] md:text-base">
              {property.address}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <span
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                property.botActive
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200'
                  : 'bg-stone-200 text-stone-600 dark:bg-white/6 dark:text-stone-300'
              }`}
            >
              {property.botActive ? 'Bot attivo' : 'Bot non attivo'}
            </span>
            <span className="rounded-full border border-[var(--border)] bg-[var(--card-soft)] px-4 py-2 text-sm text-[var(--muted-strong)]">
              Completezza {property.completionPercent}%
            </span>
          </div>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {[
            {
              label: 'Zona',
              value: property.zone,
              icon: House,
            },
            {
              label: 'Canone',
              value: `${property.price.toLocaleString('it-IT')}€/mese`,
              icon: Sparkles,
            },
            {
              label: 'Bot tone',
              value: labelMap.botTone[property.botTone],
              icon: Bot,
            },
          ].map(item => (
            <div key={item.label} className="rounded-[24px] border border-[var(--border)] bg-[var(--card)] p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="label-uc block">{item.label}</p>
                <item.icon className="h-4 w-4 text-[var(--muted-foreground)]" />
              </div>
              <p className="text-lg font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {property.completionPercent < 100 && (
        <section className="mt-6 panel p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow mb-3">Setup incompleto</p>
              <p className="text-sm leading-7 text-[var(--muted-strong)]">
                Completa il profilo per migliorare le risposte del bot e rendere
                l’attivazione più lineare.
              </p>
            </div>
            <div className="min-w-[220px]">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-[var(--muted-foreground)]">Progresso</span>
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
          </div>
        </section>
      )}

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <DetailGroup
          title="Tipo e disponibilità"
          rows={[
            ['Tipo annuncio', labelMap.listingType[property.listingType]],
            ['Tipo affitto', labelMap.rentalType[property.rentalType]],
            ['Disponibile dal', property.availableFrom],
            ['Visite possibili', property.visitsAllowed ? 'Sì' : 'No'],
          ]}
        />

        <DetailGroup
          title="Proprietà"
          rows={[
            ['Piano', property.floor],
            ['Ascensore', property.elevator],
            ['Superficie', `${property.sqm} m²`],
            ['Stanze', property.rooms],
            ['Bagni', property.bathrooms],
            ['Ospiti max', property.maxGuests],
            ['Arredamento', labelMap.furnished[property.furnished]],
          ]}
        />

        <DetailGroup
          title="Prezzo e regole"
          rows={[
            ['Canone mensile', `${property.price.toLocaleString('it-IT')}€`],
            ['Deposito', `${property.deposit.toLocaleString('it-IT')}€`],
            [
              'Prezzo',
              property.priceNegotiable === 'fisso'
                ? 'Fisso'
                : property.priceNegotiable === 'trattabile'
                  ? 'Trattabile'
                  : 'Parzialmente trattabile',
            ],
            [
              'Fumo',
              property.smokingAllowed === 'si'
                ? 'Sì'
                : property.smokingAllowed === 'balcone'
                  ? 'Solo balcone'
                  : 'No',
            ],
            [
              'Animali',
              property.petsAllowed === 'si'
                ? 'Sì'
                : property.petsAllowed === 'dipende'
                  ? 'Dipende'
                  : 'No',
            ],
          ]}
        />

        <section className="panel p-6">
          <p className="eyebrow mb-4">Bot e contenuti</p>
          <div className="space-y-3">
            {[
              ['Stato', property.botActive ? 'Attivo' : 'Inattivo'],
              ['Tono', labelMap.botTone[property.botTone]],
              ['Condivide foto', property.canSharePhotos],
              ['Foto caricate', `${property.photos} foto`],
              ['Escalation', property.escalationContact || '—'],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 rounded-[18px] border border-[var(--border)] bg-[var(--card-soft)] px-4 py-3"
              >
                <span className="text-sm text-[var(--muted-foreground)]">{label}</span>
                <span className="text-sm font-medium text-[var(--foreground)]">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-[22px] border border-[var(--border)] bg-[var(--primary)] p-5 text-[var(--primary-foreground)]">
            <p className="text-sm leading-7 text-[var(--primary-foreground)]/82">
              {property.botActive
                ? 'Il bot sta già gestendo le conversazioni per questa proprietà.'
                : property.completionPercent < 80
                  ? 'Completa i campi obbligatori prima di attivare il bot.'
                  : 'La scheda è pronta per essere attivata.'}
            </p>
            <button type="button" className="btn-secondary mt-5 border-white/12 bg-white/10 text-[var(--primary-foreground)] hover:bg-white/16">
              {property.botActive ? 'Rivedi impostazioni' : 'Attiva bot'}
            </button>
          </div>
        </section>
      </section>

      {property.expensesIncluded.length > 0 && (
        <section className="mt-6 panel p-6">
          <p className="eyebrow mb-4">Spese incluse</p>
          <div className="flex flex-wrap gap-2">
            {property.expensesIncluded.map(expense => (
              <span
                key={expense}
                className="rounded-full border border-[var(--border)] bg-[var(--card-soft)] px-4 py-2 text-sm text-[var(--muted-strong)]"
              >
                {expense}
              </span>
            ))}
          </div>
        </section>
      )}

      {propertyLeads.length > 0 && (
        <section className="mt-6 panel p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow mb-3">Lead collegate</p>
              <h2 className="text-[1.3rem] font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                {propertyLeads.length} conversazioni per questa proprietà
              </h2>
            </div>
            <Link href="/leads" className="btn-secondary">
              Vedi tutte
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {propertyLeads.map(lead => (
              <div
                key={lead.id}
                className="rounded-[24px] border border-[var(--border)] bg-[var(--card-soft)] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-base font-semibold text-[var(--foreground)]">
                      {lead.name}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                      {lead.profile} · {lead.duration} · {lead.budget || 'Budget n.d.'}
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
                {lead.visitRequested && (
                  <p className="mt-4 text-sm text-[var(--muted-strong)]">
                    Visita: {lead.visitDays}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
