import * as React from 'react'

import * as Form from '@radix-ui/react-form'
import { useDebounce } from 'usehooks-ts'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'

import { YIELD_SOURCE_PRIZE_POOL_ABI } from '@/actions/pooltogether-v4/abis/yield-source-prize-pool-abi'
import { GetUserBalanceDeposit } from '@/actions/pooltogether-v4/hooks/use-get-user-balance-deposit'
import { useLoadContractFromChainId } from '@/actions/pooltogether-v4/hooks/use-load-contract-from-chain-id'
import { PRIZE_POOL_CONTRACT } from '@/actions/pooltogether-v4/prize-pool-contract-list'

interface Props {
  className?: string
}

export function FormDeposit() {
  //  const classes = classNames(props.className, 'Header', 'px-6 lg:px-10 py-3 flex items-center w-full')
  const [depositAmount, setDepositAmount] = React.useState(0)
  const debouncedDepositAmount = useDebounce(depositAmount * 1000000, 500)
  const userBalance = GetUserBalanceDeposit()

  const { address } = useAccount()
  const prizePoolAddress = useLoadContractFromChainId(PRIZE_POOL_CONTRACT)

  const { config } = usePrepareContractWrite({
    address: prizePoolAddress,
    abi: YIELD_SOURCE_PRIZE_POOL_ABI,
    functionName: 'depositTo',
    args: [address, debouncedDepositAmount],
    enabled: Boolean(debouncedDepositAmount),
  })

  const { data, write: depositToken } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const handleSubmit = (event: any) => {
    event.preventDefault() // prevent the form from submitting and reloading the page
    depositToken?.()
  }

  const handleChange = (event: any) => {
    if (isNaN(event.target.valueAsNumber)) {
      setDepositAmount(0)
    } else {
      const value = Math.max(0, Math.min(userBalance, Number(event.target.valueAsNumber)))
      setDepositAmount(value)
    }
  }

  return (
    <>
      <Form.Root className="FormRoot" onSubmit={handleSubmit}>
        <Form.Field className="FormField" name="amountDeposit">
          <div className="flex justify-between align-baseline">
            <Form.Label className="FormLabel mb-2">Amount </Form.Label>
            <Form.Label className="FormLabel mb-2">
              <a className="ml-10 cursor-pointer hover:underline" onClick={() => setDepositAmount(userBalance)}>
                {userBalance}
              </a>
            </Form.Label>
          </div>
          <Form.Control asChild>
            <input className="input" value={depositAmount} onChange={(e) => handleChange(e)} type="number" required min="0" max={userBalance} step="any" />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <div className="mt-4 flex justify-center">
            <button disabled={!depositToken || isLoading} className="btn btn-emerald btn-sm">
              {isLoading ? 'Processing...' : 'Deposit'}
            </button>
          </div>
        </Form.Submit>
      </Form.Root>
    </>
  )
}
