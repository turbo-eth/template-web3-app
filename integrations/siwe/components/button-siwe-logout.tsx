'use client'

import * as React from 'react'

import classNames from 'clsx'

import { useUser } from '@/lib/hooks/app/use-user'

import { siweLogout } from '../actions/siwe-logout'

interface ButtonSIWELogoutProps {
  className?: string
  label?: string
  children?: React.ReactNode
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
