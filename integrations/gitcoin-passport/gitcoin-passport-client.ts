import { ethers } from 'ethers'

export const checkConnection = async () => {
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const accounts = await provider.listAccounts()
      // if the user is connected, set their account and fetch their score
      if (accounts && accounts[0]) {
        return accounts[0]
      }
    }
  } catch (err) {
    console.log('not connected...')
  }
}
