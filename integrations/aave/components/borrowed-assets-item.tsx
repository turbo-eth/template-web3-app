import { useState } from 'react'

import Image from 'next/image'
import { TiArrowRight } from 'react-icons/ti'
import { formatUnits } from 'viem'
import { useAccount } from 'wagmi'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useErc20BalanceOf, useErc20Decimals, useErc20Symbol } from '@/lib/generated/blockchain'

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

  const symbol = getSymbol(useErc20Symbol({ address }).data)
  const { data: tokenBalance } = useErc20BalanceOf({ address, args: user ? [user] : undefined })
  const { data: decimals } = useErc20Decimals({ address })

  const [repayAmount, setRepayAmount] = useState('')

  const { healthFactor } = useAave()

  const calcNewHealthFactor = () => {
    return 3
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
      <td className="px-4 py-2 text-center">{limitDecimals(debt.toString(), 2)}</td>
      <td className="px-4 py-2 text-center">{variableBorrowRate.toFixed(2)}%</td>
      <td className="px-4 pb-2 text-center">
        <Select value="variable">
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
                        /* if (Number(value) > maxBorrowableInUsd / tokenPriceInUsd) setRepayAmount((maxBorrowableInUsd / tokenPriceInUsd).toFixed(2)) */
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
                  <span>Wallet balance: {formatUnits(tokenBalance ?? BigInt(1), decimals ?? 18)}</span>
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
                      <span className="font-bold">{healthFactor}</span> {symbol}
                    </span>
                  </div>
                </div>
              </div>
              <div className="input dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <span>Health factor</span>
                  <div className="flex items-center justify-between">
                    <span className={healthFactor >= 3 ? 'text-green-500' : 'text-orange-500'}>{healthFactor}</span>
                    {Number(repayAmount) > 0 && (
                      <>
                        <TiArrowRight />
                        <span className={calcNewHealthFactor() >= 3 ? 'text-green-500' : 'text-orange-500'}>{calcNewHealthFactor()}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button className="btn btn-primary mt-5 w-full" disabled={!Number(repayAmount)}>
                Repay {symbol}
              </button>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  )
}
