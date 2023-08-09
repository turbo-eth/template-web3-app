import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { arweaveAccountFormControls } from './controls'
import { useArweaveAccountForm } from './hook'
import { useArweaveAccount } from '../../../hooks/use-arweave-account'
import { useArweaveWallet } from '../../../hooks/use-arweave-wallet'
import { ConnectArweaveWallet } from '../../connect-arweave-wallet'
import { Spinner } from '../../spinner'

export const ArweaveAccount = () => {
  const { wallet, address } = useArweaveWallet()
  const { loading: isArweaveAccountLoading, userHasAccount } = useArweaveAccount()
  const { onSubmit, form, isLoading, isError, isSuccess, error } = useArweaveAccountForm()
  const { handleSubmit, register } = form
  if (!wallet || !address) return <ConnectArweaveWallet />
  if (isArweaveAccountLoading) return <Spinner />
  return (
    <>
      <div className="card w-full text-left">
        <h3 className="mb-4">{userHasAccount ? 'Edit your Profile' : 'Create your Arweave account'}</h3>
        <Form {...form}>
          <form className="flex w-full flex-col space-y-8" onSubmit={handleSubmit(onSubmit)}>
            {arweaveAccountFormControls.map((item) => (
              <FormField
                key={item?.label}
                control={form.control}
                name={item?.formfieldName as 'handleName'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{item?.label}</FormLabel>
                    <FormControl className="input dark:border-gray-600 dark:text-gray-600 dark:[color-scheme:dark]">
                      <Input {...item.attributes} {...field} {...register(item?.formfieldName as 'handleName')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <div>
              {isError && <div className="mb-3 font-medium text-red-500">{error instanceof Error ? error.message : String(error)}</div>}
              <button className="btn btn-emerald w-full" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Update arweave account'}
              </button>
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
