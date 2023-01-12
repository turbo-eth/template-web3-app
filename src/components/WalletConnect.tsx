import * as React from 'react'

import { ConnectButton } from '@rainbow-me/rainbowkit'

interface WalletConnectProps {
  className?: string
}

export const WalletConnect = ({}: WalletConnectProps) => {
  return (
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
  )
}

export default WalletConnect
