'use client'

import { ArrowLeft, ArrowRight, ImagePlus } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const TOTAL_STEPS = 8

type FormData = {
  listingType: string
  rentalType: string
  name: string
  address: string
  zone: string
  floor: string
  elevator: string
  sqm: string
  rooms: string
  bathrooms: string
  maxGuests: string
  price: string
  deposit: string
  priceNegotiable: string
  expensesIncluded: string[]
  furnished: string
  amenities: string[]
  smoking: string
  pets: string
  guestPolicy: string
  minStay: string
  residenceAllowed: string
  allowedGuests: string[]
  visitsAllowed: string
  visitDays: string[]
  photosCount: string
  existingListingLink: string
  botTone: string
  botLanguages: string[]
  canSharePhotos: string
  canConfirmAvailability: string
  escalationContact: string
  canDiscussPrice: string
}

const defaultForm: FormData = {
  listingType: '', rentalType: '', name: '', address: '', zone: '', floor: '',
  elevator: '', sqm: '', rooms: '', bathrooms: '', maxGuests: '', price: '',
  deposit: '', priceNegotiable: '', expensesIncluded: [], furnished: '',
  amenities: [], smoking: '', pets: '', guestPolicy: '', minStay: '',
  residenceAllowed: '', allowedGuests: [], visitsAllowed: '', visitDays: [],
  photosCount: '', existingListingLink: '', botTone: '', botLanguages: [],
  canSharePhotos: '', canConfirmAvailability: '', escalationContact: '',
  canDiscussPrice: '',
}

const zones = [
  'Brera', 'Navigli', 'Porta Romana', 'Isola', 'Città Studi', 'Nolo',
  'Porta Garibaldi', 'Ticinese', 'Sempione', 'Moscova', 'Lambrate',
  'Loreto', 'Porta Venezia', 'Buenos Aires', 'CityLife', 'Bovisa',
  'Bicocca', 'Vigentino', 'Altra zona',
]
const expenses = ['Wi-Fi', 'Luce', 'Gas', 'Acqua', 'Riscaldamento', 'Condominio', 'TARI', 'Pulizie']
const amenitiesList = ['Lavatrice', 'Lavastoviglie', 'Forno', 'Microonde', 'TV', 'Aria condizionata', 'Balcone/Terrazza', 'Posto auto', 'Cantina', 'Scrivania']
const visitDaysList = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica']
const guestTypeList = ['Studenti', 'Lavoratori', 'Turisti', 'Famiglie', 'Professionisti', 'Aziende']

type Choice = { value: string; label: string; desc?: string }

function ChoiceCard({
  option, selected, onClick,
}: { option: Choice; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full rounded-[24px] border px-6 py-5 text-left transition-all duration-150 ${
        selected
          ? 'border-[var(--border-strong)] bg-[linear-gradient(135deg,rgba(167,215,180,0.22),transparent_65%),var(--card-strong)] shadow-[var(--shadow-soft)]'
          : 'border-[var(--border)] bg-[var(--card)] hover:-translate-y-0.5 hover:border-[var(--ring)] hover:bg-[var(--card-strong)]'
      }`}
    >
      <p className="text-[15px] font-semibold tracking-[-0.02em] text-[var(--foreground)]">
        {option.label}
      </p>
      {option.desc && (
        <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">{option.desc}</p>
      )}
      {selected && (
        <span className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--primary)] text-sm text-[var(--primary-foreground)]">
          ✓
        </span>
      )}
    </button>
  )
}

function CheckChip({
  label, checked, onChange,
}: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-all duration-150 ${
        checked
          ? 'border-[var(--border-strong)] bg-[rgba(167,215,180,0.18)] text-[var(--foreground)]'
          : 'border-[var(--border)] bg-[var(--card)] text-[var(--muted-strong)] hover:border-[var(--ring)] hover:text-[var(--foreground)]'
      }`}
    >
      <span className={`flex h-4 w-4 items-center justify-center rounded-full border text-[9px] ${
        checked
          ? 'border-[var(--accent-strong)] bg-[var(--accent-strong)] text-[var(--accent-foreground)]'
          : 'border-[var(--border-strong)] text-transparent'
      }`}>
        {checked && '✓'}
      </span>
      {label}
    </button>
  )
}

function Field({
  label, children, hint,
}: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className="label-uc mb-3 block">{label}</label>
      {children}
      {hint && (
        <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{hint}</p>
      )}
    </div>
  )
}

function StepLabel({ children }: { children: React.ReactNode }) {
  return <p className="label-uc mb-5 block">{children}</p>
}

const stepTitles = [
  'Tipo di annuncio',
  'Informazioni proprietà',
  'Prezzo e spese',
  'Arredamento e dotazioni',
  'Regole',
  'Chi può affittare',
  'Foto',
  'Impostazioni bot',
]

export default function NewPropertyPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(defaultForm)
  const router = useRouter()

  const set = (field: keyof FormData, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const toggleArr = (field: keyof FormData, value: string) => {
    const arr = form[field] as string[]
    setForm(prev => ({
      ...prev,
      [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value],
    }))
  }

  const inArr = (field: keyof FormData, value: string) =>
    (form[field] as string[]).includes(value)

  const canNext = (): boolean => {
    if (step === 1) return !!form.listingType && !!form.rentalType
    if (step === 2) return !!form.name && !!form.address && !!form.zone && !!form.floor && !!form.elevator && !!form.sqm && !!form.rooms && !!form.bathrooms && !!form.maxGuests
    if (step === 3) return !!form.price && !!form.deposit && !!form.priceNegotiable
    if (step === 4) return !!form.furnished
    if (step === 5) return !!form.smoking && !!form.pets && !!form.residenceAllowed
    if (step === 6) return form.allowedGuests.length > 0 && !!form.visitsAllowed
    if (step === 7) return !!form.photosCount
    if (step === 8) return !!form.botTone && !!form.canSharePhotos && !!form.escalationContact
    return true
  }

  const handleFinish = () => router.push('/dashboard')

  return (
    <div className="page-shell">
      {/* Breadcrumb */}
      <button
        onClick={() => router.push('/dashboard')}
        className="btn-ghost mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Dashboard
      </button>

      <section className="panel-strong p-7 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-4">Nuova proprietà</p>
            <h1 className="section-title">Setup semplice, tono moderno, nessun rumore.</h1>
            <p className="mt-4 max-w-[42rem] text-sm leading-7 text-[var(--muted-strong)] md:text-base">
              Lo stepper resta guidato come prima, ma con card più leggere,
              gerarchia più chiara e un look molto più attuale.
            </p>
          </div>

          <div className="rounded-[24px] border border-[var(--border)] bg-[var(--card)] px-5 py-4">
            <p className="label-uc mb-3 block">Step corrente</p>
            <p className="text-lg font-semibold tracking-[-0.03em] text-[var(--foreground)]">
              {stepTitles[step - 1]}
            </p>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              Step {step} di {TOTAL_STEPS}
            </p>
          </div>
        </div>

        <div className="mt-7">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-[var(--muted-foreground)]">Progresso</span>
            <span className="font-medium text-[var(--foreground)]">
              {Math.round((step / TOTAL_STEPS) * 100)}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-[var(--muted)]">
            <div
              className="h-2 rounded-full bg-[linear-gradient(90deg,var(--accent-strong),var(--accent-secondary))]"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>
      </section>

      <div className="mt-6 panel p-6 md:p-7">

      {/* Steps */}
        <div className="space-y-8">
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div>
              <StepLabel>Cosa stai aggiungendo?</StepLabel>
              <div className="grid gap-3">
                {[
                  { value: 'appartamento', label: 'Appartamento intero', desc: "L'intero appartamento viene affittato a un inquilino" },
                  { value: 'stanza', label: 'Stanza singola', desc: 'Una stanza in un appartamento condiviso' },
                  { value: 'piu_stanze', label: 'Più stanze nello stesso appartamento', desc: 'Più stanze affittate separatamente' },
                ].map(o => (
                  <ChoiceCard key={o.value} option={o} selected={form.listingType === o.value} onClick={() => set('listingType', o.value)} />
                ))}
              </div>
            </div>

            <div>
              <StepLabel>Come vuoi affittare?</StepLabel>
              <div className="grid gap-3">
                {[
                  { value: 'lungo', label: 'Lungo termine', desc: 'Contratto mensile o annuale' },
                  { value: 'breve', label: 'Breve termine', desc: 'Giornaliero, settimanale o mensile breve' },
                  { value: 'entrambi', label: 'Entrambi', desc: 'Sia breve che lungo termine' },
                ].map(o => (
                  <ChoiceCard key={o.value} option={o} selected={form.rentalType === o.value} onClick={() => set('rentalType', o.value)} />
                ))}
              </div>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-5">
            <Field label="Nome della proprietà (uso interno)">
              <input className="input-base" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Es. Bilocale Navigli" />
            </Field>
            <Field label="Indirizzo completo">
              <input className="input-base" value={form.address} onChange={e => set('address', e.target.value)} placeholder="Via Roma 12, Milano" />
            </Field>
            <Field label="Zona di Milano">
              <select className="input-base appearance-none cursor-pointer" value={form.zone} onChange={e => set('zone', e.target.value)}>
                <option value="">Seleziona zona…</option>
                {zones.map(z => <option key={z} value={z}>{z}</option>)}
              </select>
            </Field>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Piano">
                <input type="number" className="input-base" value={form.floor} onChange={e => set('floor', e.target.value)} placeholder="0 = piano terra" />
              </Field>
              <Field label="Ascensore">
                <select className="input-base appearance-none cursor-pointer" value={form.elevator} onChange={e => set('elevator', e.target.value)}>
                  <option value="">—</option>
                  <option value="si">Sì</option>
                  <option value="no">No</option>
                </select>
              </Field>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Superficie (m²)">
                <input type="number" className="input-base" value={form.sqm} onChange={e => set('sqm', e.target.value)} placeholder="65" />
              </Field>
              <Field label="Stanze (escluso bagni e cucina)">
                <input type="number" className="input-base" value={form.rooms} onChange={e => set('rooms', e.target.value)} placeholder="2" />
              </Field>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Bagni">
                <input type="number" className="input-base" value={form.bathrooms} onChange={e => set('bathrooms', e.target.value)} placeholder="1" />
              </Field>
              <Field label="Ospiti massimi">
                <input type="number" className="input-base" value={form.maxGuests} onChange={e => set('maxGuests', e.target.value)} placeholder="2" />
              </Field>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label={form.rentalType === 'breve' ? 'Prezzo per notte (€)' : 'Canone mensile (€)'}>
                <input type="number" className="input-base" value={form.price} onChange={e => set('price', e.target.value)} placeholder={form.rentalType === 'breve' ? '80' : '1200'} />
              </Field>
              <Field label="Deposito cauzionale (€)">
                <input type="number" className="input-base" value={form.deposit} onChange={e => set('deposit', e.target.value)} placeholder="2400" />
              </Field>
            </div>

            <div>
              <StepLabel>Il prezzo è fisso o trattabile?</StepLabel>
              <div className="grid gap-3">
                {[
                  { value: 'fisso', label: 'Fisso' },
                  { value: 'trattabile', label: 'Trattabile' },
                  { value: 'parzialmente', label: 'Trattabile solo in alcuni casi' },
                ].map(o => (
                  <ChoiceCard key={o.value} option={o} selected={form.priceNegotiable === o.value} onClick={() => set('priceNegotiable', o.value)} />
                ))}
              </div>
            </div>

            <div>
              <StepLabel>Cosa è incluso nel canone?</StepLabel>
              <div className="flex flex-wrap gap-2">
                {expenses.map(e => (
                  <CheckChip key={e} label={e} checked={inArr('expensesIncluded', e)} onChange={() => toggleArr('expensesIncluded', e)} />
                ))}
              </div>
            </div>
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            <div>
              <StepLabel>L&apos;appartamento è arredato?</StepLabel>
              <div className="grid gap-3">
                {[
                  { value: 'completamente', label: 'Completamente arredato' },
                  { value: 'parzialmente', label: 'Parzialmente arredato' },
                  { value: 'no', label: 'Non arredato' },
                ].map(o => (
                  <ChoiceCard key={o.value} option={o} selected={form.furnished === o.value} onClick={() => set('furnished', o.value)} />
                ))}
              </div>
            </div>

            <div>
              <StepLabel>Dotazioni presenti</StepLabel>
              <div className="flex flex-wrap gap-2">
                {amenitiesList.map(a => (
                  <CheckChip key={a} label={a} checked={inArr('amenities', a)} onChange={() => toggleArr('amenities', a)} />
                ))}
              </div>
            </div>
          </>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <>
            <div>
              <StepLabel>Fumo in appartamento</StepLabel>
              <div className="grid gap-3">
                {[
                  { value: 'si', label: 'Sì, è permesso' },
                  { value: 'balcone', label: 'Solo in balcone/terrazza' },
                  { value: 'no', label: 'No, vietato' },
                ].map(o => (
                  <ChoiceCard key={o.value} option={o} selected={form.smoking === o.value} onClick={() => set('smoking', o.value)} />
                ))}
              </div>
            </div>

            <div>
              <StepLabel>Animali domestici</StepLabel>
              <div className="grid gap-3">
                {[
                  { value: 'si', label: 'Sì, ammessi' },
                  { value: 'dipende', label: "Dipende dall'animale" },
                  { value: 'no', label: 'No, non ammessi' },
                ].map(o => (
                  <ChoiceCard key={o.value} option={o} selected={form.pets === o.value} onClick={() => set('pets', o.value)} />
                ))}
              </div>
            </div>

            <div>
              <StepLabel>È possibile registrare la residenza?</StepLabel>
              <div className="grid gap-3">
                {[
                  { value: 'si', label: 'Sì' },
                  { value: 'caso_per_caso', label: 'Da valutare caso per caso' },
                  { value: 'no', label: 'No' },
                ].map(o => (
                  <ChoiceCard key={o.value} option={o} selected={form.residenceAllowed === o.value} onClick={() => set('residenceAllowed', o.value)} />
                ))}
              </div>
            </div>

            <Field label="Durata minima soggiorno" hint="Es. 3 mesi, 6 mesi, 1 anno">
              <input className="input-base" value={form.minStay} onChange={e => set('minStay', e.target.value)} placeholder="Es. 3 mesi" />
            </Field>
          </>
        )}

        {/* STEP 6 */}
        {step === 6 && (
          <>
            <div>
              <StepLabel>Chi può affittare questa proprietà?</StepLabel>
              <div className="flex flex-wrap gap-2">
                {guestTypeList.map(g => (
                  <CheckChip key={g} label={g} checked={inArr('allowedGuests', g)} onChange={() => toggleArr('allowedGuests', g)} />
                ))}
                <CheckChip
                  label="Tutti"
                  checked={inArr('allowedGuests', 'Tutti')}
                  onChange={() => {
                    if (inArr('allowedGuests', 'Tutti')) setForm(p => ({ ...p, allowedGuests: [] }))
                    else setForm(p => ({ ...p, allowedGuests: ['Tutti'] }))
                  }}
                />
              </div>
            </div>

            <div>
              <StepLabel>Sono possibili visite in presenza?</StepLabel>
              <div className="grid gap-3">
                {[
                  { value: 'si', label: 'Sì' },
                  { value: 'no', label: 'No' },
                  { value: 'solo_video', label: 'Solo visite video online' },
                ].map(o => (
                  <ChoiceCard key={o.value} option={o} selected={form.visitsAllowed === o.value} onClick={() => set('visitsAllowed', o.value)} />
                ))}
              </div>
            </div>

            {form.visitsAllowed === 'si' && (
              <div>
                <StepLabel>Giorni preferiti per le visite</StepLabel>
                <div className="flex flex-wrap gap-2">
                  {visitDaysList.map(d => (
                    <CheckChip key={d} label={d} checked={inArr('visitDays', d)} onChange={() => toggleArr('visitDays', d)} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* STEP 7 */}
        {step === 7 && (
          <>
            <div className="rounded-[28px] border border-dashed border-[var(--border-strong)] bg-[var(--card-soft)] px-6 py-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[20px] bg-[rgba(167,215,180,0.22)] text-[var(--accent-foreground)]">
                <ImagePlus className="h-5 w-5" />
              </div>
              <p className="mt-5 text-base font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                Carica le foto della proprietà
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">
                Minimo 3 foto per attivare il bot — consigliati 8–15
              </p>
              <button className="btn-primary mt-5" type="button">
                Carica foto
              </button>
            </div>

            <Field label="Numero di foto disponibili" hint="Quante foto hai pronte da caricare">
              <input type="number" className="input-base" value={form.photosCount} onChange={e => set('photosCount', e.target.value)} placeholder="Es. 8" />
            </Field>

            <Field label="Hai già un annuncio su Airbnb, Idealista o Immobiliare.it?" hint="Opzionale">
              <input className="input-base" value={form.existingListingLink} onChange={e => set('existingListingLink', e.target.value)} placeholder="https://…" />
            </Field>
          </>
        )}

        {/* STEP 8 */}
        {step === 8 && (
          <>
            <div>
              <StepLabel>Con che tono deve comunicare il bot?</StepLabel>
              <div className="grid gap-3">
                {[
                  { value: 'formale', label: 'Formale e professionale', desc: 'Perfetto per affitti a professionisti o aziende' },
                  { value: 'neutro', label: 'Neutro e cordiale', desc: 'Bilanciato, adatto a tutti i tipi di inquilini' },
                  { value: 'amichevole', label: 'Amichevole e diretto', desc: 'Ideale per stanze a studenti o giovani lavoratori' },
                  { value: 'premium', label: 'Premium e riservato', desc: 'Per appartamenti di fascia alta o affitti di lusso' },
                ].map(o => (
                  <ChoiceCard key={o.value} option={o} selected={form.botTone === o.value} onClick={() => set('botTone', o.value)} />
                ))}
              </div>
            </div>

            <div>
              <StepLabel>Il bot può condividere le foto su WhatsApp?</StepLabel>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  { value: 'si', label: 'Sì' },
                  { value: 'no', label: 'No' },
                ].map(o => (
                  <ChoiceCard key={o.value} option={o} selected={form.canSharePhotos === o.value} onClick={() => set('canSharePhotos', o.value)} />
                ))}
              </div>
            </div>

            <div>
              <StepLabel>Il bot può parlare del prezzo?</StepLabel>
              <div className="grid gap-3">
                {[
                  { value: 'si_fisso', label: 'Sì, può comunicare il prezzo fisso' },
                  { value: 'si_trattativa', label: 'Sì, può anche indicare margine di trattativa' },
                  { value: 'no', label: 'No, rimanda sempre al proprietario' },
                ].map(o => (
                  <ChoiceCard key={o.value} option={o} selected={form.canDiscussPrice === o.value} onClick={() => set('canDiscussPrice', o.value)} />
                ))}
              </div>
            </div>

            <Field label="Contatto per escalation (WhatsApp o email)" hint="Il bot rimanda qui per lead qualificati o quando non sa rispondere">
              <input className="input-base" value={form.escalationContact} onChange={e => set('escalationContact', e.target.value)} placeholder="+39 333 000 1111 o nome@email.it" />
            </Field>
          </>
        )}
      </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--border)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          {step > 1 ? (
            <button onClick={() => setStep(s => s - 1)} className="btn-ghost">
              <ArrowLeft className="h-4 w-4" />
              Indietro
            </button>
          ) : (
            <button onClick={() => router.push('/dashboard')} className="btn-ghost">
              Annulla
            </button>
          )}

          {step < TOTAL_STEPS ? (
            <button onClick={() => setStep(s => s + 1)} disabled={!canNext()} className="btn-primary">
              Continua
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button onClick={handleFinish} disabled={!canNext()} className="btn-primary">
              Aggiungi proprietà
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
