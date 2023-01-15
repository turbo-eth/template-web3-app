import React from 'react'

import Image from 'next/image'

import { useColorMode } from '@/lib/state'

export function ImageColorMode({ src, srcDark, ...props }: any) {
  const [colorMode] = useColorMode()

  return colorMode === 'light' ? <Image alt="logo" src={src} {...props} /> : <Image alt="logo" src={srcDark} {...props} />
}
