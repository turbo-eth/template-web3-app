import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { LinkComponent } from '@/components/shared/link-component'
import { ButtonSIWELogin } from '@/integrations/siwe/components/button-siwe-login'
import { ButtonSIWELogout } from '@/integrations/siwe/components/button-siwe-logout'
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
          <ButtonSIWELogout className={classNameButtonLogout} />
          <LinkComponent href="/account" className="menu-item">
            <span className="">Account</span>
          </LinkComponent>
        </div>
      </IsSignedIn>
      <IsSignedOut>
        <ButtonSIWELogin className={cn('colormode', classNameButtonLogin)} />
      </IsSignedOut>
    </IsWalletConnected>
  )
}

export default BranchButtonLoginOrAccount
