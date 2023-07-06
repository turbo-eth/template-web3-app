import { useEffect, useState } from 'react'

import { SubscribeOptionsType } from '@pushprotocol/restapi/src/lib/channels'
import { useAccount } from 'wagmi'

import { useEthersSigner } from '@/lib/hooks/web3/use-ethers-signer'

import { Loadable } from './loadable'
import { ChannelCardProps } from './types'
import { useChannel, useSubscribeOrUnsubscribeToChannel, useUserSubscriptions } from '../hooks'

function strLimit(text: string, count: number) {
  return text.slice(0, count) + (text.length > count ? '...' : '')
}

export function ChannelCard({ env, channelAddress }: ChannelCardProps) {
  const { address } = useAccount()
  const signer = useEthersSigner()

  const { isLoading: subLoading, action: subscribe } = useSubscribeOrUnsubscribeToChannel({ action: 'subscribe' })
  const { isLoading: unsubLoading, action: unsubscribe } = useSubscribeOrUnsubscribeToChannel({ action: 'unsubscribe' })

  const { data: channel, isLoading: channelIsLoading } = useChannel({
    channel: channelAddress,
    env: env,
  })

  const { data: userSubscriptions, isLoading: userSubsIsLoading } = useUserSubscriptions({
    user: address as string,
    env,
  })

  const [userIsSubscribed, setUserIsSubscribed] = useState(false)

  useEffect(() => {
    if (!address || !userSubscriptions) {
      setUserIsSubscribed(false)
      return
    }

    setUserIsSubscribed(userSubscriptions.map((channel) => channel.channel.toLowerCase()).includes(channelAddress.toLowerCase()))
  }, [userSubscriptions])

  const toggleSubscribe = () => {
    if (!signer || !address) return

    const args: SubscribeOptionsType = {
      signer,
      userAddress: address,
      channelAddress,
      env,
    }

    const toggle = () => {
      return userIsSubscribed ? unsubscribe(args) : subscribe(args)
    }

    return toggle().then(() => {
      setUserIsSubscribed(!userIsSubscribed)
    })
  }

  return (
    <div className="card">
      <Loadable isLoading={channelIsLoading}>
        {channel && (
          <div className="flex space-x-4">
            <div>
              <img alt={channel.name} className="w-24" src={channel.icon} />
            </div>
            <div className="flex flex-col">
              <p className="text-xl">{channel.name}</p>
              <p className="text-xs">{strLimit(channel.info, 35)}</p>
              <div className="mt-auto">
                <Loadable isLoading={userSubsIsLoading || subLoading || unsubLoading}>
                  {userIsSubscribed ? (
                    <button
                      className="rounded-md border-2 border-pink-600 py-2 px-3 text-sm font-semibold text-slate-500	 shadow focus:outline-none"
                      onClick={() => toggleSubscribe()}>
                      Unsubscribe
                    </button>
                  ) : (
                    <button
                      className="rounded-md border-2 border-pink-600 bg-pink-600 py-2 px-3 text-sm font-semibold text-white shadow focus:outline-none"
                      onClick={() => toggleSubscribe()}>
                      Subscribe
                    </button>
                  )}
                </Loadable>
              </div>
            </div>
          </div>
        )}
      </Loadable>
    </div>
  )
}
