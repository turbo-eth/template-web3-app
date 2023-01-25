'use client'
import '@rainbow-me/rainbowkit/styles.css'
import { ReactNode } from 'react'

import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import { coinbaseWallet, injectedWallet, metaMaskWallet, rainbowWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets'
import { WagmiConfig, configureChains, createClient } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

import { ETH_CHAINS_PROD, ETH_CHAINS_TEST } from '@/config/constants'

interface Props {
  children: ReactNode
  autoConnect?: boolean
}

const CHAINS = process.env.NODE_ENV === 'production' ? ETH_CHAINS_PROD : ETH_CHAINS_TEST
const { chains, provider } = configureChains(CHAINS, [
  alchemyProvider({
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
  }),
  jsonRpcProvider({
    rpc: () => ({
      chainId: [11155111],
      http: 'https://sepolia.infura.io/v3/',
    }),
  }),
  jsonRpcProvider({
    rpc: () => ({
      chainId: [31337],
      http: 'http://127.0.0.1:8545/',
    }),
  }),
])

const appName = 'TurboETH'

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains }),
      rainbowWallet({ chains }),
      coinbaseWallet({ chains, appName }),
      walletConnectWallet({ chains }),
    ],
  },
])

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export function RainbowKit(props: Props) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: '#218242',
          accentColorForeground: 'white',
          borderRadius: 'large',
          fontStack: 'system',
          overlayBlur: 'large',
        })}>
        {props.children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
