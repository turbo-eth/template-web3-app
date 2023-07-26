import { AssetToBorrowItem } from './asset-to-borrow-item'
import { useAave } from '../hooks/use-aave'

export const ListAssetsToBorrow = () => {
  const { reservesData } = useAave()

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
            {reservesData?.[0].map((reserve, index) => {
              if (reserve.borrowingEnabled) {
                return <AssetToBorrowItem key={index} address={reserve.underlyingAsset} symbol={reserve.symbol} />
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
