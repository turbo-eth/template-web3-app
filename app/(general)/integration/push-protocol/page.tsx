'use client'

import { motion } from 'framer-motion'
import Balancer from 'react-wrap-balancer'
import { useAccount } from 'wagmi'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/turbo-integrations'
import { ChannelCard, ENV, NotificationFeed, useNotifications } from '@/integrations/push-protocol'

export default function PageIntegration() {
  const { address } = useAccount()

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
                  notifications={notifications}
                  notificationsIsLoading={notificationsIsLoading}
                  spamNotifications={spamNotifications}
                  spamNotificationsIsLoading={spamIsLoading}
                />
              </div>
            </div>
            <div className="mb-3 w-full">
              <div className="card">
                <div className="flex space-x-4">
                  <div className="w-1/3">
                    <ChannelCard channelAddress={'0x2AEcb6DeE3652dA1dD6b54D5fd4f7D8F43DaEb78'} env={ENV.STAGING} />
                  </div>
                  <div className="w-1/3">
                    <ChannelCard channelAddress={'0x9601f08b9EcB981D273B72e7f33964Cb98f977fe'} env={ENV.STAGING} />
                  </div>
                  <div className="w-1/3">
                    <ChannelCard channelAddress={'0x74415Bc4C4Bf4Baecc2DD372426F0a1D016Fa924'} env={ENV.STAGING} />
                  </div>
                </div>
              </div>
            </div>
          </IsWalletConnected>
        </div>
      </section>
    </>
  )
}
