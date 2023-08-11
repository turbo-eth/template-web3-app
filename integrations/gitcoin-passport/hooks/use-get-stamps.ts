import { PaginatedStampCredentialResponse } from '../utils/types'

const GET_STAMPS_URI = 'https://api.scorer.gitcoin.co/registry/stamps'

export const getStamps = async (address: string, apiKey: string) => {
  try {
    const response = await fetch(`${GET_STAMPS_URI}/${address}?limit=1000&include_metadata=true`, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
    })
    const passportData: PaginatedStampCredentialResponse = await response.json()
    if (passportData) {
      return passportData
    } else {
      // if the user has no stamps, display a message letting them know to submit thier passport
      console.log('No stamps available, please add stamps to your passport and then resubmit.')
    }
  } catch (e) {
    const error = e as Error & { status?: number }
    throw new Error(`${error.message}`)
  }
}
