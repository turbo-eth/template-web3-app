'use client'
import React from 'react'

import { useAccount } from 'wagmi'

interface BranchIsWalletConnectedProps {
  children?: React.ReactElement | Array<React.ReactElement>
}

// @ts-ignore
export function BranchIsWalletConnected({ children }: BranchIsWalletConnectedProps): React.ReactElement | null {
  const { address } = useAccount()

  if (!children) return <></>
  if (address && children && !Array.isArray(children)) return children
  if (address && Array.isArray(children)) return children[0]
  if (!address && Array.isArray(children)) return children[1]
}
