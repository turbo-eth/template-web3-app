import { useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'
import { BaseError } from 'viem'
import { Address, useAccount, useWaitForTransaction } from 'wagmi'

import { ContractWriteButton } from '@/components/blockchain/contract-write-button'
import { TransactionStatus } from '@/components/blockchain/transaction-status'

import { useErc1155SafeBatchTransferFrom, usePrepareErc1155SafeBatchTransferFrom } from '../generated/erc1155-wagmi'

interface Erc1155WriteTransferProps {
  address: Address
}

export function Erc1155WriteBatchTransfer({ address }: Erc1155WriteTransferProps) {
  const { register, watch, handleSubmit } = useForm()

  const watchDifferentFromAddress: boolean = watch('differentFromAddress')
  const watchTokenId: string = watch('tokenId')
  const watchAmount: string = watch('amount')
  const watchFromAddress: Address = watch('fromAddress')
  const watchToAddress: Address = watch('toAddress')

  const debouncedTokenId = useDebounce(watchTokenId, 500)
  const debouncedAmount = useDebounce(watchAmount, 500)
  const debouncedFromAddress = useDebounce(watchFromAddress, 500)
  const debouncedToAddress = useDebounce(watchToAddress, 500)

  const watchTokenId2: string = watch('tokenId2')
  const watchAmount2: string = watch('amount2')
  const debouncedTokenId2 = useDebounce(watchTokenId2, 500)
  const debouncedAmount2 = useDebounce(watchAmount2, 500)

  const watchTokenId3: string = watch('tokenId3')
  const watchAmount3: string = watch('amount3')
  const debouncedTokenId3 = useDebounce(watchTokenId3, 500)
  const debouncedAmount3 = useDebounce(watchAmount3, 500)

  const { address: accountAddress } = useAccount()

  const transferFromAddress = watchDifferentFromAddress ? debouncedFromAddress : accountAddress

  const { config, error, isError } = usePrepareErc1155SafeBatchTransferFrom({
    address,
    args:
      transferFromAddress && debouncedToAddress && debouncedTokenId
        ? [
            transferFromAddress,
            debouncedToAddress,
            [BigInt(debouncedTokenId), BigInt(debouncedTokenId2), BigInt(debouncedTokenId3)],
            [BigInt(debouncedAmount), BigInt(debouncedAmount2), BigInt(debouncedAmount3)],
            '0x',
          ]
        : undefined,
    enabled: Boolean(
      transferFromAddress &&
        debouncedToAddress &&
        debouncedTokenId &&
        debouncedTokenId2 &&
        debouncedTokenId3 &&
        debouncedAmount &&
        debouncedAmount2 &&
        debouncedAmount3
    ),
  })

  const { data, write, isLoading: isLoadingWrite } = useErc1155SafeBatchTransferFrom(config)

  const { isLoading: isLoadingTx, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const onSubmit = async () => {
    write?.()
  }

  return (
    <div className="card w-full">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between text-sm">
          <label>Use different from address</label>
          <div className="h-6 w-6">
            <input {...register('differentFromAddress')} className="input" type="checkbox" />
          </div>
        </div>
        {watchDifferentFromAddress && (
          <>
            <label>From Address</label>
            <input {...register('fromAddress')} className="input" />
          </>
        )}
        <label>To Address</label>
        <input {...register('toAddress')} className="input" />
        <label>Token Id (1st)</label>
        <input type="number" {...register('tokenId')} className="input" />
        <label>Amount (1st)</label>
        <input type="number" {...register('amount')} className="input" />
        <label>Token Id (2nd)</label>
        <input type="number" {...register('tokenId2')} className="input" />
        <label>Amount (2nd)</label>
        <input type="number" {...register('amount2')} className="input" />
        <label>Token Id (3rd)</label>
        <input type="number" {...register('tokenId3')} className="input" />
        <label>Amount (3rd)</label>
        <input type="number" {...register('amount3')} className="input" />
        <ContractWriteButton isLoadingTx={isLoadingTx} isLoadingWrite={isLoadingWrite} loadingTxText="Transferring..." type="submit" write={!!write}>
          Batch Transfer
        </ContractWriteButton>
        <TransactionStatus
          error={error as BaseError}
          hash={data?.hash}
          isError={isError && Boolean(debouncedTokenId && debouncedAmount3)}
          isLoadingTx={isLoadingTx}
          isSuccess={isSuccess}
        />
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">ERC1155 Batch Transfer</h3>
          <p className="text-center text-sm text-gray-500">Batch Transfer 3 token types to any address</p>
        </div>
      </form>
    </div>
  )
}
