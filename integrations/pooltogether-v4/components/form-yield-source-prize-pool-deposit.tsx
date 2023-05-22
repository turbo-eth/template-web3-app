import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import * as Form from '@radix-ui/react-form'
import { useErc20Approve, useErc20Decimals } from '@turbo-eth/erc20-wagmi'
import { BigNumber, ethers } from 'ethers'
import { useDebounce } from 'usehooks-ts'
import { useAccount, useWaitForTransaction } from 'wagmi'

import { useLoadContractFromChainId } from '@/actions/pooltogether-v4/hooks/use-load-contract-from-chain-id'
import { useUsdcApproval } from '@/actions/pooltogether-v4/hooks/use-usdc-approval'
import { useUserBalanceDeposit } from '@/actions/pooltogether-v4/hooks/use-user-balance-deposit'
import { usePoolTogetherPrizePoolDepositTo } from '@/actions/pooltogether-v4/pooltogether-v4-wagmi'
import { PRIZE_POOL_CONTRACT } from '@/actions/pooltogether-v4/utils/prize-pool-contract-list'
import { USDC_CONTRACT } from '@/actions/pooltogether-v4/utils/usdc-contract-list'
import { Checkbox } from '@/components/ui/checkbox'

export function FormDeposit() {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [approvalAmount, setApprovalAmount] = useState<BigNumber>(BigNumber.from(0))
  const [submitDeposit, setSubmitDeposit] = useState<boolean>(false)
  const [isValidAmount, setValidAmount] = useState<boolean>(true)

  const { address } = useAccount()
  const prizePoolAddress = useLoadContractFromChainId(PRIZE_POOL_CONTRACT)
  const usdcAddress = useLoadContractFromChainId(USDC_CONTRACT)

  const { data: decimals } = useErc20Decimals({ address: usdcAddress })
  const POWER = decimals != undefined ? BigNumber.from(10).pow(decimals) : BigNumber.from(10).pow(6)

  const userBalance = useUserBalanceDeposit()
  const isApproved = useUsdcApproval(userBalance)

  const [depositAmount, setDepositAmount] = useState<number>()
  const debouncedDepositAmount = useDebounce(BigNumber.from(depositAmount != undefined ? depositAmount * POWER.toNumber() : 0), 500)

  const { data, write: depositToken } = usePoolTogetherPrizePoolDepositTo({
    mode: 'recklesslyUnprepared',
    address: prizePoolAddress,
    args: [address || '0x0', BigNumber.from(debouncedDepositAmount)],
    overrides: {
      gasLimit: BigNumber.from(750000),
    },
  })

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  })

  const { data: approveData, write: approval } = useErc20Approve({
    mode: 'recklesslyUnprepared',
    address: usdcAddress,
    args: [prizePoolAddress, approvalAmount],
    overrides: {
      gasLimit: BigNumber.from(750000),
    },
  })

  const { isLoading: loadApprove, isSuccess: successApprove } = useWaitForTransaction({
    hash: approveData?.hash,
  })

  useEffect(() => {
    isChecked ? setApprovalAmount(ethers.constants.MaxInt256) : setApprovalAmount(BigNumber.from(debouncedDepositAmount))
  }, [isChecked])

  useEffect(() => {
    if (successApprove || submitDeposit) {
      depositToken?.()
      setSubmitDeposit(false)
    }
  }, [successApprove, submitDeposit])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (depositAmount != undefined && depositAmount >= 2.0) {
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
    const value = event.target.value != '' ? event.target.valueAsNumber : undefined
    console.log(value)
    setDepositAmount(value)
    setApprovalAmount(value != undefined ? BigNumber.from(value * POWER.toNumber()) : BigNumber.from(0))
  }

  const handleAmount = () => {
    setDepositAmount(userBalance)
    setApprovalAmount(BigNumber.from(userBalance * POWER.toNumber()))
  }

  return (
    <>
      <Form.Root onSubmit={handleSubmit}>
        <Form.Field name="amountDeposit">
          <div className="flex justify-between align-baseline">
            <Form.Label className="FormLabel mb-2">Amount</Form.Label>
            <Form.Label className="FormLabel mb-2">
              <a className="ml-10 cursor-pointer hover:underline" onClick={() => handleAmount()}>
                {parseFloat(userBalance.toString()).toFixed(2)} USDC
              </a>
            </Form.Label>
          </div>
          <Form.Control asChild>
            <input
              className="input"
              onChange={(e) => handleChange(e)}
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
            <strong className="font-bold">Min. 2 USDC</strong>
          </div>
        )}
        {!isApproved && (
          <div className="mt-4 flex justify-center space-x-2">
            <Checkbox onClick={() => setIsChecked(!isChecked)} />
            <span>Infinite Approval</span>
          </div>
        )}
        <div className="mt-4 flex justify-center space-x-5">
          <Form.Submit asChild>
            <button
              disabled={prizePoolAddress == undefined && (isLoading || debouncedDepositAmount.eq(0))}
              className={
                debouncedDepositAmount.eq(0) || prizePoolAddress == undefined
                  ? 'btn btn-emerald btn-sm cursor-not-allowed opacity-50'
                  : 'btn btn-emerald btn-sm'
              }>
              {prizePoolAddress == undefined
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
    </>
  )
}
