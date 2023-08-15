import { useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'
import type { Address, BaseError } from 'viem'
import { useWaitForTransaction } from 'wagmi'

import { ContractWriteButton } from '@/components/blockchain/contract-write-button'
import { TransactionStatus } from '@/components/blockchain/transaction-status'

import { useAlloDistribute, usePrepareAlloDistribute } from '../../generated/allo-wagmi'
import { parseAddresses } from '../../utils'
import { ALLO_ADDRESS } from '../../utils/constants'

interface FormSchema {
  poolId: string
  strategyData: Address
  recipientIds: string
}

export function AlloDistribute() {
  const { register, watch, handleSubmit, reset } = useForm<FormSchema>({
    defaultValues: {
      strategyData: '0x',
    },
  })

  const poolId = useDebounce(watch('poolId'), 500)
  const strategyData = useDebounce(watch('strategyData'), 500)
  const recipientIds = useDebounce(watch('recipientIds'), 500)

  const formattedRecipientIds = parseAddresses(recipientIds)

  const isValidInput = Number(poolId) && typeof strategyData === 'string'

  const { config, error, isError } = usePrepareAlloDistribute({
    address: ALLO_ADDRESS,
    args: isValidInput ? [BigInt(poolId), formattedRecipientIds, strategyData] : undefined,
    enabled: Boolean(isValidInput),
  })

  const { data, write, isLoading: isLoadingWrite } = useAlloDistribute(config)

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
        <label>Recipient IDs</label>
        <textarea {...register('recipientIds')} className="input" />
        <ContractWriteButton isLoadingTx={isLoadingTx} isLoadingWrite={isLoadingWrite} loadingTxText="Distributing..." type="submit" write={!!write}>
          Distribute
        </ContractWriteButton>
        <TransactionStatus error={error as BaseError} hash={data?.hash} isError={isError} isLoadingTx={isLoadingTx} isSuccess={isSuccess} />
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">Distribute</h3>
          <p className="text-center text-sm text-gray-500">Distribute funds with Allo.</p>
        </div>
      </form>
    </div>
  )
}
