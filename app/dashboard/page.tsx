"use client"

import { motion } from "framer-motion"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import { WalletAddress } from "@/components/blockchain/wallet-address"
import { WalletBalance } from "@/components/blockchain/wallet-balance"
import { WalletEnsName } from "@/components/blockchain/wallet-ens-name"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"

export default function PageDashboard() {
  return (
    <motion.div
      animate="show"
      className="flex h-full w-full items-center justify-center lg:py-8"
      initial="hidden"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      viewport={{ once: true }}
      whileInView="show"
    >
      <IsWalletConnected>
        <div className="col-span-12 flex flex-col items-center justify-center lg:col-span-9">
          <div className="text-center">
            <h3 className="text-2xl font-bold lg:text-6xl">
              <span className="bg-gradient-to-br from-indigo-600 to-purple-700 bg-clip-text text-transparent dark:from-indigo-100 dark:to-purple-200">
                hi 👋 <WalletEnsName />
              </span>
            </h3>
            <span className="font-light">
              <WalletAddress className="mt-5 block text-xl font-light" />
              <div className="mt-4">
                <span className="text-3xl font-light">
                  Balance: <WalletBalance decimals={7} /> ETH
                </span>
              </div>
            </span>
          </div>
        </div>
      </IsWalletConnected>
      <IsWalletDisconnected>
        <h3 className="text-lg font-normal">
          Connect Wallet to view your personalized dashboard.
        </h3>
      </IsWalletDisconnected>
    </motion.div>
  )
}
