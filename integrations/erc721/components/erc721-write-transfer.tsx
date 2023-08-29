import { useForm } from "react-hook-form"
import { useDebounce } from "usehooks-ts"
import { BaseError } from "viem"
import { Address, useAccount, useWaitForTransaction } from "wagmi"

import { ContractWriteButton } from "@/components/blockchain/contract-write-button"
import { TransactionStatus } from "@/components/blockchain/transaction-status"

import {
  useErc721SafeTransferFrom,
  usePrepareErc721SafeTransferFrom,
} from "../generated/erc721-wagmi"

interface Erc721WriteTransferProps {
  address: Address
}

export function Erc721WriteTransfer({ address }: Erc721WriteTransferProps) {
  const { register, watch, handleSubmit } = useForm()

  const watchDifferentFromAddress: boolean = watch("differentFromAddress")
  const watchTokenId: string = watch("tokenId")
  const watchFromAddress: Address = watch("fromAddress")
  const watchToAddress: Address = watch("toAddress")
  const debouncedTokenId = useDebounce(watchTokenId, 500)
  const debouncedFromAddress = useDebounce(watchFromAddress, 500)
  const debouncedToAddress = useDebounce(watchToAddress, 500)

  const { address: accountAddress } = useAccount()

  const transferFromAddress = watchDifferentFromAddress
    ? debouncedFromAddress
    : accountAddress

  const { config, error, isError } = usePrepareErc721SafeTransferFrom({
    address,
    args:
      transferFromAddress && debouncedToAddress && debouncedTokenId
        ? [transferFromAddress, debouncedToAddress, BigInt(debouncedTokenId)]
        : undefined,
    enabled: Boolean(
      transferFromAddress && debouncedToAddress && debouncedTokenId
    ),
  })

  const {
    data,
    write,
    isLoading: isLoadingWrite,
  } = useErc721SafeTransferFrom(config)

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
            <input
              {...register("differentFromAddress")}
              className="input"
              type="checkbox"
            />
          </div>
        </div>
        {watchDifferentFromAddress && (
          <>
            <label>From Address</label>
            <input {...register("fromAddress")} className="input" />
          </>
        )}
        <label>To Address</label>
        <input {...register("toAddress")} className="input" />
        <label>Token ID</label>
        <input type="number" {...register("tokenId")} className="input" />
        <ContractWriteButton
          isLoadingTx={isLoadingTx}
          isLoadingWrite={isLoadingWrite}
          loadingTxText="Transferring..."
          type="submit"
          write={!!write}
        >
          Transfer
        </ContractWriteButton>
        <TransactionStatus
          error={error as BaseError}
          hash={data?.hash}
          isError={isError}
          isLoadingTx={isLoadingTx}
          isSuccess={isSuccess}
        />
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">ERC721 Transfer</h3>
          <p className="text-center text-sm text-muted-foreground">
            Transfer NFTs to any address
          </p>
        </div>
      </form>
    </div>
  )
}
