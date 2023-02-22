'use client'

import * as React from 'react'

import classNames from 'clsx'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'

import useUser from '@/hooks/app/use-user'
import { siweLogin } from '@/lib/actions/siwe/siweLogin'
import { cn } from '@/lib/utils/cn'

interface ButtonSIWELoginProps {
  className?: string
  label?: string
  children?: React.ReactNode
  styled?: boolean
  disabled?: boolean
}
export const ButtonSIWELogin = ({ className, label = 'Login', disabled, children, styled }: ButtonSIWELoginProps) => {
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
  const labelClasses = classNames('font-bold', 'shadow-black', 'drop-shadow-lg', {
    'opacity-0': isLoading,
  })

  return (
    <button disabled={disabled} onClick={handleCreateMessage} className={cn('ButtonSIWELogin relative', { styled: styled }, className)}>
      {isLoading && <span className="lds-dual-ring light absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
      <span className={labelClasses}>{children || label || 'Logout'}</span>
    </button>
  )
}

export default ButtonSIWELogin
