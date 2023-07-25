'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface livepeerForm {
  playbackId: string
}

export function FormLivepeerAsset() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const route = useRouter()
  const { register, handleSubmit, watch } = useForm<livepeerForm>()
  const playbackId = watch('playbackId')

  function onSubmit(FieldValues: livepeerForm) {
    setIsLoading(true)
    if (FieldValues.playbackId !== '') {
      route.push(`/integration/livepeer/vod/${FieldValues.playbackId}`)
    }
  }
  return (
    <div className="card w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Playback ID</label>
        <input required className="input mt-4" {...register('playbackId')} />
        <button className="btn btn-emerald mt-4 w-full" disabled={!playbackId || isLoading} type="submit">
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
