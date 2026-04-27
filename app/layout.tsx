import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/auth'

const geist = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'wamio — gestione affitti Milano',
  description: 'Dashboard per proprietari di affitti a Milano con bot WhatsApp integrato',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-black font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
