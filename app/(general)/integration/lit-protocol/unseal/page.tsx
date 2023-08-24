"use client"

import { useSearchParams } from "next/navigation"

import { WalletConnect } from "@/components/blockchain/wallet-connect"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"
import { FormLitDecryptMessage } from "@/integrations/lit-protocol/components/form-lit-decrypt-message"

export default function PageIntegration() {
  const searchParams = useSearchParams()

  const id = searchParams?.get("id") || ""

  return (
    <section className="w-full lg:mt-10">
      <div className="container w-full max-w-screen-lg">
        <IsWalletConnected>
          <FormLitDecryptMessage initialEencryptedMessageId={id} />
        </IsWalletConnected>
        <IsWalletDisconnected>
          <div className="flex-center flex">
            <WalletConnect />
          </div>
        </IsWalletDisconnected>
      </div>
    </section>
  )
}
