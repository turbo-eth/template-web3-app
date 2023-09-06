import { useForm } from "react-hook-form"
import { useDebounce } from "usehooks-ts"
import { BaseError } from "viem"
import { Address, useWaitForTransaction } from "wagmi"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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

  const debouncedToAddress = useDebounce(watch("toAddress"), 500)
  const debouncedTokenId = useDebounce(watch("tokenId"), 500)
  const debouncedTokenUri = useDebounce(watch("tokenUri"), 500)

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
    <Card>
      <CardContent>
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
        </form>
      </CardContent>
      <Separator className="my-4" />
      <CardFooter className="justify-between">
        <h3 className="text-center">ERC721 Mint</h3>
        <p className="text-center text-sm text-muted-foreground">
          Mint NFTs to any address
        </p>
      </CardFooter>
    </Card>
  )
}
