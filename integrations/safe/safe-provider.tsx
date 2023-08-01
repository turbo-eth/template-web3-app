import { ReactNode, createContext, useEffect, useState } from 'react'

import { SafeFactory } from '@safe-global/protocol-kit'

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
        .then(({ service, factory }: { service: object; factory: SafeFactory }) => setSafeClient({ service, factory }))
        .catch((error) => console.error({ error }))
    }
  }, [safeOwner])

  // safeClient?.service.getServiceInfo().then((info) => console.log(info))

  return <SafeContext.Provider value={{ safeClient }}>{children}</SafeContext.Provider>
}
