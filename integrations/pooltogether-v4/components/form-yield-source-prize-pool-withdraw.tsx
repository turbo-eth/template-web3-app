'use client'

import * as Form from '@radix-ui/react-form'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'
import { BaseError, formatUnits, parseUnits } from 'viem'
import { useAccount, useSwitchNetwork, useWaitForTransaction } from 'wagmi'

import { useLoadContractFromChainId } from '@/actions/pooltogether-v4/hooks/use-load-contract-from-chain-id'
import { useUserBalance } from '@/actions/pooltogether-v4/hooks/use-user-balance'
import { PRIZE_POOL_CONTRACT } from '@/actions/pooltogether-v4/utils/prize-pool-contract-list'
import { TICKET_CONTRACT } from '@/actions/pooltogether-v4/utils/ticket-contract-list'
import { ContractWriteButton } from '@/components/blockchain/contract-write-button'
import { TransactionStatus } from '@/components/blockchain/transaction-status'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import {
  usePoolTogetherPrizePoolWithdrawFrom,
  usePreparePoolTogetherPrizePoolWithdrawFrom,
} from '@/integrations/pooltogether-v4/generated/pooltogether-v4-wagmi'
import { useErc20Decimals } from '@/lib/generated/blockchain'

interface FormSchema {
  withdrawAmount: string
}

export function PoolTogetherFormWithdraw() {
  const { register, watch, handleSubmit, setValue } = useForm<FormSchema>()
  const { address } = useAccount()
  const { switchNetwork } = useSwitchNetwork()
  const userBalance = useUserBalance({ type: 'withdraw' })
  const prizePoolAddress = useLoadContractFromChainId(PRIZE_POOL_CONTRACT)
  const ticketAddress = useLoadContractFromChainId(TICKET_CONTRACT)

  const { data: decimals } = useErc20Decimals({ address: ticketAddress })

  const debouncedWithdrawAmount = useDebounce(watch('withdrawAmount'), 500)

  const isValidContractCall = address && debouncedWithdrawAmount && !isNaN(Number(debouncedWithdrawAmount)) && Number(debouncedWithdrawAmount) > 0

  const { config, error, isError, refetch } = usePreparePoolTogetherPrizePoolWithdrawFrom({
    address: prizePoolAddress,
    args: isValidContractCall ? [address, parseUnits(`${Number(debouncedWithdrawAmount)}`, decimals || 6)] : undefined,
    enabled: Boolean(isValidContractCall),
  })

  const { data, write, isLoading: isLoadingWrite } = usePoolTogetherPrizePoolWithdrawFrom(config)

  const { isLoading: isLoadingTx, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: async () => {
      setValue('withdrawAmount', '')
      await refetch()
    },
  })

  const onSubmit = () => {
    write?.()
  }

  if (!prizePoolAddress) {
    return (
      <div className="flex w-full flex-col justify-center">
        <button className="btn btn-red mx-auto text-center font-semibold" onClick={() => switchNetwork?.(1)}>
          Switch Network
        </button>
      </div>
    )
  }

  return (
    <motion.div animate="show" className="card w-full" initial="hidden" variants={FADE_DOWN_ANIMATION_VARIANTS}>
      <Form.Root onSubmit={handleSubmit(onSubmit)}>
        <Form.Field name="amountWithdraw">
          <div className="flex justify-between align-baseline">
            <Form.Label className="mb-2 font-semibold">Amount </Form.Label>
            <Form.Label className="mb-2">
              <span
                className="ml-10 cursor-pointer hover:underline"
                onClick={() => setValue('withdrawAmount', formatUnits(userBalance, decimals || 1))}>
                {Number(formatUnits(userBalance, decimals || 1)).toFixed(2)} USDC
              </span>
            </Form.Label>
          </div>
          <Form.Control asChild>
            <input className="input" {...register('withdrawAmount')} />
          </Form.Control>
        </Form.Field>
        <div className="mt-6 mb-4 flex justify-center space-x-5">
          <Form.Submit asChild className="w-full">
            <ContractWriteButton isLoadingTx={isLoadingTx} isLoadingWrite={isLoadingWrite} loadingTxText={'Withdrawing...'} write={!!write}>
              Withdraw
            </ContractWriteButton>
          </Form.Submit>
        </div>
        <div className="flex flex-col gap-y-4">
          <TransactionStatus
            error={error as BaseError}
            hash={data?.hash}
            isError={Boolean(isError && isValidContractCall)}
            isLoadingTx={isLoadingTx}
            isSuccess={isSuccess}
          />
        </div>
      </Form.Root>
      <hr className="my-4" />
      <div className="flex items-center justify-between">
        <h3 className="text-center">Withdraw</h3>
        <p className="text-center text-sm text-gray-500">Start saving today</p>
      </div>
    </motion.div>
  )
}
