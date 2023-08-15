import { useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'
import type { BaseError } from 'viem'
import { useWaitForTransaction } from 'wagmi'

import { ContractWriteButton } from '@/components/blockchain/contract-write-button'
import { TransactionStatus } from '@/components/blockchain/transaction-status'

import { useAlloFundPool, usePrepareAlloFundPool } from '../../generated/allo-wagmi'
import { ALLO_ADDRESS } from '../../utils/constants'

interface FormSchema {
  poolId: string
  amount: string
}

export function AlloFundPool() {
  const { register, watch, handleSubmit, reset } = useForm<FormSchema>()

  const poolId = useDebounce(watch('poolId'), 500)
  const amount = useDebounce(watch('amount'), 500)

  const isValidInput = Number(poolId) && Number(amount)

  const { config, error, isError } = usePrepareAlloFundPool({
    address: ALLO_ADDRESS,
    args: isValidInput ? [BigInt(poolId), BigInt(amount)] : undefined,
    value: BigInt(0),
    enabled: Boolean(isValidInput),
  })

  const { data, write, isLoading: isLoadingWrite } = useAlloFundPool(config)

  const { isLoading: isLoadingTx, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      reset()
    },
  })

  const onSubmit = () => {
    write?.()
  }

  return (
    <div className="card w-full">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label>Pool ID</label>
        <input {...register('poolId')} className="input" />
        <label>Amount</label>
        <input {...register('amount')} className="input" type="number" />
        <ContractWriteButton isLoadingTx={isLoadingTx} isLoadingWrite={isLoadingWrite} loadingTxText="Funding..." type="submit" write={!!write}>
          Fund Pool
        </ContractWriteButton>
        <TransactionStatus error={error as BaseError} hash={data?.hash} isError={isError} isLoadingTx={isLoadingTx} isSuccess={isSuccess} />
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">Fund Pool</h3>
          <p className="text-center text-sm text-gray-500">Fund Allo pools.</p>
        </div>
      </form>
    </div>
  )
}
