import { useMemo } from 'react'

import { useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'
import type { BaseError } from 'viem'
import { encodePacked, keccak256 } from 'viem'
import { useAccount, useWaitForTransaction } from 'wagmi'

import { ContractWriteButton } from '@/components/blockchain/contract-write-button'
import { TransactionStatus } from '@/components/blockchain/transaction-status'

import { usePrepareRegistryCreateProfile, useRegistryCreateProfile } from '../../generated/allo-wagmi'
import { useNonce } from '../../hooks/use-nonce'
import { parseAddresses } from '../../utils'
import { REGISTRY_ADDRESS } from '../../utils/constants'

interface FormSchema {
  name: string
  protocol: string
  pointer: string
  members: string
}

export function RegistryCreateProfile() {
  const { register, watch, handleSubmit, reset } = useForm<FormSchema>({
    defaultValues: {
      protocol: '1',
    },
  })
  const { data: nonce } = useNonce()
  const { address } = useAccount()

  const name = useDebounce(watch('name'), 500)
  const protocol = useDebounce(watch('protocol'), 500)
  const pointer = useDebounce(watch('pointer'), 500)
  const members = useDebounce(watch('members'), 500)

  const profileId = useMemo(
    () => (nonce && address ? keccak256(encodePacked(['uint256', 'address'], [BigInt(nonce), address])) : undefined),
    [nonce, address]
  )

  const formattedMembers = useMemo(() => parseAddresses(members), [members])

  const isValidInput = address && typeof nonce === 'number' && name && pointer && formattedMembers.length > 0 && Number(protocol) !== 0

  const { config, error, isError } = usePrepareRegistryCreateProfile({
    address: REGISTRY_ADDRESS,
    args: isValidInput
      ? [
          BigInt(nonce),
          name,
          {
            protocol: BigInt(Number(protocol)),
            pointer,
          },
          address,
          formattedMembers,
        ]
      : undefined,
    enabled: Boolean(isValidInput),
  })

  const { data, write, isLoading: isLoadingWrite } = useRegistryCreateProfile(config)

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
        <label>Name</label>
        <input {...register('name')} className="input" />
        <label>Protocol</label>
        <input {...register('protocol')} className="input" type="number" />
        <label>Pointer</label>
        <input {...register('pointer')} className="input" />
        <label>Members (list addresses separate by commas)</label>
        <textarea {...register('members')} className="input" />
        {isSuccess && profileId && <div className="my-3 font-medium">Profile ID: {profileId}</div>}
        <ContractWriteButton
          isLoadingTx={isLoadingTx}
          isLoadingWrite={isLoadingWrite}
          loadingTxText="Creating profile..."
          type="submit"
          write={!!write}>
          Create profile
        </ContractWriteButton>
        <TransactionStatus error={error as BaseError} hash={data?.hash} isError={isError} isLoadingTx={isLoadingTx} isSuccess={isSuccess} />
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">Register Create Profile</h3>
          <p className="text-center text-sm text-gray-500">Create a profile to interact with Allo.</p>
        </div>
      </form>
    </div>
  )
}
