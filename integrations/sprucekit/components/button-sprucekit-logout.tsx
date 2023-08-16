'use client'

import { HTMLAttributes } from 'react'

import { useSSX } from '@spruceid/ssx-react'

import { spruceKitLogout } from '@/integrations/sprucekit/actions/sprucekit-logout'
import { useUser } from '@/lib/hooks/use-user'

interface ButtonSpruceKitLogoutProps extends HTMLAttributes<HTMLButtonElement> {
  label?: string
}

export const ButtonSpruceKitLogout = ({ className, label = 'Logout', children, ...props }: ButtonSpruceKitLogoutProps) => {
  const { mutateUser } = useUser()
  const { ssx } = useSSX()
  const handleLogout = async () => {
    try {
      await ssx?.signOut?.()
    } catch (e) {
      await spruceKitLogout()
    }
    await mutateUser()
  }

  return (
    <button className={className} onClick={handleLogout} {...props}>
      {children || label}
    </button>
  )
}
