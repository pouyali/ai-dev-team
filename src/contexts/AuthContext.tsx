'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { mockUsers } from '@/utils/mockData'
import { User } from '@/types'

export type UserRole = 'volunteer' | 'senior' | 'admin'

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (userId: string) => void
  logout: () => void
  switchRole: (role: UserRole) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  switchRole: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const login = (userId: string) => {
    const found = mockUsers.find(u => u.id === userId)
    if (!found) return
    setUser(found)
    if (found.role === 'volunteer') router.push('/volunteer')
    else if (found.role === 'senior') router.push('/senior')
    else if (found.role === 'admin') router.push('/admin')
  }

  const logout = () => {
    setUser(null)
    router.push('/')
  }

  const switchRole = (role: UserRole) => {
    const found = mockUsers.find(u => u.role === role)
    if (!found) return
    setUser(found)
    if (role === 'volunteer') router.push('/volunteer')
    else if (role === 'senior') router.push('/senior')
    else if (role === 'admin') router.push('/admin')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: user !== null, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  return useContext(AuthContext)
}
