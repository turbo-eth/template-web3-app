'use client'

import { ReactElement } from 'react'

import { useAccount } from 'wagmi'

interface BranchIsWalletConnectedProps {
  children?: ReactElement | Array<ReactElement>
}

export function BranchIsWalletConnected({ children }: BranchIsWalletConnectedProps) {
  const { address } = useAccount()

  if (!children) return null

  if (address && children && !Array.isArray(children)) return children
  if (address && Array.isArray(children)) return children[0] ?? null
  if (!address && Array.isArray(children)) return children[1] ?? null

  return null
}
