'use client'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { FormLitEncryptMessage } from '@/integrations/lit-protocol/components/form-lit-encrypt-message'

export default function PageIntegration() {
  return (
    <section className="w-full lg:mt-10">
      <div className="container w-full max-w-screen-lg">
        <BranchIsWalletConnected>
          <FormLitEncryptMessage />
          <div className="flex-center flex">
            <WalletConnect />
          </div>
        </BranchIsWalletConnected>
      </div>
    </section>
  )
}
