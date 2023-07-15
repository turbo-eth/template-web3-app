'use client'

import { GeneralInfo } from '@/integrations/aave/components/general-info'
import { ListAssetsToBorrow } from '@/integrations/aave/components/list-assets-to-borrow'
import { ListAssetsToSupply } from '@/integrations/aave/components/list-assets-to-supply'
import { ListBorrowedAssets } from '@/integrations/aave/components/list-borrowed-assets'
import { ListSuppliedAssets } from '@/integrations/aave/components/list-supplied-assets'

export default function AaveHome() {
  return (
    <section className="w-full lg:mt-10">
      <div className="mx-auto max-w-screen-xl">
        <GeneralInfo />

        <div className="mb-4 flex justify-between space-x-4 dark:text-white">
          <ListSuppliedAssets />
          <ListBorrowedAssets />
        </div>

        <div className="flex justify-between space-x-4 dark:text-white">
          <ListAssetsToSupply />
          <ListAssetsToBorrow />
        </div>
      </div>
    </section>
  )
}
