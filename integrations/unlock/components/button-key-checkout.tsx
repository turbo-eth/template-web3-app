'use client'

import { Button } from '@/components/ui/button'
import useUnlockSubgraph from '@/integrations/unlock/hooks/use-unlock-subgraph'
import { useNetwork } from 'wagmi'
import { useState, useEffect } from 'react'

export default function ButtonKeyCheckout({ lockId }: { lockId: string }) {
  const { chain } = useNetwork()
  const { getLockStats } = useUnlockSubgraph()
  const [lockAddress, setLockAddress] = useState<string>('')

  const baseUrl = 'https://app.unlock-protocol.com/checkout?'
  const paywallConfig = {
    locks: {
      [lockAddress]: {
        network: chain?.id,
      },
    },
  }
  const redirectUri: string = window.location.href
  const checkoutUrl = `${baseUrl}&paywallConfig=${encodeURIComponent(JSON.stringify(paywallConfig))}&redirectUri${redirectUri}`

  useEffect(() => {
    async function fetchLockAddress() {
      const stats = await getLockStats({ lockId })
      setLockAddress(stats?.locks[0].address)
    }
    fetchLockAddress()
  }, [lockId])

  return (
    <div>
      {lockAddress && (
        <a href={checkoutUrl} rel="noreferrer" target="_blank">
          <Button>Checkout</Button>
        </a>
      )}
    </div>
  )
}
