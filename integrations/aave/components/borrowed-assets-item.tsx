import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useErc20Symbol } from '@/lib/generated/blockchain'

import { limitDecimals } from '../utils'

interface IBorrowedAssetsItemProps {
  address: `0x${string}`
  debt: number
}

const getSymbol = (symbol: string | undefined) => (symbol === 'WETH' ? 'ETH' : symbol)

export const BorrowedAssetsItem = ({ address, debt }: IBorrowedAssetsItemProps) => {
  const symbol = getSymbol(useErc20Symbol({ address }).data)

  return (
    <tr>
      <td className="mt-2 flex items-center justify-center px-4 py-2">
        <Image
          alt={symbol?.toString() ?? ''}
          className="mr-2 rounded-full"
          height={25}
          src={`https://app.aave.com/icons/tokens/${symbol ? symbol.toLowerCase() : ''}.svg`}
          width={25}
        />
        {symbol === 'WETH' ? 'ETH' : symbol}
      </td>
      <td className="px-4 py-2 text-center">{limitDecimals(debt.toString(), 2)}</td>
      <td className="px-4 py-2 text-center">3%</td>
      <td className="px-4 pb-2 text-center">
        <Select value="ethereum">
          <SelectTrigger className="input mt-2 bg-white text-gray-600 placeholder:text-neutral-400 dark:bg-gray-700 dark:text-slate-300 dark:placeholder:text-neutral-400">
            <SelectValue placeholder="Select market" />
          </SelectTrigger>
          <SelectContent className="w-56 bg-white dark:bg-gray-700">
            <SelectItem value="ethereum">
              <div className="flex items-center justify-between">Variable</div>
            </SelectItem>
            <SelectItem value="asdf">
              <div className="flex items-center justify-between">Stable</div>
            </SelectItem>
          </SelectContent>
        </Select>
      </td>
      <td className="px-4 py-2 text-center">
        <Button className="mr-2">Repay</Button>
      </td>
    </tr>
  )
}
