import { useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'
import { BaseError } from 'viem'
import { Address, useWaitForTransaction } from 'wagmi'

import { ContractWriteButton } from '@/components/blockchain/contract-write-button'
import { TransactionStatus } from '@/components/blockchain/transaction-status'

import { useErc721SafeMint, usePrepareErc721SafeMint } from '../generated/erc721-wagmi'

interface Erc721WriteMintProps {
  address: Address
}

export function Erc721WriteMint({ address }: Erc721WriteMintProps) {
  const { register, watch, handleSubmit } = useForm()

  const watchToAddress: Address = watch('toAddress')
  const watchTokenId: string = watch('tokenId')
  const watchTokenUri: string = watch('tokenUri')
  const debouncedToAddress = useDebounce(watchToAddress, 500)
  const debouncedTokenId = useDebounce(watchTokenId, 500)
  const debouncedTokenUri = useDebounce(watchTokenUri, 500)

  const { config, error, isError } = usePrepareErc721SafeMint({
    address,
    args:
      debouncedToAddress && debouncedTokenId && debouncedTokenUri
        ? [debouncedToAddress, BigInt(debouncedTokenId || 0), debouncedTokenUri]
        : undefined,
    enabled: Boolean(debouncedToAddress && debouncedTokenId && debouncedTokenUri),
  })

  const { data, write, isLoading: isLoadingWrite } = useErc721SafeMint(config)

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
        <input {...register('tokenId')} type="number" className="input" />
        <label>Token URI</label>
        <input {...register('tokenUri')} className="input" />
        <ContractWriteButton type="submit" isLoadingTx={isLoadingTx} isLoadingWrite={isLoadingWrite} write={!!write} loadingTxText="Minting...">
          Mint
        </ContractWriteButton>
        <TransactionStatus isError={isError} isLoadingTx={isLoadingTx} isSuccess={isSuccess} error={error as BaseError} hash={data?.hash} />
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">ERC721 Mint</h3>
          <p className="text-center text-sm text-gray-500">Mint NFTs to any address</p>
        </div>
      </form>
    </div>
  )
}
