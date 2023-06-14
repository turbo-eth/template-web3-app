'use client'

import { HTMLAttributes } from 'react'

import { siweLogout } from '@/integrations/siwe/actions/siwe-logout'
import { useUser } from '@/lib/hooks/use-user'

interface ButtonSIWELogoutProps extends HTMLAttributes<HTMLButtonElement> {
  label?: string
}

export const ButtonSIWELogout = ({ className, label = 'Logout', children, ...props }: ButtonSIWELogoutProps) => {
  const { mutateUser } = useUser()
  const handleLogout = async () => {
    await siweLogout()
    await mutateUser()
  }

  return (
    <button onClick={handleLogout} className={className} {...props}>
      {children || label}
    </button>
  )
}
