// import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { FormSendSafeTransaction } from '@/integrations/safe/components/form-send-safe-transaction'
import { ManageSafe } from '@/integrations/safe/components/manage-safe'
import { PendingSafeTransactions } from '@/integrations/safe/components/pending-safe-transactions'
import { ConnectSafe } from '@/integrations/safe/hooks/useConnectSafe'

export default function PageIntegration() {
  return (
    <section className="w-full lg:mt-10">
      <div className="container mx-auto mt-10  max-w-screen-xl gap-6 text-start">
        {/* <WalletConnect className="inline-block" /> */}
        <ConnectSafe>
          <ManageSafe />
          <FormSendSafeTransaction />
          <PendingSafeTransactions />
          {/* <TxnsHistory /> */}
        </ConnectSafe>
      </div>
    </section>
  )
}
