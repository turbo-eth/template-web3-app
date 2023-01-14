import React from 'react'

import { ERC20Decimals, ERC20Name, ERC20Symbol, WalletERC20Balance } from '@turbo-eth/erc20-wagmi'
import { useRouter } from 'next/router'

import { Head } from '../components/layout/Head'

export default function Home() {
  const router = useRouter()

  const { address, chainId } = router.query
  return (
    <>
      <Head />
      <main className="flex flex-1">
        <div className="flex-center flex h-full flex-1 flex-col items-center justify-center ">
          <div className="card w-[420px] ">
            <img
              alt={`Token ${address} icon`}
              className="h-12 w-12 rounded-full border-2 border-white shadow-md"
              src={`https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/${address}/logo.png`}
            />
            <h3 className="mt-4 text-2xl font-normal">
              <ERC20Name chainId={Number(chainId)} address={String(address || '')} /> (
              <ERC20Symbol className="" chainId={Number(chainId)} address={String(address || '')} />)
            </h3>
            <ERC20Decimals chainId={Number(chainId)} address={String(address || '')} />)
            <div className="mt-3">
              <span className="mr-2 font-bold">Decimals:</span> <ERC20Decimals address={String(address || '')} />
            </div>
            <hr className="my-3 dark:opacity-30" />
            <div className="mt-3">
              <span className="mr-2 font-bold">Balance:</span> <WalletERC20Balance address={String(address || '')} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
