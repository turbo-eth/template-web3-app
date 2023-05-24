'use client'

import React from 'react'

import { LivepeerConfig, ThemeConfig, createReactClient, studioProvider } from '@livepeer/react'

const client = createReactClient({
  provider: studioProvider({ apiKey: process.env.NEXT_PUBLIC_LIVEPEER_API_KEY || '' }),
})

const livepeerTheme: ThemeConfig = {
  colors: {
    accent: 'rgb(0, 145, 255)',
    containerBorderColor: 'rgba(0, 145, 255, 0.9)',
  },
  fonts: {
    display: 'Inter',
  },
}

export default function LivepeerLayout({ children }: { children: React.ReactNode }) {
  return (
    <LivepeerConfig client={client} theme={livepeerTheme}>
      {children}
    </LivepeerConfig>
  )
}
