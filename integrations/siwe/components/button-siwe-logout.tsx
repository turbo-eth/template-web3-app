'use client'

import { ReactNode } from 'react'

import classNames from 'clsx'

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
    mutateUser()
  }

  const classes = classNames('ButtonSIWELogout', className)
  return (
    <button onClick={handleLogout} className={classes}>
      {children || label}
    </button>
  )
}
