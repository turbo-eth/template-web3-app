import { useForm } from "react-hook-form"
import { useDebounce } from "usehooks-ts"

import { Button } from "@/components/ui/button"
import { LinkComponent } from "@/components/shared/link-component"

import { useGetWalletTransactions } from "../../hooks/transaction"
import { OutputData } from "../output-data"

interface FormSchema {
  chain: string
  address: string
}

const defaultValues = {
  chain: "0x1",
  address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
}

export function FormGetWalletTransactions() {
  const { register, handleSubmit, watch } = useForm<FormSchema>({
    defaultValues,
  })

  const chain = useDebounce(watch("chain"), 500)
  const address = useDebounce(watch("address"), 500)

  const { data, error, isFetching, refetch } = useGetWalletTransactions({
    chain,
    address,
    enabled: false,
  })

  const onsubmit = async () => {
    await refetch?.()
  }

  return (
    <div className="w-full">
      <form
        className="card flex w-full flex-col gap-4"
        onSubmit={handleSubmit(onsubmit)}
      >
        <label>Chain</label>
        <input {...register("chain")} className="input" />
        <label>Address</label>
        <input {...register("address")} className="input" />
        <>{error && <span className="text-red-500">{String(error)}</span>}</>
        <Button
          variant="emerald"
          className="mt-4"
          disabled={isFetching || !chain || !address}
          type="submit"
        >
          {isFetching ? "Loading..." : "Submit"}
        </Button>
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <LinkComponent
            isExternal
            className="font-bold hover:underline"
            href="https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-transactions"
          >
            <h3 className="text-center">Get native transactions by wallet</h3>
          </LinkComponent>
          <p className="text-center text-sm text-gray-500">
            Get native transactions ordered by block number in descending order
          </p>
        </div>
      </form>
      <OutputData data={data} />
    </div>
  )
}
