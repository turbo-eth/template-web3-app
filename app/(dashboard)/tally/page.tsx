'use client'

import { motion } from 'framer-motion'

import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { TallyDaoDashboard } from '@/integrations/tally/components/tally-dao-dashboard'

export default function TallyPage() {
  // Popular DAO Governor IDs (can be configured)
  // Example: Uniswap Governor Alpha on Ethereum mainnet
  const DEFAULT_GOVERNOR_ID = '0x408ed6354d4973f66138c91495f2a2eb9e2a5f98'

  return (
    <motion.div
      className="flex-center flex size-full flex-col"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      initial="hidden"
      whileInView="show"
      animate="show"
      viewport={{ once: true }}>
      <div className="w-full max-w-4xl px-4">
        <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="mb-8 text-center">
          <h1 className="text-4xl font-bold">Tally DAO Explorer</h1>
          <p className="mt-2 text-gray-500">Explore DAOs, proposals, and delegates powered by Tally API</p>
        </motion.div>

        <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
          <TallyDaoDashboard initialGovernorId={DEFAULT_GOVERNOR_ID} />
        </motion.div>
      </div>
    </motion.div>
  )
}
