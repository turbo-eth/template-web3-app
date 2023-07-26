import Image from 'next/image'

import { Button } from '@/components/ui/button'

interface IAssetToSupplyItem {
  address: `0x${string}`
  symbol: string
}

export const AssetToBorrowItem = ({ address, symbol }: IAssetToSupplyItem) => {
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
        {symbol === 'WETH' ? 'ETH' : symbol}
      </td>
      <td className="px-4 py-2 text-center">1.0121</td>
      <td className="px-4 py-2 text-center">3%</td>
      <td className="px-4 pb-2 text-center">5%</td>
      <td className="px-4 py-2 text-center">
        <Button className="mr-2">Borrow</Button>
      </td>
    </tr>
  )
}
