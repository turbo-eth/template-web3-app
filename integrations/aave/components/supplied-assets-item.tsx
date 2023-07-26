import Image from 'next/image'
import { formatUnits } from 'viem'
import { useAccount, useNetwork } from 'wagmi'

import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useErc20BalanceOf, useErc20Decimals, useErc20Symbol } from '@/lib/generated/blockchain'

import { limitDecimals } from '../utils'

interface ISuppliedAssetsItemProps {
  address: `0x${string}`
  balance: bigint
  collateralEnabled: boolean
}

const getSymbol = (symbol: string | undefined) => (symbol === 'WETH' ? 'ETH' : symbol)

export const SuppliedAssetsItem = ({ address, balance, collateralEnabled }: ISuppliedAssetsItemProps) => {
  const { chain } = useNetwork()
  const { address: user } = useAccount()

  const { data: tokenBalance } = useErc20BalanceOf({ address, args: user ? [user] : undefined })
  const symbol = getSymbol(useErc20Symbol({ address }).data)
  const { data: decimals } = useErc20Decimals({ address })

  return (
    <tr>
      <td className="mt-2 flex items-center px-4 py-2">
        <Image
          alt={symbol?.toString() ?? ''}
          className="mr-2 rounded-full"
          height={25}
          src={`https://app.aave.com/icons/tokens/${symbol ? symbol.toLowerCase() : ''}.svg`}
          width={25}
        />
        {symbol === 'WETH' ? 'ETH' : symbol}
      </td>
      <td className="px-4 py-2">{limitDecimals(formatUnits(balance, decimals ?? 18).toString(), 2)}</td>
      <td className="px-4 py-2">3%</td>
      <td className="px-4 py-2">
        <Switch checked={collateralEnabled} color="green" />
      </td>
      <td className="px-4 py-2">
        <Button className="mr-2">Withdraw</Button>
      </td>
    </tr>
  )
}
