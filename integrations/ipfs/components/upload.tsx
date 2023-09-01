import { useRef } from 'react'

import { Form, FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form'
import { FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { truncateString } from '@/integrations/arweave/utils'

import { useUploadIpfs } from '../hooks/use-upload-ipfs'

export default function Upload() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const { form, onSubmit, isLoading, isError, data } = useUploadIpfs()

  const { control, handleSubmit, register, getValues, setValue } = form

  const values = getValues()

  return (
    <>
      <div className="card w-full text-left">
        <h3 className="mb-4">Upload New File</h3>
        <Form {...form}>
          <form className="flex w-full flex-col space-y-8" onSubmit={handleSubmit(onSubmit)}>
            {!values.file && (
              <FormField
                control={control}
                name="data"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data to be stored</FormLabel>
                    <FormControl className="input dark:border-gray-600 dark:text-gray-400 dark:[color-scheme:dark]">
                      <Textarea {...field} {...register('data')} className="dark:bg-neutral-800" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!values.file && !values.data && <div className="my-2 w-full text-center dark:text-gray-600">- or -</div>}
            {!values.data && (
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
                          {values.file ? (
                            <div className="font-mono text-sm">{truncateString(values.file.name, 20)}</div>
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
            )}

            <div>
              <button className="btn btn-emerald w-full" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Upload to IPFS'}
              </button>
              {/* {isError ? <div className="mt-3 font-medium text-red-500">Error: {error instanceof Error ? error.message : String(error)}</div> : null} */}
            </div>
          </form>
        </Form>
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">IPFS Upload</h3>
          <p className="text-center text-sm text-gray-500">IPFS uploads provide decentralized and permanent off-chain data storage.</p>
        </div>
      </div>
      {/* {data && (
        <div className="card container mt-10 w-full">
          <div className="flex items-center justify-between">
            <div>okok Success</div>
          </div>
        </div>
      )} */}
    </>
  )
}
