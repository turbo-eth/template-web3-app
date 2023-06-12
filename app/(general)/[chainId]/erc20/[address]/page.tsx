'use client'

import { motion } from 'framer-motion'

import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { ERC20Balance, ERC20Decimals, ERC20Name, ERC20Symbol } from '@/integrations/erc20/components/erc20-read'

export default function ERC20({ params }: any) {
  const { address, chainId } = params
  return (
    <>
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
                <ERC20Name chainId={Number(chainId)} address={address} /> (
                <ERC20Symbol className="" chainId={Number(chainId)} address={address} />)
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
