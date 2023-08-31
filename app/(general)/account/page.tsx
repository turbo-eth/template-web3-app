"use client"

import { motion } from "framer-motion"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { WalletAddress } from "@/components/blockchain/wallet-address"
import { WalletBalance } from "@/components/blockchain/wallet-balance"
import { WalletNonce } from "@/components/blockchain/wallet-nonce"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"

export default function PageDashboardAccount() {
  return (
    <motion.div
      animate="show"
      className="mt-20 flex h-full w-full items-center justify-center"
      initial="hidden"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      viewport={{ once: true }}
      whileInView="show"
    >
      <IsWalletConnected>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl">Account</CardTitle>
            <CardDescription>
              Address: <WalletAddress truncate />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex">
              <span className="mr-1 font-bold">Balance: </span>{" "}
              <WalletBalance />
            </div>
            <div className="flex">
              <span className="mr-1 font-bold">Nonce: </span> <WalletNonce />
            </div>
          </CardContent>
        </Card>
      </IsWalletConnected>
      <IsWalletDisconnected>
        <h3 className="text-lg font-normal">
          Connect Wallet to view your personalized dashboard.
        </h3>
      </IsWalletDisconnected>
    </motion.div>
  )
}
