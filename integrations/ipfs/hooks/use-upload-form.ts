import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import error from 'next/error'
import { FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'


import { fetchWeb3StorageKey } from '../routes/fetch-api-key'
import StorageClient from '../utils/storageClient'
export const useUploadIpfsForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState({})
  const [data,setData] = useState('')

  const txSchema = z.object({
    file: z.instanceof(File),
  })
  const form = useForm<z.infer<typeof txSchema>>({
    resolver: zodResolver(txSchema),
  })

  const onClientSubmit = async (values: FieldValues) => {
    try {
      setIsLoading(true)

      const web3StorageKey = await fetchWeb3StorageKey()
      const storageClient = new StorageClient(web3StorageKey)
      const { imageURI,cid } = await storageClient.storeFiles(values?.file as File)

      setIsLoading(false)
      setData(imageURI)

      form.reset()
    } catch (e) {
      setIsLoading(false)
      console.error('Error:', e)
      setIsError(error instanceof Error ? error.message : String(error))
    }
  }

  return {
    form,
    onClientSubmit,
    isError,
    setIsError,
    isLoading,
    setIsLoading,
    data,
    setData
  }
}
