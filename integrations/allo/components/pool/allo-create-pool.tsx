import { useMemo } from 'react'

import { useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'
import type { Address, BaseError } from 'viem'
import { useWaitForTransaction } from 'wagmi'

import { ContractWriteButton } from '@/components/blockchain/contract-write-button'
import { TransactionStatus } from '@/components/blockchain/transaction-status'

import { useAlloCreatePool, usePrepareAlloCreatePool } from '../../generated/allo-wagmi'
import { parseAddresses } from '../../utils'
import { ALLO_ADDRESS } from '../../utils/constants'

interface FormSchema {
  profileId: Address
  strategy: Address
  initStrategyData: Address
  token: Address
  amount: string
  protocol: string
  pointer: string
  members: string
}

export function AlloCreatePool() {
  const { register, watch, handleSubmit, reset } = useForm<FormSchema>({
    defaultValues: {
      protocol: '1',
      initStrategyData: '0x',
      amount: '0',
    },
  })

  const profileId = useDebounce(watch('profileId'), 500)
  const strategy = useDebounce(watch('strategy'), 500)
  const initStrategyData = useDebounce(watch('initStrategyData'), 500)
  const token = useDebounce(watch('token'), 500)
  const amount = useDebounce(watch('amount'), 500)
  const protocol = useDebounce(watch('protocol'), 500)
  const pointer = useDebounce(watch('pointer'), 500)
  const members = useDebounce(watch('members'), 500)

  const formattedMembers = useMemo(() => parseAddresses(members), [members])

  const isValidInput = profileId && strategy && initStrategyData && token && pointer && Number(protocol) !== 0 && formattedMembers.length > 0

  const { config, error, isError } = usePrepareAlloCreatePool({
    address: ALLO_ADDRESS,
    args: isValidInput
      ? [
          profileId,
          strategy,
          initStrategyData,
          token,
          BigInt(amount),
          {
            protocol: BigInt(Number(protocol)),
            pointer,
          },
          formattedMembers,
        ]
      : undefined,
    value: BigInt(0),
    enabled: Boolean(isValidInput),
  })

  const { data, write, isLoading: isLoadingWrite } = useAlloCreatePool(config)

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
        <label>Profile ID</label>
        <input {...register('profileId')} className="input" />
        <label>Strategy Address</label>
        <input {...register('strategy')} className="input" />
        <label>Init Strategy Data</label>
        <input {...register('initStrategyData')} className="input" />
        <label>Token Address</label>
        <input {...register('token')} className="input" />
        <label>Amount</label>
        <input {...register('amount')} className="input" type="number" />
        <label>Protocol</label>
        <input {...register('protocol')} className="input" type="number" />
        <label>Pointer</label>
        <input {...register('pointer')} className="input" />
        <label>Members (list addresses separate by commas)</label>
        <textarea {...register('members')} className="input" />
        <ContractWriteButton isLoadingTx={isLoadingTx} isLoadingWrite={isLoadingWrite} loadingTxText="Creating pool..." type="submit" write={!!write}>
          Create Pool
        </ContractWriteButton>
        <TransactionStatus error={error as BaseError} hash={data?.hash} isError={isError} isLoadingTx={isLoadingTx} isSuccess={isSuccess} />
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">Create Pool</h3>
          <p className="text-center text-sm text-gray-500">Create pool with Allo.</p>
        </div>
      </form>
    </div>
  )
}
