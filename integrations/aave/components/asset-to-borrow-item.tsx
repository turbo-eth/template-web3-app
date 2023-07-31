import { useState } from 'react'

import Image from 'next/image'
import { TiArrowRight } from 'react-icons/ti'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { useAave } from '../hooks/use-aave'

interface IAssetToSupplyItem {
  symbol: string
  tokenPriceInUsd: number
  variableBorrowRate: number
  stableBorrowRate?: number
}

export const AssetToBorrowItem = ({ symbol, tokenPriceInUsd, variableBorrowRate, stableBorrowRate }: IAssetToSupplyItem) => {
  const { maxBorrowableInUsd, healthFactor } = useAave()
  const [borrowAmount, setBorrowAmount] = useState('')

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
          src={`https://app.aave.com/icons/tokens/${symbol.toLowerCase()}.svg`}
          width={25}
        />
        {symbol}
      </td>
      <td className={`px-4 py-2 text-center ${maxBorrowableInUsd === 0 ? 'text-slate-400' : ''}`}>
        {maxBorrowableInUsd > 0 ? (maxBorrowableInUsd / tokenPriceInUsd).toFixed(2) : '0'}
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
                        if (Number(value) > maxBorrowableInUsd / tokenPriceInUsd) setBorrowAmount((maxBorrowableInUsd / tokenPriceInUsd).toFixed(2))
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
                  <span>Available: {(maxBorrowableInUsd / tokenPriceInUsd).toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-5 mb-2">
                <label>Transaction overview</label>
              </div>
              <div className="input dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <span>Health factor</span>
                  <div className="flex items-center justify-between">
                    <span className={healthFactor >= 3 ? 'text-green-500' : 'text-orange-500'}>{healthFactor}</span>
                    {Number(borrowAmount) > 0 && (
                      <>
                        <TiArrowRight />
                        <span className={calcNewHealthFactor() >= 3 ? 'text-green-500' : 'text-orange-500'}>{calcNewHealthFactor()}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button className="btn btn-primary mt-5 w-full" disabled={!Number(borrowAmount)}>
                Borrow {symbol}
              </button>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  )
}
