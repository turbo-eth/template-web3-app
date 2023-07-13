import { useActiveWallet } from '@lens-protocol/react-web'
import { ReactNode } from 'react'

export type WhenLoggedOutProps = {
  children: ReactNode
}

export function WhenLoggedOut({ children }: WhenLoggedOutProps) {
  const { data: wallet, loading } = useActiveWallet()

  if (loading || wallet !== null) {
    return null
  }

  return <>{children}</>
}
