// import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { FormConnectSafe } from '@/integrations/safe/components/form-connect-safe'

export default function PageIntegration() {
  // use safe hook
  return (
    <section className="w-full lg:mt-10">
      <div className="container mx-auto mt-10  max-w-screen-xl gap-6 text-start">
        {/* <WalletConnect className="inline-block" /> */}
        <FormConnectSafe />
      </div>
    </section>
  )
}
