import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import * as Form from '@radix-ui/react-form'
import { ExternalLinkIcon } from 'lucide-react'
import { useDebounce } from 'usehooks-ts'
import { parseUnits } from 'viem'
import { useAccount, useWaitForTransaction } from 'wagmi'

import { useLoadContractFromChainId } from '@/actions/pooltogether-v4/hooks/use-load-contract-from-chain-id'
import { useUsdcApproval } from '@/actions/pooltogether-v4/hooks/use-usdc-approval'
import { useUserBalanceDeposit } from '@/actions/pooltogether-v4/hooks/use-user-balance-deposit'
import { usePoolTogetherPrizePoolDepositToAndDelegate } from '@/integrations/pooltogether-v4/generated/pooltogether-v4-wagmi'
import { PRIZE_POOL_CONTRACT } from '@/actions/pooltogether-v4/utils/prize-pool-contract-list'
import { USDC_CONTRACT } from '@/actions/pooltogether-v4/utils/usdc-contract-list'
import { Checkbox } from '@/components/ui/checkbox'
import { useErc20Approve, useErc20Decimals } from '@/lib/generated/blockchain'

export function PoolTogetherFormDeposit() {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [approvalAmount, setApprovalAmount] = useState<bigint>(BigInt(0))
  const [submitDeposit, setSubmitDeposit] = useState<boolean>(false)
  const [isValidAmount, setValidAmount] = useState<boolean>(true)

  const { address } = useAccount()
  const prizePoolAddress = useLoadContractFromChainId(PRIZE_POOL_CONTRACT)
  const usdcAddress = useLoadContractFromChainId(USDC_CONTRACT)

  const { data: decimals } = useErc20Decimals({ address: usdcAddress })
  const POWER = decimals ?? 6

  const userBalance = useUserBalanceDeposit()
  const isApproved = useUsdcApproval(userBalance)

  const [depositAmount, setDepositAmount] = useState<number>()
  const debouncedDepositAmount = useDebounce(depositAmount ? parseUnits(`${depositAmount}`, POWER) : BigInt(0), 500)

  const {
    data,
    write: depositToken,
    isSuccess: successDeposit,
  } = usePoolTogetherPrizePoolDepositToAndDelegate({
    address: prizePoolAddress,
    args: [address || '0x0', debouncedDepositAmount, address || '0x0'],
  })

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  })

  const { data: approveData, write: approval } = useErc20Approve({
    address: usdcAddress,
    args: [prizePoolAddress, approvalAmount],
  })

  const { isLoading: loadApprove, isSuccess: successApprove } = useWaitForTransaction({
    hash: approveData?.hash,
  })

  useEffect(() => {
    isChecked ? setApprovalAmount(BigInt(2 ** 255 - 1)) : setApprovalAmount(debouncedDepositAmount)
  }, [isChecked])

  useEffect(() => {
    if (successApprove || submitDeposit) {
      depositToken?.()
      setSubmitDeposit(false)
    }
  }, [successApprove, submitDeposit])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (depositAmount && depositAmount >= 2.0) {
      if (!isApproved) {
        approval?.()
      } else {
        setSubmitDeposit(true)
      }
    } else {
      setValidAmount(false)
    }
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value != '' ? parseFloat(event.target.valueAsNumber.toFixed(decimals)) : undefined
    setDepositAmount(value)
    setApprovalAmount(value != undefined ? parseUnits(`${value}`, POWER) : BigInt(0))
  }

  const handleAmount = () => {
    setDepositAmount(userBalance)
    setApprovalAmount(parseUnits(`${userBalance}`, POWER))
  }

  return (
    <div className="flex-col">
      <Form.Root onSubmit={handleSubmit}>
        <Form.Field name="amountDeposit">
          <div className="flex justify-between align-baseline">
            <Form.Label className="mb-2 font-semibold">Amount</Form.Label>
            <Form.Label className="mb-2">
              <span className="ml-10 cursor-pointer hover:underline" onClick={() => handleAmount()}>
                {parseFloat(userBalance.toString()).toFixed(2)} USDC
              </span>
            </Form.Label>
          </div>
          <Form.Control asChild>
            <input
              className="input"
              onChange={handleChange}
              value={depositAmount != undefined && depositAmount > userBalance ? userBalance : depositAmount}
              type="number"
              min={0}
              max={userBalance}
              step={'any'}
              required={true}
            />
          </Form.Control>
        </Form.Field>
        {!isValidAmount && (
          <div className="relative mt-2 rounded border border-red-400 bg-red-100 py-1 text-center text-red-700" role="alert">
            <strong className="font-semibold">Min. 2 USDC</strong>
          </div>
        )}
        {!isApproved && (
          <div className="mt-4 flex justify-center space-x-2">
            <Checkbox onClick={() => setIsChecked(!isChecked)} />
            <span className="font-semibold">Infinite Approval</span>
          </div>
        )}
        <div className="mt-4 flex justify-center space-x-5">
          <Form.Submit asChild>
            <button
              disabled={prizePoolAddress == undefined && (isLoading || !debouncedDepositAmount)}
              className={
                !debouncedDepositAmount || !prizePoolAddress ? 'btn btn-emerald btn-sm cursor-not-allowed opacity-50' : 'btn btn-emerald btn-sm'
              }>
              {!prizePoolAddress
                ? 'Please switch network'
                : isApproved
                ? isLoading
                  ? 'Processing...'
                  : 'Deposit'
                : loadApprove
                ? 'Processing...'
                : 'Approve and Deposit'}
            </button>
          </Form.Submit>
        </div>
      </Form.Root>
      {successDeposit && (
        <div className="mt-4 space-x-2 rounded border p-3 text-center text-xs font-semibold">
          Manage your account on&nbsp; <br />
          <a target={'_blank'} href="https://app.pooltogether.com/" className="flex items-center text-xl">
            <span className="text-gradient-pooltogether">PoolTogether</span>
            <ExternalLinkIcon size="16" className="text-gradient-pooltogether-link ml-1" />
          </a>
        </div>
      )}
    </div>
  )
}
