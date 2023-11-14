'use client'

import { ReactNode } from 'react'

import { PrivyProvider } from '@privy-io/react-auth'
import { PrivyWagmiConnector } from '@privy-io/wagmi-connector'

import { configureChainsConfig } from '@/config/networks'
import { env } from '@/env.mjs'

export function Privy({ children }: { children: ReactNode }) {
  return (
    <PrivyProvider
      appId={env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      config={{
        embeddedWallets: {
          createOnLogin: 'all-users',
          requireUserPasswordOnCreate: false,
        },
        loginMethods: ['wallet', 'email', 'google', 'discord', 'github'],
      }}>
      <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>{children}</PrivyWagmiConnector>
    </PrivyProvider>
  )
}
