import React, { ReactNode } from 'react'

import classNames from 'classnames'
import { useScroll } from 'react-spring'

import { NetworkStatus } from '../app/NetworkStatus'
import { Footer } from './Footer'
import { Header } from './Header'

interface Props {
  children: ReactNode
  className?: string
}

export function Layout(props: Props) {
  const classes = classNames(
    props.className,
    'App',
    'dark:bg-slate-900 dark:text-white min-h-[100vh] bg-gradient-to-br from-indigo-50 via-white to-yellow-100 dark:from-indigo-800 dark:to-yellow-700 flex flex-col'
  )
  return (
    <div className={classes}>
      <Header />
      <main className="lg:py-20">
        <div className="container mx-auto my-12 flex flex-1">{props.children}</div>
      </main>
      <div className="fixed bottom-6 right-6">
        <NetworkStatus />
      </div>
      <Footer />
    </div>
  )
}
