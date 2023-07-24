'use client'

import { useAsset } from '@livepeer/react'

import { LinkComponent } from '@/components/shared/link-component'
import { ButtonShare } from '@/integrations/livepeer/components/button-share'
import { FormLivepeerApiKey } from '@/integrations/livepeer/components/form-livepeer-api-key'
import { PlayerComponent, PlayerType } from '@/integrations/livepeer/components/player'
import { Spinner } from '@/integrations/livepeer/components/spinner'
import { useIsLivepeerApiKeySet } from '@/integrations/livepeer/hooks/use-livepeer-api-key'

const watchVideoPath = '/integration/livepeer/vod/watch/'
const videoPath = '/integration/livepeer/vod/'

export default function Page({ params }: { params: { assetId: string } }) {
  const isLivepeerApiKeySet = useIsLivepeerApiKeySet()

  const SHARE_HREF = videoPath + params.assetId

  const { data: asset, error } = useAsset({
    assetId: params.assetId,
  })

  if (error) {
    return (
      <div className="mt-20 flex w-full flex-col items-center justify-center">
        {!isLivepeerApiKeySet ? (
          <div className="card w-full">
            <FormLivepeerApiKey />
          </div>
        ) : (
          <>
            <h1 className="text-center">We are sorry, but your asset was not found &#128531; {/* &#128531; = 😓 */}</h1>

            <h2>
              Please try again{' '}
              <LinkComponent href={watchVideoPath}>
                <span className="underline underline-offset-2">here</span>
              </LinkComponent>
            </h2>
          </>
        )}
      </div>
    )
  }

  if (!asset || !asset.playbackId)
    return (
      <div className="flex w-full items-center justify-center py-20">
        <Spinner />
      </div>
    )

  return (
    <>
      <PlayerComponent containerBorderRadius="16px" playbackId={asset.playbackId} title={asset.name} type={PlayerType.FILE} />
      <ButtonShare href={SHARE_HREF} PlayerType={PlayerType.FILE} />
    </>
  )
}
