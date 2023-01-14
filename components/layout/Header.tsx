import React from 'react'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import classNames from 'classnames'

import { SITE_EMOJI, SITE_NAME } from '@/lib/constants'
import useScroll from '@/lib/hooks/useScroll'

import { LinkComponent } from '../app/LinkComponent'
import { ThemeSwitcher } from '../app/ThemeSwitcher'
import BranchIsAuthenticated from '../branch/BranchIsAuthenticated'
import BranchIsWalletConnected from '../branch/BranchIsWalletConnected'
import ResponsiveMobileAndDesktop from '../responsive/ResponsiveMobileAndDesktop'
import ButtonSIWELogin from '../siwe/ButtonSIWELogin'
import MenuMobile from './MenuMobile'
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
    ' px-10 py-3 mb-8 flex items-center',
    {
      'border-b border-gray-200 bg-white/50 backdrop-blur-xl dark:bg-black/50 dark:border-gray-800': scrolled,
    },
    'z-30 transition-all'
  )
  return (
    <header className={classes}>
      <ResponsiveMobileAndDesktop>
        <>
          <LinkComponent href="/" className="flex flex-1 items-center">
            <span className="mr-1 text-3xl">{SITE_EMOJI}</span>
          </LinkComponent>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <ConnectButton
              showBalance={false}
              accountStatus={{
                smallScreen: 'avatar',
                largeScreen: 'avatar',
              }}
              chainStatus={{
                smallScreen: 'icon',
                largeScreen: 'icon',
              }}
            />
            <MenuMobile>
              <div className="btn btn-light btn-sm">MENU</div>
            </MenuMobile>
          </div>
        </>
        <>
          <LinkComponent className="flex items-center" href="/">
            <span className="mr-1">{SITE_EMOJI}</span>
            <h1 className="text-2xl font-bold">{SITE_NAME}</h1>
          </LinkComponent>

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
        </>
      </ResponsiveMobileAndDesktop>
    </header>
  )
}
