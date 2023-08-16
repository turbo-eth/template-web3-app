import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { LinkComponent } from '@/components/shared/link-component'
import { ButtonSpruceKitLogin } from '@/integrations/sprucekit/components/button-sprucekit-login'
import { ButtonSpruceKitLogout } from '@/integrations/sprucekit/components/button-sprucekit-logout'
import { cn } from '@/lib/utils'

import { IsSignedIn } from './is-signed-in'
import { IsSignedOut } from './is-signed-out'

interface BranchButtonLoginOrAccountProps {
  classNameButtonLogin?: string
  classNameButtonLogout?: string
}

export const BranchButtonLoginOrAccount = ({ classNameButtonLogin, classNameButtonLogout }: BranchButtonLoginOrAccountProps) => {
  return (
    <IsWalletConnected>
      <IsSignedIn>
        <div className="flex items-center gap-3">
          <ButtonSpruceKitLogout className={classNameButtonLogout} />
          <LinkComponent className="menu-item" href="/account">
            <span className="">Account</span>
          </LinkComponent>
        </div>
      </IsSignedIn>
      <IsSignedOut>
        <ButtonSpruceKitLogin className={cn('colormode', classNameButtonLogin)} />
      </IsSignedOut>
    </IsWalletConnected>
  )
}

export default BranchButtonLoginOrAccount
