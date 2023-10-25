"use client"

import { HTMLAttributes } from "react"
import Link from "next/link"
import { usePrivy, useWallets } from "@privy-io/react-auth"
import { usePrivyWagmi } from "@privy-io/wagmi-connector"

import { shorten } from "@/lib/utils/shorten"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"

interface WalletConnectPrivyProps extends HTMLAttributes<HTMLDivElement> {
  classNameConnect?: string
  classNameConnected?: string
  classNameWrongNetwork?: string
  labelConnect?: string
  labelManage?: string
}

export const WalletConnect = ({
  className,
  classNameConnected,
  classNameWrongNetwork,
  labelConnect = "Connect Wallet",
  labelManage = "Manage Wallets",
  ...props
}: WalletConnectPrivyProps) => {
  const { login, ready, authenticated, logout } = usePrivy()
  const { wallets } = useWallets()
  const { wallet: activeWallet, setActiveWallet } = usePrivyWagmi()

  if (!ready) return null

  return (
    <div className={className} {...props}>
      {(() => {
        if (!authenticated) {
          return (
            <>
              <Button variant="blue" onClick={login}>
                {labelConnect}
              </Button>
            </>
          )
        } else {
          return (
            <Dialog>
              <DialogTrigger>
                <Button type="button" variant="blue">
                  {labelManage}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <div className="mt-5">
                  <h4 className="text-2xl font-bold">Manage wallets</h4>
                  <p className="mb-4">
                    Select your preferred wallet.
                    <Link
                      className="ml-1 text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://docs.privy.io/guide/guides/wagmi#4-set-the-users-active-wallet"
                    >
                      Read more
                    </Link>
                  </p>

                  <p>
                    Active:{" "}
                    <span className="rounded-xl bg-slate-200 px-2 py-1 font-mono text-xs">
                      {activeWallet?.address}
                    </span>
                  </p>
                  {wallets.map((wallet, index) => (
                    <div key={index} className="mt-3">
                      <div className="flex"></div>
                      {shorten(wallet.address)}
                      {wallet.address === activeWallet?.address ? (
                        <span className="ml-4">Active</span>
                      ) : (
                        <Button
                          className="ml-4"
                          onClick={() => setActiveWallet(wallet)}
                        >
                          Make active
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <Button onClick={logout}>Logout</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )
        }
      })()}
    </div>
  )
}
