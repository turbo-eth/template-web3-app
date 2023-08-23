"use client"

import "@rainbow-me/rainbowkit/styles.css"

import { ReactNode } from "react"
import {
  connectorsForWallets,
  darkTheme,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit"
import {
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets"
import { createConfig, WagmiConfig } from "wagmi"

import { chains, publicClient, webSocketPublicClient } from "@/config/networks"
import { siteConfig } from "@/config/site"
import { useColorMode } from "@/lib/state/color-mode"

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains }),
      rainbowWallet({ chains }),
      coinbaseWallet({ chains, appName: siteConfig.name }),
      walletConnectWallet({ chains }),
    ],
  },
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export function RainbowKit({ children }: { children: ReactNode }) {
  const [colorMode] = useColorMode()
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={colorMode == "dark" ? darkTheme() : lightTheme()}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
