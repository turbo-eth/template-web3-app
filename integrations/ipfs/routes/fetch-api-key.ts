interface Web3StorageKeyResponse {
  web3StorageKey: string
}

export const fetchWeb3StorageKey = async () => {
  try {
    const response = await fetch('/api/ipfs/get-api-key')

    if (!response.ok) {
      throw new Error('Failed to fetch Web3 Storage key')
    }

    const data: Web3StorageKeyResponse = await response.json()
    return data.web3StorageKey
  } catch (error) {
    console.error('Error fetching Web3 Storage key:', error)
    throw error
  }
}
