import { AssetToBorrowItem } from './asset-to-borrow-item'
import { useAave } from '../hooks/use-aave'

export const ListAssetsToBorrow = () => {
  const { usdData } = useAave()

  return (
    <div className="flex-1 rounded border p-3 dark:border-slate-600">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">Asssets to borrow</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="mt-7 w-full table-auto border-collapse text-left">
          <thead>
            <tr>
              <th className="px-4 py-2 text-center text-xs text-slate-500 dark:text-slate-300">Asset</th>
              <th className="px-4 py-2 text-center text-xs text-slate-500 dark:text-slate-300">Available</th>
              <th className="px-4 py-2 text-center text-xs text-slate-500 dark:text-slate-300">APY, variable</th>
              <th className="px-4 py-2 text-center text-xs text-slate-500 dark:text-slate-300">APY, stable</th>
            </tr>
          </thead>
          <tbody>
            {usdData?.map((userReserve, index) => {
              if (userReserve.reserveData.borrowingEnabled) {
                return (
                  <AssetToBorrowItem
                    key={index}
                    address={userReserve.underlyingAsset}
                    canBorrowStableRateMode={userReserve.reserveData.stableBorrowRateEnabled && userReserve.scaledVariableDebt === BigInt(0)}
                    symbol={userReserve.reserveData.symbol}
                    tokenPriceInUsd={userReserve.tokenPriceInUsd}
                    variableBorrowRate={Number(userReserve.reserveData.variableBorrowRate) / 10 ** 25}
                    aTokensBalance={
                      ((Number(userReserve.scaledATokenBalance) / 10 ** Number(userReserve.reserveData.decimals)) *
                        Number(userReserve.reserveData.liquidityIndex)) /
                      10 ** 27
                    }
                    stableBorrowRate={
                      userReserve.reserveData.stableBorrowRateEnabled ? Number(userReserve.reserveData.stableBorrowRate) / 10 ** 25 : 0
                    }
                  />
                )
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
