"use client"

import { ReactNode, useEffect } from "react"
import { EIP6963Connector } from "@web3modal/wagmi"
import { createWeb3Modal, useWeb3ModalTheme } from "@web3modal/wagmi/react"
import { createConfig, WagmiConfig } from "wagmi"
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet"
import { InjectedConnector } from "wagmi/connectors/injected"
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"

import { chains, publicClient, webSocketPublicClient } from "@/config/networks"
import { metadata } from "@/config/site"
import { useColorMode } from "@/lib/state/color-mode"

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!
if (!projectId) {
  throw new Error("Project ID is undefined")
}

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: { projectId, showQrModal: false, metadata },
    }),
    new EIP6963Connector({ chains }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({
      chains,
      options: { appName: metadata.name },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

createWeb3Modal({ wagmiConfig, projectId, chains })

export function Web3Modal({ children }: { children: ReactNode }) {
  const [colorMode] = useColorMode()
  const { setThemeMode } = useWeb3ModalTheme()

  useEffect(() => {
    if (colorMode !== "system") setThemeMode(colorMode)
  }, [colorMode])

  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
}
