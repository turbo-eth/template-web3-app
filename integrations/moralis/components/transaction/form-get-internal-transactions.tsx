import { useForm } from "react-hook-form"
import { useDebounce } from "usehooks-ts"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { LinkComponent } from "@/components/shared/link-component"

import { useGetInternalTransactions } from "../../hooks/transaction"
import { OutputData } from "../output-data"

const defaultValues = {
  chain: "0x1",
  transactionHash:
    "0xdc85cb1b75fd09c2f6d001fea4aba83764193cbd7881a1fa8ccde350a5681109",
}

interface FormSchema {
  chain: string
  transactionHash: string
}

export function FormGetInternalTransactions() {
  const { register, handleSubmit, watch } = useForm<FormSchema>({
    defaultValues,
  })

  const chain = useDebounce(watch("chain"), 500)
  const transactionHash = useDebounce(watch("transactionHash"), 500)

  const { data, error, isFetching, refetch } = useGetInternalTransactions({
    chain,
    transactionHash,
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
          <Label htmlFor="transactionHash">Transaction Hash</Label>
          <Input id="transactionHash" {...register("transactionHash")} />
          <>{error && <span className="text-red-500">{String(error)}</span>}</>
          <Button
            variant="emerald"
            disabled={isFetching || !chain || !transactionHash}
            type="submit"
          >
            {isFetching ? "Loading..." : "Submit"}
          </Button>
          <Separator />
          <div className="flex items-center justify-between">
            <LinkComponent
              isExternal
              className="font-bold hover:underline"
              href="https://docs.moralis.io/web3-data-api/evm/reference/get-internal-transactions"
            >
              Get internal transactions by hash
            </LinkComponent>
            <p className="text-right text-sm text-muted-foreground">
              Get the contents of a internal transaction by transaction hash
            </p>
          </div>
        </form>
        <OutputData data={data} />
      </CardContent>
    </Card>
  )
}
