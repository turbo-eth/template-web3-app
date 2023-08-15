import { useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'
import type { Address, BaseError } from 'viem'
import { useWaitForTransaction } from 'wagmi'

import { ContractWriteButton } from '@/components/blockchain/contract-write-button'
import { TransactionStatus } from '@/components/blockchain/transaction-status'

import { useAlloRegisterRecipient, usePrepareAlloRegisterRecipient } from '../../generated/allo-wagmi'
import { ALLO_ADDRESS } from '../../utils/constants'

interface FormSchema {
  poolId: string
  strategyData: Address
}

export function AlloRegisterRecipient() {
  const { register, watch, handleSubmit, reset } = useForm<FormSchema>({
    defaultValues: {
      strategyData: '0x',
    },
  })

  const poolId = useDebounce(watch('poolId'), 500)
  const strategyData = useDebounce(watch('strategyData'), 500)

  const isValidInput = Number(poolId) && typeof strategyData === 'string'

  const { config, error, isError } = usePrepareAlloRegisterRecipient({
    address: ALLO_ADDRESS,
    args: isValidInput ? [BigInt(poolId), strategyData] : undefined,
    value: BigInt(0),
    enabled: Boolean(isValidInput),
  })

  const { data, write, isLoading: isLoadingWrite } = useAlloRegisterRecipient(config)

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
        <label>Strategy Data</label>
        <input {...register('strategyData')} className="input" />
        <ContractWriteButton
          isLoadingTx={isLoadingTx}
          isLoadingWrite={isLoadingWrite}
          loadingTxText="Registering recipient..."
          type="submit"
          write={!!write}>
          Register Recipient
        </ContractWriteButton>
        <TransactionStatus error={error as BaseError} hash={data?.hash} isError={isError} isLoadingTx={isLoadingTx} isSuccess={isSuccess} />
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">Register recipient</h3>
          <p className="text-center text-sm text-gray-500">Register a new recipient with Allo.</p>
        </div>
      </form>
    </div>
  )
}
