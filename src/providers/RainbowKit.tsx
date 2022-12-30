import '@rainbow-me/rainbowkit/styles.css'
import { ReactNode, useEffect, useState } from 'react'

import {
  AuthenticationStatus,
  RainbowKitAuthenticationProvider,
  RainbowKitProvider as RainbowKitP,
  createAuthenticationAdapter,
  darkTheme,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit'
import axios from 'axios'
import { SiweMessage } from 'siwe'
import { WagmiConfig, configureChains, createClient } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'

import { ETH_CHAINS } from 'utils/config'

interface Props {
  children: ReactNode
}

const API_URL = process.env.mode === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_API_URL

export function RainbowKitProvider(props: Props) {
  const [status, setStatus] = useState<AuthenticationStatus>('unauthenticated')
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

  // Custom District API Authentication
  const authenticationAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      const response = await axios.get(`${API_URL}/account/nonce`)
      return await response.data
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
      const verifyRes = await axios.post(`${API_URL}/account/verify`, {
        message: message,
        signature: signature,
      })
      if (verifyRes.status === 200) {
        localStorage.setItem('user', JSON.stringify(verifyRes.data))
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

  useEffect(() => {
    setStatus('loading')
    // @ts-ignore
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {
      setStatus('unauthenticated')
    } else {
      setStatus('authenticated')
    }
  }, [])

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitAuthenticationProvider enabled={false} adapter={authenticationAdapter} status={status}>
        <RainbowKitP
          chains={chains}
          theme={darkTheme({
            accentColor: '#218242',
            accentColorForeground: 'white',
            borderRadius: 'large',
            fontStack: 'system',
            overlayBlur: 'large',
          })}>
          {props.children}
        </RainbowKitP>
      </RainbowKitAuthenticationProvider>
    </WagmiConfig>
  )
}
