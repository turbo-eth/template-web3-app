import Image from 'next/image'

import { Button } from '@/components/ui/button'

import { useAave } from '../hooks/use-aave'

interface IAssetToSupplyItem {
  symbol: string
  tokenPriceInUsd: number
  variableBorrowRate: number
  stableBorrowRate?: number
}

export const AssetToBorrowItem = ({ symbol, tokenPriceInUsd, variableBorrowRate, stableBorrowRate }: IAssetToSupplyItem) => {
  const { maxBorrowableInUsd } = useAave()

  return (
    <tr>
      <td className="mt-2 flex items-center justify-center px-4 py-2">
        <Image
          alt={symbol?.toString() ?? ''}
          className="mr-2 rounded-full"
          height={25}
          src={`https://app.aave.com/icons/tokens/${symbol.toLowerCase()}.svg`}
          width={25}
        />
        {symbol}
      </td>
      <td className="px-4 py-2 text-center">{(maxBorrowableInUsd / tokenPriceInUsd).toFixed(2)}</td>
      <td className="px-4 py-2 text-center">{variableBorrowRate.toFixed(2)}%</td>
      <td className="px-4 pb-2 text-center">{stableBorrowRate ? `${stableBorrowRate.toFixed(2)}%` : '—'}</td>
      <td className="px-4 py-2 text-center">
        <Button className="mr-2">Borrow</Button>
      </td>
    </tr>
  )
}
