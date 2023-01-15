import React from 'react'

import classNames from 'classnames'
import Image from 'next/image'

import { SITE_EMOJI, SITE_NAME } from '@/lib/constants'
import useScroll from '@/lib/hooks/useScroll'

import { LinkComponent } from '../shared/LinkComponent'
import { BranchColorMode } from '../branch/BranchColorMode'
import BranchIsAuthenticated from '../branch/BranchIsAuthenticated'
import BranchIsWalletConnected from '../branch/BranchIsWalletConnected'
import ResponsiveMobileAndDesktop from '../responsive/ResponsiveMobileAndDesktop'
import { ThemeSwitcher } from '../shared/ThemeSwitcher'
import ButtonSIWELogin from '../siwe/ButtonSIWELogin'
import UserDropdown from './UserDropdown'

interface Props {
  className?: string
}

export function Header(props: Props) {
  const scrolled = useScroll(50)
  const classes = classNames(
    props.className,
    'Header',
    'fixed top-0 w-full',
    'px-6 lg:px-10 py-3 mb-8 flex items-center',
    {
      'border-b border-gray-200 bg-white/50 backdrop-blur-xl dark:bg-black/50 dark:border-gray-800': scrolled,
    },
    'z-30 transition-all'
  )
  return (
    <header className={classes}>
      <ResponsiveMobileAndDesktop>
        <LinkComponent href="/" className="flex flex-1 items-center ">
          <BranchColorMode>
            <Image alt="Logo" src="/logo-dark.png" width={32} height={32} />
            <Image alt="Logo" src="/logo-white.png" width={32} height={32} />
          </BranchColorMode>
        </LinkComponent>
        <LinkComponent className="flex items-center" href="/">
          <BranchColorMode>
            <Image alt="Logo" src="/logo-dark.png" width={32} height={32} />
            <Image alt="Logo" src="/logo-white.png" width={32} height={32} />
          </BranchColorMode>
          <h1 className="text-gradient-sand ml-2 text-2xl font-bold">{SITE_NAME}</h1>
        </LinkComponent>
      </ResponsiveMobileAndDesktop>
      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <BranchIsWalletConnected>
          <BranchIsAuthenticated>
            <UserDropdown />
            <ButtonSIWELogin />
          </BranchIsAuthenticated>
        </BranchIsWalletConnected>
        <ThemeSwitcher />
      </div>
    </header>
  )
}
