import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useToast } from '@/lib/hooks/use-toast'

import { fetchWeb3StorageKey } from '../routes/fetch-api-key'
import StorageClient from '../utils/storageClient'

export const useIpfsStatus = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState()

  const cidSchema = z.object({
    cid: z.string().min(1),
  })
  const form = useForm<z.infer<typeof cidSchema>>({
    resolver: zodResolver(cidSchema),
    defaultValues: {
      cid: '',
    },
  })

  const { toast, dismiss } = useToast()

  type InfoType = {
    cid: string
    dagSize: number
    created: string
  }

  const handleToast = (info) => {
    toast({
      title: 'Upload Complete',
      description: `${info.cid} ${info.dagSize} ${info.created}`,
    })

    setTimeout(() => {
      dismiss()
    }, 4200)
  }

  const onSubmit = async (values) => {
    try {
      setIsLoading(true)

      const web3StorageKey = await fetchWeb3StorageKey()

      const storageClient = new StorageClient(web3StorageKey)

      const info = await storageClient?.statusSearch(values?.cid)
      handleToast(info)

      form.reset()
    } catch (error) {
      setIsError(error)
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }
  return {
    onSubmit,
    form,
    isError,
    isLoading,
  }
}
