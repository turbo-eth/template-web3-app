'use client'
import { useContext } from 'react'

import { ArweaveWalletContext } from '../context/arweave-wallet'

export const useArweaveWallet = () => {
  return useContext(ArweaveWalletContext)
}
