import { useEffect, useState } from 'react'

import Image from 'next/image'
import CopyToClipboard from 'react-copy-to-clipboard'
import { HiUser } from 'react-icons/hi'
import { LuExternalLink } from 'react-icons/lu'

import { LinkComponent } from '@/components/shared/link-component'

import { Loadable } from './loadable'
import { SubscribeButton } from './subscribe-button'
import { ENV } from '..'
import { useChannel } from '../hooks'
import { strLimit, truncateAddress } from '../utils/helpers'

export type ChannelCardProps = {
  channelAddress: string
  env: ENV
  onSubscribe?: () => void
  onUnsubscribe?: () => void
}

export function ChannelCard({ env, channelAddress, onSubscribe, onUnsubscribe }: ChannelCardProps) {
  const [copied, setCopied] = useState(false)

  const {
    data: channel,
    isLoading: channelIsLoading,
    error,
  } = useChannel({
    channel: channelAddress,
    env: env,
  })

  useEffect(() => {
    if (!copied) return
    setTimeout(() => setCopied(false), 3000)
  }, [copied])

  if (!channelAddress) return <>No Channel Address Specified...</>
  if (error) return <>Error loading channel...</>

  return (
    <Loadable isLoading={channelIsLoading}>
      {channel && (
        <div className="flex w-full space-x-4">
          <div className="relative flex shrink-0 flex-col">
            <Image alt={channel.name} className="w-10 rounded-xl md:w-32" height={100} src={channel.icon} width={100} />
          </div>
          <div className="flex grow flex-col ">
            <LinkComponent className="flex max-w-full flex-wrap items-center gap-2 overflow-hidden" href={channel.url}>
              <p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap underline-offset-2 transition-all hover:underline md:text-xl">
                {channel.name}
              </p>
              <LuExternalLink />
            </LinkComponent>
            <p className="hidden text-xs md:block">{strLimit(channel.info, 100)}</p>
            <div className="mt-auto">
              <div className="mt-2 flex flex-col items-start space-y-2 md:flex-row md:items-end md:space-y-0 md:space-x-2">
                <SubscribeButton channelAddress={channelAddress} env={env} onSubscribe={onSubscribe} onUnsubscribe={onUnsubscribe} />
                <div className="flex flex-wrap gap-2">
                  <div className="flex space-x-1 rounded-full bg-pink-200 px-2 py-1 text-xs text-pink-600">
                    <HiUser />
                    <div>{channel.subscriber_count}</div>
                  </div>
                  <CopyToClipboard text={channel.channel} onCopy={() => setCopied(true)}>
                    <button className="rounded-full bg-slate-200 px-2 py-1 text-xs text-gray-700">
                      {copied ? <>Copied!</> : <>{truncateAddress(channel.channel)}</>}
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Loadable>
  )
}
