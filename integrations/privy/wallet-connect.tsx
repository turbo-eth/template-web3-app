'use client'

import { HTMLAttributes } from 'react'

import { usePrivy, useWallets } from '@privy-io/react-auth'
import { usePrivyWagmi } from '@privy-io/wagmi-connector'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { shorten } from '@/lib/utils/shorten'

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
  labelConnect = 'Connect',
  labelManage = 'Manage Wallets',
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
              <Button variant="blue" onClick={login}>{labelConnect}</Button>
            </>
          )
        } else {
          return (
            <Dialog>
              <DialogTrigger>
                <Button variant="blue" type="button">
                  {labelManage}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <div className="mt-5">
                  <h4 className="mb-4 text-2xl font-bold">Manage wallets</h4>
                  <p>
                    Active: <span className="rounded-xl bg-slate-200 px-2 py-1 font-mono text-xs">{activeWallet?.address}</span>
                  </p>
                  {wallets.map((wallet, index) => (
                    <div key={index} className="mt-3">
                      <div className="flex"></div>
                      {shorten(wallet.address)}
                      {wallet.address === activeWallet?.address ? (
                        <span className="ml-4">Active</span>
                      ) : (
                        <Button variant="blue" className="ml-3" size="sm" onClick={() => setActiveWallet(wallet)}>
                          Make active
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <Button variant="destructive" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )
        }
      })()}
    </div>
  )
}
