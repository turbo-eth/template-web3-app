'use client'

import * as React from 'react'

import classNames from 'clsx'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'

import { siweLogin } from '@/integrations/siwe/actions/siwe-login'
import { useUser } from '@/lib/hooks/use-user'

interface ButtonSIWELoginProps {
  className?: string
  label?: string
  children?: React.ReactNode
  styled?: boolean
  disabled?: boolean
}
export const ButtonSIWELogin = ({ className, label = 'Sign-In With Ethereum', disabled, children }: ButtonSIWELoginProps) => {
  const { mutateUser } = useUser()
  const { isLoading, signMessageAsync } = useSignMessage()
  const { address } = useAccount()
  const { chain } = useNetwork()

  const handleCreateMessage = async () => {
    try {
      await siweLogin({ address, chainId: chain?.id, signMessageAsync })
      mutateUser()
    } catch (error) {
      console.error(error)
    }
  }
  const classes = classNames('ButtonSIWELogin', 'relative', className)
  const labelClasses = classNames('ButtonSIWELogin__label', {
    'opacity-0': isLoading,
  })

  return (
    <button type="button" disabled={disabled} onClick={handleCreateMessage} className={classes}>
      {isLoading && <span className="lds-dual-ring light absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
      <span className={labelClasses}>{children || label || 'Logout'}</span>
    </button>
  )
}
