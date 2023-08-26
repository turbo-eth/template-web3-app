import { ReactNode } from 'react'

import { useActiveWallet } from '@lens-protocol/react-web'

import { Spinner } from '../spinner'

export const IsUserAuthenticated = ({ children, showLoading }: { children: ReactNode; showLoading?: boolean }) => {
  const { data: wallet, loading } = useActiveWallet()
  if (loading && showLoading) return <Spinner />
  if (wallet && children) return <>{children}</>
  return null
}
