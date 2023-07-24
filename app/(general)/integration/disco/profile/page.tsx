'use client'
import { useAccount } from 'wagmi'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { DiscoProfileBasic } from '@/integrations/disco/components/disco-profile-basic'
import { DiscoProfileCredentials } from '@/integrations/disco/components/disco-profile-credentials'
import { ButtonSIWELogin } from '@/integrations/siwe/components/button-siwe-login'
import { IsSignedIn } from '@/integrations/siwe/components/is-signed-in'
import { IsSignedOut } from '@/integrations/siwe/components/is-signed-out'

export default function PageIntegration() {
  const { address } = useAccount()

  return (
    <div className="mx-auto mt-10 flex w-full max-w-screen-xl flex-col justify-center px-5">
      <IsWalletConnected>
        <IsSignedIn>
          <section className="flex w-full flex-col gap-y-10">
            <div className="card container w-full">
              <h3 className="text-4xl font-bold">Disco Profile</h3>
              <hr className="my-4" />
              <DiscoProfileBasic address={address} />
            </div>
            <div className="card container max-w-full">
              <h3 className="text-4xl font-bold">Disco Verifiable Credentials</h3>
              <hr className="my-4" />
              <DiscoProfileCredentials address={address} />
            </div>
          </section>
        </IsSignedIn>
        <IsSignedOut>
          <div className="text-center">
            <ButtonSIWELogin className="btn btn-emerald" label="Sign-In With Ethereum" />
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-200">
              Accessing the Disco API requires authenticating with an Ethereum Account.
            </p>
          </div>
        </IsSignedOut>
      </IsWalletConnected>
      <IsWalletDisconnected>
        <WalletConnect className="mx-auto inline-block" />
      </IsWalletDisconnected>
    </div>
  )
}
