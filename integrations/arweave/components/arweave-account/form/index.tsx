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
import { Separator } from "@/components/ui/separator"

import { useArweaveWallet } from "../../../hooks/use-arweave-wallet"
import { getComponent } from "../../../utils/get-element-component"
import { ConnectArweaveWallet } from "../../connect-arweave-wallet"
import { FeeEstimation } from "../../fee-estimation"
import { InsufficientBalanceError } from "../../insufficient-balance-error"
import { PendingTx } from "../../pending-tx"
import { Spinner } from "../../spinner"
import { arweaveAccountFormControls } from "./controls"
import { useArweaveAccountForm } from "./hook"

// This wrapper exists so the form renders only if we're done getting account
export const ArweaveAccountEdit = () => {
  const { wallet, address, account } = useArweaveWallet()
  if (!wallet || !address) return <ConnectArweaveWallet />
  if (!account) return <Spinner />
  return <ArweaveAccountForm />
}

const ArweaveAccountForm = () => {
  const { userHasAccount, getAccount } = useArweaveWallet()
  const {
    onSubmit,
    form,
    isLoading,
    isError,
    isSuccess,
    error,
    data,
    estimation,
  } = useArweaveAccountForm()
  const { handleSubmit, register } = form
  return (
    <>
      <Card className="w-full text-left">
        <CardContent>
          <h3 className="mb-4">
            {userHasAccount
              ? "Edit your Profile"
              : "Create your Arweave account"}
          </h3>
          <Form {...form}>
            <form
              className="flex w-full flex-col space-y-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              {arweaveAccountFormControls.map((item) => {
                const Component = getComponent(item.component)
                return (
                  <FormField
                    key={item?.label}
                    control={form.control}
                    name={item?.formfieldName as "handleName"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{item?.label}</FormLabel>
                        <FormControl className="input">
                          <Component
                            className="border bg-background text-muted-foreground"
                            {...field}
                            {...register(item?.formfieldName as "handleName")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              })}
              <FeeEstimation {...estimation} />
              <div>
                <Button
                  variant="emerald"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Loading..."
                    : userHasAccount
                    ? "Update Arweave account"
                    : "Create Arweave account"}
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
          <h3 className="text-center">Arweave account</h3>
          <p className="text-center text-sm text-muted-foreground">
            Arweave profile is the universal account in arweave ecosystem.
          </p>
        </CardFooter>
      </Card>

      {isSuccess && data && (
        <PendingTx txId={data} onConfirmation={getAccount} />
      )}
    </>
  )
}
