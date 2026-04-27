'use client'

import { ArrowRight, CalendarDays, House, MessageCircleMore, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'

const highlights = [
  {
    title: 'Lead già filtrati',
    copy: 'Richieste pulite, priorità chiare e meno messaggi dispersivi.',
    icon: Sparkles,
  },
  {
    title: 'Visite coordinate',
    copy: 'Il bot risponde, qualifica e prepara la visita al momento giusto.',
    icon: CalendarDays,
  },
  {
    title: 'Schede proprietà ordinate',
    copy: 'Tutto quello che serve al bot in un setup semplice e leggibile.',
    icon: House,
  },
]

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
    await new Promise(resolve => setTimeout(resolve, 400))
    const ok = login(email, password)

    if (ok) {
      router.push('/dashboard')
      return
    }

    setError('Email o password non corretta.')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="page-shell-wide">
        <header className="mb-6 flex items-center justify-between rounded-[28px] border border-[var(--border)] bg-white/55 px-5 py-4 shadow-[var(--shadow-soft)] backdrop-blur-xl dark:bg-white/5">
          <div>
            <p className="eyebrow mb-2">Wamio</p>
            <h1 className="text-[1.45rem] font-semibold tracking-[-0.04em] text-[var(--foreground)]">
              wamio
            </h1>
          </div>
          <span className="rounded-full border border-[var(--border)] bg-[var(--card-strong)] px-4 py-2 text-sm text-[var(--muted-strong)]">
            Milano rentals, made calmer
          </span>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.18fr_0.82fr]">
          <section className="panel-strong overflow-hidden px-6 py-8 md:px-9 md:py-10">
            <div className="grid gap-8 xl:grid-cols-[1fr_0.9fr]">
              <div>
                <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-white/70 px-4 py-2 text-sm text-[var(--muted-strong)] dark:bg-white/5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-foreground)]">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  Più moderno, più chiaro, meno attrito
                </div>

                <h2 className="page-title max-w-[13ch]">
                  L’operatività affitti che sembra finalmente semplice.
                </h2>
                <p className="mt-6 max-w-[40rem] text-base leading-8 text-[var(--muted-strong)] md:text-lg">
                  Wamio organizza conversazioni, proprietà e follow-up con un
                  tono più fresco e più leggibile. L’idea è premium, ma senza
                  sembrare fredda o pesante.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    { value: '24h', label: 'Tempo risposta bot' },
                    { value: '1 vista', label: 'Lead e schede allineate' },
                    { value: 'Soft UI', label: 'Light + dark più puliti' },
                  ].map(item => (
                    <div
                      key={item.label}
                      className="rounded-[24px] border border-[var(--border)] bg-[var(--card)] px-4 py-4 shadow-[var(--shadow-soft)]"
                    >
                      <p className="text-[1.55rem] font-semibold tracking-[-0.05em] text-[var(--foreground)]">
                        {item.value}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                <div className="panel overflow-hidden">
                  <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
                    <div>
                      <p className="eyebrow mb-2">Inbox preview</p>
                      <p className="text-sm font-semibold text-[var(--foreground)]">
                        Conversazioni che si ordinano da sole
                      </p>
                    </div>
                    <span className="rounded-full bg-[rgba(167,215,180,0.24)] px-3 py-1 text-xs font-medium text-[var(--accent-foreground)]">
                      Online
                    </span>
                  </div>

                  <div className="grid gap-3 p-4">
                    {highlights.map(item => (
                      <div
                        key={item.title}
                        className="rounded-[22px] border border-[var(--border)] bg-[var(--card-strong)] p-4"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-[16px] bg-[rgba(167,215,180,0.22)] text-[var(--accent-foreground)]">
                            <item.icon className="h-4 w-4" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold tracking-[-0.02em] text-[var(--foreground)]">
                              {item.title}
                            </p>
                            <p className="mt-1 text-sm leading-6 text-[var(--muted-foreground)]">
                              {item.copy}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-[28px] bg-[var(--primary)] px-5 py-5 text-[var(--primary-foreground)] shadow-[var(--shadow-card)]">
                    <div className="flex items-center justify-between">
                      <p className="eyebrow text-[var(--primary-foreground)]/70">
                        Preview risposta
                      </p>
                      <MessageCircleMore className="h-4 w-4 text-[var(--primary-foreground)]/70" />
                    </div>
                    <p className="mt-5 text-sm leading-7 text-[var(--primary-foreground)]/90">
                      Ciao Marta, l’appartamento in Porta Romana è disponibile da
                      giugno. Se vuoi ti mando subito foto, canone e slot per la
                      visita.
                    </p>
                  </div>

                  <div className="panel p-5">
                    <p className="eyebrow mb-3">Mood</p>
                    <p className="text-sm leading-7 text-[var(--muted-strong)]">
                      Base chiara, tipografia morbida, contrasti più gentili e
                      interfaccia molto più attuale.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="panel px-6 py-7 md:px-8 md:py-8">
            <div className="mb-8">
              <p className="eyebrow mb-3">Accesso dashboard</p>
              <h3 className="section-title">Entra e riparti da qui</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
                Interfaccia più pulita, tono più giovane e credenziali demo già
                pronte per provare il flusso.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="label-uc mb-3 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="demo@wamio.it"
                  required
                  className="input-base"
                />
              </div>

              <div>
                <label className="label-uc mb-3 block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input-base"
                />
              </div>

              {error && (
                <p className="rounded-[18px] border border-[rgba(201,107,96,0.25)] bg-[rgba(201,107,96,0.1)] px-4 py-3 text-sm text-[var(--destructive)]">
                  {error}
                </p>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Accesso in corso…' : 'Accedi alla dashboard'}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <div className="mt-7 rounded-[24px] border border-[var(--border)] bg-[var(--card-soft)] p-5">
              <p className="eyebrow mb-3">Credenziali demo</p>
              <p className="text-sm font-medium text-[var(--foreground)]">
                demo@wamio.it
              </p>
              <p className="mt-1 font-mono text-sm text-[var(--muted-foreground)]">
                demo1234
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
