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
    return (
      <div className="flex flex-col items-center">
        <img
          alt="Logo"
          className="w-16 h-16 rounded-full mb-2"
          height={64}
          src={`https://static-assets.lenster.xyz/images/brands/lens.png`}
          width={64}
        />
        <div className="text-xl font-bold text-white">Claim your Lens profile 🌿</div>
        <div className="space-y-1">
          <div className="my-3">
            Visit{' '}
            <a className="font-bold" href="https://claim.lens.xyz" rel="noreferrer noopener" target="_blank">
              claiming site
            </a>{' '}
            to claim your profile now 🏃‍♂️
          </div>
        </div>
      </div>
    )
    // TODO guide user to create profile
    return null
  }

  return <>{children({ wallet, profile })}</>
}
