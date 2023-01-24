'use client'

import * as React from 'react'

import classNames from 'clsx'
import { useRouter } from 'next/navigation'

import { siweLogout } from '@/lib/actions/siweLogout'

interface ButtonSIWELogoutProps {
  className?: string
  label?: string
  children?: React.ReactNode
}

export const ButtonSIWELogout = ({ className, label, children }: ButtonSIWELogoutProps) => {
  const router = useRouter()
  const handleLogout = async () => {
    await siweLogout()
    router.reload()
  }

  const classes = classNames('ButtonSIWELogout', className)
  return (
    <button onClick={handleLogout} className={classes}>
      {children || label || 'Logout'}
    </button>
  )
}

ButtonSIWELogout.defaultProps = {
  className: '',
  label: 'Logout',
}

export default ButtonSIWELogout
