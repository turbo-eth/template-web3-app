import * as React from 'react'

import { useAccount } from 'wagmi'

import useUser from '@/hooks/app/use-user'
import { siweLogout } from '@/lib/actions/siwe/siweLogout'
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
