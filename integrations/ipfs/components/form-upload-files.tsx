'use client'

import { useRef } from 'react'

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { truncateString } from '@/integrations/arweave/utils'

import { useUploadIpfsForm } from '../hooks/use-upload-form'
import { Button } from '@/components/ui/button'

export default function FormUploadFiles() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const { form, onClientSubmit, isLoading, isError, data , setData} = useUploadIpfsForm()

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
                          {values?.file ? (
                            <div className="flex h-full w-full justify-between font-mono text-sm">
                              <div>{truncateString(values?.file.name, 20)}</div>
                              <button
                                onClick={() => {
                                  form.reset()
                                }}>
                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> </svg>
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
            <Button className='w-full' variant="emerald" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Upload to IPFS'}
              </Button>
            </div>
          </form>
        </Form>
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">IPFS Upload</h3>
          <p className="text-center text-sm text-gray-500">IPFS uploads provide decentralized and permanent off-chain data storage.</p>
        </div>

        {!!data && !values?.file && (
        <div className="mt-10 flex w-full justify-between">
            Sucess Link={'>'}      
            <div className='flex items-center'>
              <a href={data}>{truncateString(data,50)}</a>
        &nbsp;
        <button
                    onClick={() => {
                      setData('')
                    }}>
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> </svg>
                  </button>
              </div>   
            
        </div>
        )}
      </div>
    </>
  )
}
