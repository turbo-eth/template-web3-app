import { useForm } from "react-hook-form"
import { useDebounce } from "usehooks-ts"
import { BaseError } from "viem"
import { Address, useAccount, useWaitForTransaction } from "wagmi"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ContractWriteButton } from "@/components/blockchain/contract-write-button"
import { TransactionStatus } from "@/components/blockchain/transaction-status"

import {
  useErc1155SafeTransferFrom,
  usePrepareErc1155SafeTransferFrom,
} from "../generated/erc1155-wagmi"

interface Erc1155WriteTransferProps {
  address: Address
}

export function Erc1155WriteTransfer({ address }: Erc1155WriteTransferProps) {
  const { register, watch, handleSubmit } = useForm()

  const watchDifferentFromAddress: boolean = watch("differentFromAddress")
  const watchTokenId: string = watch("tokenId")
  const watchAmount: string = watch("amount")
  const watchFromAddress: Address = watch("fromAddress")
  const watchToAddress: Address = watch("toAddress")
  const debouncedTokenId = useDebounce(watchTokenId, 500)
  const debouncedAmount = useDebounce(watchAmount, 500)
  const debouncedFromAddress = useDebounce(watchFromAddress, 500)
  const debouncedToAddress = useDebounce(watchToAddress, 500)

  const { address: accountAddress } = useAccount()

  const transferFromAddress = watchDifferentFromAddress
    ? debouncedFromAddress
    : accountAddress

  const { config, error, isError } = usePrepareErc1155SafeTransferFrom({
    address,
    args:
      transferFromAddress && debouncedToAddress && debouncedTokenId
        ? [
            transferFromAddress,
            debouncedToAddress,
            BigInt(debouncedTokenId),
            BigInt(debouncedAmount),
            "0x",
          ]
        : undefined,
    enabled: Boolean(
      transferFromAddress && debouncedToAddress && debouncedTokenId
    ),
  })

  const {
    data,
    write,
    isLoading: isLoadingWrite,
  } = useErc1155SafeTransferFrom(config)

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
          <label>Amount</label>
          <input type="number" {...register("amount")} className="input" />
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
        </form>
      </CardContent>
      <Separator className="my-4" />
      <CardFooter className="justify-between">
        <h3 className="text-center">ERC1155 Transfer</h3>
        <p className="text-center text-sm text-gray-500">
          Transfer NFTs or FTs to any address
        </p>
      </CardFooter>
    </Card>
  )
}
