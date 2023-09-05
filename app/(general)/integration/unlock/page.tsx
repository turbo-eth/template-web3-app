import { Button } from "@/components/ui/button"
import { WalletConnect } from "@/components/blockchain/wallet-connect"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"
import FormDeployLock from "@/integrations/unlock/components/form-deploy-lock"
import UserKeys from "@/integrations/unlock/components/user-keys"
import UserLocks from "@/integrations/unlock/components/user-locks"

export default function UnlockIntegration() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center space-y-8">
        <a href="/integration/unlock/paywall">
          <Button>Paywall Example</Button>
        </a>
        <IsWalletConnected>
          <h1 className="p-4 text-center text-4xl font-bold">Create a Lock</h1>
          <FormDeployLock />
          <h1 className="p-4 text-center text-4xl font-bold">Created Locks</h1>
          <UserLocks />
          <h1 className="p-4 text-center text-4xl font-bold">Owned Keys</h1>
          <UserKeys />
        </IsWalletConnected>

        <IsWalletDisconnected>
          <WalletConnect />
        </IsWalletDisconnected>
      </div>
    </div>
  )
}
