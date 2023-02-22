import { WalletAddress } from '@turbo-eth/core-wagmi'
import classNames from 'clsx'

import WalletConnect from '@/components/blockchain/wallet-connect'
import BranchIsAuthenticated from '@/components/shared/branch-is-authenticated'
import BranchIsWalletConnected from '@/components/shared/branch-is-wallet-connected'
import ButtonSIWELogin from '@/components/siwe/button-siwe-login'
import ButtonSIWELogout from '@/components/siwe/button-siwe-logout'

import { ThemeToggle } from '../../shared/theme-toggle'

interface Props {
  className?: string
}

export function DashboardHeader(props: Props) {
  const classes = classNames(props.className, 'Header', 'px-6 lg:px-10 py-3 flex items-center w-full')
  return (
    <header className={classes}>
      <div className="flex flex-1 ">
        <WalletAddress className="tag tag-dark" truncate isLink />
      </div>

      <div className="flex items-center gap-4">
        <BranchIsWalletConnected>
          <BranchIsAuthenticated>
            <ButtonSIWELogout />
            <ButtonSIWELogin />
          </BranchIsAuthenticated>
          <WalletConnect />
        </BranchIsWalletConnected>
        <ThemeToggle />
      </div>
    </header>
  )
}
