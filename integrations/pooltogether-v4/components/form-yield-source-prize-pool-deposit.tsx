import * as React from 'react'
import { useEffect, useState } from 'react'

import * as Form from '@radix-ui/react-form'
import { BigNumber, ethers } from 'ethers'
import { useDebounce } from 'usehooks-ts'
import { erc20ABI, useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'

import { YIELD_SOURCE_PRIZE_POOL_ABI } from '@/actions/pooltogether-v4/abis/yield-source-prize-pool-abi'

import { GetUserBalanceDeposit } from '@/actions/pooltogether-v4/hooks/get-user-balance-deposit'
import { ManageUsdcApproval } from '@/actions/pooltogether-v4/hooks/manage-usdc-approval'
import { useLoadContractFromChainId } from '@/actions/pooltogether-v4/hooks/use-load-contract-from-chain-id'
import { PRIZE_POOL_CONTRACT } from '@/actions/pooltogether-v4/prize-pool-contract-list'
import { USDC_CONTRACT } from '@/actions/pooltogether-v4/usdc-contract-list'
import { Checkbox } from '@/components/ui/checkbox'

interface Props {
  className?: string
}

export function FormDeposit() {
  //  const classes = classNames(props.className, 'Header', 'px-6 lg:px-10 py-3 flex items-center w-full')
  const [depositAmount, setDepositAmount] = useState('')
  const debouncedDepositAmount = useDebounce(Number(depositAmount) * 1000000, 500)
  const userBalance = GetUserBalanceDeposit()
  const isApproved = ManageUsdcApproval(userBalance)
  const [isChecked, setIsChecked] = useState(false)
  const [approvalAmount, setApprovalAmount] = useState<BigNumber>(BigNumber.from(0))
  const [submitDeposit, setSubmitDeposit] = useState<boolean>(false)

  const { address } = useAccount()
  const prizePoolAddress = useLoadContractFromChainId(PRIZE_POOL_CONTRACT)
  const usdcAddress = useLoadContractFromChainId(USDC_CONTRACT)

  const { config } = usePrepareContractWrite({
    address: prizePoolAddress,
    abi: YIELD_SOURCE_PRIZE_POOL_ABI,
    functionName: 'depositTo',
    args: [address, debouncedDepositAmount],
    enabled: isApproved && Boolean(debouncedDepositAmount),
  })
  const { data, write: depositToken } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })
  const { config: configApproval } = usePrepareContractWrite({
    address: usdcAddress,
    abi: erc20ABI,
    functionName: 'approve',
    args: [prizePoolAddress, approvalAmount],
  })

  const { data: approveData, write: approval } = useContractWrite(configApproval)
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

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    if (!isApproved) {
      approval?.()
    }
    setSubmitDeposit(true)
  }
  const handleChange = (event: any) => {
    const value = event.target.value
    const regex = /^[0-9]*\.?[0-9]*$/
    if (regex.test(value)) {
      setDepositAmount(value)
      setApprovalAmount(BigNumber.from(parseFloat(value) * 1000000))
    }
  }

  const handleAmount = () => {
    setDepositAmount(userBalance.toString())
    setApprovalAmount(BigNumber.from(userBalance * 1000000))
  }

  return (
    <>
      <Form.Root className="FormRoot" onSubmit={handleSubmit}>
        <Form.Field className="FormField" name="amountDeposit">
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
              value={Number(depositAmount) < userBalance ? depositAmount : userBalance}
              onChange={(e) => handleChange(e)}
              type="text"
              required={true}
            />
          </Form.Control>
        </Form.Field>

        {!isApproved && (
          <div className="mt-4 flex justify-center space-x-2">
            <Checkbox onClick={handleCheckboxChange} />
            <span>Infinite Approval</span>
          </div>
        )}
        <div className="mt-4 flex justify-center space-x-5">
          <Form.Submit asChild>
            <button disabled={isLoading || debouncedDepositAmount == 0} className="btn btn-emerald btn-sm">
              {isApproved ? (isLoading ? 'Processing...' : 'Deposit') : loadApprove ? 'Processing...' : 'Approve and Deposit'}
            </button>
          </Form.Submit>
        </div>
      </Form.Root>
    </>
  )
}
