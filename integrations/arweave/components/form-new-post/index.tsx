import { useRef } from "react"
import { useFieldArray } from "react-hook-form"

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
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

import { useArweaveWallet } from "../../hooks/use-arweave-wallet"
import { truncateString } from "../../utils"
import { ConnectArweaveWallet } from "../connect-arweave-wallet"
import { FeeEstimation } from "../fee-estimation"
import { InsufficientBalanceError } from "../insufficient-balance-error"
import { PendingTx } from "../pending-tx"
import { useArweavePostForm } from "./hook"
import { FormListTags } from "./list-tags"

export const FormNewPost = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { wallet, address } = useArweaveWallet()
  const {
    onSubmit,
    form,
    isLoading,
    isError,
    isSuccess,
    error,
    data,
    estimation,
  } = useArweavePostForm()
  const { control, handleSubmit, register, getValues, setValue } = form
  const values = getValues()
  const {
    fields: tags,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  })
  if (!wallet || !address) return <ConnectArweaveWallet />
  return (
    <>
      <Card className="w-full text-left">
        <CardContent>
          <h3 className="mb-4">Create a new Arweave post</h3>
          <Form {...form}>
            <form
              className="flex w-full flex-col space-y-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              {!values.file && (
                <FormField
                  control={control}
                  name="data"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data to be stored</FormLabel>
                      <FormControl className="input border bg-background text-muted-foreground">
                        <Textarea
                          {...field}
                          {...register("data")}
                          className="dark:bg-neutral-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {!values.file && !values.data && (
                <div className="my-2 w-full text-center text-muted-foreground">
                  - or -
                </div>
              )}
              {!values.data && (
                <FormField
                  control={control}
                  name="file"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>File to be stored</FormLabel>
                        <FormControl className="border bg-background text-muted-foreground">
                          <div className="flex items-center">
                            <Input
                              ref={fileInputRef}
                              className="hidden"
                              hidden={true}
                              type="file"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  appendTag(
                                    { name: "Content-type", value: file.type },
                                    { shouldFocus: false }
                                  )
                                  field.onChange(file)
                                }
                              }}
                            />
                            {values.file ? (
                              <div className="font-mono text-sm">
                                {truncateString(values.file.name, 20)}
                              </div>
                            ) : (
                              <Button
                                className="mt-3 text-sm"
                                onClick={() => fileInputRef.current?.click()}
                              >
                                <span className="mt-2 text-sm leading-normal">
                                  Select a file
                                </span>
                              </Button>
                            )}
                            {values.file && (
                              <Button
                                variant="destructive"
                                className="ml-3 text-xs"
                                onClick={() => {
                                  removeTag(
                                    tags.findIndex(
                                      (tag) => tag.name === "Content-type"
                                    )
                                  )
                                  setValue("file", undefined)
                                }}
                              >
                                Delete
                              </Button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              )}
              <FormLabel>Tags</FormLabel>
              <FormListTags
                {...{ append: appendTag, remove: removeTag, fields: tags }}
              />
              <FeeEstimation {...estimation} />
              <div>
                <Button
                  variant="emerald"
                  className="w-full"
                  disabled={isLoading || estimation.isEstimatingTxFee}
                >
                  {isLoading ? "Loading..." : "Create Arweave post"}
                </Button>
                {isError ? (
                  (error as { insufficientBalance: boolean })
                    .insufficientBalance ? (
                    <InsufficientBalanceError />
                  ) : (
                    <div className="mt-3 font-medium text-red-500">
                      Error:{" "}
                      {error instanceof Error ? error.message : String(error)}
                    </div>
                  )
                ) : null}
              </div>
            </form>
          </Form>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="justify-between">
          {" "}
          <h3 className="text-center">Arweave post</h3>
          <p className="text-center text-sm text-muted-foreground">
            Arweave post is a type of transaction which can store data on-chain
            permanently.
          </p>
        </CardFooter>
      </Card>
      {isSuccess && data && (
        <Card className="container mt-10 w-full">
          <CardContent className="flex items-center justify-between">
            <PendingTx txId={data} />
          </CardContent>
        </Card>
      )}
    </>
  )
}
