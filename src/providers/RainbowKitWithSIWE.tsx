import '@rainbow-me/rainbowkit/styles.css'
import { ReactNode, useState } from 'react'

import {
  AuthenticationStatus,
  RainbowKitAuthenticationProvider,
  RainbowKitProvider as RainbowKitProv,
  createAuthenticationAdapter,
  darkTheme,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit'
import { SiweMessage } from 'siwe'
import { WagmiConfig, configureChains, createClient } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'

import { ETH_CHAINS } from '@/utils/config'

interface Props {
  children: ReactNode
}

export function RainbowKitWithSIWE(props: Props) {
  const [status, setStatus] = useState<AuthenticationStatus>('unauthenticated')
  const { chains, provider } = configureChains(ETH_CHAINS, [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    }),
  ])

  const { connectors } = getDefaultWallets({
    appName: 'District Labs',
    chains,
  })

  const wagmiClient = createClient({
    autoConnect: false,
    connectors,
    provider,
  })

  // Custom District API Authentication
  const authenticationAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      const response = await fetch('/api/account/nonce')
      return await response.text()
    },

    createMessage: ({ nonce, address, chainId }) => {
      return new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum | TurboETH',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
      })
    },

    getMessageBody: ({ message }) => {
      return message.prepareMessage()
    },

    verify: async ({ message, signature }) => {
      const verifyRes = await fetch('/api/account/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, signature }),
      })
      if (verifyRes.status === 200) {
        dispatchEvent(new Event('verified'))
      }

      return Boolean(verifyRes.status === 200)
    },

    signOut: async () => {
      localStorage.removeItem('user')
    },
  })

  if (typeof window !== 'undefined') {
    window.addEventListener('verified', () => {
      setStatus('unauthenticated')
      setStatus('authenticated')
    })
  }

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitAuthenticationProvider adapter={authenticationAdapter} status={status}>
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
      </RainbowKitAuthenticationProvider>
    </WagmiConfig>
  )
}
