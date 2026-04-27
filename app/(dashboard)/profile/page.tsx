'use client'

import { Check, CircleHelp, UserRound } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/lib/auth'

function Field({
  label,
  children,
  hint,
}: {
  label: string
  children: React.ReactNode
  hint?: string
}) {
  return (
    <div>
      <label className="label-uc mb-3 block">{label}</label>
      {children}
      {hint && (
        <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
          {hint}
        </p>
      )}
    </div>
  )
}

function Section({
  title,
  copy,
  children,
}: {
  title: string
  copy: string
  children: React.ReactNode
}) {
  return (
    <section className="panel p-6 md:p-7">
      <div className="mb-6">
        <h2 className="text-[1.3rem] font-semibold tracking-[-0.04em] text-[var(--foreground)]">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">
          {copy}
        </p>
      </div>
      {children}
    </section>
  )
}

export default function ProfilePage() {
  const { owner, updateOwner } = useAuth()
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    name: owner?.name || '',
    nickname: owner?.nickname || '',
    phone: owner?.phone || '',
    email: owner?.email || '',
    language: owner?.language || 'italiano',
    contactHours: owner?.contactHours || '',
    supportContact: owner?.supportContact || '',
  })

  const set = (key: string, value: string) => {
    setForm(previous => ({ ...previous, [key]: value }))
    setSaved(false)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateOwner(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  return (
    <div className="page-shell">
      <section className="panel-strong p-7 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-4">Profilo proprietario</p>
            <h1 className="section-title">Dettagli chiari, tono coerente, zero attrito.</h1>
            <p className="mt-4 max-w-[42rem] text-sm leading-7 text-[var(--muted-strong)] md:text-base">
              Anche qui ho tolto l’estetica pesante: adesso le impostazioni si
              leggono subito e respirano molto meglio, sia in chiaro sia in scuro.
            </p>
          </div>

          <div className="panel max-w-[22rem] p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,rgba(167,215,180,0.55),rgba(242,212,183,0.55))]">
                <UserRound className="h-5 w-5 text-[var(--foreground)]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  {owner?.nickname || owner?.name}
                </p>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                  {owner?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <form onSubmit={handleSave} className="mt-6 space-y-6">
        <Section
          title="Dati personali"
          copy="Le informazioni di base che Wamio usa nelle comunicazioni e nelle schede."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Nome completo">
              <input
                className="input-base"
                value={form.name}
                onChange={e => set('name', e.target.value)}
              />
            </Field>

            <Field label="Nome mostrato">
              <input
                className="input-base"
                value={form.nickname}
                onChange={e => set('nickname', e.target.value)}
                placeholder="Es. Marco"
              />
            </Field>

            <Field label="Email">
              <input
                type="email"
                className="input-base"
                value={form.email}
                onChange={e => set('email', e.target.value)}
              />
            </Field>

            <Field label="Telefono">
              <input
                className="input-base"
                value={form.phone}
                onChange={e => set('phone', e.target.value)}
              />
            </Field>
          </div>
        </Section>

        <Section
          title="Preferenze comunicazione"
          copy="Definisci il tono e la disponibilità che il bot deve rispettare."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Lingua preferita">
              <select
                value={form.language}
                onChange={e => set('language', e.target.value)}
                className="input-base appearance-none cursor-pointer"
              >
                <option value="italiano">Italiano</option>
                <option value="inglese">Inglese</option>
                <option value="altro">Altro</option>
              </select>
            </Field>

            <Field label="Orari di contatto preferiti">
              <input
                className="input-base"
                value={form.contactHours}
                onChange={e => set('contactHours', e.target.value)}
                placeholder="Es. Lun-Ven 9:00-19:00"
              />
            </Field>
          </div>
        </Section>

        <Section
          title="Escalation bot"
          copy="Quando il bot deve passare la mano, usa questo contatto come uscita sicura."
        >
          <div className="grid gap-5 lg:grid-cols-[1fr_0.62fr]">
            <Field
              label="Contatto di supporto umano"
              hint="WhatsApp o email usati per i lead qualificati e le domande fuori script."
            >
              <input
                className="input-base"
                value={form.supportContact}
                onChange={e => set('supportContact', e.target.value)}
                placeholder="WhatsApp o email"
              />
            </Field>

            <div className="rounded-[24px] border border-[var(--border)] bg-[var(--card-soft)] p-5">
              <div className="mb-4 flex items-center gap-3">
                <CircleHelp className="h-4 w-4 text-[var(--muted-foreground)]" />
                <p className="label-uc block">Nota</p>
              </div>
              <p className="text-sm leading-7 text-[var(--muted-strong)]">
                Più queste preferenze sono chiare, più il bot resta coerente e
                meno ti ritrovi a gestire messaggi inutili.
              </p>
            </div>
          </div>
        </Section>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <button type="submit" className="btn-primary">
            Salva modifiche
          </button>
          {saved && (
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200">
              <Check className="h-4 w-4" />
              Salvato
            </span>
          )}
        </div>
      </form>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="panel p-6">
          <p className="eyebrow mb-3">Account</p>
          <h2 className="text-[1.3rem] font-semibold tracking-[-0.04em] text-[var(--foreground)]">
            Piano attuale
          </h2>
          <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">
            Demo completa per provare tutte le funzionalità del prodotto.
          </p>
          <div className="mt-6 rounded-[22px] border border-[var(--border)] bg-[var(--card-soft)] p-4">
            <span className="rounded-full bg-[rgba(167,215,180,0.2)] px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-[var(--accent-foreground)]">
              Demo
            </span>
          </div>
        </div>

        <div className="panel p-6">
          <p className="eyebrow mb-3">WhatsApp bot</p>
          <h2 className="text-[1.3rem] font-semibold tracking-[-0.04em] text-[var(--foreground)]">
            Numero non ancora collegato
          </h2>
          <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">
            Quando vuoi, qui possiamo aggiungere il setup del canale e tenere
            tutto nello stesso tono visivo del resto del prodotto.
          </p>
          <button type="button" className="btn-secondary mt-6">
            Configura
          </button>
        </div>
      </section>
    </div>
  )
}
