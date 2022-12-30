import '@rainbow-me/rainbowkit/styles.css'

import { ReactNode } from 'react'

import { RainbowKitProvider as RainbowKitP, darkTheme, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { WagmiConfig, configureChains, createClient } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'

import { ETH_CHAINS } from 'utils/config'

interface Props {
  children: ReactNode
}

const { chains, provider } = configureChains(ETH_CHAINS, [
  alchemyProvider({
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
  }),
])
const { connectors } = getDefaultWallets({
  appName: 'Disco District',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export function RainbowKitProvider(props: Props) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitP
        chains={chains}
        theme={darkTheme({
          accentColor: '#A293FF',
          accentColorForeground: 'white',
          borderRadius: 'small',
          fontStack: 'system',
        })}>
        {props.children}
      </RainbowKitP>
    </WagmiConfig>
  )
}
