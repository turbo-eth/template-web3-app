import { useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'

import { AssetToSupplyItem } from './asset-to-supply-item'
import { useAave } from '../hooks/use-aave'

export const ListAssetsToSupply = () => {
  const { usdData } = useAave()
  const [showZeroBalanceAssets, setShowZeroBalanceAssets] = useState(false)

  return (
    <div className="flex-1 rounded border p-3 dark:border-slate-600">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">Asssets to supply</h2>
      </div>
      <div className="mt-3 flex items-center">
        <Checkbox id="c1" onCheckedChange={() => setShowZeroBalanceAssets(!showZeroBalanceAssets)} />
        <label className="ml-3 text-sm" htmlFor="c1">
          Show assets with 0 balance
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="mt-7 w-full table-auto border-collapse text-left">
          <thead>
            <tr>
              <th className="px-4 py-2 text-center text-xs text-slate-500 dark:text-slate-300">Asset</th>
              <th className="px-4 py-2 text-center text-xs text-slate-500 dark:text-slate-300">Wallet balance</th>
              <th className="px-4 py-2 text-center text-xs text-slate-500 dark:text-slate-300">APY</th>
              <th className="px-4 py-2 text-center text-xs text-slate-500 dark:text-slate-300">Can be collateral</th>
            </tr>
          </thead>
          <tbody>
            {usdData?.map((reserve, index) => {
              return (
                <AssetToSupplyItem
                  key={index}
                  address={reserve.underlyingAsset}
                  canBeCollateral={reserve.reserveData.usageAsCollateralEnabled && reserve.reserveData.debtCeiling === BigInt(0)}
                  liquidityRate={Number(reserve.reserveData.liquidityRate) / 10 ** 25}
                  showIfZeroBalance={showZeroBalanceAssets}
                  symbol={reserve.reserveData.symbol}
                  tokenPriceInUsd={reserve.tokenPriceInUsd}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
