import '../styles/global.css'
import '../styles/app.css'
import '../styles/components.css'
import { Raleway } from '@next/font/google'
import localFont from '@next/font/local'
import type { AppProps } from 'next/app'
import { ModalProvider } from 'react-modal-hook'
import { Provider as RWBProvider } from 'react-wrap-balancer'
import { SWRConfig } from 'swr'
import { useAccount } from 'wagmi'

import { siweLogout } from '@/actions/siweLogout'
import { Layout } from '@/components/layout'
import { useIsMounted } from '@/hooks/useIsMounted'
import fetchJson from '@/lib/fetchJson'
import { RainbowKit } from '@/providers/RainbowKit'

const sfPro = localFont({
  src: '../styles/SF-Pro-Display-Medium.otf',
  variable: '--font-sf',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '400', '500', '600', '700', '800', '900'],
  variable: '--font-raleway',
})

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
      <style jsx global>
        {`
          :root {
            --sfPro-font: ${sfPro.style.fontFamily};
            --raleway-font: ${raleway.style.fontFamily};
          }
        `}
      </style>
      <SWRConfig
        value={{
          fetcher: fetchJson,
          onError: (err) => {
            console.error(err)
          },
        }}>
        {isMounted && (
          <RWBProvider>
            <ModalProvider>
              <RainbowKit>
                <HandleWalletEvents>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </HandleWalletEvents>
              </RainbowKit>
            </ModalProvider>
          </RWBProvider>
        )}
      </SWRConfig>
    </>
  )
}
