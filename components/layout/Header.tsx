import React from 'react'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import classNames from 'classnames'

import useScroll from '@/hooks/use-scroll'
import { SITE_EMOJI, SITE_NAME } from '@/lib/constants'

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
  const scrolled = useScroll(50)
  const classes = classNames(
    props.className,
    'Header',
    'fixed top-0 w-full',
    ' px-4 py-3 mb-8 flex items-center',
    {
      'border-b border-gray-200 bg-white/50 backdrop-blur-xl dark:bg-black/50 dark:border-gray-800': scrolled,
    },
    'z-30 transition-all'
  )

  // <div className={`fixed top-0 w-full ${scrolled ? 'border-b border-gray-200 bg-white/50 backdrop-blur-xl' : 'bg-white/0'} z-30 transition-all`}>
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
