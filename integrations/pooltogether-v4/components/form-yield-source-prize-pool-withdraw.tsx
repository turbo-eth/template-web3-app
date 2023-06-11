import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useErc20Decimals } from '@turbo-eth/erc20-wagmi'
import { BigNumber } from 'ethers'
import { useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'
import { useAccount, useWaitForTransaction } from 'wagmi'
import { z } from 'zod'

import { useLoadContractFromChainId } from '@/actions/pooltogether-v4/hooks/use-load-contract-from-chain-id'
import { useUserBalanceWithdraw } from '@/actions/pooltogether-v4/hooks/use-user-balance-withdraw'
import { usePoolTogetherPrizePoolWithdrawFrom } from '@/actions/pooltogether-v4/pooltogether-v4-wagmi'
import { PRIZE_POOL_CONTRACT } from '@/actions/pooltogether-v4/utils/prize-pool-contract-list'
import { TICKET_CONTRACT } from '@/actions/pooltogether-v4/utils/ticket-contract-list'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { withDrawControls } from '../utils/controls'
import { getComponent } from '../utils/get-element-component'

const poolWithSchema = z.object({
  withdraw: z.string().min(1).max(100),
})

export function PoolTogetherFormWithdraw() {
  const form = useForm<z.infer<typeof poolWithSchema>>({
    resolver: zodResolver(poolWithSchema),
    defaultValues: {
      withdraw: '',
    },
  })

  const { register, watch } = form

  const onSubmit = (values: any) => {
    withdrawToken?.()
  }

  const withdrawVal = watch('withdraw')

  useEffect(() => {
    const value = withdrawVal != '' ? parseFloat(Number(withdrawVal).toFixed(decimals)) : undefined
    setWithdrawAmount(value)
  }, [withdrawVal])

  const { address } = useAccount()
  const userBalance = useUserBalanceWithdraw()
  const prizePoolAddress = useLoadContractFromChainId(PRIZE_POOL_CONTRACT)
  const ticketAddress = useLoadContractFromChainId(TICKET_CONTRACT)

  const { data: decimals } = useErc20Decimals({ address: ticketAddress })
  const POWER = decimals != undefined ? BigNumber.from(10).pow(decimals) : BigNumber.from(10).pow(6)

  const [withdrawAmount, setWithdrawAmount] = useState<number>()
  const debouncedWithdrawAmount = useDebounce(
    withdrawAmount != undefined ? BigNumber.from(withdrawAmount * POWER.toNumber()) : BigNumber.from(0),
    500
  )

  const { data, write: withdrawToken } = usePoolTogetherPrizePoolWithdrawFrom({
    mode: 'recklesslyUnprepared',
    address: prizePoolAddress,
    args: [address || '0x0', debouncedWithdrawAmount],
    overrides: {
      gasLimit: BigNumber.from(750000),
    },
  })

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  })

  const handleChange = (val: any) => {
    const value = val != '' ? parseFloat(Number(val).toFixed(decimals)) : undefined
    setWithdrawAmount(value)
  }

  return (
    <>
      <div className="card w-full">
        <span className="cursor-pointer hover:underline" onClick={() => setWithdrawAmount(userBalance)}>
          Balance: {parseFloat(userBalance.toString()).toFixed(2)} USDC
        </span>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 space-y-8">
            {withDrawControls.map((item) => {
              const Item = getComponent(item?.component)

              return (
                <FormField
                  key={item?.label}
                  control={form.control}
                  name={item?.formfieldName as 'withdraw'}
                  render={({ field }) => (
                    <>
                      {' '}
                      <FormItem>
                        <FormLabel>{item?.label}</FormLabel>
                        <FormControl>
                          <>
                            <Item
                              placeholder={item?.placeholder}
                              {...field}
                              {...register(item?.formfieldName as 'withdraw')}
                              min={0}
                              max={userBalance}
                              type="number"
                              value={withdrawAmount != undefined && withdrawAmount > userBalance ? userBalance : withdrawAmount}
                            />
                          </>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
              )
            })}

            <Button
              disabled={prizePoolAddress == undefined && (!withdrawToken || isLoading)}
              className={
                prizePoolAddress == undefined || debouncedWithdrawAmount.eq(0)
                  ? 'btn btn-sm w-full cursor-not-allowed opacity-50'
                  : 'btn btn-sm w-full'
              }>
              {prizePoolAddress == undefined ? 'Please switch network' : isLoading ? 'Processing...' : 'Withdraw'}
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
