'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

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

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateOwner(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="px-10 py-8 max-w-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Profilo</h2>
        <p className="text-sm text-zinc-500 mt-1">Impostazioni account — valide per tutte le proprietà</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <section>
          <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
            Dati personali
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-600">Nome completo</Label>
              <Input
                value={form.name}
                onChange={e => handleChange('name', e.target.value)}
                className="h-10 rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-black text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-600">Come preferisci essere chiamato</Label>
              <Input
                value={form.nickname}
                onChange={e => handleChange('nickname', e.target.value)}
                placeholder="Es. Marco"
                className="h-10 rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-black text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-600">Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={e => handleChange('email', e.target.value)}
                className="h-10 rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-black text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-600">Telefono</Label>
              <Input
                value={form.phone}
                onChange={e => handleChange('phone', e.target.value)}
                className="h-10 rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-black text-sm"
              />
            </div>
          </div>
        </section>

        <div className="h-px bg-zinc-100" />

        <section>
          <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
            Preferenze comunicazione
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-600">Lingua preferita</Label>
              <select
                value={form.language}
                onChange={e => handleChange('language', e.target.value)}
                className="h-10 w-full border border-zinc-200 bg-white px-3 text-sm focus:outline-none focus:border-black"
              >
                <option value="italiano">Italiano</option>
                <option value="inglese">Inglese</option>
                <option value="altro">Altro</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-600">Orari di contatto preferiti</Label>
              <Input
                value={form.contactHours}
                onChange={e => handleChange('contactHours', e.target.value)}
                placeholder="Es. Lun-Ven 9:00–19:00"
                className="h-10 rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-black text-sm"
              />
            </div>
          </div>
        </section>

        <div className="h-px bg-zinc-100" />

        <section>
          <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
            Escalation bot
          </h3>
          <div className="space-y-1.5 max-w-sm">
            <Label className="text-xs text-zinc-600">Contatto per supporto umano</Label>
            <Input
              value={form.supportContact}
              onChange={e => handleChange('supportContact', e.target.value)}
              placeholder="WhatsApp o email"
              className="h-10 rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-black text-sm"
            />
            <p className="text-xs text-zinc-400">
              Il bot rimanda qui quando non sa rispondere
            </p>
          </div>
        </section>

        <div className="flex items-center gap-4 pt-2">
          <Button
            type="submit"
            className="h-10 px-6 rounded-none bg-black text-white text-sm font-medium hover:bg-zinc-800"
          >
            Salva modifiche
          </Button>
          {saved && (
            <p className="text-xs text-zinc-500">Salvato.</p>
          )}
        </div>
      </form>

      <div className="mt-12 pt-6 border-t border-zinc-100">
        <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
          Account
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium">Piano attuale</p>
              <p className="text-xs text-zinc-400">Demo — funzionalità complete</p>
            </div>
            <span className="text-xs bg-black text-white px-2 py-1">Demo</span>
          </div>
          <div className="flex items-center justify-between py-2 border-t border-zinc-50">
            <div>
              <p className="text-sm font-medium">Numero WhatsApp bot</p>
              <p className="text-xs text-zinc-400">Non ancora collegato</p>
            </div>
            <button className="text-xs underline underline-offset-4 text-zinc-500 hover:text-zinc-900">
              Configura
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
