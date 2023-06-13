'use client'
import { ReactElement } from 'react'

import { useColorMode } from '@/lib/state/color-mode'

interface BranchColorModeProps {
  children?: ReactElement | Array<ReactElement>
}

export function BranchColorMode({ children }: BranchColorModeProps) {
  const [colorMode] = useColorMode()

  if (!children) return null
  if (colorMode === 'light' && children && !Array.isArray(children)) return children
  if (colorMode === 'light' && Array.isArray(children)) return children[0]
  if (colorMode !== 'light' && Array.isArray(children)) return children[1]

  return null
}
