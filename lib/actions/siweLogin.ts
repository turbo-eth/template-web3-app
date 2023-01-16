import { SiweMessage } from 'siwe'

import { SITE_NAME } from '@/lib/constants'

export const siweLogin = async ({ address, chainId, signMessageAsync }: any) => {
  // 1. Get random nonce from API
  const nonceRes = await fetch('/api/account/nonce')
  const nonce = await nonceRes.text()

  // 2. Create SIWE message with pre-fetched nonce and sign with wallet
  const message = new SiweMessage({
    domain: window.location.host,
    address,
    statement: `Sign in with Ethereum to ${SITE_NAME}`,
    uri: window.location.origin,
    version: '1',
    chainId: chainId,
    nonce: nonce,
  })

  // 3. Sign message
  const signature = await signMessageAsync({
    message: message.prepareMessage(),
  })

  // 3. Verify signature
  const verifyRes = await fetch('/api/account/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, signature }),
  })

  if (!verifyRes.ok) throw new Error('Error verifying message')
  if (verifyRes.status === 200) {
    dispatchEvent(new Event('verified'))
  }
}
