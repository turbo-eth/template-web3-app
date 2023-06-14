'use client'

import { motion } from 'framer-motion'

import { PoolTogetherFormWithdraw } from '@/actions/pooltogether-v4/components/form-yield-source-prize-pool-withdraw'
import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'

export default function PoolTogetherWithdraw() {
  return (
    <motion.div
      className="flex-center flex h-full w-full"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      initial="hidden"
      whileInView="show"
      animate="show"
      viewport={{ once: true }}>
      <IsWalletConnected>
        <PoolTogetherFormWithdraw />
      </IsWalletConnected>
      <IsWalletDisconnected>
        <div className="flex flex-col items-center justify-center">
          <h3 className="mb-3 text-lg font-normal">Connect your wallet to withdraw from PoolTogether.</h3>
          <WalletConnect />
        </div>
      </IsWalletDisconnected>
    </motion.div>
  )
}
