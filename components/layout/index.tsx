import React, { ReactNode } from 'react'

import classNames from 'classnames'

import { NetworkStatus } from '../app/NetworkStatus'
import WalletConnect from '../WalletConnect'
import { Footer } from './Footer'
import { Header } from './Header'

interface Props {
  children: ReactNode
  className?: string
}

export function Layout(props: Props) {
  const classes = classNames(props.className, 'App', 'bg-gradient-app min-h-[100vh] flex flex-col')
  return (
    <div className={classes}>
      <Header />
      <main className="my-32 flex flex-1 flex-col lg:my-20 lg:py-20">{props.children}</main>
      <div className="fixed bottom-6 left-6">
        <NetworkStatus />
      </div>
      <div className="fixed bottom-6 right-6">
        <WalletConnect />
      </div>
      <Footer />
    </div>
  )
}
