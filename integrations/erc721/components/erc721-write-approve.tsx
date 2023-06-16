import { useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'
import { BaseError } from 'viem'
import { Address, useWaitForTransaction } from 'wagmi'

import { ContractWriteButton } from '@/components/blockchain/contract-write-button'
import { TransactionStatus } from '@/components/blockchain/transaction-status'

import { useErc721Approve, usePrepareErc721Approve } from '../generated/erc721-wagmi'

interface Erc721WriteApproveProps {
  address: Address
}

export function Erc721WriteApprove({ address }: Erc721WriteApproveProps) {
  const { register, handleSubmit, watch } = useForm()
  const watchToAddress: Address = watch('toAddress')
  const watchTokenId: string = watch('tokenId')
  const debouncedToAddress = useDebounce(watchToAddress, 500)
  const debouncedTokenId = useDebounce(watchTokenId, 500)

  const { config, error, isError } = usePrepareErc721Approve({
    address,
    args: debouncedToAddress && debouncedTokenId ? [debouncedToAddress, BigInt(debouncedTokenId)] : undefined,
    enabled: Boolean(debouncedToAddress && debouncedTokenId),
  })

  const { data, write, isLoading: isLoadingWrite } = useErc721Approve(config)

  const { isLoading: isLoadingTx, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const onSubmit = async () => {
    write?.()
  }

  return (
    <div className="card w-full">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label>Address</label>
        <input {...register('toAddress')} className="input" />
        <label>Token ID</label>
        <input type="number" {...register('tokenId')} className="input" />
        <ContractWriteButton isLoadingTx={isLoadingTx} isLoadingWrite={isLoadingWrite} loadingTxText="Approving..." type="submit" write={!!write}>
          Approve
        </ContractWriteButton>
        <TransactionStatus
          error={error as BaseError}
          hash={data?.hash}
          isError={isError && Boolean(debouncedToAddress && debouncedTokenId)}
          isLoadingTx={isLoadingTx}
          isSuccess={isSuccess}
        />
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">ERC721 Approve</h3>
          <p className="text-center text-sm text-gray-500">Approve NFTs to any address</p>
        </div>
      </form>
    </div>
  )
}
