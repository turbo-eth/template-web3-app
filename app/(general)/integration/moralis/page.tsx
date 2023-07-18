'use client'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { useGetTransaction } from '@/integrations/moralis/hooks/transaction/use-get-transaction'

export default function PageIntegration() {
  const { data } = useGetTransaction({
    chain: '0x1',
    transactionHash: '0xdc85cb1b75fd09c2f6d001fea4aba83764193cbd7881a1fa8ccde350a5681109',
  })

  return (
    <section className="w-full lg:mt-10">
      <div className="container mx-auto mt-10  max-w-screen-xl gap-6">
        <IsWalletConnected>
          {data && (
            <pre>
              <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
          )}
        </IsWalletConnected>
        <IsWalletDisconnected>
          <WalletConnect className="inline-block" />
        </IsWalletDisconnected>
      </div>
    </section>
  )
}
