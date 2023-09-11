import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDebounce } from "usehooks-ts"
import { BaseError } from "viem"
import { Address, useAccount, useWaitForTransaction } from "wagmi"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ContractWriteButton } from "@/components/blockchain/contract-write-button"
import { TransactionStatus } from "@/components/blockchain/transaction-status"

import {
  useErc1155SafeBatchTransferFrom,
  usePrepareErc1155SafeBatchTransferFrom,
} from "../generated/erc1155-wagmi"

interface Erc1155WriteTransferProps {
  address: Address
}

export function Erc1155WriteBatchTransfer({
  address,
}: Erc1155WriteTransferProps) {
  const { register, watch, handleSubmit } = useForm()
  const [batchNumber, setBatchNumber] = useState<number>(2)

  const batchFields = []
  const tokenIdArr = []
  const amountArr = []
  for (let i = 1; i <= batchNumber; i++) {
    batchFields.push(
      <>
        <label>Token Id (batch: {i}) </label>
        <input
          type="number"
          {...register("tokenId" + i.toString())}
          className="input"
        />
        <label>Amount (batch: {i})</label>
        <input
          type="number"
          {...register("amount" + i.toString())}
          className="input"
        />
      </>
    )

    const watchTokenId: string = watch("tokenId" + i.toString())
    tokenIdArr.push(watchTokenId)
    const watchAmount: string = watch("amount" + i.toString())
    amountArr.push(watchAmount)
  }

  const watchDifferentFromAddress: boolean = watch("differentFromAddress")
  const watchFromAddress: Address = watch("fromAddress")
  const watchToAddress: Address = watch("toAddress")

  const debouncedFromAddress = useDebounce(watchFromAddress, 500)
  const debouncedToAddress = useDebounce(watchToAddress, 500)
  const debouncedTokenIdArr = useDebounce(tokenIdArr, 500)
  const debouncedAmountArr = useDebounce(amountArr, 500)

  const { address: accountAddress } = useAccount()

  const transferFromAddress = watchDifferentFromAddress
    ? debouncedFromAddress
    : accountAddress

  const isTokenIdArrValid = !debouncedTokenIdArr.reduce(
    (acc, val) => acc || !val || val.trim() === "",
    false
  )
  const isAmountArrValid = !debouncedAmountArr.reduce(
    (acc, val) => acc || !val || val.trim() === "",
    false
  )

  const { config, error, isError } = usePrepareErc1155SafeBatchTransferFrom({
    address,
    args:
      transferFromAddress &&
      debouncedToAddress &&
      isTokenIdArrValid &&
      isAmountArrValid
        ? [
            transferFromAddress,
            debouncedToAddress,
            debouncedTokenIdArr.map((id) => BigInt(id)),
            debouncedAmountArr.map((num) => BigInt(num)),
            "0x",
          ]
        : undefined,
    enabled: Boolean(
      transferFromAddress &&
        debouncedToAddress &&
        isTokenIdArrValid &&
        isAmountArrValid
    ),
  })

  const {
    data,
    write,
    isLoading: isLoadingWrite,
  } = useErc1155SafeBatchTransferFrom(config)

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
          <label>Batch Number</label>
          <input
            className="input"
            type="number"
            value={batchNumber}
            onChange={(e) => setBatchNumber(e.target.valueAsNumber)}
          />
          {batchFields}
          <ContractWriteButton
            isLoadingTx={isLoadingTx}
            isLoadingWrite={isLoadingWrite}
            loadingTxText="Transferring..."
            type="submit"
            write={!!write}
          >
            Batch Transfer
          </ContractWriteButton>
          <TransactionStatus
            error={error as BaseError}
            hash={data?.hash}
            isError={isError && Boolean(isTokenIdArrValid && isAmountArrValid)}
            isLoadingTx={isLoadingTx}
            isSuccess={isSuccess}
          />
        </form>
      </CardContent>
      <Separator className="my-4" />
      <CardFooter className="justify-between">
        <h3 className="text-center">ERC1155 Batch Transfer</h3>
        <p className="text-center text-sm text-gray-500">
          Batch Transfer ERC1155 to any address
        </p>
      </CardFooter>
    </Card>
  )
}
