import * as React from 'react'

import { useAccount } from 'wagmi'

import { siweLogout } from '@/actions/siweLogout'
interface HandleWalletEventsProps {
  className?: string
  children: React.ReactNode
}

export const HandleWalletEvents = ({ className, children }: HandleWalletEventsProps) => {
  useAccount({
    onDisconnect() {
      siweLogout()
    },
  })
  return <>{children}</>
}

export default HandleWalletEvents
