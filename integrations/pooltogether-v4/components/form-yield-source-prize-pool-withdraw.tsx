import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
// import * as Form from '@radix-ui/react-form'
import { useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'
import { parseUnits } from 'viem'
import { useAccount, useWaitForTransaction } from 'wagmi'
import { z } from 'zod'

import { useLoadContractFromChainId } from '@/actions/pooltogether-v4/hooks/use-load-contract-from-chain-id'
import { useUserBalanceWithdraw } from '@/actions/pooltogether-v4/hooks/use-user-balance-withdraw'
import { usePoolTogetherPrizePoolWithdrawFrom } from '@/actions/pooltogether-v4/pooltogether-v4-wagmi'
import { PRIZE_POOL_CONTRACT } from '@/actions/pooltogether-v4/utils/prize-pool-contract-list'
import { TICKET_CONTRACT } from '@/actions/pooltogether-v4/utils/ticket-contract-list'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useErc20Decimals } from '@/lib/blockchain'

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
  const POWER = decimals ?? 6

  const [withdrawAmount, setWithdrawAmount] = useState<number>()

  const debouncedWithdrawAmount = useDebounce(withdrawAmount != undefined ? parseUnits(`${withdrawAmount}`, POWER) : BigInt(0), 500)

  const { data, write: withdrawToken } = usePoolTogetherPrizePoolWithdrawFrom({
    address: prizePoolAddress,
    args: [address || '0x0', debouncedWithdrawAmount],
  })

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  })
  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   withdrawToken?.()
  // }

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value != '' ? parseFloat(event.target.valueAsNumber.toFixed(decimals)) : undefined
  //   setWithdrawAmount(value)
  // }

  return (
    <>
      {/* <Form.Root onSubmit={handleSubmit}>
        <Form.Field name="amountWithdraw">
          <div className="flex justify-between align-baseline">
            <Form.Label className="mb-2">Amount </Form.Label>
            <Form.Label className="mb-2">
              <span className="ml-10 cursor-pointer hover:underline" onClick={() => setWithdrawAmount(userBalance)}>
                {parseFloat(userBalance.toString()).toFixed(2)} USDC
              </span>
            </Form.Label>
          </div>
          <Form.Control asChild>
            <input
              className="input"
              value={withdrawAmount != undefined && withdrawAmount > userBalance ? userBalance : withdrawAmount}
              onChange={handleChange}
              type="number"
              min={0}
              max={userBalance}
              step={'any'}
              required={true}
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <div className="mt-4 flex justify-center">
            <button
              disabled={prizePoolAddress == undefined && (!withdrawToken || isLoading)}
              className={
                !prizePoolAddress || !debouncedWithdrawAmount ? 'btn btn-emerald btn-sm cursor-not-allowed opacity-50' : 'btn btn-emerald btn-sm'
              }>
              {prizePoolAddress == undefined ? 'Please switch network' : isLoading ? 'Processing...' : 'Withdraw'}
            </button>
          </div>
        </Form.Submit>
      </Form.Root> */}

      <div className="w-full">
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
                !prizePoolAddress || !debouncedWithdrawAmount
                  ? 'btn btn-emerald btn-sm w-full cursor-not-allowed opacity-50'
                  : 'btn btn-emerald btn-sm w-full'
              }>
              {prizePoolAddress == undefined ? 'Please switch network' : isLoading ? 'Processing...' : 'Withdraw'}
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
