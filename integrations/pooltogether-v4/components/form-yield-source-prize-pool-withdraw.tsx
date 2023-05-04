import * as React from 'react'
import { SyntheticEvent } from 'react'

import * as Form from '@radix-ui/react-form'
import { useDebounce } from 'usehooks-ts'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'

import { YIELD_SOURCE_PRIZE_POOL_ABI } from '@/actions/pooltogether-v4/abis/yield-source-prize-pool-abi'
import { GetUserBalanceWithdraw } from '@/actions/pooltogether-v4/hooks/use-get-user-balance-withdraw'
import { useLoadContractFromChainId } from '@/actions/pooltogether-v4/hooks/use-load-contract-from-chain-id'
import { PRIZE_POOL_CONTRACT } from '@/actions/pooltogether-v4/prize-pool-contract-list'

interface Props {
  className?: string
}

export function FormWithdraw() {
  //  const classes = classNames(props.className, 'Header', 'px-6 lg:px-10 py-3 flex items-center w-full')
  const [withdrawAmount, setWithdrawAmount] = React.useState(0)
  const debouncedWithdrawAmount = useDebounce(withdrawAmount * 1000000, 500)
  const userBalance = GetUserBalanceWithdraw()
  const { address } = useAccount()
  const prizePoolAddress = useLoadContractFromChainId(PRIZE_POOL_CONTRACT)

  const { config } = usePrepareContractWrite({
    address: prizePoolAddress,
    abi: YIELD_SOURCE_PRIZE_POOL_ABI,
    functionName: 'withdrawFrom',
    args: [address, debouncedWithdrawAmount],
    enabled: Boolean(debouncedWithdrawAmount),
  })

  const { data, write: withdrawToken } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault() // prevent the form from submitting and reloading the page
    withdrawToken?.()
  }

  const handleChange = (event: any) => {
    if (isNaN(event.target.valueAsNumber)) {
      setWithdrawAmount(0)
    } else {
      const value = Math.max(0, Math.min(userBalance, Number(event.target.valueAsNumber)))
      setWithdrawAmount(value)
    }
  }

  return (
    <>
      <Form.Root className="FormRoot" onSubmit={handleSubmit}>
        <Form.Field className="FormField" name="amountWithdraw">
          <div className="flex justify-between align-baseline">
            <Form.Label className="FormLabel mb-2">Amount </Form.Label>
            <Form.Label className="FormLabel mb-2">
              <a className="ml-10 cursor-pointer hover:underline" onClick={() => setWithdrawAmount(userBalance)}>
                {userBalance}
              </a>
            </Form.Label>
          </div>
          <Form.Control asChild>
            <input className="input" value={withdrawAmount} onChange={(e) => handleChange(e)} type="number" required min="0" max={userBalance} step="any" />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <div className="mt-4 flex justify-center">
            <button disabled={!withdrawToken || isLoading} className="btn btn-emerald btn-sm">
              {isLoading ? 'Processing...' : 'Withdraw'}
            </button>
          </div>
        </Form.Submit>
      </Form.Root>
    </>
  )
}
