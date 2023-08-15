import { useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'
import type { Address, BaseError } from 'viem'
import { useWaitForTransaction } from 'wagmi'

import { ContractWriteButton } from '@/components/blockchain/contract-write-button'
import { TransactionStatus } from '@/components/blockchain/transaction-status'

import { usePrepareRegistryUpdateProfileName, useRegistryUpdateProfileName } from '../../generated/allo-wagmi'
import { REGISTRY_ADDRESS } from '../../utils/constants'

interface FormSchema {
  profileId: Address
  name: string
}

export function RegistryUpdateProfileName() {
  const { register, watch, handleSubmit, reset } = useForm<FormSchema>()

  const profileId = useDebounce(watch('profileId'), 500)
  const name = useDebounce(watch('name'), 500)

  const isValidInput = name && profileId

  const { config, error, isError } = usePrepareRegistryUpdateProfileName({
    address: REGISTRY_ADDRESS,
    args: isValidInput ? [profileId, name] : undefined,
    enabled: Boolean(isValidInput),
  })

  const { data, write, isLoading: isLoadingWrite } = useRegistryUpdateProfileName(config)

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
        <label>Name</label>
        <input {...register('name')} className="input" />
        <ContractWriteButton
          isLoadingTx={isLoadingTx}
          isLoadingWrite={isLoadingWrite}
          loadingTxText="Updating profile name..."
          type="submit"
          write={!!write}>
          Update Profile Name
        </ContractWriteButton>
        <TransactionStatus error={error as BaseError} hash={data?.hash} isError={isError} isLoadingTx={isLoadingTx} isSuccess={isSuccess} />
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">Update Profile Name</h3>
          <p className="text-center text-sm text-gray-500">Update the name of your profile in the Allo Registry.</p>
        </div>
      </form>
    </div>
  )
}
