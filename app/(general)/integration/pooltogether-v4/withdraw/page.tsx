'use client'

import { motion } from 'framer-motion'

import { FormWithdraw } from '@/actions/pooltogether-v4/components/form-yield-source-prize-pool-withdraw'
import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'

export default function PoolTogetherWithdraw() {
  return (
    <>
      <motion.div
        className="flex-center flex h-full w-full"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}>
        <BranchIsWalletConnected>
          <FormWithdraw />
          <div className="flex flex-col items-center justify-center">
            <h3 className="mb-3 text-lg font-normal">Connect your wallet to withdraw from PoolTogether.</h3>
            <WalletConnect />
          </div>
        </BranchIsWalletConnected>
      </motion.div>
    </>
  )
}
