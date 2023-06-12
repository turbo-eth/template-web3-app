import { WalletConnect } from '@/components/blockchain/wallet-connect'

export default function PageIntegration() {
  return (
    <section className="w-full lg:mt-10">
      <div className="container mx-auto mt-10  max-w-screen-xl gap-6 text-center">
        <WalletConnect className="inline-block" />
      </div>
    </section>
  )
}
