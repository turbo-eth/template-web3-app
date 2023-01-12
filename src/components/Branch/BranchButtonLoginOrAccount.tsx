import * as React from 'react'

import Link from 'next/link'

import ButtonSIWELogin from '../SIWE/ButtonSIWELogin'
import ButtonSIWELogout from '../SIWE/ButtonSIWELogout'
import BranchIsAuthenticated from './BranchIsAuthenticated'
import BranchIsWalletConnected from './BranchIsWalletConnected'

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
          <Link href="/siwe">
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
