'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Balancer from 'react-wrap-balancer'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { IsDarkTheme } from '@/components/shared/is-dark-theme'
import { IsLightTheme } from '@/components/shared/is-light-theme'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/documentation'
import DiscoIssueCredentials from '@/integrations/disco/components/disco-issue-credentials'

export default function DiscoIssue() {
  return (
    <div className="flex-center flex w-4/5 flex-1 flex-col items-center justify-center">
      <motion.div
        animate="show"
        className=" max-w-3xl px-5 text-center xl:px-0"
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
        <IsLightTheme>
          <Image alt="Disco logo" className="mx-auto rounded-full" height={100} src={turboIntegrations.disco.imgDark} width={100} />
        </IsLightTheme>
        <IsDarkTheme>
          <Image alt="Disco logo" className="mx-auto rounded-full" height={100} src={turboIntegrations.disco.imgLight} width={100} />
        </IsDarkTheme>

        <motion.h2
          className="text-gradient-sand my-8 text-center text-3xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-5xl md:leading-[6rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}>
          {turboIntegrations.discoProgrammaticIssuance.name}
        </motion.h2>
        <motion.p className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
          <Balancer>{turboIntegrations.discoProgrammaticIssuance.description}</Balancer>
        </motion.p>
        {/* <motion.div className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
          <LinkComponent isExternal href={turboIntegrations.discoProgrammaticIssuance.url}>
            <button className="btn btn-primary">Documentation</button>
          </LinkComponent>
        </motion.div> */}
      </motion.div>
      <hr className="my-5" />

      <DiscoIssueCredentials />

      <IsWalletDisconnected>
        <WalletConnect className="mx-auto inline-block" />
      </IsWalletDisconnected>
    </div>
  )
}
