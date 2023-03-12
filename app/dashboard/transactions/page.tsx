'use client'

import { motion } from 'framer-motion'
import { useNetwork } from 'wagmi'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { BranchIsAuthenticated } from '@/components/shared/branch-is-authenticated'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import TransactionsTable from '@/integrations/etherscan/components/transactions-table'
import { useEtherscanAccountTransactions } from '@/integrations/etherscan/hooks/use-etherscan-account-transactions'
import { ButtonSIWELogin } from '@/integrations/siwe/components/button-siwe-login'
import useUser from '@/lib/hooks/app/use-user'

export default function PageDashboardTransaction() {
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
        <BranchIsAuthenticated>
          <Table />
          <div className="text-center">
            <ButtonSIWELogin className="btn btn-emerald" label="Web3 Connect" />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-100">Authenticate to access application API</p>
          </div>
        </BranchIsAuthenticated>
      </motion.div>
    </section>
  )
}

const Table = () => {
  const { user } = useUser()
  const { chain } = useNetwork()
  const { isLoading, data } = useEtherscanAccountTransactions(
    {
      chainId: chain?.id || 1,
    },
    [user]
  )

  return <div className="w-full">{!isLoading && <TransactionsTable data={data?.transactions} className="w-full" />}</div>
}
