import { useState } from 'react'

import Image from 'next/image'
import { TiArrowRight } from 'react-icons/ti'
import { formatUnits, parseUnits } from 'viem'
import { useAccount } from 'wagmi'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useErc20Allowance, useErc20Approve, useErc20BalanceOf, useErc20Decimals, useErc20Symbol } from '@/lib/generated/blockchain'

import { usePoolRepay, usePoolRepayWithATokens, usePoolSwapBorrowRateMode } from '../generated/aave-wagmi'
import { useAave } from '../hooks/use-aave'
import { limitDecimals } from '../utils'

interface IBorrowedAssetsItemProps {
  address: `0x${string}`
  aTokenBalance: bigint
  debt: number
  borrowRate: number
  rateMode: bigint
  canSwitchRateMode?: boolean
}

const getSymbol = (symbol: string | undefined) => (symbol === 'WETH' ? 'ETH' : symbol)

export const BorrowedAssetsItem = ({ address, aTokenBalance, debt, borrowRate, canSwitchRateMode, rateMode }: IBorrowedAssetsItemProps) => {
  const { address: user } = useAccount()
  const { poolAddress } = useAave()
  const [repayAmount, setRepayAmount] = useState('')
  const [repayWithATokens, setRepayWithATokens] = useState(false)

  const symbol = getSymbol(useErc20Symbol({ address }).data)
  const { data: tokenBalance } = useErc20BalanceOf({ address, args: user ? [user] : undefined, watch: true })
  const { data: decimals } = useErc20Decimals({ address })
  const allowance = useErc20Allowance({ address, args: user ? [user, poolAddress] : undefined, watch: true }).data
  const { write: approveWrite } = useErc20Approve({
    address,
    args: [poolAddress, parseUnits(`${Number(repayAmount)}`, decimals ?? 18)],
  })

  const { write: repayWrite } = usePoolRepay({
    address: poolAddress,
    args: [address, parseUnits(`${Number(repayAmount)}`, decimals ?? 18), rateMode, user as `0x${string}`],
  })

  const { write: repayWithATokensWrite } = usePoolRepayWithATokens({
    address: poolAddress,
    args: [address, parseUnits(`${Number(repayAmount)}`, decimals ?? 18), rateMode],
  })

  const { write: swapBorrowRateModeWrite } = usePoolSwapBorrowRateMode({
    address: poolAddress,
    args: [address, rateMode],
  })

  const getRepayBalance = () => (repayWithATokens ? aTokenBalance : tokenBalance)

  const buttonAction = () => {
    if (Number(formatUnits(allowance ?? BigInt(1), decimals ?? 18)) < Number(repayAmount)) {
      approveWrite()
    } else {
      if (repayWithATokens) {
        repayWithATokensWrite()
      } else {
        repayWrite()
      }
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
      <td className="px-4 py-2 text-center">{borrowRate.toFixed(2)}%</td>
      <td className="px-4 pb-2 text-center">
        <Select disabled={!canSwitchRateMode} value={rateMode.toString()} onValueChange={() => swapBorrowRateModeWrite()}>
          <SelectTrigger className="input mt-2 bg-white text-gray-600 placeholder:text-neutral-400 dark:bg-gray-700 dark:text-slate-300 dark:placeholder:text-neutral-400">
            <SelectValue placeholder="Select market" />
          </SelectTrigger>
          <SelectContent className="w-56 bg-white dark:bg-gray-700">
            <SelectItem value="2">
              <div className="flex items-center justify-between">Variable</div>
            </SelectItem>
            <SelectItem value="1">
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
                <label>Repay with</label>
              </div>
              <Select value={repayWithATokens ? 'aTokens' : 'walletBalance'} onValueChange={(value) => setRepayWithATokens(value === 'aTokens')}>
                <SelectTrigger className="input mt-2 bg-white text-gray-600 placeholder:text-neutral-400 dark:bg-gray-700 dark:text-slate-300 dark:placeholder:text-neutral-400">
                  <SelectValue placeholder="Select market" />
                </SelectTrigger>
                <SelectContent className="w-56 bg-white dark:bg-gray-700">
                  <SelectItem value="walletBalance">
                    <div className="flex items-center justify-between">Wallet balance</div>
                  </SelectItem>
                  <SelectItem value="aTokens">
                    <div className="flex items-center justify-between">Collateral</div>
                  </SelectItem>
                </SelectContent>
              </Select>
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
                        if (Number(value) > Number(formatUnits(getRepayBalance() ?? BigInt(1), decimals ?? 18)))
                          if (Number(formatUnits(getRepayBalance() ?? BigInt(1), decimals ?? 18)) > debt) {
                            value = debt.toString()
                          } else {
                            value = formatUnits(getRepayBalance() ?? BigInt(1), decimals ?? 18)
                          }

                        setRepayAmount(value)
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
                  <span>
                    {repayWithATokens ? `a${symbol ?? ''} balance` : 'Wallet balance'}:{' '}
                    {limitDecimals(formatUnits(getRepayBalance() ?? BigInt(1), decimals ?? 18), 5)}
                  </span>
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
