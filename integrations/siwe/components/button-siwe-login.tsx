'use client'

import { HTMLAttributes } from 'react'

import { useAccount, useNetwork, useSignMessage } from 'wagmi'

import { siweLogin } from '@/integrations/siwe/actions/siwe-login'
import { useUser } from '@/lib/hooks/use-user'
import { cn } from '@/lib/utils'

interface ButtonSIWELoginProps extends HTMLAttributes<HTMLButtonElement> {
  label?: string
  disabled?: boolean
}
export const ButtonSIWELogin = ({ className, label = 'Sign-In With Ethereum', disabled, children, ...props }: ButtonSIWELoginProps) => {
  const { mutateUser } = useUser()
  const { isLoading, signMessageAsync } = useSignMessage()
  const { address } = useAccount()
  const { chain } = useNetwork()

  const handleCreateMessage = async () => {
    try {
      if (!address || !chain?.id) return
      await siweLogin({ address, chainId: chain?.id, signMessageAsync })
      await mutateUser()
    } catch (error) {
      console.error(error)
    }
  }
  const classes = cn('relative', className)
  const labelClasses = cn({
    'opacity-0': isLoading,
  })

  return (
    <button type="button" disabled={disabled} onClick={handleCreateMessage} className={classes} {...props}>
      {isLoading && <span className="lds-dual-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
      <span className={labelClasses}>{children || label || 'Logout'}</span>
    </button>
  )
}
