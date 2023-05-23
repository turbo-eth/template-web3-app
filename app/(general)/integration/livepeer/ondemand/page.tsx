'use client'

import { LivepeerConfig, ThemeConfig, createReactClient, studioProvider } from '@livepeer/react'

import { Asset } from '@/integrations/livepeer/components/ondemand'

const client = createReactClient({
  provider: studioProvider({ apiKey: '481df680-dda5-470a-af77-f1a66298d557' }),
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

export default function App() {
  return (
    <LivepeerConfig client={client} theme={livepeerTheme}>
      <Asset />
      {/* <Stream /> */}
    </LivepeerConfig>
  )
}
