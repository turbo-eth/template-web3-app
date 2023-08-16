import { SiweMessage } from 'siwe'

interface SpruceKitLoginProps {
  message: string
  signature: string
}

export const spruceKitLogin = async ({ message, signature }: SpruceKitLoginProps) => {
  // 1. Verify signature
  const siweMessage = new SiweMessage(message)
  const verifyRes = await fetch('/api/ssx/ssx-verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: siweMessage, signature }),
  })

  if (!verifyRes.ok) throw new Error('Error verifying message')
  if (verifyRes.status === 200) {
    dispatchEvent(new Event('verified'))
  }
}
