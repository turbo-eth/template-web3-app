import * as React from 'react'

import Link from 'next/link'

import { BranchIsAuthenticated } from '@/components/shared/branch-is-authenticated'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
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
          <Link href="/account">
            <span className="tag tag-light">Account</span>
          </Link>
          <ButtonSIWELogout className={classNameButtonLogout} />
        </div>
        <ButtonSIWELogin className={classNameButtonLogin} />
      </BranchIsAuthenticated>
      <></>
    </BranchIsWalletConnected>
  )
}

export default BranchButtonLoginOrAccount
