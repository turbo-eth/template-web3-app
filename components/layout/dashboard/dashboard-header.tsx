import { title } from 'process'

import { WalletAddress } from '@turbo-eth/core-wagmi'
import classNames from 'clsx'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaCopy } from 'react-icons/fa'
import { useAccount } from 'wagmi'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { BranchIsAuthenticated } from '@/components/shared/branch-is-authenticated'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { ButtonSIWELogin } from '@/integrations/siwe/components/button-siwe-login'
import { ButtonSIWELogout } from '@/integrations/siwe/components/button-siwe-logout'
import { useToast } from '@/lib/hooks/use-toast'

import { ThemeToggle } from '../../shared/theme-toggle'

interface Props {
  className?: string
}

export function DashboardHeader(props: Props) {
  const classes = classNames(props.className, 'Header', 'px-6 lg:px-10 py-3 flex items-center w-full')
  const { address } = useAccount()
  const { toast, dismiss } = useToast()

  const handleToast = () => {
    toast({
      title: 'Addess Copied',
      description: 'Your address has been copied to your clipboard.',
    })

    setTimeout(() => {
      dismiss()
    }, 4200)
  }

  return (
    <header className={classes}>
      <div className="flex flex-1 ">
        <span className="flex items-center gap-2">
          <WalletAddress truncate isLink />
          <span className="">
            <CopyToClipboard text={address as string}>
              <span className="flex-center flex h-7 w-7 cursor-pointer rounded-md bg-neutral-100 p-2 hover:bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-900">
                <FaCopy onClick={handleToast} className=" text-neutral-600 dark:text-neutral-100" />
              </span>
            </CopyToClipboard>
          </span>
        </span>
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
