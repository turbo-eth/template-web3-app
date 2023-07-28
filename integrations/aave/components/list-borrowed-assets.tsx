import { BorrowedAssetsItem } from './borrowed-assets-item'
import { useAave } from '../hooks/use-aave'

export const ListBorrowedAssets = () => {
  const { userReservesData: userReserves, totalDebtInUsd, reservesData } = useAave()
  return (
    <div className="flex-1 rounded border p-3 dark:border-slate-600">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">Your Borrows</h2>
      </div>
      <div className="flex items-center">
        <div className="mr-2 rounded border bg-white py-2 px-4 dark:border-slate-600 dark:bg-gray-800">
          <h3 className="text-xs font-bold">
            <span className="text-slate-500 dark:text-slate-300"> Debt $ </span>
            {totalDebtInUsd.toFixed(2)}
          </h3>
        </div>
        <div className="mr-2 rounded border bg-white py-2 px-4 dark:border-slate-600 dark:bg-gray-800">
          <h3 className="text-xs font-bold">
            <span className="text-slate-500 dark:text-slate-300">APY</span> 2.5 <span className="text-slate-500 dark:text-slate-300">%</span>
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
              <th className="px-4 py-2 text-center text-xs text-slate-500 dark:text-slate-300">APY Type</th>
            </tr>
          </thead>
          <tbody>
            {userReserves
              ?.filter((userReserve) => userReserve.scaledVariableDebt !== BigInt(0))
              .map((userReserve, index) => {
                const reserve = reservesData?.[0].find((reserve) => reserve.underlyingAsset === userReserve.underlyingAsset)

                return (
                  <BorrowedAssetsItem
                    key={index}
                    address={userReserve.underlyingAsset}
                    debt={((Number(userReserve.scaledVariableDebt) / 10 ** 18) * Number(reserve?.variableBorrowIndex ?? BigInt(1))) / 10 ** 27}
                  />
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
