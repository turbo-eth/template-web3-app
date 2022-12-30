import React, { ReactNode } from 'react'

import classNames from 'classnames'

import { NetworkStatus } from '../app/NetworkStatus'
import { Footer } from './Footer'
import { Header } from './Header'

interface Props {
  children: ReactNode
  className?: string
}

export function Layout(props: Props) {
  const classes = classNames(props.className, 'Footer', 'dark:bg-slate-900 dark:text-white h-[100vh] flex flex-col')
  return (
    <div className={classes}>
      <Header />
      <div className="container  mx-auto flex flex-1">{props.children}</div>
      <div className="fixed bottom-6 right-6">
        <NetworkStatus />
      </div>
      <Footer />
    </div>
  )
}
