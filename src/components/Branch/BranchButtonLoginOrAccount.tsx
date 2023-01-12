import * as React from 'react'

import Link from 'next/link'

import ButtonSIWELogin from '../SIWE/ButtonSIWELogin'
import ButtonSIWELogout from '../SIWE/ButtonSIWELogout'
import BranchIsAuthenticated from './BranchIsAuthenticated'

interface BranchButtonLoginOrAccountProps {
  className?: string
  classNameButtonLogin?: string
  classNameButtonLogout?: string
}

export const BranchButtonLoginOrAccount = ({ classNameButtonLogin, classNameButtonLogout }: BranchButtonLoginOrAccountProps) => {
  return (
    <BranchIsAuthenticated>
      <div className="flex items-center gap-3">
        <Link href="/siwe">
          <span className="tag tag-light">Account</span>
        </Link>
        <ButtonSIWELogout className={classNameButtonLogout} />
      </div>
      <ButtonSIWELogin className={classNameButtonLogin} />
    </BranchIsAuthenticated>
  )
}

export default BranchButtonLoginOrAccount
