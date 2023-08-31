import Link from "next/link"
import { useForm } from "react-hook-form"
import { useDebounce } from "usehooks-ts"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

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
    <Card className="w-full pt-6">
      <CardContent>
        <form
          className="flex w-full flex-col gap-4"
          onSubmit={handleSubmit(onsubmit)}
        >
          <Label htmlFor="chain">Chain</Label>
          <Input id="chain" {...register("chain")} />
          <Label htmlFor="address">Address</Label>
          <Input id="address" {...register("address")} />
          <Label htmlFor="topic">Topic</Label>
          <Input id="topic" {...register("topic")} />
          <Label htmlFor="abi">ABI</Label>
          <Textarea id="abi" {...register("abi")} className="h-72" />
          <>{error && <span className="text-red-500">{String(error)}</span>}</>
          <Button
            variant="emerald"
            className="mt-4"
            disabled={isFetching || !chain || !address || !topic || !abi}
            type="submit"
          >
            {isFetching ? "Loading..." : "Submit"}
          </Button>
          <Separator />
          <div className="flex items-center justify-between">
            <Link
              href="https://docs.moralis.io/web3-data-api/evm/reference/get-contract-events"
              target="_blank"
              rel="noreferrer noopener"
              className={cn(buttonVariants({ variant: "link" }), "px-0")}
            >
              Get events by contract
            </Link>
            <p className="text-right text-sm text-muted-foreground">
              Get events for a contract ordered by block number in descending
              order
            </p>
          </div>
        </form>
        <OutputData data={data} />
      </CardContent>
    </Card>
  )
}
