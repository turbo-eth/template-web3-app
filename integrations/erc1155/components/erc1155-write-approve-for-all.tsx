import { useForm } from "react-hook-form"
import { useDebounce } from "usehooks-ts"
import { BaseError } from "viem"
import { Address, useWaitForTransaction } from "wagmi"

import { ContractWriteButton } from "@/components/blockchain/contract-write-button"
import { TransactionStatus } from "@/components/blockchain/transaction-status"

import {
  useErc1155SetApprovalForAll,
  usePrepareErc1155SetApprovalForAll,
} from "../generated/erc1155-wagmi"

interface Erc1155WriteSetApprovalForAllProps {
  address: Address
}

export function Erc1155WriteApproveForAll({
  address,
}: Erc1155WriteSetApprovalForAllProps) {
  const { register, handleSubmit, watch } = useForm()
  const watchToAddress: Address = watch("toAddress")
  const watchShouldApproved: boolean = watch("shouldApproved")
  const debouncedToAddress = useDebounce(watchToAddress, 500)
  const debouncedShouldApproved = useDebounce(watchShouldApproved, 500)

  const { config, error, isError } = usePrepareErc1155SetApprovalForAll({
    address,
    args:
      debouncedToAddress && debouncedShouldApproved
        ? [debouncedToAddress, debouncedShouldApproved]
        : undefined,
    enabled: Boolean(debouncedToAddress && debouncedShouldApproved),
  })

  const {
    data,
    write,
    isLoading: isLoadingWrite,
  } = useErc1155SetApprovalForAll(config)

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
        <input {...register("toAddress")} className="input" />
        <label>Approve?</label>
        <input
          type="checkbox"
          {...register("shouldApproved")}
          className="input"
        />
        <ContractWriteButton
          isLoadingTx={isLoadingTx}
          isLoadingWrite={isLoadingWrite}
          loadingTxText="Approving..."
          type="submit"
          write={!!write}
        >
          Approve For All
        </ContractWriteButton>
        <TransactionStatus
          error={error as BaseError}
          hash={data?.hash}
          isError={
            isError && Boolean(debouncedToAddress && debouncedShouldApproved)
          }
          isLoadingTx={isLoadingTx}
          isSuccess={isSuccess}
        />
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">ERC1155 Set Approval For All</h3>
          <p className="text-center text-sm text-gray-500">
            Approve all tokens to any address
          </p>
        </div>
      </form>
    </div>
  )
}
