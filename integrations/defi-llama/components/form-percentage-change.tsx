"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

import { useTokenPercentageChange } from "../hooks/coins"
import { OutputData } from "./output-data"

const formSchema = z
  .object({
    chain: z.string({
      required_error: "Please select a chain",
    }),
    tokenType: z.union([z.literal("erc20"), z.literal("native")], {
      required_error: "Please select a token type",
    }),
    tokenAddress: z.string().optional(),
    timestamp: z
      .string()
      .refine(
        (val) => !isNaN(Number(val)) && Number(val) > 0,
        "Please enter a valid number"
      ),
    period: z.union(
      [z.literal("1d"), z.literal("5d"), z.literal("30d"), z.literal("365d")],
      {
        required_error: "Please select a time interval",
      }
    ),
  })
  .superRefine((values, ctx) => {
    if (values.tokenType === "native") return true
    if (values.tokenAddress && /^0x[a-fA-F0-9]{40}$/.test(values.tokenAddress))
      return true

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please enter a valid address",
      path: ["tokenAddress"],
    })
  })

export function FormPercentageChange() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const { data, isFetching, error, refetch } = useTokenPercentageChange({
    coins: {
      address: form.watch("tokenAddress"),
      chainId: Number(form.watch("chain")),
      type: form.watch("tokenType") as any,
    },
    period: form.watch("period"),
    timestamp: Number(form.watch("timestamp")),
    enabled: false,
  })

  async function onSubmit() {
    console.log("onSubmit")
    await refetch?.()
  }

  return (
    <Card>
      <CardContent>
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="chain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chain</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a chain" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="1">Ethereum</SelectItem>
                            <SelectItem value="10">Optimism</SelectItem>
                            <SelectItem value="137">Polygon</SelectItem>
                            <SelectItem value="42161">Arbitrum</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tokenType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a token type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="native">Native</SelectItem>
                            <SelectItem value="erc20">ERC20</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("tokenType") === "erc20" && (
                <FormField
                  control={form.control}
                  name="tokenAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0xdF574c24545E5FfEcb9a659c229253D4111d87e1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="timestamp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timestamp</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1630483200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Interval</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time interval" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="1d">1 Day</SelectItem>
                            <SelectItem value="5d">5 Days</SelectItem>
                            <SelectItem value="30d">1 Month</SelectItem>
                            <SelectItem value="365d">1 year</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isFetching} type="submit">
                {isFetching ? "Loading..." : "Submit"}
              </Button>
            </form>
          </Form>
          <OutputData className="mt-8" data={data} />
          {error && <span className="text-red-500">{String(error)}</span>}
        </>
      </CardContent>
      <Separator className="my-4" />
      <CardFooter className="justify-between">
        <h3 className="text-center">Percentage Change</h3>
        <p className="text-center text-sm text-muted-foreground">
          Get the percentage change in price of tokens at a timestamp by
          contract address.
        </p>
      </CardFooter>
    </Card>
  )
}
