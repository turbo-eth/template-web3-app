// @ts-nocheck
import React from 'react'

import { ERC20Decimals, ERC20Name, ERC20Symbol, WalletERC20Balance } from '@turbo-eth/erc20-wagmi'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

import { Head } from '@/components/layout/Head'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/lib/design'

export default function Home() {
  const router = useRouter()

  const { address, chainId } = router.query
  return (
    <>
      <Head />
      <div className="flex-center flex flex-1 flex-col items-center justify-center text-center">
        <motion.div
          className="max-w-3xl px-5 xl:px-0"
          initial="hidden"
          whileInView="show"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}>
          <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="flex-center flex h-full flex-1 flex-col items-center justify-center ">
            <div className="card w-[420px] ">
              <img
                alt={`Token ${address} icon`}
                className="mx-auto h-12 w-12 rounded-full border-2 border-white shadow-md"
                src={`https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/${address}/logo.png`}
              />
              <h3 className="mt-4 text-2xl font-normal">
                <ERC20Name chainId={Number(chainId)} address={String(address || '')} /> (
                <ERC20Symbol className="" chainId={Number(chainId)} address={String(address || '')} />)
              </h3>
              <div className="mt-3">
                <span className="mr-2 font-bold">Decimals:</span> <ERC20Decimals address={String(address || '')} />
              </div>
              <hr className="my-3 dark:opacity-30" />
              <div className="mt-3">
                <span className="mr-2 font-bold">Balance:</span> <WalletERC20Balance address={String(address || '')} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
