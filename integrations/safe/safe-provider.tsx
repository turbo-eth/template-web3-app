import { ReactNode, createContext, useEffect, useState } from 'react'

import SafeApiKit from '@safe-global/api-kit'
import { EthersAdapter, SafeFactory } from '@safe-global/protocol-kit'

import { useEthersSigner } from '@/lib/hooks/web3/use-ethers-signer'

import { getSafeClient } from './safe-client'
import { Client } from './safe-client'

export const SafeContext = createContext<Client | unknown>(null)

export function SafeProvider({ children }: { children: ReactNode }) {
  const safeOwner = useEthersSigner()
  const [safeClient, setSafeClient] = useState<Client>()

  useEffect(() => {
    if (safeOwner != undefined) {
      getSafeClient({ safeOwner })
        .then(({ service, factory, ethAdapter }: { service: SafeApiKit; factory: SafeFactory; ethAdapter: EthersAdapter }) =>
          setSafeClient({ service, factory, ethAdapter })
        )
        .catch((error) => console.error({ error }))
    }
  }, [safeOwner])

  // safeClient?.service.getServiceInfo().then((info) => console.log(info))

  return <SafeContext.Provider value={safeClient}>{children}</SafeContext.Provider>
}
