import { SiweMessage } from 'siwe'
import type { Address } from 'wagmi'
import { SignMessageArgs } from 'wagmi/dist/actions'

import { siteConfig } from '@/config/site'

interface SiweMessageOptions {
  address: string
  chainId: number
  signMessageAsync: (args?: SignMessageArgs | undefined) => Promise<Address>
}

/**
 * Utility function to create and sign a SIWE message
 * @param address - Ethereum address
 * @param chainId - Ethereum chain ID
 * @param signMessageAsync - Wallet sign message function
 * @returns SIWE message, message to sign and signature
 */
export const siweMessage = async ({ address, chainId, signMessageAsync }: SiweMessageOptions) => {
  // 1. Get random nonce from API
  const nonceRes = await fetch('/api/siwe/nonce')
  const nonce = await nonceRes.text()

  // 2. Create SIWE message with pre-fetched nonce and sign with wallet
  const message = new SiweMessage({
    domain: window.location.host,
    address,
    statement: `Sign in with Ethereum to ${siteConfig.name}`,
    uri: window.location.origin,
    version: '1',
    chainId: chainId,
    nonce: nonce,
  })

  // 3. Prepare the message to sign
  const messageToSign = message.prepareMessage()

  // 4. Sign message
  const signature = await signMessageAsync({
    message: message.prepareMessage(),
  })

  return {
    message,
    messageToSign,
    signature,
  }
}
