import { configureChains, createClient, WagmiConfig } from 'wagmi'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider as RainbowKitP, darkTheme } from '@rainbow-me/rainbowkit'
import { ETH_CHAINS } from 'utils/config'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { ReactNode } from 'react'

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
