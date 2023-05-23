import { useCallback, useMemo, useState } from 'react'

import { Player, useAssetMetrics, useCreateAsset } from '@livepeer/react'
import { useDropzone } from 'react-dropzone'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column' as 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
}

const focusedStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}

const flexColumnCenter = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'center',
}

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

  const progressFormatted = useMemo(
    () =>
      progress?.[0].phase === 'failed'
        ? 'Failed to process video.'
        : progress?.[0].phase === 'waiting'
        ? 'Waiting...'
        : progress?.[0].phase === 'uploading'
        ? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
        : progress?.[0].phase === 'processing'
        ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
        : null,
    [progress]
  )

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  return (
    <div>
      <div>
        {!asset && (
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <p>Drag and drop or browse files</p>

            {error?.message && <p>{error.message}</p>}
          </div>
        )}

        {asset?.[0]?.playbackId && <Player title={asset[0].name} playbackId={asset[0].playbackId} />}

        <div style={flexColumnCenter}>
          {metrics?.metrics?.[0] && <p>Views: {metrics?.metrics?.[0]?.startViews}</p>}

          {video ? <p>{video.name}</p> : <p>Select a video file to upload.</p>}

          {progressFormatted && <p>{progressFormatted}</p>}

          {!asset?.[0].id && (
            <Button
              onClick={() => {
                createAsset?.()
              }}
              disabled={isLoading || !createAsset}>
              Upload
            </Button>
          )}
        </div>
      </div>
      <div style={{ textAlign: 'center', margin: '10px 0px' }}>OR</div>
      <div style={flexColumnCenter}>
        <label>
          Enter playback Id
          <Input value={playbackId} onChange={(e) => setPlaybackId(e.target.value)} placeholder="PlaybackId from studio goes here" />
        </label>
        {playbackId && <Player playbackId={playbackId} />}
      </div>
    </div>
  )
}
