'use client'

import { ReactNode } from 'react'

import { useAccount } from 'wagmi'

interface IsWalletConnectedProps {
  children: ReactNode
}

export const IsWalletConnected = ({ children }: IsWalletConnectedProps) => {
  const { address } = useAccount()

  if (address) return <>{children}</>

  return null
}
