import React from 'react'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import classNames from 'classnames'

import { SITE_EMOJI, SITE_NAME } from '@/utils/config'

import { LinkComponent } from '../app/LinkComponent'
import { ThemeSwitcher } from '../app/ThemeSwitcher'
import BranchButtonLoginOrAccount from '../Branch/BranchButtonLoginOrAccount'
import ResponsiveMobileAndDesktop from '../Responsive/ResponsiveMobileAndDesktop'
import WalletConnect from '../WalletConnect'
import MenuMobile from './MenuMobile'

interface Props {
  className?: string
}

export function Header(props: Props) {
  const classes = classNames(props.className, 'Header', 'bg-gray-200 dark:bg-gray-900 dark:text-white px-4 py-3 mb-8 flex items-center')

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
            {/* <span className="">|</span> */}
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
            <BranchButtonLoginOrAccount classNameButtonLogin="tag tag-emerald" classNameButtonLogout="tag tag-dark" className="mr-3" />
            <WalletConnect />
            {/* <div className="mx-2" /> */}
            <ThemeSwitcher />
          </div>
        </>
      </ResponsiveMobileAndDesktop>
    </header>
  )
}
