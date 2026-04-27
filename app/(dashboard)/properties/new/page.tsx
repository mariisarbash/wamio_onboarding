'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const TOTAL_STEPS = 8

type FormData = {
  // Step 1 — Tipo
  listingType: string
  rentalType: string

  // Step 2 — Proprietà
  name: string
  address: string
  zone: string
  floor: string
  elevator: string
  sqm: string
  rooms: string
  bathrooms: string
  maxGuests: string

  // Step 3 — Prezzo
  price: string
  deposit: string
  priceNegotiable: string
  expensesIncluded: string[]

  // Step 4 — Arredamento e dotazioni
  furnished: string
  amenities: string[]

  // Step 5 — Regole
  smoking: string
  pets: string
  guestPolicy: string
  minStay: string
  residenceAllowed: string

  // Step 6 — Inquilini e visite
  allowedGuests: string[]
  visitsAllowed: string
  visitDays: string[]

  // Step 7 — Foto e media
  photosCount: string
  existingListingLink: string

  // Step 8 — Bot
  botTone: string
  botLanguages: string[]
  canSharePhotos: string
  canConfirmAvailability: string
  escalationContact: string
  canDiscussPrice: string
}

const defaultForm: FormData = {
  listingType: '',
  rentalType: '',
  name: '',
  address: '',
  zone: '',
  floor: '',
  elevator: '',
  sqm: '',
  rooms: '',
  bathrooms: '',
  maxGuests: '',
  price: '',
  deposit: '',
  priceNegotiable: '',
  expensesIncluded: [],
  furnished: '',
  amenities: [],
  smoking: '',
  pets: '',
  guestPolicy: '',
  minStay: '',
  residenceAllowed: '',
  allowedGuests: [],
  visitsAllowed: '',
  visitDays: [],
  photosCount: '',
  existingListingLink: '',
  botTone: '',
  botLanguages: [],
  canSharePhotos: '',
  canConfirmAvailability: '',
  escalationContact: '',
  canDiscussPrice: '',
}

const zones = [
  'Brera', 'Navigli', 'Porta Romana', 'Isola', 'Città Studi',
  'Nolo', 'Porta Garibaldi', 'Ticinese', 'Sempione', 'Moscova',
  'Lambrate', 'Loreto', 'Porta Venezia', 'Buenos Aires', 'CityLife',
  'Bovisa', 'Bicocca', 'Vigentino', 'Altra zona',
]

const expenses = ['Wi-Fi', 'Luce', 'Gas', 'Acqua', 'Riscaldamento', 'Condominio', 'TARI', 'Pulizie']
const amenitiesList = ['Lavatrice', 'Lavastoviglie', 'Forno', 'Microonde', 'TV', 'Aria condizionata', 'Balcone/Terrazza', 'Posto auto', 'Cantina', 'Scrivania']
const visitDaysList = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica']
const guestTypeList = ['Studenti', 'Lavoratori', 'Turisti', 'Famiglie', 'Professionisti', 'Aziende']

type Choice = { value: string; label: string; desc?: string }

function ChoiceCard({
  option,
  selected,
  onClick,
}: {
  option: Choice
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left p-4 border transition-colors ${
        selected ? 'border-black bg-black text-white' : 'border-zinc-200 hover:border-zinc-400 bg-white'
      }`}
    >
      <p className="text-sm font-medium">{option.label}</p>
      {option.desc && (
        <p className={`text-xs mt-0.5 ${selected ? 'text-zinc-300' : 'text-zinc-400'}`}>
          {option.desc}
        </p>
      )}
    </button>
  )
}

function CheckItem({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-2 px-3 py-2 border text-sm transition-colors ${
        checked ? 'border-black bg-black text-white' : 'border-zinc-200 hover:border-zinc-400 text-zinc-700'
      }`}
    >
      <span className={`w-3.5 h-3.5 border flex items-center justify-center ${checked ? 'border-white' : 'border-zinc-400'}`}>
        {checked && <span className="text-xs leading-none">✓</span>}
      </span>
      {label}
    </button>
  )
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-zinc-600">{label}</Label>
      {children}
      {hint && <p className="text-xs text-zinc-400">{hint}</p>}
    </div>
  )
}

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

  const handleFinish = () => {
    router.push('/dashboard')
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

  return (
    <div className="px-10 py-8 max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-xs text-zinc-400 hover:text-zinc-600"
          >
            ← Dashboard
          </button>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">Aggiungi proprietà</h2>
        <p className="text-sm text-zinc-500 mt-1">
          Step {step} di {TOTAL_STEPS} — {stepTitles[step - 1]}
        </p>
      </div>

      {/* Progress */}
      <div className="flex gap-0.5 mb-8">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 transition-colors ${i < step ? 'bg-black' : 'bg-zinc-200'}`}
          />
        ))}
      </div>

      {/* Steps */}
      <div className="space-y-6">

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-3">Cosa stai aggiungendo?</p>
              <div className="grid gap-2">
                {[
                  { value: 'appartamento', label: 'Appartamento intero', desc: 'L\'intero appartamento viene affittato a un inquilino' },
                  { value: 'stanza', label: 'Stanza singola', desc: 'Una stanza in un appartamento condiviso' },
                  { value: 'piu_stanze', label: 'Più stanze nello stesso appartamento', desc: 'Più stanze affittate separatamente' },
                ].map(o => (
                  <ChoiceCard
                    key={o.value}
                    option={o}
                    selected={form.listingType === o.value}
                    onClick={() => set('listingType', o.value)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Come vuoi affittare?</p>
              <div className="grid gap-2">
                {[
                  { value: 'lungo', label: 'Lungo termine', desc: 'Contratto mensile o annuale' },
                  { value: 'breve', label: 'Breve termine', desc: 'Giornaliero, settimanale o mensile breve' },
                  { value: 'entrambi', label: 'Entrambi', desc: 'Sia breve che lungo termine' },
                ].map(o => (
                  <ChoiceCard
                    key={o.value}
                    option={o}
                    selected={form.rentalType === o.value}
                    onClick={() => set('rentalType', o.value)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <Field label="Nome della proprietà (uso interno)">
              <Input
                value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder="Es. Bilocale Navigli"
                className="h-10 rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-black text-sm"
              />
            </Field>
            <Field label="Indirizzo completo">
              <Input
                value={form.address}
                onChange={e => set('address', e.target.value)}
                placeholder="Via Roma 12, Milano"
                className="h-10 rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-black text-sm"
              />
            </Field>
            <Field label="Zona di Milano">
              <select
                value={form.zone}
                onChange={e => set('zone', e.target.value)}
                className="h-10 w-full border border-zinc-200 bg-white px-3 text-sm focus:outline-none focus:border-black"
              >
                <option value="">Seleziona zona…</option>
                {zones.map(z => <option key={z} value={z}>{z}</option>)}
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Piano">
                <Input
                  type="number"
                  value={form.floor}
                  onChange={e => set('floor', e.target.value)}
                  placeholder="0 = piano terra"
                  className="h-10 rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-black text-sm"
                />
              </Field>
              <Field label="Ascensore">
                <select
                  value={form.elevator}
                  onChange={e => set('elevator', e.target.value)}
                  className="h-10 w-full border border-zinc-200 bg-white px-3 text-sm focus:outline-none focus:border-black"
                >
                  <option value="">—</option>
                  <option value="si">Sì</option>
                  <option value="no">No</option>
                </select>
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Superficie (m²)">
                <Input
                  type="number"
                  value={form.sqm}
                  onChange={e => set('sqm', e.target.value)}
                  placeholder="65"
                  className="h-10 rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-black text-sm"
                />
              </Field>
              <Field label="Stanze (escluso bagni e cucina)">
                <Input
                  type="number"
                  value={form.rooms}
                  onChange={e => set('rooms', e.target.value)}
                  placeholder="2"
                  className="h-10 rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-black text-sm"
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Bagni">
                <Input
                  type="number"
                  value={form.bathrooms}
                  onChange={e => set('bathrooms', e.target.value)}
                  placeholder="1"
                  className="h-10 rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-black text-sm"
                />
              </Field>
              <Field label="Ospiti massimi">
                <Input
                  type="number"
                  value={form.maxGuests}
                  onChange={e => set('maxGuests', e.target.value)}
                  placeholder="2"
                  className="h-10 rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-black text-sm"
                />
              </Field>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Field label={form.rentalType === 'breve' ? 'Prezzo per notte (€)' : 'Canone mensile (€)'}>
                <Input
                  type="number"
                  value={form.price}
                  onChange={e => set('price', e.target.value)}
                  placeholder={form.rentalType === 'breve' ? '80' : '1200'}
                  className="h-10 rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-black text-sm"
                />
              </Field>
              <Field label="Deposito cauzionale (€)">
                <Input
                  type="number"
                  value={form.deposit}
                  onChange={e => set('deposit', e.target.value)}
                  placeholder="2400"
                  className="h-10 rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-black text-sm"
                />
              </Field>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Il prezzo è fisso o trattabile?</p>
              <div className="grid gap-2">
                {[
                  { value: 'fisso', label: 'Fisso' },
                  { value: 'trattabile', label: 'Trattabile' },
                  { value: 'parzialmente', label: 'Trattabile solo in alcuni casi' },
                ].map(o => (
                  <ChoiceCard
                    key={o.value}
                    option={o}
                    selected={form.priceNegotiable === o.value}
                    onClick={() => set('priceNegotiable', o.value)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Cosa è incluso nel canone?</p>
              <div className="flex flex-wrap gap-2">
                {expenses.map(e => (
                  <CheckItem
                    key={e}
                    label={e}
                    checked={inArr('expensesIncluded', e)}
                    onChange={() => toggleArr('expensesIncluded', e)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-3">L'appartamento è arredato?</p>
              <div className="grid gap-2">
                {[
                  { value: 'completamente', label: 'Completamente arredato' },
                  { value: 'parzialmente', label: 'Parzialmente arredato' },
                  { value: 'no', label: 'Non arredato' },
                ].map(o => (
                  <ChoiceCard
                    key={o.value}
                    option={o}
                    selected={form.furnished === o.value}
                    onClick={() => set('furnished', o.value)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Dotazioni presenti</p>
              <div className="flex flex-wrap gap-2">
                {amenitiesList.map(a => (
                  <CheckItem
                    key={a}
                    label={a}
                    checked={inArr('amenities', a)}
                    onChange={() => toggleArr('amenities', a)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-3">Fumo in appartamento</p>
              <div className="grid gap-2">
                {[
                  { value: 'si', label: 'Sì, è permesso' },
                  { value: 'balcone', label: 'Solo in balcone/terrazza' },
                  { value: 'no', label: 'No, vietato' },
                ].map(o => (
                  <ChoiceCard
                    key={o.value}
                    option={o}
                    selected={form.smoking === o.value}
                    onClick={() => set('smoking', o.value)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Animali domestici</p>
              <div className="grid gap-2">
                {[
                  { value: 'si', label: 'Sì, ammessi' },
                  { value: 'dipende', label: 'Dipende dall\'animale' },
                  { value: 'no', label: 'No, non ammessi' },
                ].map(o => (
                  <ChoiceCard
                    key={o.value}
                    option={o}
                    selected={form.pets === o.value}
                    onClick={() => set('pets', o.value)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">È possibile registrare la residenza?</p>
              <div className="grid gap-2">
                {[
                  { value: 'si', label: 'Sì' },
                  { value: 'caso_per_caso', label: 'Da valutare caso per caso' },
                  { value: 'no', label: 'No' },
                ].map(o => (
                  <ChoiceCard
                    key={o.value}
                    option={o}
                    selected={form.residenceAllowed === o.value}
                    onClick={() => set('residenceAllowed', o.value)}
                  />
                ))}
              </div>
            </div>

            <Field label="Durata minima soggiorno" hint="Es. 3 mesi, 6 mesi, 1 anno">
              <Input
                value={form.minStay}
                onChange={e => set('minStay', e.target.value)}
                placeholder="Es. 3 mesi"
                className="h-10 rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-black text-sm"
              />
            </Field>
          </div>
        )}

        {/* STEP 6 */}
        {step === 6 && (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-3">Chi può affittare questa proprietà?</p>
              <div className="flex flex-wrap gap-2">
                {guestTypeList.map(g => (
                  <CheckItem
                    key={g}
                    label={g}
                    checked={inArr('allowedGuests', g)}
                    onChange={() => toggleArr('allowedGuests', g)}
                  />
                ))}
                <CheckItem
                  label="Tutti"
                  checked={inArr('allowedGuests', 'Tutti')}
                  onChange={() => {
                    if (inArr('allowedGuests', 'Tutti')) {
                      setForm(prev => ({ ...prev, allowedGuests: [] }))
                    } else {
                      setForm(prev => ({ ...prev, allowedGuests: ['Tutti'] }))
                    }
                  }}
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Sono possibili visite in presenza?</p>
              <div className="grid gap-2">
                {[
                  { value: 'si', label: 'Sì' },
                  { value: 'no', label: 'No' },
                  { value: 'solo_video', label: 'Solo visite video online' },
                ].map(o => (
                  <ChoiceCard
                    key={o.value}
                    option={o}
                    selected={form.visitsAllowed === o.value}
                    onClick={() => set('visitsAllowed', o.value)}
                  />
                ))}
              </div>
            </div>

            {form.visitsAllowed === 'si' && (
              <div>
                <p className="text-sm font-medium mb-3">Giorni preferiti per le visite</p>
                <div className="flex flex-wrap gap-2">
                  {visitDaysList.map(d => (
                    <CheckItem
                      key={d}
                      label={d}
                      checked={inArr('visitDays', d)}
                      onChange={() => toggleArr('visitDays', d)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 7 */}
        {step === 7 && (
          <div className="space-y-6">
            <div className="p-6 border-2 border-dashed border-zinc-200 text-center">
              <p className="text-sm text-zinc-500 mb-2">Carica le foto della proprietà</p>
              <p className="text-xs text-zinc-400 mb-4">Minimo 3 foto per attivare il bot — consigliati 8–15</p>
              <button className="text-xs bg-black text-white px-4 py-2 hover:bg-zinc-800 transition-colors">
                Carica foto
              </button>
            </div>

            <Field label="Numero di foto disponibili" hint="Quante foto hai pronte da caricare">
              <Input
                type="number"
                value={form.photosCount}
                onChange={e => set('photosCount', e.target.value)}
                placeholder="Es. 8"
                className="h-10 rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-black text-sm"
              />
            </Field>

            <Field label="Hai già un annuncio su Airbnb, Idealista o Immobiliare.it?" hint="Opzionale — il bot non lo usa direttamente">
              <Input
                value={form.existingListingLink}
                onChange={e => set('existingListingLink', e.target.value)}
                placeholder="https://…"
                className="h-10 rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-black text-sm"
              />
            </Field>
          </div>
        )}

        {/* STEP 8 */}
        {step === 8 && (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-3">Con che tono deve comunicare il bot?</p>
              <div className="grid gap-2">
                {[
                  { value: 'formale', label: 'Formale e professionale', desc: 'Perfetto per affitti a professionisti o aziende' },
                  { value: 'neutro', label: 'Neutro e cordiale', desc: 'Bilanciato, adatto a tutti i tipi di inquilini' },
                  { value: 'amichevole', label: 'Amichevole e diretto', desc: 'Ideale per stanze a studenti o giovani lavoratori' },
                  { value: 'premium', label: 'Premium e riservato', desc: 'Per appartamenti di fascia alta o affitti di lusso' },
                ].map(o => (
                  <ChoiceCard
                    key={o.value}
                    option={o}
                    selected={form.botTone === o.value}
                    onClick={() => set('botTone', o.value)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Il bot può condividere le foto su WhatsApp?</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'si', label: 'Sì' },
                  { value: 'no', label: 'No' },
                ].map(o => (
                  <ChoiceCard
                    key={o.value}
                    option={o}
                    selected={form.canSharePhotos === o.value}
                    onClick={() => set('canSharePhotos', o.value)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Il bot può parlare del prezzo?</p>
              <div className="grid gap-2">
                {[
                  { value: 'si_fisso', label: 'Sì, può comunicare il prezzo fisso' },
                  { value: 'si_trattativa', label: 'Sì, può anche indicare margine di trattativa' },
                  { value: 'no', label: 'No, rimanda sempre al proprietario' },
                ].map(o => (
                  <ChoiceCard
                    key={o.value}
                    option={o}
                    selected={form.canDiscussPrice === o.value}
                    onClick={() => set('canDiscussPrice', o.value)}
                  />
                ))}
              </div>
            </div>

            <Field
              label="Contatto per escalation (WhatsApp o email)"
              hint="Il bot rimanda qui quando non sa rispondere o per lead qualificati"
            >
              <Input
                value={form.escalationContact}
                onChange={e => set('escalationContact', e.target.value)}
                placeholder="+39 333 000 1111 o nome@email.it"
                className="h-10 rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-black text-sm"
              />
            </Field>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-100">
        {step > 1 ? (
          <button
            onClick={() => setStep(s => s - 1)}
            className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            ← Indietro
          </button>
        ) : (
          <button
            onClick={() => router.push('/dashboard')}
            className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            Annulla
          </button>
        )}

        {step < TOTAL_STEPS ? (
          <Button
            onClick={() => setStep(s => s + 1)}
            disabled={!canNext()}
            className="h-10 px-6 rounded-none bg-black text-white text-sm font-medium hover:bg-zinc-800 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
          >
            Continua →
          </Button>
        ) : (
          <Button
            onClick={handleFinish}
            disabled={!canNext()}
            className="h-10 px-6 rounded-none bg-black text-white text-sm font-medium hover:bg-zinc-800 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
          >
            Aggiungi proprietà
          </Button>
        )}
      </div>
    </div>
  )
}
