'use client'

import { useNetwork } from 'wagmi'

import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { TransactionsTable } from '@/integrations/etherscan/components/transactions-table'
import { useEtherscanAccountTransactions } from '@/integrations/etherscan/hooks/use-etherscan-account-transactions'
import { BranchIsAuthenticated } from '@/integrations/siwe/components/branch-is-authenticated'
import { ButtonSIWELogin } from '@/integrations/siwe/components/button-siwe-login'
import { useUser } from '@/lib/hooks/use-user'

export default function PageDashboardTransactions() {
  return (
    <section className="p-10">
      <div className="flex items-center justify-between">
        <h3 className="text-4xl font-normal">Transactions</h3>
        <BranchIsWalletConnected>
          <BranchIsAuthenticated>
            <></>
            <div className="flex items-center gap-x-5 text-center">
              <span className="text-sm text-gray-600 dark:text-gray-100">Login to access the TurboETH free API</span>
              <ButtonSIWELogin className="btn btn-emerald" />
            </div>
          </BranchIsAuthenticated>
          <span className="">Connect wallet and login to access page</span>
        </BranchIsWalletConnected>
      </div>
      <hr className="my-5 opacity-50" />
      <BranchIsAuthenticated>
        <Table />
      </BranchIsAuthenticated>
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
