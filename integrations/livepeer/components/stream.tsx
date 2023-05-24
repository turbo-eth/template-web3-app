'use client'

import { useState } from 'react'

import { Player, useCreateStream } from '@livepeer/react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const Stream = () => {
  const [streamName, setStreamName] = useState<string>('')
  const { mutate: createStream, data: stream, status } = useCreateStream(streamName ? { name: streamName } : null)

  const isLoading = status === 'loading'
  return (
    <div className="card w-full">
      <label>
        Enter a stream name
        <Input className="my-5" type="text" placeholder="Stream name" onChange={(e) => setStreamName(e.target.value)} />
      </label>
      {stream?.playbackId && (
        <div className="relative z-0 mt-4 flex h-80 w-full justify-items-center rounded border-4 p-2">
          <Player title={stream?.name} playbackId={stream?.playbackId} autoPlay muted />
        </div>
      )}

      <div>
        {!stream && (
          <Button
            onClick={() => {
              createStream?.()
            }}
            disabled={isLoading || !createStream}>
            Create Stream
          </Button>
        )}
      </div>
      {stream && (
        <div className="card mt-2">
          Please enter these details in the obs for testing
          <div className="my-2">
            rtmp ingest url: <strong>{stream?.rtmpIngestUrl.replace(`/${stream.streamKey}`, '')}</strong>
          </div>
          <div>
            StreamKey: <strong>{stream?.streamKey}</strong>
          </div>
        </div>
      )}
    </div>
  )
}
