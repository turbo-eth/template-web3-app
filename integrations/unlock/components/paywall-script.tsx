'use client'

import { useEffect, useState } from 'react'
import { Paywall } from '@unlock-protocol/paywall'
import networks from '@unlock-protocol/networks'
import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'

export default function PaywallScript() {
  const [unlockStatus, setUnlockStatus] = useState<string>('locked')
  const { address, isConnected, connector } = useAccount()

  const paywall = new Paywall(networks)
  const unlockProtocolConfig = {
    paywallConfig: {
      locks: {
        '0x79f2a9aae3a2b8b462adcd1ae1f46be8f278e1c5': {
          network: 5,
        },
      },
      title: 'Paywall Example Membership',
    },
  }

  useEffect(() => {

    // assign config to global variable
    if (typeof window !== 'undefined') {
      (window as any).unlockProtocolConfig = unlockProtocolConfig;

      // load the script
      const script = document.createElement('script')
      script.src = 'https://paywall.unlock-protocol.com/static/unlock.latest.min.js'
      script.async = true
      document.body.appendChild(script)

      function handleUnlockStatusChange(event: any) {
        console.log(event.detail.state)
        setUnlockStatus(event.detail.state)
      }

      window.addEventListener('unlockProtocol.status', handleUnlockStatusChange)

      return () => {
        // remove script when component is unmounted
        document.body.removeChild(script)
        delete (window as any).unlockProtocolConfig
        window.removeEventListener('unlockProtocol.status', handleUnlockStatusChange)
      }
    }
  }, [])

  async function checkout() {
    if (connector) {
      await paywall.connect(await connector.getProvider())
      await paywall.loadCheckoutModal(unlockProtocolConfig.paywallConfig)
    }
  }

  if (unlockStatus === 'locked') {
    return (
      <>
        <p>No Access</p>
        <Button onClick={() => checkout()}>Purchase Membership</Button>
      </>
    )
  }
  if (unlockStatus === 'unlocked') {
    return (
      <>
        <p>Access Granted!</p>
      </>
    )
  }

}
