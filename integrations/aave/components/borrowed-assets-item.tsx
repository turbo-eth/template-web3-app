import { useState } from 'react'

import Image from 'next/image'
import { TiArrowRight } from 'react-icons/ti'
import { formatUnits, parseUnits } from 'viem'
import { useAccount } from 'wagmi'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useErc20Allowance, useErc20Approve, useErc20BalanceOf, useErc20Decimals, useErc20Symbol } from '@/lib/generated/blockchain'

import { usePoolRepay } from '../generated/aave-wagmi'
import { useAave } from '../hooks/use-aave'
import { limitDecimals } from '../utils'

interface IBorrowedAssetsItemProps {
  address: `0x${string}`
  debt: number
  variableBorrowRate: number
}

const getSymbol = (symbol: string | undefined) => (symbol === 'WETH' ? 'ETH' : symbol)

export const BorrowedAssetsItem = ({ address, debt, variableBorrowRate }: IBorrowedAssetsItemProps) => {
  const { address: user } = useAccount()
  const { poolAddress } = useAave()
  const [repayAmount, setRepayAmount] = useState('')

  const symbol = getSymbol(useErc20Symbol({ address }).data)
  const { data: tokenBalance } = useErc20BalanceOf({ address, args: user ? [user] : undefined, watch: true })
  const { data: decimals } = useErc20Decimals({ address })
  const allowance = useErc20Allowance({ address, args: user ? [user, poolAddress] : undefined, watch: true }).data
  const { write: approveWrite } = useErc20Approve({
    address,
    args: [poolAddress, parseUnits(`${Number(repayAmount)}`, decimals ?? 18)],
  })
  // eslint-disable-next-line
  const { write: repayWrite } = usePoolRepay({
    address: poolAddress,
    args: [address, parseUnits(`${Number(repayAmount)}`, decimals ?? 18), BigInt(2), user as `0x${string}`],
  })

  const buttonAction = () => {
    if (Number(formatUnits(allowance ?? BigInt(1), decimals ?? 18)) < Number(repayAmount)) {
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
          src={`https://app.aave.com/icons/tokens/${symbol ? symbol.toLowerCase() : ''}.svg`}
          width={25}
        />
        {symbol === 'WETH' ? 'ETH' : symbol}
      </td>
      <td className="px-4 py-2 text-center">{limitDecimals(debt.toString(), 5)}</td>
      <td className="px-4 py-2 text-center">{variableBorrowRate.toFixed(2)}%</td>
      <td className="px-4 pb-2 text-center">
        <Select disabled value="variable">
          <SelectTrigger className="input mt-2 bg-white text-gray-600 placeholder:text-neutral-400 dark:bg-gray-700 dark:text-slate-300 dark:placeholder:text-neutral-400">
            <SelectValue placeholder="Select market" />
          </SelectTrigger>
          <SelectContent className="w-56 bg-white dark:bg-gray-700">
            <SelectItem value="variable">
              <div className="flex items-center justify-between">Variable</div>
            </SelectItem>
            <SelectItem value="stable">
              <div className="flex items-center justify-between">Stable</div>
            </SelectItem>
          </SelectContent>
        </Select>
      </td>
      <td className="px-4 py-2 text-center">
        <Dialog>
          <DialogTrigger>
            <Button className="mr-2">Repay</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Repay {symbol}</DialogTitle>
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
                    value={repayAmount}
                    onChange={(e) => {
                      const regex = /^[0-9.,\b]+$/
                      let value = e.target.value
                      if (value === '' || regex.test(value)) {
                        if (value.startsWith('.') || value.startsWith(',')) {
                          value = `0${value}`
                        }
                        value = value.replace(',', '.')
                        setRepayAmount(value)
                        console.log(Number(value))
                        console.log(formatUnits(tokenBalance ?? BigInt(1), decimals ?? 18))
                        if (Number(value) > Number(formatUnits(tokenBalance ?? BigInt(1), decimals ?? 18)))
                          setRepayAmount(formatUnits(tokenBalance ?? BigInt(1), decimals ?? 18))
                      }
                    }}
                  />
                  <div className="flex items-center justify-between">
                    <Image
                      alt={symbol?.toString() ?? ''}
                      className="mr-2 rounded-full"
                      height={25}
                      src={`https://app.aave.com/icons/tokens/${symbol ? symbol.toLowerCase() : ''}.svg`}
                      width={25}
                    />
                    <span className="font-bold">{symbol}</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div></div>
                  <span>Wallet balance: {limitDecimals(formatUnits(tokenBalance ?? BigInt(1), decimals ?? 18), 5)}</span>
                </div>
              </div>
              <div className="mt-5 mb-2">
                <label>Transaction overview</label>
              </div>
              <div className="input dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <span>Remaining debt</span>
                  <div className="flex items-center justify-between">
                    <span>
                      <span className="font-bold">{debt.toFixed(5)}</span> {symbol}
                    </span>
                    {Number(repayAmount) > 0 && (
                      <>
                        <TiArrowRight />
                        <span>
                          <span className="font-bold">{(debt - Number(repayAmount)).toFixed(5)}</span> {symbol}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button className="btn btn-primary mt-5 w-full" disabled={!Number(repayAmount)} onClick={buttonAction}>
                {Number(formatUnits(allowance ?? BigInt(1), decimals ?? 18)) < Number(repayAmount)
                  ? `Approve ${symbol ?? ''}`
                  : `Repay ${symbol ?? ''}`}
              </button>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  )
}
