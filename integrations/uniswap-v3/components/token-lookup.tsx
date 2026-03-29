"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useTokenSummary } from "../hooks/use-token-summary"
import { FEATURED_BASE_TOKENS, formatUsd } from "../utils"

const formSchema = z
  .object({
    featuredToken: z.string().optional(),
    tokenAddress: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    const hasFeatured = Boolean(values.featuredToken)
    const hasAddress = Boolean(values.tokenAddress)

    if (!hasFeatured && !hasAddress) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Select a featured token or provide a Base token address.",
        path: ["tokenAddress"],
      })
    }

    if (values.tokenAddress && !/^0x[a-fA-F0-9]{40}$/.test(values.tokenAddress)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter a valid EVM token address.",
        path: ["tokenAddress"],
      })
    }
  })

export function TokenLookup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      featuredToken: FEATURED_BASE_TOKENS[0].address,
      tokenAddress: "",
    },
  })

  const featuredToken = form.watch("featuredToken")
  const manualAddress = form.watch("tokenAddress")?.trim()

  const submittedAddress = manualAddress || featuredToken || undefined

  const { data, error, isFetching, refetch } = useTokenSummary(submittedAddress)

  async function onSubmit() {
    await refetch()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Lookup</CardTitle>
        <CardDescription>
          Inspect a Base token that already has Uniswap V3 liquidity indexed by
          the public subgraph.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 md:grid-cols-[1fr_1fr_auto]"
          >
            <FormField
              control={form.control}
              name="featuredToken"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured token</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        form.setValue("tokenAddress", "")
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a featured token" />
                      </SelectTrigger>
                      <SelectContent>
                        {FEATURED_BASE_TOKENS.map((token) => (
                          <SelectItem key={token.address} value={token.address}>
                            {token.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tokenAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Or paste a Base token address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0x..."
                      {...field}
                      onChange={(event) => {
                        field.onChange(event)
                        if (event.target.value) {
                          form.setValue("featuredToken", "")
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-end">
              <Button
                className="w-full md:w-auto"
                disabled={isFetching}
                type="submit"
              >
                {isFetching ? "Loading..." : "Fetch"}
              </Button>
            </div>
          </form>
        </Form>

        {!data && !error ? null : error ? (
          <p className="text-sm text-red-500">
            Failed to load token data from the Uniswap V3 Base subgraph.
          </p>
        ) : !data ? (
          <p className="text-sm text-muted-foreground">
            No indexed Uniswap V3 liquidity found for that token address.
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Token</p>
                <p className="text-lg font-semibold">
                  {data.name} ({data.symbol})
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Last Price</p>
                <p className="text-lg font-semibold">
                  {formatUsd(data.lastPriceUSD, 4)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">TVL</p>
                <p className="text-lg font-semibold">
                  {formatUsd(data._totalValueLockedUSD, 0)}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
