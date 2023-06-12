'use client'

import { ReactNode } from 'react'

import { useAccount } from 'wagmi'

interface BranchIsWalletConnectedProps {
  children?: ReactNode
}

export function BranchIsWalletConnected({ children }: BranchIsWalletConnectedProps) {
  const { address } = useAccount()

  if (!children) return <></>
  if (address && children && !Array.isArray(children)) return children
  if (address && Array.isArray(children)) return children[0]
  if (!address && Array.isArray(children)) return children[1]
}
