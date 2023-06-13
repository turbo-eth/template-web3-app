'use client'

import { ReactNode } from 'react'

import { siweLogout } from '@/integrations/siwe/actions/siwe-logout'
import { useUser } from '@/lib/hooks/use-user'

interface ButtonSIWELogoutProps {
  className?: string
  label?: string
  children?: ReactNode
}

export const ButtonSIWELogout = ({ className, label = 'Logout', children }: ButtonSIWELogoutProps) => {
  const { mutateUser } = useUser()
  const handleLogout = async () => {
    await siweLogout()
    await mutateUser()
  }

  return (
    <button onClick={handleLogout} className={className}>
      {children || label}
    </button>
  )
}
