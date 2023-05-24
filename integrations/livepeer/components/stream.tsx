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
    <div>
      <label>
        Enter a stream name
        <Input style={{ margin: '10px 0px' }} type="text" placeholder="Stream name" onChange={(e) => setStreamName(e.target.value)} />
      </label>

      {stream?.playbackId && <Player title={stream?.name} playbackId={stream?.playbackId} autoPlay muted />}

      <div>
        {!stream && (
          <Button
            style={{ margin: '10px 0px' }}
            onClick={() => {
              createStream?.()
            }}
            disabled={isLoading || !createStream}>
            Create Stream
          </Button>
        )}
      </div>
      {stream && (
        <div>
          Please enter these details in the obs for testing
          <div>
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
