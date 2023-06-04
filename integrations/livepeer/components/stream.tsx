'use client'

import { useState } from 'react'

import { Player, useCreateStream } from '@livepeer/react'

import { LinkComponent } from '@/components/shared/link-component'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useLivepeerClient } from '../use-livepeer-client'

export const Stream = () => {
  const [streamName, setStreamName] = useState<string>('')
  const { mutate: createStream, data: stream, status } = useCreateStream(streamName ? { name: streamName } : null)
  const [currentState, setCurrentState] = useState(['create-livestream'])
  const isLoading = status === 'loading'
  const { updateStream, deleteStream } = useLivepeerClient()
  const [streamStatus, setStreamStatus] = useState('active')
  const [showPlayer, setShowPlayer] = useState(false)
  return (
    <div className="card w-full">
      <h3 className="my-4">Creating a livestream with livepeer is easy!</h3>
      <Accordion className="w-full" type="multiple" value={currentState} onValueChange={(accordianState) => setCurrentState(accordianState)}>
        <AccordionItem value="create-livestream">
          <AccordionTrigger>1. Give your a livestream a name</AccordionTrigger>
          <AccordionContent>
            <Input className="m-2 w-auto" type="text" placeholder="Stream name" onChange={(e) => setStreamName(e.target.value)} value={streamName} />
            <Button
              onClick={() => {
                createStream?.()
                setCurrentState(['stream-with-app'])
                setShowPlayer(true)
              }}
              disabled={isLoading || !createStream}>
              Create Stream
            </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="stream-with-app" disabled={!showPlayer}>
          <AccordionTrigger>2. Start streaming from an app like OBS</AccordionTrigger>
          <AccordionContent>
            <div className="mt-2">
              Please enter these details in the obs for testing
              <div className="my-2">
                <span>
                  rtmp ingest url: <strong>{stream?.rtmpIngestUrl.replace(`/${stream.streamKey}`, '')}</strong>
                </span>
                <span className="ml-2 inline-block">
                  StreamKey: <strong>{stream?.streamKey}</strong>
                </span>
              </div>
              <div className="border-2 py-3 pl-2">
                <h4>Note: Not sure how to stream ? </h4>
                Refer to this documentation{' '}
                <LinkComponent className="underline" href="https://docs.livepeer.org/guides/developing/stream-via-obs" isExternal>
                  Streaming with OBS
                </LinkComponent>
              </div>
              <div className="my-2">
                Watch the livestream once it is started{' '}
                <Button
                  title={stream?.isActive ? 'View the stream' : 'The stream is inactive/deleted, please create a new stream'}
                  className="ml-2"
                  size="sm"
                  onClick={() => setCurrentState(['live-stream'])}>
                  Let's go
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="live-stream" disabled={!showPlayer}>
          <AccordionTrigger>3. Watch the livestream !</AccordionTrigger>
          <AccordionContent>
            <div className="relative z-0 mt-4 flex h-80 w-full flex-col justify-items-center rounded border-4 p-2">
              <div className="border-2 py-3 pl-2">
                <h4>
                  Ask others to join viewing the livestream by accessing with this playbackId <strong>{stream?.playbackId}</strong>
                </h4>
              </div>
              <div className="my-2 flex w-full justify-end">
                {streamStatus === 'active' && (
                  <Button
                    size="sm"
                    onClick={() => {
                      updateStream(stream.id, {
                        suspended: true,
                      }).then(() => {
                        setStreamStatus('suspend')
                      })
                    }}>
                    Pause the stream
                  </Button>
                )}
                {streamStatus === 'suspend' && (
                  <Button
                    size="sm"
                    onClick={() => {
                      updateStream(stream.id, {
                        suspended: false,
                      }).then(() => {
                        setStreamStatus('active')
                      })
                    }}>
                    Resume the stream
                  </Button>
                )}
                <Button
                  size="sm"
                  className="ml-2"
                  onClick={() => {
                    deleteStream(stream.id).then(() => {
                      setCurrentState(['create-livestream'])
                      setStreamStatus('active')
                      setStreamName('')
                      setShowPlayer(false)
                    })
                  }}>
                  Delete the stream
                </Button>
              </div>
              {showPlayer && <Player title={stream?.name} playbackId={stream?.playbackId} autoPlay muted />}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
