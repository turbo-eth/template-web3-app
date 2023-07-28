import Image from 'next/image'
import { TiTick } from 'react-icons/ti'
import { useAccount } from 'wagmi'

import { Button } from '@/components/ui/button'
import { useErc20BalanceOf, useErc20Decimals } from '@/lib/generated/blockchain'

interface IAssetToSupplyItem {
  address: `0x${string}`
  symbol: string
  canBeCollateral: boolean
}

export const AssetToSupplyItem = ({ address, symbol, canBeCollateral }: IAssetToSupplyItem) => {
  const { address: user } = useAccount()

  const { data: tokenBalance } = useErc20BalanceOf({ address, args: user ? [user] : undefined })
  const { data: decimals } = useErc20Decimals({ address })

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
      {tokenBalance === BigInt(0) ? (
        <td className="px-4 py-2 text-center text-slate-400">0</td>
      ) : (
        <td className="px-4 py-2 text-center">{(Number(tokenBalance) / 10 ** (decimals ?? 18)).toFixed(2)}</td>
      )}

      <td className="px-4 py-2 text-center">3%</td>
      <td className="flex justify-center px-4 pb-2 text-center">{canBeCollateral ? <TiTick color="green" size={30} /> : <p>—</p>}</td>
      <td className="px-4 py-2 text-center">
        <Button className="mr-2 bg-slate-400 dark:bg-slate-200" disabled={tokenBalance === BigInt(0)}>
          Supply
        </Button>
      </td>
    </tr>
  )
}
