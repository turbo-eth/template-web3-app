'use client'

import { useSearchParams } from 'next/navigation'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { FormLitDecryptMessage } from '@/integrations/lit-protocol/components/form-lit-decrypt-message'

export default function PageIntegration() {
  const searchParams = useSearchParams()

  const id = searchParams.get('id') || ''

  return (
    <section className="w-full lg:mt-10">
      <div className="container w-full max-w-screen-lg">
        <BranchIsWalletConnected>
          <FormLitDecryptMessage initialEencryptedMessageId={id} />
          <div className="flex-center flex">
            <WalletConnect />
          </div>
        </BranchIsWalletConnected>
      </div>
    </section>
  )
}
