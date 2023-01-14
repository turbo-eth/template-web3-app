import { BlockNumber, WalletAddress, WalletBalance, WalletEnsName, WalletNonce } from '@turbo-eth/core-wagmi'

import { Head } from '../components/layout/Head'

export default function Home() {
  return (
    <>
      <Head />
      <main className="flex flex-1">
        <div className="flex-center flex h-full flex-1 flex-col items-center justify-center ">
          <div className="card w-[420px] ">
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
            <div className="mt-3">
              <span className="mr-1 font-bold">ENS:</span> <WalletEnsName />
            </div>
            <hr className="my-3 dark:opacity-30" />
            <span className="text-xs">
              # <BlockNumber />
            </span>
          </div>
        </div>
      </main>
    </>
  )
}
