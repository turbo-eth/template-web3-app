"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LinkComponent } from "@/components/shared/link-component"
import { FormLivepeerApiKey } from "@/integrations/livepeer/components/form-livepeer-api-key"
import { useIsLivepeerApiKeySet } from "@/integrations/livepeer/hooks/use-livepeer-api-key"

const newStreamObsPath = "/integration/livepeer/livestream/new/obs"
const newStreamBrowserPath = "/integration/livepeer/livestream/new/browser"
const watchStreamPath = "/integration/livepeer/livestream/watch"

export default function PageIntegration() {
  const isLivepeerApiKeySet = useIsLivepeerApiKeySet()

  return (
    <Card>
      <CardHeader>{!isLivepeerApiKeySet && <FormLivepeerApiKey />}</CardHeader>
      <CardContent className="flex flex-col gap-4">
        <LinkComponent href={newStreamObsPath}>
          <Button
            variant="ghost"
            className="w-full"
            disabled={!isLivepeerApiKeySet}
          >
            Go live from OBS
          </Button>
        </LinkComponent>
        <LinkComponent href={newStreamBrowserPath}>
          <Button
            variant="ghost"
            className="w-full"
            disabled={!isLivepeerApiKeySet}
          >
            Go live from your browser
          </Button>
        </LinkComponent>
        <LinkComponent href={watchStreamPath}>
          <Button
            variant="ghost"
            className="w-full"
            disabled={!isLivepeerApiKeySet}
          >
            Watch an existing livestream
          </Button>
        </LinkComponent>
      </CardContent>
    </Card>
  )
}
