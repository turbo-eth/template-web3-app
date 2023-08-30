"use client"

import { useNetwork } from "wagmi"

import { useUser } from "@/lib/hooks/use-user"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"
import { TransactionsTable } from "@/integrations/etherscan/components/transactions-table"
import { useEtherscanAccountTransactions } from "@/integrations/etherscan/hooks/use-etherscan-account-transactions"
import { ButtonSIWELogin } from "@/integrations/siwe/components/button-siwe-login"
import { IsSignedIn } from "@/integrations/siwe/components/is-signed-in"
import { IsSignedOut } from "@/integrations/siwe/components/is-signed-out"

export default function PageDashboardTransactions() {
  return (
    <section className="p-10">
      <div className="flex items-center justify-between">
        <h3 className="text-4xl font-normal">Transactions</h3>
        <IsWalletConnected>
          <IsSignedOut>
            <div className="flex items-center gap-x-5 text-center">
              <span className="text-sm text-gray-600 dark:text-gray-100">
                Login to access the TurboETH free API
              </span>
              <ButtonSIWELogin className="btn btn-emerald" />
            </div>
          </IsSignedOut>
        </IsWalletConnected>
        <IsWalletDisconnected>
          <span className="">Connect wallet and login to access page</span>
        </IsWalletDisconnected>
      </div>
      <hr className="my-5 opacity-50" />
      <IsSignedIn>
        <Table />
      </IsSignedIn>
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

  return (
    <div className="w-full">
      {!isLoading && (
        <TransactionsTable className="w-full" data={data?.transactions} />
      )}
    </div>
  )
}
