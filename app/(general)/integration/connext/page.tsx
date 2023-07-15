'use client'
import { useState } from 'react'

import { FormConnextXTransfer } from '@/integrations/connext/components/form-connext-xtransfer'
import { LatestTransfers } from '@/integrations/connext/components/latest-transfers'

export default function ConnextHome() {
  const [isMainnet, setIsMainnet] = useState(false)

  return (
    <section className="w-full lg:mt-10">
      <div className="my-4 grid grid-cols-1 items-start gap-4 sm:my-0 lg:grid-cols-8 xl:my-4">
        <div className="hidden xl:col-span-2 xl:block"></div>
        <div className="3xl:mt-16 col-span-1 lg:col-span-5 xl:col-span-4">
          <FormConnextXTransfer isMainnet={isMainnet} setIsMainnet={setIsMainnet} />
        </div>
        <div className="3xl:mt-8 col-span-1 lg:col-span-3 xl:col-span-2">
          <LatestTransfers key={isMainnet ? 'mainnet' : 'testnet'} isMainnet={isMainnet} />
        </div>
      </div>
    </section>
  )
}
