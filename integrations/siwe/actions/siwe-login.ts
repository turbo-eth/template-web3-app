import { siweMessage } from './siwe-message'

export const siweLogin = async ({ address, chainId, signMessageAsync }: any) => {
  // 1. Create and sign SIWE message
  const { message, signature } = await siweMessage({ address, chainId, signMessageAsync })

  // 2. Verify signature
  const verifyRes = await fetch('/api/siwe/verify', {
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
