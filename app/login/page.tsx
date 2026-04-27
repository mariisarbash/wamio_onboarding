'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 400))
    const ok = login(email, password)
    if (ok) {
      router.push('/dashboard')
    } else {
      setError('Email o password non corretta.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">wamio</h1>
          <p className="mt-2 text-sm text-zinc-500">Gestisci i tuoi affitti a Milano</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-medium text-zinc-700 uppercase tracking-wider">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="demo@wamio.it"
              required
              className="h-11 rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-black text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs font-medium text-zinc-700 uppercase tracking-wider">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="h-11 rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-black text-sm"
            />
          </div>

          {error && (
            <p className="text-xs text-red-600">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-none bg-black text-white text-sm font-medium hover:bg-zinc-800 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Accesso in corso...' : 'Accedi'}
          </Button>
        </form>

        <div className="mt-8 p-4 bg-zinc-50 border border-zinc-100">
          <p className="text-xs text-zinc-500 font-medium mb-1">Credenziali demo</p>
          <p className="text-xs text-zinc-600 font-mono">demo@wamio.it / demo1234</p>
        </div>
      </div>
    </div>
  )
}
