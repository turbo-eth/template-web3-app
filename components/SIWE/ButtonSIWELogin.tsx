import * as React from 'react'

import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'

import { siweLogin } from '@/lib/actions/siweLogin'

interface ButtonSIWELoginProps {
  className?: string
  label?: string
  children?: React.ReactNode
}
export const ButtonSIWELogin = ({ className, label, children }: ButtonSIWELoginProps) => {
  const { isLoading, signMessageAsync } = useSignMessage()
  const { address } = useAccount()
  const { chain } = useNetwork()
  const router = useRouter()

  const handleCreateMessage = async () => {
    try {
      await siweLogin({ address, chain, signMessageAsync })
      router.reload()
    } catch (error) {
      console.error(error)
    }
  }
  const classes = classNames(className, 'ButtonSIWELogin', 'relative')
  const labelClasses = classNames('font-bold', 'shadow-black', 'drop-shadow-lg', {
    'opacity-0': isLoading,
  })

  return (
    <button onClick={handleCreateMessage} className={classes}>
      {isLoading && <span className="lds-dual-ring light absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
      <span className={labelClasses}>{children || label || 'Logout'}</span>
    </button>
  )
}

ButtonSIWELogin.defaultProps = {
  className: '',
  label: 'Login',
}

export default ButtonSIWELogin
