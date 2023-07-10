'use client'

import { useEffect } from 'react'

import { useForm } from 'react-hook-form'

import { useToast } from '@/lib/hooks/use-toast'

import { NotFoundError, PermissionError, useCheckLivepeerApiKey } from '../hooks/use-check-livepeer-api-key'
import { useIsLivepeerApiKeySet, useLivepeerApiKey } from '../hooks/use-livepeer-api-key'

interface livepeerForm {
  apiKey: string
}

export function FormLivepeerApiKey() {
  const { register, handleSubmit, watch } = useForm<livepeerForm>()
  const { checkLivepeerApiKey } = useCheckLivepeerApiKey()
  const { toast, dismiss } = useToast()
  const [, setLivepeerApiKey] = useLivepeerApiKey()

  const watchApiKey = watch('apiKey')

  const isLivepeerApiKeySet = useIsLivepeerApiKeySet()
  useEffect(() => {
    if (!isLivepeerApiKeySet) {
      toast({
        title: 'Livepeer API Key not set',
        description: 'Please set a Livepeer API Key to use this integration',
        duration: 100000,
      })
    }
    return () => {
      dismiss()
    }
  }, [isLivepeerApiKeySet])

  const handleToast = ({ title, description }: { title: string; description: string }) => {
    toast({
      title,
      description,
    })

    setTimeout(() => {
      dismiss()
    }, 4200)
  }

  async function onSubmit(FieldValues: livepeerForm) {
    if (FieldValues.apiKey) {
      try {
        await checkLivepeerApiKey(FieldValues.apiKey)
      } catch (e) {
        if (e instanceof NotFoundError || e instanceof PermissionError) {
          setLivepeerApiKey(FieldValues.apiKey)
        } else {
          handleToast({
            title: 'Invalid API Key',
            description: 'Please enter a valid Livepeer API Key',
          })
        }
      }
    }
  }
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Livepeer API Key</label>
        <input required className="input mt-4" {...register('apiKey')} placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" />
        <button className="btn btn-emerald mt-4 w-full" disabled={!watchApiKey} type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}
