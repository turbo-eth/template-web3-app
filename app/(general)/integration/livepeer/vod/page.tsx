'use client'

import { useState } from 'react'

import { LinkComponent } from '@/components/shared/link-component'
import { FormLivepeerApiKey } from '@/integrations/livepeer/components/form-livepeer-api-key'
import { useIsLivepeerApiKeySet } from '@/integrations/livepeer/hooks/use-livepeer-api-key'

export default function PageIntegration() {
  const newVodPath = '/integration/livepeer/vod/new'
  const watchVodPath = '/integration/livepeer/vod/watch'

  const [isLoadingNewVideo, setIsLoadingNewVideo] = useState<boolean>(false)
  const [isLoadingExistingVideo, setIsLoadingExistingVideo] = useState<boolean>(false)
  const isLivepeerApiKeySet = useIsLivepeerApiKeySet()
  return (
    <div className="card">
      {!isLivepeerApiKeySet && <FormLivepeerApiKey />}
      <LinkComponent href={newVodPath}>
        <button
          className="btn btn-emerald mt-4 w-full"
          disabled={!isLivepeerApiKeySet || isLoadingNewVideo}
          onClick={() => setIsLoadingNewVideo(true)}>
          {isLoadingNewVideo ? 'Loading...' : 'Upload a new video'}
        </button>
      </LinkComponent>
      <LinkComponent href={watchVodPath}>
        <button
          className="btn btn-emerald mt-4 w-full"
          disabled={!isLivepeerApiKeySet || isLoadingExistingVideo}
          onClick={() => setIsLoadingExistingVideo(true)}>
          {isLoadingExistingVideo ? 'Loading...' : 'Watch an existing video'}
        </button>
      </LinkComponent>
    </div>
  )
}
