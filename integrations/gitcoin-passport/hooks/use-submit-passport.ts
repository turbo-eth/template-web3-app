import { ethers } from 'ethers'

import { SigningMessageResponse, SubmitPassportResponse } from '../utils/types'

const SIGNING_MESSAGE_URI = 'https://api.scorer.gitcoin.co/registry/signing-message'
const SUBMIT_PASSPORT_URI = 'https://api.scorer.gitcoin.co/registry/submit-passport'

const getSigningMessage = async (apiKey: string) => {
  try {
    const response = await fetch(SIGNING_MESSAGE_URI, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
    })
    const json: SigningMessageResponse = await response.json()
    return json
  } catch (err) {
    console.log('error: ', err)
  }
}

export const submitPassport = async (address: string, scorerId: string, apiKey: string) => {
  try {
    // call the API to get the signing message and the nonce
    const signingMessage = await getSigningMessage(apiKey)
    if (signingMessage && window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      // ask the user to sign the message
      const signature = await signer.signMessage(signingMessage.message)

      // call the API, sending the signing message, the signature, and the nonce
      const response = await fetch(SUBMIT_PASSPORT_URI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({
          address,
          scorer_id: scorerId,
          signature,
          nonce: signingMessage.nonce,
        }),
      })

      const data: SubmitPassportResponse = await response.json()
      return data
    }
  } catch (e) {
    const error = e as Error & { status?: number }
    throw new Error(`${error.message}`)
  }
}
