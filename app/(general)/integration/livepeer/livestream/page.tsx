'use client'

import { useState } from 'react'

import { LinkComponent } from '@/components/shared/link-component'
import { FormLivepeerApiKey } from '@/integrations/livepeer/components/form-livepeer-api-key'
import { useIsLivepeerApiKeySet } from '@/integrations/livepeer/hooks/use-livepeer-api-key'

export default function PageIntegration() {
  const newStreamObsPath = '/integration/livepeer/livestream/new/obs'
  const newStreamBrowserPath = '/integration/livepeer/livestream/new/browser'
  const watchStreamPath = '/integration/livepeer/livestream/watch'

  const [isLoadingNewStreamObs, setIsLoadingNewStreamObs] = useState<boolean>(false)
  const [isLoadingNewStreamBrowser, setIsLoadingNewStreamBrowser] = useState<boolean>(false)
  const [isLoadingExistingStream, setIsLoadingExistingStream] = useState<boolean>(false)
  const isLivepeerApiKeySet = useIsLivepeerApiKeySet()

  return (
    <div className="card">
      {!isLivepeerApiKeySet && <FormLivepeerApiKey />}
      <LinkComponent href={newStreamObsPath}>
        <button
          className="btn btn-emerald mt-4 w-full"
          disabled={!isLivepeerApiKeySet || isLoadingNewStreamObs}
          onClick={() => setIsLoadingNewStreamObs(true)}>
          {isLoadingNewStreamObs ? 'Loading...' : 'Create a new OBS livestream'}
        </button>
      </LinkComponent>
      <LinkComponent href={newStreamBrowserPath}>
        <button
          className="btn btn-emerald mt-4 w-full"
          disabled={!isLivepeerApiKeySet || isLoadingNewStreamBrowser}
          onClick={() => setIsLoadingNewStreamBrowser(true)}>
          {isLoadingNewStreamBrowser ? 'Loading...' : 'Create a new Browser livestream'}
        </button>
      </LinkComponent>
      <LinkComponent href={watchStreamPath}>
        <button
          className="btn btn-emerald mt-4 w-full"
          disabled={!isLivepeerApiKeySet || isLoadingExistingStream}
          onClick={() => setIsLoadingExistingStream(true)}>
          {isLoadingExistingStream ? 'Loading...' : 'Watch an existing livestream'}
        </button>
      </LinkComponent>
    </div>
  )
}
