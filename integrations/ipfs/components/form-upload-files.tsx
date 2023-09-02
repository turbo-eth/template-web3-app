import { useRef } from 'react'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { truncateString } from '@/integrations/arweave/utils'

import { useUploadIpfsForm } from '../hooks/use-upload-form'

export default function FormUploadFiles() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // const { form, onSubmit, isLoading, isError, data } = useUploadIpfs()
  const { form, onSubmit, isLoading, isError, data, onClientSubmit } = useUploadIpfsForm()

  const { control, handleSubmit, register, getValues, setValue } = form

  const values = getValues()

  return (
    <>
      <div className="card w-full text-left">
        <h3 className="mb-4">Upload New File</h3>
        <Form {...form}>
          <form className="flex w-full flex-col space-y-8" onSubmit={handleSubmit(onClientSubmit)}>
            {
              <FormField
                control={control}
                name="file"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>File to be stored</FormLabel>
                      <FormControl className="dark:border-gray-600 dark:text-gray-400 dark:[color-scheme:dark]">
                        <div className="flex items-center">
                          <Input
                            ref={fileInputRef}
                            className="hidden"
                            hidden={true}
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              console.log('file', file)
                              if (file) {
                                field.onChange(file)
                              }
                            }}
                          />

                          {!!values?.file ? (
                            <div className="font-mono text-sm">{truncateString(values?.file.name, 20)}</div>
                          ) : (
                            <button className="btn btn-primary mt-3 text-sm" type="button" onClick={() => fileInputRef.current?.click()}>
                              <span className="mt-2 text-sm leading-normal">Select a file</span>
                            </button>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            }

            <div>
              <button className="btn btn-emerald w-full" disabled={!!isLoading}>
                {!!isLoading ? 'Loading...' : 'Upload to IPFS'}
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
      {data && (
        <div className="card container mt-10 w-full">
          <div className="flex items-center justify-between">
            <div> Success</div>
          </div>
        </div>
      )}
    </>
  )
}
