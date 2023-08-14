'use client'

import { ReactNode } from 'react'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Balancer from 'react-wrap-balancer'

import { IsDarkTheme } from '@/components/shared/is-dark-theme'
import { IsLightTheme } from '@/components/shared/is-light-theme'
import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/turbo-integrations'
import { cn } from '@/lib/utils'

const integrationData = turboIntegrations.pooltogether_v4
const depositPath = '/integration/pooltogether-v4/deposit'
const withdrawPath = '/integration/pooltogether-v4/withdraw'

export default function PoolTogetherLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

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
            className="text-gradient-sand my-6 text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl"
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
          <motion.div className="mt-8 flex justify-center gap-4 text-2xl sm:gap-6 md:gap-10 lg:gap-14" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <LinkComponent className={cn('btn hover:opacity-75', pathname === depositPath && 'opacity-50')} href={depositPath}>
              Deposit
            </LinkComponent>
            <LinkComponent className={cn('btn hover:opacity-75', pathname === withdrawPath && 'opacity-50')} href={withdrawPath}>
              Withdraw
            </LinkComponent>
          </motion.div>
        </motion.div>
      </div>
      {children}
    </>
  )
}
