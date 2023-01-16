import React, { ReactNode } from 'react'

import classNames from 'clsx'

import { Footer } from './Footer'
import { Header } from './Header'
import { NetworkStatus } from '../shared/NetworkStatus'
import WalletConnect from '../WalletConnect'

interface Props {
  children: ReactNode
  className?: string
}

export function Layout(props: Props) {
  const classes = classNames(props.className, 'App', 'bg-gradient-app min-h-[100vh] flex flex-col')
  return (
    <div className={classes}>
      <Header />
      <main className="my-32 flex flex-1 flex-col md:px-10 lg:my-20 lg:py-20">{props.children}</main>
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
