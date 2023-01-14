import './app.css'
import '../styles/components.css'

import type { AppProps } from 'next/app'
import { ModalProvider } from 'react-modal-hook'
import { SWRConfig } from 'swr'
import { useAccount } from 'wagmi'

import { siweLogout } from '@/actions/siweLogout'
import { useIsMounted } from '@/hooks/useIsMounted'
import { RainbowKit } from '@/providers/RainbowKit'

import { Layout } from '../components/layout'
import fetchJson from '../lib/fetchJson'

const HandleWalletEvents = ({ children }: any): any => {
  useAccount({
    onDisconnect() {
      siweLogout()
    },
  })
  return <>{children}</>
}

export default function App({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted()

  return (
    <>
      <SWRConfig
        value={{
          fetcher: fetchJson,
          onError: (err) => {
            console.error(err)
          },
        }}>
        {isMounted && (
          <ModalProvider>
            <RainbowKit>
              <HandleWalletEvents>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </HandleWalletEvents>
            </RainbowKit>
          </ModalProvider>
        )}
      </SWRConfig>
    </>
  )
}
