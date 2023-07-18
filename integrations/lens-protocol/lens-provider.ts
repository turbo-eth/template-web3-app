import { LensConfig, production } from '@lens-protocol/react-web'
import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import { bindings as wagmiBindings } from '@lens-protocol/wagmi'
import { injectedWallet, metaMaskWallet, rainbowWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets'
import { configureChains, createConfig } from 'wagmi'
import { polygonMumbai, polygon } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

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

export const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: production,
}
