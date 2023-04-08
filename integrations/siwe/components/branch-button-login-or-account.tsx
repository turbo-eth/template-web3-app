import * as React from 'react'

import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { LinkComponent } from '@/components/shared/link-component'
import { BranchIsAuthenticated } from '@/integrations/siwe/components/branch-is-authenticated'
import { ButtonSIWELogin } from '@/integrations/siwe/components/button-siwe-login'
import { ButtonSIWELogout } from '@/integrations/siwe/components/button-siwe-logout'

interface BranchButtonLoginOrAccountProps {
  className?: string
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
        <ButtonSIWELogin className={'colormode'} />
      </BranchIsAuthenticated>
      <></>
    </BranchIsWalletConnected>
  )
}

export default BranchButtonLoginOrAccount
