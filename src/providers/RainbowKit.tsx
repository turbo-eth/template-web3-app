import '@rainbow-me/rainbowkit/styles.css'
import { ReactNode } from 'react'

import { RainbowKitProvider as RainbowKitProv, darkTheme, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { WagmiConfig, configureChains, createClient } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { ETH_CHAINS } from 'utils/config'

interface Props {
  children: ReactNode
}

export function RainbowKitProvider(props: Props) {
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

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProv
        chains={chains}
        theme={darkTheme({
          accentColor: '#218242',
          accentColorForeground: 'white',
          borderRadius: 'large',
          fontStack: 'system',
          overlayBlur: 'large',
        })}>
        {props.children}
      </RainbowKitProv>
    </WagmiConfig>
  )
}
