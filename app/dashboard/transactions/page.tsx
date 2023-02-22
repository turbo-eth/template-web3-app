'use client'

import { motion } from 'framer-motion'
import { useNetwork } from 'wagmi'

import TransactionsTable from '@/components/blockchain/transactions-table'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { useAccountTransactions } from '@/hooks/etherscan/use-account-transactions'

export default function PageDashboardTransaction() {
  const { chain } = useNetwork()
  const { isLoading, data } = useAccountTransactions({
    chainId: chain?.id || 1,
  })

  return (
    <section className="p-10">
      <h3 className="text-4xl font-normal">Transactions</h3>
      <hr className="my-5 opacity-50" />
      <motion.div
        className="flex-center flex h-full w-full"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}>
        <div className="w-full">{!isLoading && <TransactionsTable data={data?.transactions} className="w-full" />}</div>
      </motion.div>
    </section>
  )
}
