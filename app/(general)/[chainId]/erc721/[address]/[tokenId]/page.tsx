'use client'
import React from 'react'

import { ERC721TokenDescription, ERC721TokenImage, ERC721TokenName } from '@turbo-eth/erc721-wagmi'
import { motion } from 'framer-motion'

import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'

export default function PageERC721({ params }: any) {
  const { address, chainId, tokenId } = params
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
              <h3 className="mb-3 text-2xl font-normal">
                <ERC721TokenName chainId={chainId} tokenId={String(tokenId || '1')} address={String(address || '')} />
              </h3>
              <ERC721TokenImage
                address={String(address)}
                tokenId={String(tokenId || '1')}
                className="my-4 rounded-xl border-2 border-white shadow-md"
              />
              <p className="text-xs leading-5">
                <ERC721TokenDescription chainId={chainId} tokenId={String(tokenId || '1')} address={String(address || '')} />
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
