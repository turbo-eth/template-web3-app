"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LinkComponent } from "@/components/shared/link-component"
import { FormLivepeerApiKey } from "@/integrations/livepeer/components/form-livepeer-api-key"
import { useIsLivepeerApiKeySet } from "@/integrations/livepeer/hooks/use-livepeer-api-key"

const newVodPath = "/integration/livepeer/vod/new"
const watchVodPath = "/integration/livepeer/vod/watch"

export default function PageIntegration() {
  const isLivepeerApiKeySet = useIsLivepeerApiKeySet()
  return (
    <Card>
      <CardHeader>{!isLivepeerApiKeySet && <FormLivepeerApiKey />}</CardHeader>
      <CardContent className="flex flex-col gap-4">
        <LinkComponent href={newVodPath}>
          <Button
            variant="ghost"
            className="w-full"
            disabled={!isLivepeerApiKeySet}
          >
            Upload a new video
          </Button>
        </LinkComponent>
        <LinkComponent href={watchVodPath}>
          <Button
            variant="ghost"
            className="w-full"
            disabled={!isLivepeerApiKeySet}
          >
            Watch an existing video
          </Button>
        </LinkComponent>
      </CardContent>
    </Card>
  )
}
