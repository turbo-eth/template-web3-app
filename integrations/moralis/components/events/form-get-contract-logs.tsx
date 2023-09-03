import Link from "next/link"
import { useForm } from "react-hook-form"
import { useDebounce } from "usehooks-ts"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

import { useGetContractLogs } from "../../hooks/events"
import { OutputData } from "../output-data"

const defaultValues = {
  chain: "0x1",
  address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
}

interface FormSchema {
  chain: string
  address: string
}

export function FormGetContractLogs() {
  const { register, handleSubmit, watch } = useForm<FormSchema>({
    defaultValues,
  })

  const chain = useDebounce(watch("chain"), 500)
  const address = useDebounce(watch("address"), 500)

  const { data, error, isFetching, refetch } = useGetContractLogs({
    chain,
    address,
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
          <>{error && <span className="text-red-500">{String(error)}</span>}</>
          <Button
            variant="emerald"
            disabled={isFetching || !chain || !address}
            type="submit"
          >
            {isFetching ? "Loading..." : "Submit"}
          </Button>
          <Separator />
          <div className="flex items-center justify-between">
            <Link
              href="https://docs.moralis.io/web3-data-api/evm/reference/get-contract-logs"
              target="_blank"
              rel="noreferrer noopener"
              className={cn(buttonVariants({ variant: "link" }), "px-0")}
            >
              Get logs by contract
            </Link>
            <p className="text-right text-sm text-muted-foreground">
              Get the logs for a contract
            </p>
          </div>
        </form>
        <OutputData data={data} />
      </CardContent>
    </Card>
  )
}
