'use client'

import { WalletAddress, WalletBalance, WalletEnsName } from '@turbo-eth/core-wagmi'
import { motion } from 'framer-motion'

import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'

export default function PageDashboardAccount() {
  return (
    <motion.div
      className="flex-center flex h-full w-full"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      initial="hidden"
      whileInView="show"
      animate="show"
      viewport={{ once: true }}>
      <div className="flex-center col-span-12 flex flex-col lg:col-span-9">
        <div className="flex flex-col text-center">
          <WalletEnsName className="text-5xl" />
          <WalletAddress className="my-5 block text-xl font-medium" />
          <WalletBalance decimals={7} className="font-primary text-3xl font-light" />
        </div>
      </div>
    </motion.div>
  )
}
