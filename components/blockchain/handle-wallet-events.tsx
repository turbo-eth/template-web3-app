'use client'

import * as React from 'react'

import { useAccount } from 'wagmi'

import { siweLogout } from '@/integrations/siwe/siwe-logout'
import { useUser } from '@/lib/hooks/app/use-user'
interface HandleWalletEventsProps {
  className?: string
  children: React.ReactNode
}

export const HandleWalletEvents = ({ className, children }: HandleWalletEventsProps) => {
  const { mutateUser } = useUser()
  useAccount({
    async onDisconnect() {
      await siweLogout()
      mutateUser()
    },
  })
  return <>{children}</>
}

export default HandleWalletEvents
