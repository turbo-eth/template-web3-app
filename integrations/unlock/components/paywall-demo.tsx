/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client"

import { useEffect, useState } from "react"
import networks from "@unlock-protocol/networks"
import { Paywall } from "@unlock-protocol/paywall"
import { useAccount } from "wagmi"

import { Button } from "@/components/ui/button"

export default function PaywallDemo() {
  const [unlockStatus, setUnlockStatus] = useState<string>("locked")
  const { connector } = useAccount()

  const paywall = new Paywall(networks)
  const unlockProtocolConfig = {
    paywallConfig: {
      locks: {
        "0x79f2a9aae3a2b8b462adcd1ae1f46be8f278e1c5": {
          network: 5,
        },
      },
      title: "Paywall Example Membership",
    },
  }

  function handleUnlock(e: any) {
    console.log(e.detail)
    setUnlockStatus(e.detail)
  }

  useEffect(() => {
    // assign config to global variable
    if ("unlockProtocolConfig" in window)
      window.unlockProtocolConfig = unlockProtocolConfig

    // load the script
    const script = document.createElement("script")
    script.src =
      "https://app.unlock-protocol.com/checkout?id=787f7dc3-4070-4455-ba17-92a47caeb3a9"
    script.async = true
    document.body.appendChild(script)

    window.addEventListener("unlockProtocol", handleUnlock)

    return () => {
      // remove script when component is unmounted
      document.body.removeChild(script)
      if ("unlockProtocolConfig" in window) delete window.unlockProtocolConfig
      window.removeEventListener("unlockProtocol", handleUnlock)
    }
  }, [])

  async function checkout() {
    if (connector) {
      await paywall.connect(await connector.getProvider())
      await paywall.loadCheckoutModal(unlockProtocolConfig.paywallConfig)
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center">
        <p className="text-4xl">Status: {unlockStatus}</p>
        {unlockStatus === "locked" && (
          <Button onClick={() => checkout()}>Unlock</Button>
        )}
        {unlockStatus === "unlocked" && (
          <p className="text-4xl">Access Granted!</p>
        )}
      </div>
    </>
  )
}
