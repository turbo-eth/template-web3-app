'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface livepeerForm {
  playbackId: string
}

export function FormLivepeerAsset() {
  const route = useRouter()
  const { register, handleSubmit } = useForm<livepeerForm>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [playbackId, setPlaybackId] = useState<string>('')

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
        <input required className="input mt-4" {...register('playbackId')} value={playbackId} onChange={(e) => setPlaybackId(e.target.value)} />
        <button className="btn btn-emerald mt-4 w-full" disabled={!playbackId || isLoading} type="submit">
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
