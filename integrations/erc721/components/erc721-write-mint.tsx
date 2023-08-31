import { useForm } from "react-hook-form"
import { useDebounce } from "usehooks-ts"
import { BaseError } from "viem"
import { Address, useWaitForTransaction } from "wagmi"

import { ContractWriteButton } from "@/components/blockchain/contract-write-button"
import { TransactionStatus } from "@/components/blockchain/transaction-status"

import {
  useErc721SafeMint,
  usePrepareErc721SafeMint,
} from "../generated/erc721-wagmi"

interface Erc721WriteMintProps {
  address: Address
}

interface FormSchema {
  toAddress: Address
  tokenId: string
  tokenUri: string
}

export function Erc721WriteMint({ address }: Erc721WriteMintProps) {
  const { register, watch, handleSubmit } = useForm<FormSchema>()

  const watchToAddress = watch("toAddress")
  const watchTokenId = watch("tokenId")
  const watchTokenUri = watch("tokenUri")
  const debouncedToAddress = useDebounce(watchToAddress, 500)
  const debouncedTokenId = useDebounce(watchTokenId, 500)
  const debouncedTokenUri = useDebounce(watchTokenUri, 500)

  const { config, error, isError } = usePrepareErc721SafeMint({
    address,
    args:
      debouncedToAddress && debouncedTokenId && debouncedTokenUri
        ? [debouncedToAddress, BigInt(debouncedTokenId || 0), debouncedTokenUri]
        : undefined,
    enabled: Boolean(
      debouncedToAddress && debouncedTokenId && debouncedTokenUri
    ),
  })

  const { data, write, isLoading: isLoadingWrite } = useErc721SafeMint(config)

  const { isLoading: isLoadingTx, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const onSubmit = () => {
    write?.()
  }

  return (
    <div className="card w-full">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label>Address</label>
        <input {...register("toAddress")} className="input" />
        <label>Token ID</label>
        <input {...register("tokenId")} className="input" type="number" />
        <label>Token URI</label>
        <input {...register("tokenUri")} className="input" />
        <ContractWriteButton
          isLoadingTx={isLoadingTx}
          isLoadingWrite={isLoadingWrite}
          loadingTxText="Minting..."
          type="submit"
          write={!!write}
        >
          Mint
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
          <h3 className="text-center">ERC721 Mint</h3>
          <p className="text-center text-sm text-muted-foreground">
            Mint NFTs to any address
          </p>
        </div>
      </form>
    </div>
  )
}
