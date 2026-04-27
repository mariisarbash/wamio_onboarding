'use client'

import { createContext, ReactNode, startTransition, useContext, useEffect, useState } from 'react'
import { mockOwner } from './data'
import { Owner } from './types'

interface AuthContextType {
  owner: Owner | null
  login: (email: string, password: string) => boolean
  logout: () => void
  updateOwner: (data: Partial<Owner>) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [owner, setOwner] = useState<Owner | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('wamio_owner')

    startTransition(() => {
      setOwner(saved ? JSON.parse(saved) : null)
      setIsLoading(false)
    })
  }, [])

  const login = (email: string, password: string): boolean => {
    if (email === 'demo@wamio.it' && password === 'demo1234') {
      setOwner(mockOwner)
      localStorage.setItem('wamio_owner', JSON.stringify(mockOwner))
      return true
    }
    return false
  }

  const logout = () => {
    setOwner(null)
    localStorage.removeItem('wamio_owner')
  }

  const updateOwner = (data: Partial<Owner>) => {
    if (!owner) return
    const updated = { ...owner, ...data }
    setOwner(updated)
    localStorage.setItem('wamio_owner', JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider value={{ owner, login, logout, updateOwner, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
