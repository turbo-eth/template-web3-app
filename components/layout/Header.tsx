import React from 'react'

import classNames from 'clsx'
import Image from 'next/image'

import { siteConfig } from '@/config/site'
import useScroll from '@/hooks/use-scroll'

import UserDropdown from './user-dropdown'
import { BranchColorMode } from '../shared/branch/BranchColorMode'
import { BranchIsWalletConnected } from '../shared/branch/BranchIsWalletConnected'
import { LinkComponent } from '../shared/LinkComponent'
import ResponsiveMobileAndDesktop from '../shared/responsive/ResponsiveMobileAndDesktop'
import { ThemeToggle } from '../shared/theme-toggle'

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
          <h1 className="text-gradient-sand ml-2 text-2xl font-bold">{siteConfig.name}</h1>
        </LinkComponent>
      </ResponsiveMobileAndDesktop>
      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <BranchIsWalletConnected>
          <UserDropdown />
        </BranchIsWalletConnected>

        <ThemeToggle />
      </div>
    </header>
  )
}
