'use client'

import { ReactNode } from 'react'

import { useColorMode } from '@/lib/state/color-mode'

interface IsLightThemeProps {
  children: ReactNode
}

export const IsLightTheme = ({ children }: IsLightThemeProps) => {
  const [colorMode] = useColorMode()

  if (colorMode === 'light') return <>{children}</>

  return null
}
