import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { arweaveAccountFormControls } from './controls'
import { useArweavePostForm } from './hook'
import { useArweaveWallet } from '../../hooks/use-arweave-wallet'
import { ConnectArweaveWallet } from '../connect-arweave-wallet'

export const ArweaveAccount = () => {
  const { wallet, address } = useArweaveWallet()
  const { onSubmit, form, isLoading, isError, isSuccess, error } = useArweavePostForm()
  const { handleSubmit, register } = form
  if (!wallet || !address) return <ConnectArweaveWallet />
  return (
    <>
      <div className="card w-full text-left">
        <h3 className="mb-4">Create a new Arweave post</h3>
        <Form {...form}>
          <form className="flex w-full flex-col space-y-8" onSubmit={handleSubmit(onSubmit)}>
            {arweaveAccountFormControls.map((item) => (
              <FormField
                key={item?.label}
                control={form.control}
                name={item?.formfieldName as 'data'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{item?.label}</FormLabel>
                    <FormControl className="input dark:border-gray-600 dark:text-gray-600 dark:[color-scheme:dark]">
                      <Input {...item.attributes} {...field} {...register(item?.formfieldName as 'data')} className="bg-slate-200" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <div>
              <button className="btn btn-emerald w-full" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Create Arweave post'}
              </button>
              {isError && <div className="mt-3 font-medium text-red-500">Error: {error instanceof Error ? error.message : String(error)}</div>}
            </div>
          </form>
        </Form>
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">Arweave post</h3>
          <p className="text-center text-sm text-gray-500">Arweave post is a type of transaction arweave ecosystem which can store data on chain.</p>
        </div>
      </div>
      {isSuccess && (
        <div className="card container mt-10 w-full">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Successfully created an arweave post!</h3>
          </div>
        </div>
      )}
    </>
  )
}
