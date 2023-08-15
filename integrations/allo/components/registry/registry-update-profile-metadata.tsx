import { useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'
import type { Address, BaseError } from 'viem'
import { useWaitForTransaction } from 'wagmi'

import { ContractWriteButton } from '@/components/blockchain/contract-write-button'
import { TransactionStatus } from '@/components/blockchain/transaction-status'

import { usePrepareRegistryUpdateProfileMetadata, useRegistryUpdateProfileMetadata } from '../../generated/allo-wagmi'
import { REGISTRY_ADDRESS } from '../../utils/constants'

interface FormSchema {
  profileId: Address
  protocol: string
  pointer: string
}

export function RegistryUpdateProfileMetadata() {
  const { register, watch, handleSubmit, reset } = useForm<FormSchema>({
    defaultValues: {
      protocol: '1',
    },
  })

  const profileId = useDebounce(watch('profileId'), 500)
  const protocol = useDebounce(watch('protocol'), 500)
  const pointer = useDebounce(watch('pointer'), 500)

  const isValidInput = profileId && pointer && Number(protocol) !== 0

  const { config, error, isError } = usePrepareRegistryUpdateProfileMetadata({
    address: REGISTRY_ADDRESS,
    args: isValidInput
      ? [
          profileId,
          {
            protocol: BigInt(Number(protocol)),
            pointer,
          },
        ]
      : undefined,
    enabled: Boolean(isValidInput),
  })

  const { data, write, isLoading: isLoadingWrite } = useRegistryUpdateProfileMetadata(config)

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
        <label>Protocol</label>
        <input {...register('protocol')} className="input" type="number" />
        <label>Pointer</label>
        <input {...register('pointer')} className="input" />
        <ContractWriteButton
          isLoadingTx={isLoadingTx}
          isLoadingWrite={isLoadingWrite}
          loadingTxText="Updating profile metadata..."
          type="submit"
          write={!!write}>
          Update Profile Metadata
        </ContractWriteButton>
        <TransactionStatus error={error as BaseError} hash={data?.hash} isError={isError} isLoadingTx={isLoadingTx} isSuccess={isSuccess} />
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">Update Profile Metadata</h3>
          <p className="text-center text-sm text-gray-500">Update the metadata of your profile in the Allo Registry.</p>
        </div>
      </form>
    </div>
  )
}
