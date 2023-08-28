import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

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
      <div className="card w-full text-left">
        <h3 className="mb-4">
          {userHasAccount ? "Edit your Profile" : "Create your Arweave account"}
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
                          className="dark:border-gray-600 dark:bg-neutral-800 dark:text-gray-400 dark:[color-scheme:dark]"
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
              <Button variant="emerald" className="w-full" disabled={isLoading}>
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
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">Arweave account</h3>
          <p className="text-center text-sm text-gray-500">
            Arweave profile is the universal account in arweave ecosystem.
          </p>
        </div>
      </div>
      {isSuccess && data && (
        <PendingTx txId={data} onConfirmation={getAccount} />
      )}
    </>
  )
}
