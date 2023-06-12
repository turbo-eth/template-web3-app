'use client'

import { useColorMode } from '@/lib/state/color-mode'

export function BranchColorMode({ children }: any) {
  const [colorMode] = useColorMode()

  return colorMode === 'light' ? children[0] : children[1]
}
