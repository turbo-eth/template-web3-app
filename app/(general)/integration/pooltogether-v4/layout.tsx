'use client'
import { ReactNode } from 'react'

import classNames from 'clsx'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'

import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/turbo-integrations'

export default function PoolTogetherLayout({ children }: { children: ReactNode }) {
  const classes = classNames('GeneralLayout', 'bg-gradient-dark flex flex-col pb-10 lg:pb-12')
  const button = classNames(
    'bg-gradient-pooltogether flex max-w-fit text-xl font-bold items-center justify-center space-x-2 rounded-full px-5 py-2 text-white transition hover:scale-105'
  )
  return (
    <>
      <div className={classes}>
        <div className="relative flex flex-1">
          <div className="flex-center flex h-full flex-1 flex-col items-center justify-center text-center">
            <motion.div
              className="max-w-3xl px-5 xl:px-0"
              initial="hidden"
              whileInView="show"
              animate="show"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}>
              <Image alt="PoolTogether Icon" className="mx-auto mb-5" src={turboIntegrations.pooltogether_v4.imgDark} width={100} height={100} />
              <motion.h1
                className="text-gradient-pooltogether pb-5 text-center text-2xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem]"
                variants={FADE_DOWN_ANIMATION_VARIANTS}>
                PoolTogether
              </motion.h1>
              <motion.p className="mt-6 text-center text-gray-500 dark:text-gray-200 md:text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
                <Balancer className="text-xl font-semibold">Start interacting with PoolTogether today</Balancer>
              </motion.p>
              <motion.div className="mx-auto mt-6 flex items-center justify-center space-x-8" variants={FADE_DOWN_ANIMATION_VARIANTS}>
                <Link href="/integration/pooltogether-v4/deposit">
                  <p className={button}>Deposit</p>
                </Link>
                <Link href="/integration/pooltogether-v4/withdraw">
                  <p className={button}>Withdraw</p>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <main className="flex-center flex flex-1 flex-col md:px-10">{children}</main>
    </>
  )
}
