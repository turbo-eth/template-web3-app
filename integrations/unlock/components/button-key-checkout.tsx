'use client'

import networks from '@unlock-protocol/networks'
import { Paywall } from '@unlock-protocol/paywall'
import { useNetwork } from 'wagmi'
import { useAccount } from 'wagmi'

import { Button } from '@/components/ui/button'

export default function ButtonKeyCheckout({ lockId }: { lockId: string }) {
  const { chain } = useNetwork()
  const { connector } = useAccount()

  const paywallConfig = {
    locks: {
      [lockId]: {
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

  return <div>{<Button onClick={handleCheckout}>Purchase Lock</Button>}</div>
}
