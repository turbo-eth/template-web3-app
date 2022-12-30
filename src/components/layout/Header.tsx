import React from 'react'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import classNames from 'classnames'

import { SITE_NAME } from 'utils/config'

import { ThemeSwitcher } from '../app/ThemeSwitcher'
import { LinkComponent } from '../app/LinkComponent'

interface Props {
  className?: string
}

export function Header(props: Props) {
  const classes = classNames(props.className, 'Header', 'bg-gray-200 dark:bg-gray-900 dark:text-white px-4 py-3 mb-8 flex items-center')

  return (
    <header className={classes}>
      <LinkComponent href="/">
        <h1 className="text-2xl font-bold">{SITE_NAME}</h1>
      </LinkComponent>

      <div className="flex-1" />

      <div className="flex items-center">
        <ConnectButton />
        <div className="mx-2" />
        <ThemeSwitcher />
      </div>
    </header>
  )
}
