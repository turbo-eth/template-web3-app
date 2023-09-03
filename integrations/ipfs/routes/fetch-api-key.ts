export const fetchWeb3StorageKey = async () => {
  try {
    const response = await fetch('/api/ipfs/get-api-key')

    if (!response.ok) {
      throw new Error('Failed to fetch Web3 Storage key')
    }

    const data = await response.json()
    return data.web3StorageKey
  } catch (error) {
    console.error('Error fetching Web3 Storage key:', error)
    throw error // Re-throw the error to handle it at a higher level
  }
}
