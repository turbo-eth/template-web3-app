'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { ModalProvider } from 'react-modal-hook'
import { Provider as RWBProvider } from 'react-wrap-balancer'
import { SWRConfig } from 'swr'

import { RainbowKit } from '@/components/providers/RainbowKit'
import HandleWalletEvents from '@/components/web3/HandleWalletEvents'
import { useIsMounted } from '@/hooks/use-is-mounted'
import fetchJson from '@/lib/fetchJson'

const queryClient = new QueryClient()
interface RootProviderProps {
  children: React.ReactNode
}

export default function RootProvider({ children }: RootProviderProps) {
  const isMounted = useIsMounted()
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err)
        },
      }}>
      {isMounted && (
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <RWBProvider>
              <ModalProvider>
                <RainbowKit>
                  <HandleWalletEvents>{children}</HandleWalletEvents>
                </RainbowKit>
              </ModalProvider>
            </RWBProvider>
          </QueryClientProvider>
        </ThemeProvider>
      )}
    </SWRConfig>
  )
}
