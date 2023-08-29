import { useForm } from "react-hook-form"
import { useDebounce } from "usehooks-ts"
import { BaseError } from "viem"
import { Address, useWaitForTransaction } from "wagmi"

import { ContractWriteButton } from "@/components/blockchain/contract-write-button"
import { TransactionStatus } from "@/components/blockchain/transaction-status"

import {
  useErc1155Approve,
  usePrepareErc1155Approve,
} from "../generated/erc1155-wagmi"

interface Erc1155WriteApproveProps {
  address: Address
}

export function Erc1155WriteApprove({ address }: Erc1155WriteApproveProps) {
  const { register, handleSubmit, watch } = useForm()

  const watchToAddress: Address = watch("toAddress")
  const watchTokenId: string = watch("tokenId")
  // const watchCurrentAllowance: string = watch('currentAllowance')
  const watchTargetValue: string = watch("targetValue")
  const debouncedToAddress = useDebounce(watchToAddress, 500)
  const debouncedTokenId = useDebounce(watchTokenId, 500)
  // const debouncedCurrentAllowance = useDebounce(watchCurrentAllowance, 500)
  const debouncedTargetValue = useDebounce(watchTargetValue, 500)

  const { config, error, isError } = usePrepareErc1155Approve({
    address,
    args:
      debouncedToAddress && debouncedTokenId
        ? [
            debouncedToAddress,
            BigInt(debouncedTokenId),
            BigInt(debouncedTargetValue),
          ]
        : undefined,
    enabled: Boolean(
      debouncedToAddress && debouncedTokenId && debouncedTargetValue
    ),
  })

  const { data, write, isLoading: isLoadingWrite } = useErc1155Approve(config)

  const { isLoading: isLoadingTx, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const onSubmit = async () => {
    write?.()
  }

  return (
    <div className="card w-full">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label>Contract Address</label>
        <input {...register("toAddress")} className="input" />
        <label>Token Id</label>
        <input {...register("tokenId")} className="input" />
        <label>Target value</label>
        <input {...register("targetValue")} className="input" />
        <ContractWriteButton
          isLoadingTx={isLoadingTx}
          isLoadingWrite={isLoadingWrite}
          loadingTxText="Approving..."
          type="submit"
          write={!!write}
        >
          Approve
        </ContractWriteButton>
        <TransactionStatus
          error={error as BaseError}
          hash={data?.hash}
          isError={
            isError &&
            Boolean(
              debouncedToAddress && debouncedTokenId && debouncedTargetValue
            )
          }
          isLoadingTx={isLoadingTx}
          isSuccess={isSuccess}
        />
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">ERC1155 Approve</h3>
          <p className="text-center text-sm text-gray-500">
            Approve any tokenId to any address
          </p>
        </div>
      </form>
    </div>
  )
}
