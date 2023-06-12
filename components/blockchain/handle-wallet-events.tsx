'use client'
import { ReactNode } from 'react'

import { useAccount } from 'wagmi'

import { siweLogout } from '@/integrations/siwe/actions/siwe-logout'
import { useUser } from '@/lib/hooks/use-user'
interface HandleWalletEventsProps {
  className?: string
  children: ReactNode
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
