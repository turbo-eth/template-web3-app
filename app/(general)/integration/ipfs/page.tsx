import { Ipfs } from '@/integrations/ipfs'

export default function PageIntegration() {
  return (
    <section className="w-full lg:mt-10">
      <div className="container mx-auto mt-10 max-w-screen-xl gap-6 text-center">
        <Ipfs />
      </div>
    </section>
  )
}
