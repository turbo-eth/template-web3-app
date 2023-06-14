import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { FormLitEncryptMessage } from '@/integrations/lit-protocol/components/form-lit-encrypt-message'

export default function PageIntegration() {
  return (
    <section className="w-full lg:mt-10">
      <div className="container w-full max-w-screen-lg">
        <IsWalletConnected>
          <FormLitEncryptMessage />
        </IsWalletConnected>
        <IsWalletDisconnected>
          <div className="flex-center flex">
            <WalletConnect />
          </div>
        </IsWalletDisconnected>
      </div>
    </section>
  )
}
