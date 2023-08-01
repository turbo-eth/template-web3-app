import { useState } from 'react'

import Image from 'next/image'
import { TiTick } from 'react-icons/ti'
import { formatUnits, parseUnits } from 'viem'
import { useAccount } from 'wagmi'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useErc20Allowance, useErc20Approve, useErc20BalanceOf, useErc20Decimals } from '@/lib/generated/blockchain'

import { usePoolSupply } from '../generated/aave-wagmi'
import { useAave } from '../hooks/use-aave'

interface IAssetToSupplyItem {
  address: `0x${string}`
  symbol: string
  canBeCollateral: boolean
  tokenPriceInUsd: number
  liquidityRate: number
}

export const AssetToSupplyItem = ({ address, symbol, canBeCollateral, liquidityRate }: IAssetToSupplyItem) => {
  const { poolAddress } = useAave()
  const { address: user } = useAccount()
  const [supplyAmount, setSupplyAmount] = useState('')

  const { data: tokenBalance } = useErc20BalanceOf({ address, args: user ? [user] : undefined, watch: true })
  const { data: decimals } = useErc20Decimals({ address })
  const allowance = useErc20Allowance({ address, args: user ? [user, poolAddress] : undefined, watch: true }).data
  const { write: approveWrite } = useErc20Approve({
    address,
    args: [poolAddress, parseUnits(`${Number(supplyAmount)}`, decimals ?? 18)],
  })
  // eslint-disable-next-line
  const { write: repayWrite } = usePoolSupply({
    address: poolAddress,
    args: [address, parseUnits(`${Number(supplyAmount)}`, decimals ?? 18), user as `0x${string}`, 0],
  })

  const buttonAction = () => {
    if (Number(formatUnits(allowance ?? BigInt(1), decimals ?? 18)) < Number(supplyAmount)) {
      approveWrite()
    } else {
      // eslint-disable-next-line
      repayWrite()
    }
  }

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
        <td className="px-4 py-2 text-center">{Number(formatUnits(tokenBalance ?? BigInt(1), decimals ?? 18)).toFixed(5)}</td>
      )}

      <td className="px-4 py-2 text-center">{liquidityRate !== 0 ? `${liquidityRate.toFixed(2)}%` : '0'}</td>
      <td className="flex justify-center px-4 pb-2 text-center">{canBeCollateral ? <TiTick color="green" size={30} /> : <p>—</p>}</td>
      <td className="px-4 py-2 text-center">
        <Dialog>
          <DialogTrigger disabled={tokenBalance === BigInt(0)}>
            <Button className="mr-2" disabled={tokenBalance === BigInt(0)}>
              Supply
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Supply {symbol}</DialogTitle>
            <DialogDescription>
              <div className="mt-4 mb-2">
                <label>Amount</label>
              </div>
              <div className="input dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <input
                    className="border-none dark:bg-slate-900"
                    placeholder="0.00"
                    type="text"
                    value={supplyAmount}
                    onChange={(e) => {
                      const regex = /^[0-9.,\b]+$/
                      let value = e.target.value
                      if (value === '' || regex.test(value)) {
                        if (value.startsWith('.') || value.startsWith(',')) {
                          value = `0${value}`
                        }
                        value = value.replace(',', '.')
                        setSupplyAmount(value)
                        if (Number(value) > Number(formatUnits(tokenBalance ?? BigInt(1), decimals ?? 18)))
                          setSupplyAmount(Number(formatUnits(tokenBalance ?? BigInt(1), decimals ?? 18)).toString())
                      }
                    }}
                  />
                  <div className="flex items-center justify-between">
                    <Image
                      alt={symbol?.toString() ?? ''}
                      className="mr-2 rounded-full"
                      height={25}
                      src={`https://app.aave.com/icons/tokens/${symbol.toLowerCase()}.svg`}
                      width={25}
                    />
                    <span className="font-bold">{symbol}</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div></div>
                  <span>Available: {Number(formatUnits(tokenBalance ?? BigInt(1), decimals ?? 18)).toFixed(5)}</span>
                </div>
              </div>
              <div className="mt-5 mb-2">
                <label>Transaction overview</label>
              </div>
              <div className="input dark:bg-slate-900">
                <div className="my-3 flex items-center justify-between">
                  <span>Supply APY</span>
                  <span className="font-bold">{liquidityRate !== 0 ? `${liquidityRate.toFixed(2)}` : '0'}%</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span>Collateralization</span>
                  <span className={canBeCollateral ? 'text-green-500' : 'text-red-500'}>{canBeCollateral ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>
              <button className="btn btn-primary mt-5 w-full" disabled={!Number(supplyAmount)} onClick={buttonAction}>
                {Number(formatUnits(allowance ?? BigInt(1), decimals ?? 18)) < Number(supplyAmount)
                  ? `Approve ${symbol ?? ''}`
                  : `Supply ${symbol ?? ''}`}
              </button>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  )
}
