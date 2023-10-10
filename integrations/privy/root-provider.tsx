'use client'

import { ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { ModalProvider } from 'react-modal-hook'

import HandleWalletEvents from '@/components/blockchain/handle-wallet-events'
import { Privy } from '@/integrations/privy/provider'
import { useIsMounted } from '@/lib/hooks/use-is-mounted'

const queryClient = new QueryClient()
interface RootProviderProps {
  children: ReactNode
}

export default function RootProvider({ children }: RootProviderProps) {
  const isMounted = useIsMounted()
  return isMounted ? (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <Privy>
            <HandleWalletEvents>{children}</HandleWalletEvents>
          </Privy>
        </ModalProvider>
      </QueryClientProvider>
    </ThemeProvider>
  ) : null
}
