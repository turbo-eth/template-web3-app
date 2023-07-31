import { SuppliedAssetsItem } from './supplied-assets-item'
import { useAave } from '../hooks/use-aave'

export const ListSuppliedAssets = () => {
  const { usdData, balanceInUsd, collateralInUsd } = useAave()

  const filteredUserReserves = usdData?.filter((reserve) => reserve.scaledATokenBalance !== BigInt(0))

  return (
    <div className="flex-1 justify-between rounded border p-3 dark:border-slate-600">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">Your Supplies</h2>
      </div>
      {filteredUserReserves && filteredUserReserves.length > 0 ? (
        <>
          <div className="flex items-center">
            <div className="mr-2 rounded border bg-white py-2 px-4 dark:border-slate-600 dark:bg-gray-800">
              <h3 className="text-xs font-bold">
                <span className="text-slate-500 dark:text-slate-300"> Balance $ </span>
                {balanceInUsd.toFixed(2)}
              </h3>
            </div>
            <div className="mr-2 rounded border bg-white py-2 px-4 dark:border-slate-600 dark:bg-gray-800">
              <h3 className="text-xs font-bold">
                <span className="text-slate-500 dark:text-slate-300">APY</span> 2.5 <span className="text-slate-500 dark:text-slate-300">%</span>
              </h3>
            </div>
            <div className="mr-2 rounded border bg-white py-2 px-4 dark:border-slate-600 dark:bg-gray-800">
              <h3 className="text-xs font-bold">
                <span className="text-slate-500 dark:text-slate-300"> Collateral $ </span>
                {collateralInUsd.toFixed(2)}
              </h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="mt-7 w-full table-auto border-collapse text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-center text-xs text-slate-500 dark:text-slate-300">Asset</th>
                  <th className="px-4 py-2 text-center text-xs text-slate-500 dark:text-slate-300">Balance</th>
                  <th className="px-4 py-2 text-center text-xs text-slate-500 dark:text-slate-300">APY</th>
                  <th className="px-4 py-2 text-center text-xs text-slate-500 dark:text-slate-300">Collateral</th>
                </tr>
              </thead>
              <tbody>
                {usdData
                  ?.filter((reserve) => reserve.scaledATokenBalance !== BigInt(0))
                  .map((reserve, index) => {
                    return (
                      <SuppliedAssetsItem
                        key={index}
                        address={reserve.underlyingAsset}
                        balance={((Number(reserve.scaledATokenBalance) / 10 ** 18) * Number(reserve.reserveData.liquidityIndex)) / 10 ** 27}
                        collateralEnabled={reserve.usageAsCollateralEnabledOnUser}
                        liquidityRate={Number(reserve.reserveData.liquidityRate) / 10 ** 25}
                      />
                    )
                  })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="text-sm text-slate-500 dark:text-slate-300">Nothing supplied yet</p>
      )}
    </div>
  )
}
