'use client'

import { motion } from 'framer-motion'

import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { ERC20Balance, ERC20Decimals, ERC20Name, ERC20Symbol } from '@/integrations/erc20/components/erc20-read'

export default function ERC20({ params }: { params: { address: string; chainId: string } }) {
  const { address, chainId } = params
  return (
    <>
      <div className="flex-center flex flex-1 flex-col items-center justify-center text-center">
        <motion.div
          animate="show"
          className="max-w-3xl px-5 xl:px-0"
          initial="hidden"
          viewport={{ once: true }}
          whileInView="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}>
          <motion.div className="flex-center flex h-full flex-1 flex-col items-center justify-center " variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <div className="card w-[420px] ">
              <img
                alt={`Token ${address} icon`}
                className="mx-auto h-12 w-12 rounded-full border-2 border-white shadow-md"
                src={`https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/${address}/logo.png`}
              />
              <h3 className="mt-4 text-2xl font-normal">
                <ERC20Name address={address} chainId={Number(chainId)} /> (
                <ERC20Symbol address={address} chainId={Number(chainId)} className="" />)
              </h3>
              <div className="mt-3">
                <span className="mr-2 font-bold">Decimals:</span> <ERC20Decimals address={address} />
              </div>
              <hr className="my-3 dark:opacity-30" />
              <div className="mt-3">
                <span className="mr-2 font-bold">Balance:</span> <ERC20Balance address={address} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
