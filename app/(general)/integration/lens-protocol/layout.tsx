'use client'
import { ReactNode } from 'react'

import { LensProvider } from '@lens-protocol/react-web'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Balancer from 'react-wrap-balancer'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { IsDarkTheme } from '@/components/shared/is-dark-theme'
import { IsLightTheme } from '@/components/shared/is-light-theme'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/turbo-integrations'
import { Navbar } from '@/integrations/lens-protocol/components/navbar'
import { lensProviderConfig } from '@/integrations/lens-protocol/lens-provider'

export default function LayoutIntegration({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex-center flex flex-1 flex-col items-center justify-center text-center">
        <motion.div
          animate="show"
          className="max-w-3xl px-5 text-center xl:px-0"
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
            <Image alt="Lens Protocol logo" className="mx-auto" height={200} src={turboIntegrations.lensProtocol.imgDark} width={300} />
          </IsLightTheme>
          <IsDarkTheme>
            <Image alt="Lens Protocol logo" className="mx-auto" height={200} src={turboIntegrations.lensProtocol.imgLight} width={300} />
          </IsDarkTheme>
          <motion.h1
            className="text-gradient-sand mt-3 text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}>
            Lens Protocol
          </motion.h1>
          <motion.p className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <Balancer>{turboIntegrations.lensProtocol.description}</Balancer>
          </motion.p>
          <motion.div className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <LinkComponent isExternal href={turboIntegrations.lensProtocol.url}>
              <button className="btn btn-primary">Documentation</button>
            </LinkComponent>
          </motion.div>
        </motion.div>

        <div className="container mx-auto mt-10  max-w-screen-xl gap-6 text-center">
          <IsWalletDisconnected>
            <WalletConnect className="mx-auto inline-block" />
          </IsWalletDisconnected>
        </div>
      </div>
      <section className="w-full lg:mt-10 max-w-screen-2xl">
        <IsWalletConnected>
          <LensProvider config={lensProviderConfig}>
            <div className="shadow-md pb-8 w-full rounded-xl dark:bg-neutral-900">
              <Navbar />
              <div className="container px-8 flex w-full flex-col items-center">{children}</div>
            </div>
          </LensProvider>
        </IsWalletConnected>
      </section>
    </>
  )
}
