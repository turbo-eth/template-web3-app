import { ReactNode } from "react"
import { env } from "@/env.mjs"
import { LivepeerConfig, ThemeConfig } from "@livepeer/react"

import { getLivepeerClient } from "./livepeer-client"

const livepeerTheme: ThemeConfig = {
  colors: {
    accent: "#f9f2c0",
    containerBorderColor: "#f9f2c0",
  },
  fonts: {
    display: "Inter",
  },
}

export function LivepeerProvider({
  children,
  customApiKey,
}: {
  children: ReactNode
  customApiKey?: string
}) {
  const apiKey =
    customApiKey ?? env.NEXT_PUBLIC_LIVEPEER_API_KEY ?? "Initial Key"

  if (!apiKey) {
    throw new Error("No Livepeer API key provided")
  }

  const livepeerClient = getLivepeerClient(apiKey)

  return (
    <LivepeerConfig client={livepeerClient} theme={livepeerTheme}>
      {children}
    </LivepeerConfig>
  )
}
