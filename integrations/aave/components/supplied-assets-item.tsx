import { useState } from 'react'

import Image from 'next/image'
import { TiArrowRight } from 'react-icons/ti'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { useErc20Symbol } from '@/lib/generated/blockchain'

import { useAave } from '../hooks/use-aave'
import { limitDecimals } from '../utils'

interface ISuppliedAssetsItemProps {
  address: `0x${string}`
  balance: number
  collateralEnabled: boolean
  liquidityRate: number
}

const getSymbol = (symbol: string | undefined) => (symbol === 'WETH' ? 'ETH' : symbol)

export const SuppliedAssetsItem = ({ address, balance, collateralEnabled, liquidityRate }: ISuppliedAssetsItemProps) => {
  const symbol = getSymbol(useErc20Symbol({ address }).data)
  const [withdrawAmount, setWithdrawAmount] = useState('')
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
      <td className="px-4 py-2 text-center">{limitDecimals(balance.toString(), 2)}</td>
      <td className="px-4 py-2 text-center">{liquidityRate !== 0 ? `${liquidityRate.toFixed(2)}%` : '0'}</td>
      <td className="px-4 py-2 text-center">
        <Switch checked={collateralEnabled} className="bg-green-700" />
      </td>
      <td className="px-4 py-2 text-center">
        <Dialog>
          <DialogTrigger>
            <Button className="mr-2">Withdraw</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Withdraw {symbol}</DialogTitle>
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
                    value={withdrawAmount}
                    onChange={(e) => {
                      const regex = /^[0-9.,\b]+$/
                      let value = e.target.value
                      if (value === '' || regex.test(value)) {
                        if (value.startsWith('.') || value.startsWith(',')) {
                          value = `0${value}`
                        }
                        value = value.replace(',', '.')
                        setWithdrawAmount(value)
                        /* if (Number(value) > maxBorrowableInUsd / tokenPriceInUsd) setWithdrawAmount((maxBorrowableInUsd / tokenPriceInUsd).toFixed(2)) */
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
                  <span>Available: 3.15</span>
                </div>
              </div>
              <div className="mt-5 mb-2">
                <label>Transaction overview</label>
              </div>
              <div className="input dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <span>Remaining supply</span>
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
                    {Number(withdrawAmount) > 0 && (
                      <>
                        <TiArrowRight />
                        <span className={calcNewHealthFactor() >= 3 ? 'text-green-500' : 'text-orange-500'}>{calcNewHealthFactor()}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button className="btn btn-primary mt-5 w-full" disabled={!Number(withdrawAmount)}>
                Withdraw {symbol}
              </button>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  )
}
