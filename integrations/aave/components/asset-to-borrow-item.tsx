import { useState } from 'react'

import Image from 'next/image'
import { parseUnits } from 'viem'
import { useAccount } from 'wagmi'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useErc20Decimals } from '@/lib/generated/blockchain'

import { usePoolBorrow } from '../generated/aave-wagmi'
import { useAave } from '../hooks/use-aave'

interface IAssetToSupplyItem {
  address: `0x${string}`
  symbol: string
  tokenPriceInUsd: number
  variableBorrowRate: number
  stableBorrowRate?: number
}

export const AssetToBorrowItem = ({ address, symbol, tokenPriceInUsd, variableBorrowRate, stableBorrowRate }: IAssetToSupplyItem) => {
  const { maxBorrowableInUsd, poolAddress } = useAave()
  const { address: user } = useAccount()
  const [borrowAmount, setBorrowAmount] = useState('')
  const { data: decimals } = useErc20Decimals({ address })

  // eslint-disable-next-line
  const { write: borrowWrite } = usePoolBorrow({
    address: poolAddress,
    args: [address, parseUnits(`${Number(borrowAmount)}`, decimals ?? 18), BigInt(2), 0, user as `0x${string}`],
  })

  const buttonAction = () => {
    // eslint-disable-next-line
    borrowWrite()
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
      <td className={`px-4 py-2 text-center ${maxBorrowableInUsd === 0 ? 'text-slate-400' : ''}`}>
        {/* Only allowing borrowing 80% of max borrow amount to keep health factor safe */}
        {maxBorrowableInUsd > 0 ? ((maxBorrowableInUsd / tokenPriceInUsd) * 0.8).toFixed(2) : '0'}{' '}
      </td>
      <td className="px-4 py-2 text-center">{variableBorrowRate.toFixed(2)}%</td>
      <td className="px-4 pb-2 text-center">{stableBorrowRate ? `${stableBorrowRate.toFixed(2)}%` : '—'}</td>
      <td className="px-4 py-2 text-center">
        <Dialog>
          <DialogTrigger disabled={maxBorrowableInUsd === 0}>
            <Button className="mr-2" disabled={maxBorrowableInUsd === 0}>
              Borrow
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Borrow {symbol}</DialogTitle>
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
                    value={borrowAmount}
                    onChange={(e) => {
                      const regex = /^[0-9.,\b]+$/
                      let value = e.target.value
                      if (value === '' || regex.test(value)) {
                        if (value.startsWith('.') || value.startsWith(',')) {
                          value = `0${value}`
                        }
                        value = value.replace(',', '.')
                        setBorrowAmount(value)
                        if (Number(value) > (maxBorrowableInUsd / tokenPriceInUsd) * 0.8)
                          setBorrowAmount(((maxBorrowableInUsd / tokenPriceInUsd) * 0.8).toFixed(2))
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
                  <span>Available: {((maxBorrowableInUsd / tokenPriceInUsd) * 0.8).toFixed(2)}</span> {/* Showing 80% to keep health factor "safe" */}
                </div>
              </div>
              <button className="btn btn-primary mt-5 w-full" disabled={!Number(borrowAmount)} onClick={buttonAction}>
                Borrow {symbol}
              </button>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  )
}
