"use client"

import * as React from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

interface WalletConnectProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  classNameConnect?: string
}

export const WalletConnect = ({ className }: WalletConnectProps) => {
  return (
    <div className={className}>
      <ConnectButton
        showBalance={false}
        accountStatus={{
          smallScreen: "avatar",
          largeScreen: "avatar",
        }}
        chainStatus={{
          smallScreen: "icon",
          largeScreen: "icon",
        }}
      />
    </div>
  )
}
