"use client";

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@prisma/client'
import { getOrCreateUser } from './db_actions/Auth'

// Define a type for the user object

interface UserContextValue {
  user: any
  userData: any
  setUser: (user: any) => void
  setUserData: (user: any) => void
}

const UserContext = createContext<UserContextValue | null>(null)

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}

interface UserProviderProps {
  children: React.ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getOrCreateUser()
      setUser(fetchedUser)
    }

    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}