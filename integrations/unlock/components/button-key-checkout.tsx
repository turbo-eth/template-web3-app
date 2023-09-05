/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client"

import { useEffect, useState } from "react"
import networks from "@unlock-protocol/networks"
import { Paywall } from "@unlock-protocol/paywall"
import { useAccount, useNetwork } from "wagmi"

import { Button } from "@/components/ui/button"
import useUnlockSubgraph from "@/integrations/unlock/hooks/use-unlock-subgraph"

export default function ButtonKeyCheckout({ lockId }: { lockId: string }) {
  const { chain } = useNetwork()
  const { getLockStats } = useUnlockSubgraph()
  const [lockAddress, setLockAddress] = useState<string>("")
  const { connector } = useAccount()

  const baseUrl = "https://app.unlock-protocol.com/checkout?"
  const paywallConfig = {
    locks: {
      [lockAddress]: {
        network: chain?.id,
      },
    },
  }
  const paywall = new Paywall(networks)
  //const redirectUri: string = window.location.href
  //const checkoutUrl = `${baseUrl}&paywallConfig=${encodeURIComponent(JSON.stringify(paywallConfig))}&redirectUri${redirectUri}`
  async function handleCheckout() {
    if (connector) {
      await paywall.connect(await connector.getProvider())
      await paywall.loadCheckoutModal(paywallConfig)
    }
  }

  useEffect(() => {
    async function fetchLockAddress() {
      const stats = await getLockStats({ lockId })
      setLockAddress(stats.locks[0].address)
    }
    void fetchLockAddress()
  }, [lockId])

  return (
    <div>
      {lockAddress && <Button onClick={handleCheckout}>Checkout</Button>}
    </div>
  )
}
