import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useToast } from '@/lib/hooks/use-toast'

import { fetchWeb3StorageKey } from '../routes/fetch-api-key'
import { truncateString } from '../utils'
import StorageClient from '../utils/storageClient'

export const useIpfsStatus = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState<string | null>(null)

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
  }

  const handleToast = (info: InfoType) => {
    console.log('info', info)
    toast({
      title: 'Status Check',
      description: `${truncateString(info.cid, 20)}`,
    })

    setTimeout(() => {
      dismiss()
    }, 4200)
  }

  const onSubmit = async (values: FieldValues) => {
    try {
      setIsLoading(true)

      const web3StorageKey = await fetchWeb3StorageKey()

      const storageClient = new StorageClient(web3StorageKey)

      const info = await storageClient?.statusSearch(values?.cid as string)
      handleToast(info as InfoType)

      form.reset()
    } catch (error) {
      setIsError(error instanceof Error ? error.message : String(error))

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
