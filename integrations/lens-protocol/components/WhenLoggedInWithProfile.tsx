import { ProfileOwnedByMe, useActiveProfile, useActiveWallet, WalletData } from '@lens-protocol/react-web'
import { ReactNode } from 'react'

type LoggedInConfig = {
  wallet: WalletData
  profile: ProfileOwnedByMe
}

export type WhenLoggedInWithProfileProps = {
  children: (config: LoggedInConfig) => ReactNode
}

export function WhenLoggedInWithProfile({ children }: WhenLoggedInWithProfileProps) {
  const { data: wallet, loading: walletLoading } = useActiveWallet()
  const { data: profile, error, loading: profileLoading } = useActiveProfile()

  if (walletLoading || profileLoading) {
    return null
  }

  if (wallet === null) {
    return null
  }

  if (profile === null || error) {
    // TODO guide user to create profile
    return null
  }

  return <>{children({ wallet, profile })}</>
}
