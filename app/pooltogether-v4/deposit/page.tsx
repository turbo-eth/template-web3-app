'use client'

import { motion } from 'framer-motion'

import { FormDeposit } from '@/actions/pooltogether-v4/components/form-yield-source-prize-pool-deposit'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'

export default function PageDashboardAccount() {
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
          <FormDeposit />
          <h3 className="text-lg font-normal">Connect your wallet to deposit on PoolTogether.</h3>
        </BranchIsWalletConnected>
      </motion.div>
    </>
  )
}
