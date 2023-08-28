"use client"

import { Button } from "@/components/ui/button"
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
        <Button
          variant="emerald"
          className="w-ful"
          disabled={!isLivepeerApiKeySet}
        >
          Go live from OBS
        </Button>
      </LinkComponent>
      <LinkComponent href={newStreamBrowserPath}>
        <Button
          variant="emerald"
          className="w-ful"
          disabled={!isLivepeerApiKeySet}
        >
          Go live from your browser
        </Button>
      </LinkComponent>
      <LinkComponent href={watchStreamPath}>
        <Button
          variant="emerald"
          className="w-ful"
          disabled={!isLivepeerApiKeySet}
        >
          Watch an existing livestream
        </Button>
      </LinkComponent>
    </div>
  )
}
