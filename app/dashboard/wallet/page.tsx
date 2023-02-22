'use client'
import { BlockNumber, WalletAddress, WalletBalance, WalletEnsName, WalletNonce } from '@turbo-eth/core-wagmi'
import { motion } from 'framer-motion'

import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'

export default function Home() {
  return (
    <>
      <motion.div
        className="flex-center flex h-full w-full"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}>
        <div className="card w-[420px]">
          <h3 className="text-2xl font-normal">Account</h3>
          <hr className="my-3 dark:opacity-30" />
          <div className="mt-3">
            <span className="mr-1 font-bold">Address:</span> <WalletAddress truncate />
          </div>
          <div className="mt-3">
            <span className="mr-1 font-bold">Balance:</span> <WalletBalance />
          </div>
          <div className="mt-3">
            <span className="mr-1 font-bold">Nonce:</span> <WalletNonce />
          </div>
          <hr className="my-3 dark:opacity-30" />
        </div>
      </motion.div>
    </>
  )
}
