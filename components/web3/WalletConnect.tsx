'use client'
import * as React from 'react'

import { ConnectButton } from '@rainbow-me/rainbowkit'

interface WalletConnectProps {
  className?: string
}

export const WalletConnect = ({ className }: WalletConnectProps) => {
  return (
    <span className={className}>
      <ConnectButton
        showBalance={false}
        accountStatus={{
          smallScreen: 'avatar',
          largeScreen: 'avatar',
        }}
        chainStatus={{
          smallScreen: 'icon',
          largeScreen: 'icon',
        }}
      />
    </span>
  )
}

export default WalletConnect
