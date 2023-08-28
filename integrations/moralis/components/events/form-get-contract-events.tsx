import { useForm } from "react-hook-form"
import { useDebounce } from "usehooks-ts"

import { Button } from "@/components/ui/button"
import { LinkComponent } from "@/components/shared/link-component"

import { useGetContractEvents } from "../../hooks/events"
import { OutputData } from "../output-data"

const defaultValues = {
  chain: "0x1",
  address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
  topic: "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
  abi: `{
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      { "indexed": true, "internalType": "address", "name": "to", "type": "address" },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  }`,
}

interface FormSchema {
  chain: string
  address: string
  topic: string
  abi: string
}

export function FormGetContractEvents() {
  const { register, handleSubmit, watch } = useForm<FormSchema>({
    defaultValues,
  })

  const chain = useDebounce(watch("chain"), 500)
  const address = useDebounce(watch("address"), 500)
  const topic = useDebounce(watch("topic"), 500)
  const abi = useDebounce(watch("abi"), 500)

  const { data, error, isFetching, refetch } = useGetContractEvents({
    chain,
    address,
    topic,
    abi,
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
        <label>Topic</label>
        <input {...register("topic")} className="input" />
        <label>ABI</label>
        <textarea {...register("abi")} className="input h-72" />
        <>{error && <span className="text-red-500">{String(error)}</span>}</>
        <Button
          variant="emerald"
          className="mt-4"
          disabled={isFetching || !chain || !address || !topic || !abi}
          type="submit"
        >
          {isFetching ? "Loading..." : "Submit"}
        </Button>
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <LinkComponent
            isExternal
            className="font-bold hover:underline"
            href="https://docs.moralis.io/web3-data-api/evm/reference/get-contract-events"
          >
            <h3 className="text-center">Get events by contract</h3>
          </LinkComponent>
          <p className="text-center text-sm text-gray-500">
            Get events for a contract ordered by block number in descending
            order
          </p>
        </div>
      </form>
      <OutputData data={data} />
    </div>
  )
}
