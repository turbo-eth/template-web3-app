import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useToast } from '@/lib/hooks/use-toast'

import { fetchWeb3StorageKey } from '../routes/fetch-api-key'
import StorageClient from '../utils/storageClient'
export const useUploadIpfsForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState({})
  // const [data, setData] = useState({})

  const { toast, dismiss } = useToast()

  const handleToast = (Link: string) => {
    toast({
      title: 'Upload Complete',
      description: Link,
    })

    setTimeout(() => {
      dismiss()
    }, 4200)
  }

  const txSchema = z.object({
    file: z.instanceof(File),
  })
  const form = useForm<z.infer<typeof txSchema>>({
    resolver: zodResolver(txSchema),
    // defaultValues: {
    //   file: '',
    // },
  })

  const onClientSubmit = async (values) => {
    try {
      setIsLoading(true)

      const web3StorageKey = await fetchWeb3StorageKey()
      const storageClient = new StorageClient(web3StorageKey)
      const { imageURI, cid } = await storageClient.storeFiles(values?.file)

      setIsLoading(false)
      handleToast(cid)
      form.reset()
    } catch (e) {
      setIsLoading(false)
      console.error('Error:', e)
      setIsError(e)
    }
  }

  return {
    form,
    onClientSubmit,
    isError,
    setIsError,
    isLoading,
    setIsLoading,
  }
}
