import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { arweaveAccountFormControls } from './controls'
import { useArweaveAccountForm } from './hook'
import { useArweaveWallet } from '../../../hooks/use-arweave-wallet'
import { getComponent } from '../../../utils/get-element-component'
import { ConnectArweaveWallet } from '../../connect-arweave-wallet'
import { Spinner } from '../../spinner'

export const ArweaveAccount = () => {
  const { wallet, address, isAccountLoading, userHasAccount } = useArweaveWallet()
  const { onSubmit, form, isLoading, isError, isSuccess, error } = useArweaveAccountForm()
  const { handleSubmit, register } = form
  if (!wallet || !address) return <ConnectArweaveWallet />
  if (isAccountLoading) return <Spinner />
  return (
    <>
      <div className="card w-full text-left">
        <h3 className="mb-4">{userHasAccount ? 'Edit your Profile' : 'Create your Arweave account'}</h3>
        <Form {...form}>
          <form className="flex w-full flex-col space-y-8" onSubmit={handleSubmit(onSubmit)}>
            {arweaveAccountFormControls.map((item) => {
              const Component = getComponent(item.component)
              return (
                <FormField
                  key={item?.label}
                  control={form.control}
                  name={item?.formfieldName as 'handleName'}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item?.label}</FormLabel>
                      <FormControl className="input dark:border-gray-600 dark:text-gray-600 dark:[color-scheme:dark]">
                        <Component {...field} {...register(item?.formfieldName as 'handleName')} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            })}
            <div>
              <button className="btn btn-emerald w-full" disabled={isLoading}>
                {isLoading ? 'Loading...' : userHasAccount ? 'Update Arweave account' : 'Create Arweave account'}
              </button>
              {isError && <div className="mt-3 font-medium text-red-500">Error: {error instanceof Error ? error.message : String(error)}</div>}
            </div>
          </form>
        </Form>
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">Arweave account</h3>
          <p className="text-center text-sm text-gray-500">Arweave profile is the universal account in arweave ecosystem.</p>
        </div>
      </div>
      {isSuccess && (
        <div className="card container mt-10 w-full">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Successfully Updated Arweave profile!</h3>
          </div>
        </div>
      )}
    </>
  )
}
