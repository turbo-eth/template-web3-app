import React, { ReactNode } from 'react'

import Link from 'next/link'

interface Props {
  href: string
  children: ReactNode
  isExternal?: boolean
  className?: string
  target?: string
}

export function LinkComponent({ href, children, isExternal, className, target = '_blank' }: Props) {
  const classes = className ?? ''
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
