'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface livepeerForm {
  assetId: string
}

export function FormLivepeerAsset() {
  const route = useRouter()
  const { register, handleSubmit } = useForm<livepeerForm>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [assetId, setAssetId] = useState<string>('')

  function onSubmit(FieldValues: livepeerForm) {
    setIsLoading(true)
    if (FieldValues.assetId !== '') {
      route.push(`/integration/livepeer/vod/${FieldValues.assetId}`)
    }
  }
  return (
    <div className="card w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Asset ID</label>
        <input required className="input mt-4" {...register('assetId')} value={assetId} onChange={(e) => setAssetId(e.target.value)} />
        <button className="btn btn-emerald mt-4 w-full" disabled={!assetId || isLoading} type="submit">
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
