import Image from 'next/image'

import { Button } from '@/components/ui/button'

export const ListAssetsToBorrow = () => {
  return (
    <div className="flex-1 rounded border p-3 dark:border-slate-600">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">Asssets to borrow</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="mt-7 w-full table-auto border-collapse text-left">
          <thead>
            <tr>
              <th className="px-4 py-2 text-xs text-slate-500 dark:text-slate-300">Asset</th>
              <th className="px-4 py-2 text-xs text-slate-500 dark:text-slate-300">Available</th>
              <th className="px-4 py-2 text-xs text-slate-500 dark:text-slate-300">APY, variable</th>
              <th className="px-4 py-2 text-xs text-slate-500 dark:text-slate-300">APY, stable</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="mt-2 flex items-center px-4 py-2">
                <Image alt="Ethereum" className="mr-2 rounded-full" height={25} src="/integrations/connext/logos/chains/ethereum.png" width={25} />
                ETH
              </td>
              <td className="px-4 py-2">1.0121</td>
              <td className="px-4 py-2">3%</td>
              <td className="px-4 pb-2">5%</td>
              <td className="px-4 py-2">
                <Button className="mr-2">Borrow</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
