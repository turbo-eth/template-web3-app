import { createReactClient, studioProvider } from '@livepeer/react'

export function getLivepeerClient(apiKey: string) {
  return createReactClient({
    provider: studioProvider({
      apiKey,
    }),
  })
}
