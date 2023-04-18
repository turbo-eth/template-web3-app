'use client'
import React, { ReactNode } from 'react'

import classNames from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface LinkComponentProps {
  href: string
  children: ReactNode
  isExternal?: boolean
  className?: string
  target?: string
}

export function LinkComponent({ href, children, isExternal, className, target = '_blank' }: LinkComponentProps) {
  const pathname = usePathname()
  const classes = classNames(className, 'LinkComponent', {
    active: pathname === href,
  })
  const isExternalEnabed = href.match(/^([a-z0-9]*:|.{0})\/\/.*$/) || isExternal

  if (isExternalEnabed) {
    return (
      <a className={classes} href={href} rel="noopener noreferrer" target={target}>
        {children}
      </a>
    )
  }

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  )
}
