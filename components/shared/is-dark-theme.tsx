'use client'

import { ReactNode } from 'react'

import { useColorMode } from '@/lib/state/color-mode'

interface IsDarkThemeProps {
  children: ReactNode
}

export const IsDarkTheme = ({ children }: IsDarkThemeProps) => {
  const [colorMode] = useColorMode()

  if (colorMode === 'dark') return <>{children}</>

  return null
}
