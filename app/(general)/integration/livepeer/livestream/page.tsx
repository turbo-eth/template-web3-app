"use client"

import { LinkComponent } from "@/components/shared/link-component"
import { FormLivepeerApiKey } from "@/integrations/livepeer/components/form-livepeer-api-key"
import { useIsLivepeerApiKeySet } from "@/integrations/livepeer/hooks/use-livepeer-api-key"

const newStreamObsPath = "/integration/livepeer/livestream/new/obs"
const newStreamBrowserPath = "/integration/livepeer/livestream/new/browser"
const watchStreamPath = "/integration/livepeer/livestream/watch"

export default function PageIntegration() {
  const isLivepeerApiKeySet = useIsLivepeerApiKeySet()

  return (
    <div className="card">
      {!isLivepeerApiKeySet && <FormLivepeerApiKey />}
      <LinkComponent href={newStreamObsPath}>
        <button
          className="btn btn-emerald mt-4 w-full"
          disabled={!isLivepeerApiKeySet}
        >
          Go live from OBS
        </button>
      </LinkComponent>
      <LinkComponent href={newStreamBrowserPath}>
        <button
          className="btn btn-emerald mt-4 w-full"
          disabled={!isLivepeerApiKeySet}
        >
          Go live from your browser
        </button>
      </LinkComponent>
      <LinkComponent href={watchStreamPath}>
        <button
          className="btn btn-emerald mt-4 w-full"
          disabled={!isLivepeerApiKeySet}
        >
          Watch an existing livestream
        </button>
      </LinkComponent>
    </div>
  )
}
