'use client'

import { ReactNode } from 'react'

import { useMediaQuery } from 'react-responsive'

interface IsDesktopProps {
  children: ReactNode
}

export const IsDesktop = ({ children }: IsDesktopProps) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  if (!isTabletOrMobile) return <>{children}</>

  return null
}
