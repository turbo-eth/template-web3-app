'use client'

import { useState } from 'react'

import '@/integrations/push-protocol/styles/index.css'
import { ApiNotificationType, SignerType } from '@pushprotocol/restapi'
import { motion } from 'framer-motion'
import Balancer from 'react-wrap-balancer'
import { useAccount } from 'wagmi'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { LinkComponent } from '@/components/shared/link-component'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/turbo-integrations'
import { ChannelCard, Chat, ENV, NotificationFeed, getMockedNotification, useNotifications } from '@/integrations/push-protocol'
import { useEthersSigner } from '@/lib/hooks/web3/use-ethers-signer'

export default function PageIntegration() {
  const { address } = useAccount()
  const signer = useEthersSigner()

  const [mockedNotifications, setMockedNotifications] = useState<ApiNotificationType[]>([])

  const { data: notifications, isLoading: notificationsIsLoading } = useNotifications({
    user: address as string,
    env: ENV.STAGING,
    spam: false,
  })

  const { data: spamNotifications, isLoading: spamIsLoading } = useNotifications({
    user: address as string,
    env: ENV.STAGING,
    spam: true,
  })

  const [channelAddress, setChannelAddress] = useState('0x74415Bc4C4Bf4Baecc2DD372426F0a1D016Fa924')
  const [env, setEnv] = useState(ENV.STAGING)

  // Shows mock notificatins in inbox after subscribing if there is no notifications to show.
  const handleSubscribe = () => {
    if ([...(notifications || []), ...mockedNotifications].length > 0) return

    const mockedNotification: ApiNotificationType = getMockedNotification({ env })
    setMockedNotifications([...mockedNotifications, mockedNotification])
  }

  return (
    <>
      <div className="flex-center flex flex-1 flex-col items-center justify-center">
        <motion.div
          animate="show"
          className="max-w-screen-xl px-5 text-center xl:px-0"
          initial="hidden"
          viewport={{ once: true }}
          whileInView="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}>
          <motion.h1
            className="text-gradient-sand my-4 text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}>
            {turboIntegrations.push_protocol.name}
          </motion.h1>
          <motion.p className="my-4 text-lg" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <Balancer>{turboIntegrations.push_protocol.description}</Balancer>
          </motion.p>
          <motion.div className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <LinkComponent isExternal href={turboIntegrations.push_protocol.url}>
              <button className="btn btn-primary">Documentation</button>
            </LinkComponent>
          </motion.div>
        </motion.div>
      </div>
      <section className="w-full lg:mt-10">
        <div className="container flex w-full flex-col items-center">
          <IsWalletDisconnected>
            <WalletConnect />
          </IsWalletDisconnected>
          <IsWalletConnected>
            <div className="mb-3 w-full">
              <div className="card flex flex-col">
                <NotificationFeed
                  notifications={[...(notifications || []), ...mockedNotifications]}
                  notificationsIsLoading={notificationsIsLoading}
                  spamNotifications={spamNotifications}
                  spamNotificationsIsLoading={spamIsLoading}
                />
                <hr className="my-4" />
                <div className="flex items-center justify-between">
                  <h3 className="text-center">Notifications</h3>
                  <p className="text-center text-sm text-gray-500">Check inbox&spam notifications on Push</p>
                </div>
              </div>
            </div>
            <div className="mb-3 w-full">
              <div className="card">
                <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                  <div className="grow">
                    <input
                      className="input"
                      defaultValue={channelAddress}
                      placeholder="Enter Channel Address"
                      onChange={(e) => setChannelAddress(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-56">
                    <Select value={env} onValueChange={(value) => setEnv(value as ENV)}>
                      <SelectTrigger className="input text-gray-600 placeholder:text-neutral-400 dark:text-gray-600 dark:placeholder:text-neutral-400">
                        <SelectValue placeholder={env === ENV.STAGING ? 'Goerli' : 'Mainnet'}>
                          {env === ENV.STAGING ? 'Goerli' : 'Mainnet'}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-white">
                        <SelectItem value={ENV.STAGING}>Goerli</SelectItem>
                        <SelectItem value={ENV.PROD}>Mainnet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex w-full flex-col space-y-4  lg:flex-row lg:space-y-0 lg:space-x-4">
                  <div className="grow">
                    <ChannelCard channelAddress={channelAddress} env={env} onSubscribe={() => handleSubscribe()} />
                  </div>
                </div>
                <hr className="my-4" />
                <div className="flex items-center justify-between">
                  <h3 className="text-center">Channel Preview</h3>
                  <p className="text-center text-sm text-gray-500">Preview and subscribe channel</p>
                </div>
              </div>
            </div>
            <div className="mb-3 w-full">
              <div className="card">
                <Chat account={address as string} signer={signer as SignerType} supportAddress={'0x74415Bc4C4Bf4Baecc2DD372426F0a1D016Fa924'} />

                <hr className="my-4" />
                <div className="flex items-center justify-between">
                  <h3 className="text-center">Chat</h3>
                  <p className="text-center text-sm text-gray-500">Chat with anyone</p>
                </div>
              </div>
            </div>
          </IsWalletConnected>
        </div>
      </section>
    </>
  )
}
