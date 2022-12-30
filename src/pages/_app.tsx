import './app.css'
import type { AppProps } from 'next/app'
import { Layout } from 'components/layout'
import { ChakraProvider } from 'providers/Chakra'
import { useIsMounted } from 'hooks/useIsMounted'
import { RainbowKitProvider } from 'providers/RainbowKit'

export default function App({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted()

  return (
    <ChakraProvider>
      <RainbowKitProvider>
        {isMounted && (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </RainbowKitProvider>
    </ChakraProvider>
  )
}
