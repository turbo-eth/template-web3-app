import { parseUnits } from "viem"

import { useAave } from "../hooks/use-aave"
import { SuppliedAssetsItem } from "./supplied-assets-item"

export const ListSuppliedAssets = () => {
  const { usdData, balanceInUsd, collateralInUsd, averageSupplyApy } = useAave()

  const filteredUserReserves = usdData?.filter((reserve) => {
    // If balance > 0.00001
    const exponent = Number(reserve.reserveData.decimals - BigInt(5))
    return exponent >= 0
      ? reserve.scaledATokenBalance > BigInt(1) * parseUnits("10", exponent)
      : reserve.scaledATokenBalance > BigInt(1) / parseUnits("10", -exponent)
  })

  return (
    <div className="flex-1 justify-between rounded border p-3 dark:border-slate-600">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">Your Supplies</h2>
      </div>
      {filteredUserReserves && filteredUserReserves.length > 0 ? (
        <>
          <div className="flex items-center">
            <div className="mr-2 rounded border bg-white px-4 py-2 dark:border-slate-600 dark:bg-gray-800">
              <h3 className="text-xs font-bold">
                <span className="text-slate-500 dark:text-slate-300">
                  {" "}
                  Balance ${" "}
                </span>
                {balanceInUsd.toFixed(2)}
              </h3>
            </div>
            <div className="mr-2 rounded border bg-white px-4 py-2 dark:border-slate-600 dark:bg-gray-800">
              <h3 className="text-xs font-bold">
                <span className="text-slate-500 dark:text-slate-300">APY</span>{" "}
                {averageSupplyApy.toFixed(2)}{" "}
                <span className="text-slate-500 dark:text-slate-300">%</span>
              </h3>
            </div>
            <div className="mr-2 rounded border bg-white px-4 py-2 dark:border-slate-600 dark:bg-gray-800">
              <h3 className="text-xs font-bold">
                <span className="text-slate-500 dark:text-slate-300">
                  {" "}
                  Collateral ${" "}
                </span>
                {collateralInUsd.toFixed(2)}
              </h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="mt-7 w-full table-auto border-collapse text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-center text-xs text-slate-500 dark:text-slate-300">
                    Asset
                  </th>
                  <th className="px-4 py-2 text-center text-xs text-slate-500 dark:text-slate-300">
                    Balance
                  </th>
                  <th className="px-4 py-2 text-center text-xs text-slate-500 dark:text-slate-300">
                    APY
                  </th>
                  <th className="px-4 py-2 text-center text-xs text-slate-500 dark:text-slate-300">
                    Collateral
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUserReserves.map((reserve, index) => {
                  return (
                    <SuppliedAssetsItem
                      key={index}
                      address={reserve.underlyingAsset}
                      canBeCollateral={
                        reserve.reserveData.usageAsCollateralEnabled
                      }
                      liquidityRate={
                        Number(reserve.reserveData.liquidityRate) / 10 ** 25
                      }
                      balance={
                        ((Number(reserve.scaledATokenBalance) /
                          10 ** (Number(reserve.reserveData.decimals) ?? 18)) *
                          Number(reserve.reserveData.liquidityIndex)) /
                        10 ** 27
                      }
                      collateralEnabled={
                        reserve.usageAsCollateralEnabledOnUser &&
                        reserve.reserveData.usageAsCollateralEnabled &&
                        reserve.reserveData.debtCeiling === BigInt(0)
                      }
                    />
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="text-sm text-slate-500 dark:text-slate-300">
          Nothing supplied yet
        </p>
      )}
    </div>
  )
}
