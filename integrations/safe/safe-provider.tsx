import { ReactNode, createContext, useEffect, useState, useMemo } from 'react'

import SafeApiKit from '@safe-global/api-kit'
import { EthersAdapter, SafeFactory } from '@safe-global/protocol-kit'

import { useEthersSigner } from '@/lib/hooks/web3/use-ethers-signer'

import { getSafeClient } from './safe-client'
import { Client } from './safe-client'
// import { SafeAppProvider } from '@safe-global/safe-apps-provider';
import SafeProvider from '@safe-global/safe-apps-react-sdk';
import { ethers } from 'ethers'


export const SafeContext = createContext<Client | unknown>(null)

export function SafeAppProvider({ children }: { children: ReactNode }) {
  const ethers = useEthersSigner()

  return <SafeProvider>{children}</SafeProvider>
}

