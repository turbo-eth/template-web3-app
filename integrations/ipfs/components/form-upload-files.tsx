'use client'

import { useRef } from 'react'

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { truncateString } from '@/integrations/arweave/utils'

import { useUploadIpfsForm } from '../hooks/use-upload-form'

export default function FormUploadFiles() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // const { form, onSubmit, isLoading, isError, data } = useUploadIpfs()
  const { form, onClientSubmit, isLoading, isError } = useUploadIpfsForm()

  const { control, handleSubmit, getValues, setValue } = form

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
                      <FormControl className="dark:border-gray-600 dark:text-gray-400 dark:[color-scheme:dark]">
                        <div className="items-center">
                          {!!values?.file ? (
                            <div className="flex h-full w-full font-mono text-sm">
                              <div>{truncateString(values?.file.name, 20)}</div>
                              <button
                                onClick={() => {
                                  form.reset()
                                }}>
                                delete
                              </button>
                            </div>
                          ) : (
                            <div className="h-64 w-full">
                              <label className="flex h-64  w-full cursor-pointer appearance-none justify-center rounded-md border-2 border-dashed border-gray-300 bg-white px-4 transition hover:border-gray-400 focus:outline-none">
                                <span className="flex items-center space-x-2">
                                  <svg
                                    className="bi bi-upload"
                                    fill="currentColor"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    width="16"
                                    xmlns="http://www.w3.org/2000/svg">
                                    {' '}
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />{' '}
                                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />{' '}
                                  </svg>
                                  <span className="font-medium text-gray-600">
                                    Drop files to Attach, or <span className="text-blue-700 underline">browse</span>
                                  </span>
                                </span>
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
                              </label>
                            </div>
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
      {/* {data && (
        <div className="card container mt-10 w-full">
          <div className="flex items-center justify-between">
            <div> Success</div>
          </div>
        </div>
      )} */}
    </>
  )
}
