'use client'

import { useMemo, useState } from 'react'

import { useCreateStream } from '@livepeer/react'
import { Broadcast } from '@livepeer/react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useForm } from 'react-hook-form'
import { FaCopy } from 'react-icons/fa'

import { useToast } from '@/lib/hooks/use-toast'

import { ButtonShare } from './button-share'
import { DialogStopStream } from './dialog-stop-stream'
import { FormLivepeerApiKey } from './form-livepeer-api-key'
import { PlayerComponent, PlayerType } from './player'
import { useIsLivepeerApiKeySet } from '../hooks/use-livepeer-api-key'

interface createStreamForm {
  streamName: string
}

enum StreamOrigin {
  OBS = 'OBS',
  BROWSER = 'BROWSER',
}

const OBS_URL = 'https://obsproject.com/'
const streamPath = '/integration/livepeer/livestream/'

export const CreateStream = ({ origin = StreamOrigin.BROWSER }: { origin: keyof typeof StreamOrigin }) => {
  const [streamName, setStreamName] = useState<string>('')
  const { register, handleSubmit } = useForm<createStreamForm>()
  const { mutate: createStream, data: streamData, status } = useCreateStream(streamName ? { name: streamName } : null)
  const isLivepeerApiKeySet = useIsLivepeerApiKeySet()
  const { toast, dismiss } = useToast()

  const isLoading = useMemo(() => status === 'loading', [status])

  function onSubmit() {
    createStream?.()
  }

  const streamRtpmIngestUrl = 'rtmp://rtmp.livepeer.com/live'

  const handleToast = ({ title, description }: { title: string; description: string }) => {
    toast({
      title,
      description,
    })

    setTimeout(() => {
      dismiss()
    }, 4200)
  }

  return (
    <div>
      {!isLivepeerApiKeySet ? (
        <div className="card">
          <FormLivepeerApiKey />
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          {!streamData && (
            <div className="card w-full">
              <form onSubmit={handleSubmit(onSubmit)}>
                <label>Stream Name</label>
                <input
                  required
                  className="input mt-4"
                  {...register('streamName')}
                  value={streamName}
                  onChange={(e) => setStreamName(e.target.value)}
                />
                <button className="btn btn-emerald mt-4 w-full" disabled={!streamName || isLoading} type="submit">
                  {isLoading ? 'Loading...' : 'Create Stream'}
                </button>
              </form>
            </div>
          )}
          {streamData && origin === StreamOrigin.OBS && (
            <>
              <div className="card w-full">
                <div className="flex flex-col gap-y-3">
                  <h2 className="text-center text-xl font-bold text-yellow-200">Your stream was succesfuly created!</h2>
                  <span>
                    To make the stream active, you must configure your{' '}
                    <a
                      className="font-semibold underline decoration-yellow-200 underline-offset-2"
                      href={OBS_URL}
                      rel="noopener noreferrer"
                      target="_blank">
                      OBS
                    </a>{' '}
                    by following the steps below:
                  </span>
                  <ol className="list-inside list-decimal">
                    <li>Open OBS</li>
                    <li>
                      Go to <span className="font-semibold">Settings</span>
                    </li>
                    <li>
                      Go to <span className="font-semibold">Stream</span>
                    </li>
                    <li>
                      Set Service to <span className="font-semibold">Custom...</span>
                    </li>
                    <li>
                      Set <span className="font-semibold">Server</span> to RTMP Ingest URL provided below
                    </li>
                    <li>
                      Set <span className="font-semibold">Stream Key</span> to the Stream Key provided below
                    </li>
                    <li>
                      Click <span className="font-semibold">Apply</span> and then <span className="font-semibold">OK</span>
                    </li>
                    <li>
                      Click <span className="font-semibold">Start Streaming</span>
                    </li>
                  </ol>
                  <span>
                    With this proccess, you will be able to stream whatever is set as <span className="font-semibold">Sources</span> on your OBS
                  </span>
                </div>
              </div>
              <div className="card w-full selection:bg-yellow-200">
                <div className="flex flex-col gap-y-4">
                  <div>
                    <label>RTMP Ingest URL</label>
                    <div className="mt-4 flex items-center gap-x-4">
                      <input className="input" value={streamRtpmIngestUrl} />
                      <CopyToClipboard text={streamRtpmIngestUrl}>
                        <span
                          className="flex-center flex h-7 w-7 cursor-pointer rounded-md bg-neutral-100 p-2 hover:bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-900"
                          onClick={() => {
                            handleToast({
                              title: 'Copied to clipboard!',
                              description: 'You can now paste the RTMP Ingest URL on OBS',
                            })
                          }}>
                          <FaCopy className=" text-neutral-600 dark:text-neutral-100" />
                        </span>
                      </CopyToClipboard>
                    </div>
                  </div>
                  <div>
                    <label>Stream Key</label>
                    <div className="mt-4 flex items-center gap-x-4">
                      <input className="input" value={streamData?.streamKey} />
                      <CopyToClipboard text={streamData?.streamKey}>
                        <span
                          className="flex-center flex h-7 w-7 cursor-pointer rounded-md bg-neutral-100 p-2 hover:bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-900"
                          onClick={() => {
                            handleToast({
                              title: 'Copied to clipboard!',
                              description: 'You can now paste the Stream Key on OBS',
                            })
                          }}>
                          <FaCopy className=" text-neutral-600 dark:text-neutral-100" />
                        </span>
                      </CopyToClipboard>
                    </div>
                  </div>
                  <ButtonShare href={streamPath + streamData.id} PlayerType={PlayerType.STREAM} />
                </div>
              </div>
              <div className="mt-4">
                <PlayerComponent
                  autoPlay={true}
                  containerBorderRadius="16px"
                  playbackId={streamData.playbackId}
                  title={streamName}
                  type={PlayerType.STREAM}
                />
              </div>
            </>
          )}
          {origin === StreamOrigin.BROWSER && streamData && (
            <div className="mt-4">
              <Broadcast
                streamKey={streamData.streamKey}
                theme={{
                  radii: { containerBorderRadius: '16px' },
                }}
              />
              <ButtonShare href={streamPath + streamData.id} PlayerType={PlayerType.STREAM} />
              <DialogStopStream />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
