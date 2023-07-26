import Image from 'next/image'
import { TiTick } from 'react-icons/ti'
import { useNetwork } from 'wagmi'

import { Button } from '@/components/ui/button'

interface IAssetToSupplyItem {
  address: `0x${string}`
  symbol: string
  canBeCollateral: boolean
}

export const AssetToSupplyItem = ({ address, symbol, canBeCollateral }: IAssetToSupplyItem) => {
  const { chain } = useNetwork()

  return (
    <tr>
      <td className="mt-2 flex items-center px-4 py-2">
        <Image
          alt={symbol?.toString() ?? ''}
          className="mr-2 rounded-full"
          height={25}
          src={`https://app.aave.com/icons/tokens/${symbol.toLowerCase()}.svg`}
          width={25}
        />
        {symbol === 'WETH' ? 'ETH' : symbol}
      </td>
      <td className="px-4 py-2">1.0121</td>
      <td className="px-4 py-2">3%</td>
      <td className="px-4 pb-2">
        <TiTick color="green" size={30} />
      </td>
      <td className="px-4 py-2">
        <Button className="mr-2">Borrow</Button>
      </td>
    </tr>
  )
}
