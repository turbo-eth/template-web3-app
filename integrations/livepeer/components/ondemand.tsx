import { useCallback, useMemo, useState } from 'react'

import { Player, useAssetMetrics, useCreateAsset } from '@livepeer/react'
import { useDropzone } from 'react-dropzone'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export const Asset = () => {
  const [video, setVideo] = useState<File | undefined>()
  const [playbackId, setPlaybackId] = useState<string>('')
  const {
    mutate: createAsset,
    data: asset,
    status,
    progress,
    error,
  } = useCreateAsset(
    video
      ? {
          sources: [{ name: video.name, file: video }] as const,
        }
      : null
  )
  const { data: metrics } = useAssetMetrics({
    assetId: asset?.[0].id,
    refetchInterval: 30000,
  })

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
      setVideo(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: {
      'video/*': ['.mp4'],
    },
    maxFiles: 1,
    onDrop,
  })

  const isLoading = useMemo(() => status === 'loading' || (asset?.[0] && asset[0].status?.phase !== 'ready'), [status, asset])

  const progressText = useMemo(
    () =>
      progress?.[0].phase === 'failed'
        ? 'Failed to process video.'
        : progress?.[0].phase === 'waiting'
        ? 'Waiting...'
        : progress?.[0].phase === 'uploading'
        ? `Uploading: `
        : progress?.[0].phase === 'processing'
        ? `Processing: `
        : null,
    [progress]
  )
  const shouldShowProgressbar = progress?.[0] ? progress[0].phase === 'processing' || progress[0].phase === 'uploading' : false
  const progressAsPercentage = progress?.[0]?.progress ? Math.round(progress[0].progress * 100) : 0

  return (
    <Tabs className="card flex w-full flex-col" defaultValue="upload-tab">
      <TabsList>
        <TabsTrigger value="upload-tab">Upload</TabsTrigger>
        <TabsTrigger value="fetch-playbackId">Fetch from PlaybackId</TabsTrigger>
      </TabsList>
      <TabsContent value="upload-tab">
        <div>
          {!asset && (
            <div
              className={cn(
                'transition-border flex flex-1 flex-col items-center rounded border-2 border-dashed border-[#eeeeee] bg-[#fafafa] p-4 text-[#bdbdbd] outline-none duration-150 ease-in-out',
                isFocused && 'border-[#2196f3]',
                isDragAccept && 'border-[#00e676]',
                isDragReject && 'border-[#ff1744]'
              )}
              {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag and drop or browse files</p>

              {error?.message && <p>{error.message}</p>}
            </div>
          )}

          {asset?.[0]?.playbackId && (
            <div className="relative z-0 mt-4 flex h-80 w-full justify-items-center rounded border-4 p-2">
              {' '}
              <Player title={asset[0].name} playbackId={asset[0].playbackId} />{' '}
            </div>
          )}

          <div className="flex flex-col justify-items-center">
            {metrics?.metrics?.[0] && <p className="mt-2">Views: {metrics?.metrics?.[0]?.startViews}</p>}

            {video ? <p className="mt-2">{video.name}</p> : <p className="mt-2">Select a video file to upload.</p>}

            {progressText && (
              <div className="mt-2 flex items-center">
                <p className="mr-2">{progressText}</p>
                {shouldShowProgressbar && <Progress value={progressAsPercentage}></Progress>}
                {shouldShowProgressbar && <p className="ml-2 w-[50px]">{progressAsPercentage}%</p>}
              </div>
            )}

            {!asset?.[0].id && (
              <Button
                className="mt-2"
                onClick={() => {
                  createAsset?.()
                }}
                disabled={isLoading || !createAsset}>
                Upload
              </Button>
            )}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="fetch-playbackId">
        <div className="flex flex-col justify-items-center">
          <label>
            Enter playback Id
            <Input
              className="mt-2"
              value={playbackId}
              onChange={(e) => setPlaybackId(e.target.value)}
              placeholder="PlaybackId from studio goes here"
            />
          </label>
          {playbackId && (
            <div className="relative z-0 mt-4 flex h-80 w-full justify-items-center rounded border-4 p-2">
              <Player playbackId={playbackId} />
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}
