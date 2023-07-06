import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { FormConnextXTransfer } from '@/integrations/connext/components/form-connext-xtransfer'

export default function ConnextHome() {
  return (
    <section className="w-full lg:mt-10">
      <div className="container w-full max-w-screen-lg">
        <FormConnextXTransfer />
      </div>
    </section>
  )
}
