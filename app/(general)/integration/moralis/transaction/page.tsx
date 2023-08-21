'use client'

import { motion } from 'framer-motion'

import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import {
  FormGetInternalTransactions,
  FormGetTransaction,
  FormGetTransactionVerbose,
  FormGetWalletTransactions,
  FormGetWalletTransactionsVerbose,
} from '@/integrations/moralis/components/transaction'

export default function PageIntegration() {
  return (
    <motion.div
      animate="show"
      className="container mx-auto mt-10 flex w-full max-w-screen-lg flex-col gap-y-8"
      initial="hidden"
      variants={FADE_DOWN_ANIMATION_VARIANTS}>
      <FormGetTransaction />
      <FormGetTransactionVerbose />
      <FormGetInternalTransactions />
      <FormGetWalletTransactions />
      <FormGetWalletTransactionsVerbose />
    </motion.div>
  )
}
