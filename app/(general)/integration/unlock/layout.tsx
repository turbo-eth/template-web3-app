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

const integrationData = turboIntegrations.unlock

export default function UnlockLayoutIntegration({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex-center flex-col items-center justify-center text-center">
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
            <LinkComponent href={integrationData.url}>
              <button className="btn btn-primary">Documentation</button>
            </LinkComponent>
          </motion.div>
        </motion.div>
      </div>
      <section>{children}</section>
    </>
  )
}
