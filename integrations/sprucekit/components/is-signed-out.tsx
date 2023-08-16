'use client'

import { ReactNode } from 'react'

import { useUser } from '@/lib/hooks/use-user'

interface IsSignedOutProps {
  children: ReactNode
}

export const IsSignedOut = ({ children }: IsSignedOutProps) => {
  const { user } = useUser()

  if (!user?.isLoggedIn) return <>{children}</>

  return null
}
