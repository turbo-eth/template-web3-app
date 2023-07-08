import { Loadable } from './loadable'
import { SubscribeButton } from './subscribe-button'
import { ChannelCardProps } from './types'
import { useChannel } from '../hooks'

function strLimit(text: string, count: number) {
  return text.slice(0, count) + (text.length > count ? '...' : '')
}

export function ChannelCard({ env, channelAddress }: ChannelCardProps) {
  const {
    data: channel,
    isLoading: channelIsLoading,
    error,
  } = useChannel({
    channel: channelAddress,
    env: env,
  })

  if (error) return <>Error loading channel...</>

  return (
    <Loadable isLoading={channelIsLoading}>
      {channel && (
        <div className="flex w-full space-x-4">
          <div className="flex flex-col">
            <img alt={channel.name} src={channel.icon} />
          </div>
          <div className="flex grow flex-col">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xl">{channel.name}</p>
            <p className="hidden text-xs md:block">{strLimit(channel.info, 35)}</p>
            <div className="mt-auto">
              <SubscribeButton channelAddress={channelAddress} env={env} />
            </div>
          </div>
        </div>
      )}
    </Loadable>
  )
}
