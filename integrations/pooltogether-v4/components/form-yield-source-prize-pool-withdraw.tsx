import * as React from 'react'

import * as Form from '@radix-ui/react-form'
import { useErc20Decimals } from '@turbo-eth/erc20-wagmi'
import { BigNumber } from 'ethers'
import { useDebounce } from 'usehooks-ts'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'

import { YIELD_SOURCE_PRIZE_POOL_ABI } from '@/actions/pooltogether-v4/abis/yield-source-prize-pool-abi'
import { useUserBalanceWithdraw } from '@/actions/pooltogether-v4/hooks/use-user-balance-withdraw'
import { useLoadContractFromChainId } from '@/actions/pooltogether-v4/hooks/use-load-contract-from-chain-id'
import { PRIZE_POOL_CONTRACT } from '@/actions/pooltogether-v4/prize-pool-contract-list'

export function FormWithdraw() {
  const { address } = useAccount()
  const userBalance = useUserBalanceWithdraw()
  const prizePoolAddress = useLoadContractFromChainId(PRIZE_POOL_CONTRACT)

  const { data: decimals } = useErc20Decimals({ address: prizePoolAddress })
  const POWER: any = decimals != undefined ? BigNumber.from(10).pow(decimals) : BigNumber.from(10).pow(6)

  const [withdrawAmount, setWithdrawAmount] = React.useState('')
  const debouncedWithdrawAmount = useDebounce(Number(withdrawAmount) * POWER, 500)

  const { config } = usePrepareContractWrite({
    address: prizePoolAddress,
    abi: YIELD_SOURCE_PRIZE_POOL_ABI,
    functionName: 'withdrawFrom',
    args: [address, debouncedWithdrawAmount],
    enabled: Boolean(debouncedWithdrawAmount),
  })
  const { data, write: withdrawToken } = useContractWrite(config)
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  })
  const handleSubmit = (event: any) => {
    event.preventDefault()
    withdrawToken?.()
  }

  const handleChange = (event: any) => {
    const value = event.target.value
    const regex = /^[0-9]*\.?[0-9]*$/
    if (regex.test(value)) {
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
              <a className="ml-10 cursor-pointer hover:underline" onClick={() => setWithdrawAmount(userBalance.toString())}>
                {parseFloat(userBalance.toString()).toFixed(2)} USDC
              </a>
            </Form.Label>
          </div>
          <Form.Control asChild>
            <input
              className="input"
              value={Number(withdrawAmount) < userBalance ? withdrawAmount : userBalance}
              onChange={(e) => handleChange(e)}
              type="text"
              required={true}
            />
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
