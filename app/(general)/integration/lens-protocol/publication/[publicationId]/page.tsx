'use client'

import { LensConfig, LensProvider, PublicationId, production } from '@lens-protocol/react-web'
import { bindings as wagmiBindings } from '@lens-protocol/wagmi'
import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import { injectedWallet, metaMaskWallet, rainbowWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets'
import { configureChains, createConfig } from 'wagmi'
import { polygonMumbai, polygon } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import PublicationSection from '@/integrations/lens-protocol/components/PublicationSection'

interface Params {
  publicationId: PublicationId
}

interface PublicationPageProps {
  params: Params
}

const { publicClient, chains } = configureChains([polygonMumbai, polygon], [publicProvider()])
const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains, shimDisconnect: true }),
      metaMaskWallet({ chains, shimDisconnect: true }),
      rainbowWallet({ chains }),
      // coinbaseWallet({ appName: APP_NAME, chains }),
      walletConnectWallet({ chains }),
    ],
  },
])
const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors,
})

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: production,
}
export default function PublicationPage({ params: { publicationId } }: PublicationPageProps) {
  return (
    <LensProvider config={lensConfig}>
      <PublicationSection publicationId={publicationId} />
    </LensProvider>
  )
}
