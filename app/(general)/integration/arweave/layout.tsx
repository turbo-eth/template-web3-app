'use client'
import { ReactNode } from 'react'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Balancer from 'react-wrap-balancer'

import { IsDarkTheme } from '@/components/shared/is-dark-theme'
import { IsLightTheme } from '@/components/shared/is-light-theme'
import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/turbo-integrations'
import { ArweaveWalletProvider } from '@/integrations/arweave/context/arweave-wallet'

import { SideBar } from './sidebar'

const integrationData = turboIntegrations.arweave

export default function ArweaveLayout({ children }: { children: ReactNode }) {
  return (
    <ArweaveWalletProvider>
      <motion.div
        animate="show"
        className="flex-center w-full flex-col items-center justify-center text-center"
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
        <motion.div className="max-w-3xl content-center items-center px-5 text-center xl:px-0" variants={FADE_DOWN_ANIMATION_VARIANTS}>
          <IsLightTheme>
            <Image alt="Starter logo" className="mx-auto" height={100} src={integrationData.imgDark} width={100} />
          </IsLightTheme>
          <IsDarkTheme>
            <Image alt="Starter logo" className="mx-auto" height={100} src={integrationData.imgLight} width={100} />
          </IsDarkTheme>
          <motion.h1
            className="text-gradient-sand my-8 text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}>
            {integrationData.name}
          </motion.h1>
          <motion.p className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <Balancer>{integrationData.description}</Balancer>
          </motion.p>
          <motion.div className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <LinkComponent className="btn btn-primary" href={integrationData.url}>
              Documentation
            </LinkComponent>
          </motion.div>
        </motion.div>
        <motion.div className="container my-4 w-full text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
          <section className="mt-10 flex flex-col overflow-hidden rounded-xl bg-neutral-200 dark:bg-neutral-900 sm:flex-row">
            <SideBar />
            <div className="flex-center min-h-[600px] flex-1 flex-col items-center justify-center p-10 text-center">{children}</div>
          </section>
        </motion.div>
      </motion.div>
    </ArweaveWalletProvider>
  )
}
