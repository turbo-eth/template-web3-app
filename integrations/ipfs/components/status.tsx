'use client'

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'

import { useIpfsStatus } from '../hooks/use-ipfs-status'
import { getComponent } from '../utils/get-element-component'
import { statusControls } from '../utils/status-controls'

const IpfsStatus: React.FC = () => {
  const { onSubmit, form, isLoading, isError } = useIpfsStatus()

  const { handleSubmit, register } = form

  return (
    <>
      <div className="card w-full">
        <h3 className="mb-4 justify-start text-left">Enter CID</h3>

        <Form {...form}>
          <form className="flex w-full flex-col space-y-8" onSubmit={handleSubmit(onSubmit)}>
            {statusControls.map((item) => {
              const Item = getComponent(item?.component)

              return (
                <FormField
                  key={item?.label}
                  control={form.control}
                  name={item?.formfieldName as 'cid'}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="input dark:border-gray-600 dark:text-gray-600 dark:[color-scheme:dark]">
                        <Item {...item?.attribute} {...field} {...register(item?.formfieldName as 'cid')} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            })}
            <div>
              <button className="btn btn-emerald w-full" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Status Check'}
              </button>
            </div>
          </form>
        </Form>
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">IPFS Upload</h3>
          <p className="text-center text-sm text-gray-500">IPFS uploads provide decentralized and permanent off-chain data storage.</p>
        </div>
      </div>
    </>
  )
}

export default IpfsStatus
