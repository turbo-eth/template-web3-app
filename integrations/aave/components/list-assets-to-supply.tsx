"use client"

import { useState } from "react"

import { Checkbox } from "@/components/ui/checkbox"

import { useAave } from "../hooks/use-aave"
import { AssetToSupplyItem } from "./asset-to-supply-item"

export const ListAssetsToSupply = () => {
  const { usdData } = useAave()
  const [showZeroBalanceAssets, setShowZeroBalanceAssets] = useState(false)

  return (
    <div className="flex w-full flex-col rounded border p-3">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">Asssets to supply</h2>
      </div>
      <div className="mt-3 flex items-center">
        <Checkbox
          id="c1"
          onCheckedChange={() =>
            setShowZeroBalanceAssets(!showZeroBalanceAssets)
          }
        />
        <label className="ml-3 text-sm" htmlFor="c1">
          Show assets with 0 balance
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="mt-7 w-full table-auto border-collapse text-left">
          <thead>
            <tr>
              <th className="px-4 py-2 text-center text-xs text-muted-foreground">
                Asset
              </th>
              <th className="px-4 py-2 text-center text-xs text-muted-foreground">
                Wallet balance
              </th>
              <th className="px-4 py-2 text-center text-xs text-muted-foreground">
                APY
              </th>
              <th className="px-4 py-2 text-center text-xs text-muted-foreground">
                Can be collateral
              </th>
            </tr>
          </thead>
          <tbody>
            {usdData?.map((reserve, index) => {
              return (
                <AssetToSupplyItem
                  key={index}
                  address={reserve.underlyingAsset}
                  canBeCollateral={
                    reserve.reserveData.usageAsCollateralEnabled &&
                    reserve.reserveData.debtCeiling === BigInt(0)
                  }
                  liquidityRate={
                    Number(reserve.reserveData.liquidityRate) / 10 ** 25
                  }
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
