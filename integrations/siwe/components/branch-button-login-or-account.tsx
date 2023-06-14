import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { LinkComponent } from '@/components/shared/link-component'
import { BranchIsAuthenticated } from '@/integrations/siwe/components/branch-is-authenticated'
import { ButtonSIWELogin } from '@/integrations/siwe/components/button-siwe-login'
import { ButtonSIWELogout } from '@/integrations/siwe/components/button-siwe-logout'
import { cn } from '@/lib/utils'

interface BranchButtonLoginOrAccountProps {
  classNameButtonLogin?: string
  classNameButtonLogout?: string
}

export const BranchButtonLoginOrAccount = ({ classNameButtonLogin, classNameButtonLogout }: BranchButtonLoginOrAccountProps) => {
  return (
    <BranchIsWalletConnected>
      <BranchIsAuthenticated>
        <div className="flex items-center gap-3">
          <ButtonSIWELogout className={classNameButtonLogout} />
          <LinkComponent href="/account" className="menu-item">
            <span className="">Account</span>
          </LinkComponent>
        </div>
        <ButtonSIWELogin className={cn('colormode', classNameButtonLogin)} />
      </BranchIsAuthenticated>
      <></>
    </BranchIsWalletConnected>
  )
}

export default BranchButtonLoginOrAccount
