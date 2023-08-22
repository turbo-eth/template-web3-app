'use client'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

import { JWKInterface } from 'arweave/node/lib/wallet'
import { TransactionStatusResponse } from 'arweave/node/transactions'
import { ArAccount } from 'arweave-account'
import { useAccount } from 'wagmi'

import { CONFIRMED_THRESHOLD, generateArweaveWallet, getArweaveTxStatus, getArweaveWalletAddress, getArweaveWalletBalance } from '..'
import { getUserAccount } from '../arweave-account'
import { AddPendingTxPayload, ArweaveAmount, ArweaveTxId } from '../utils/types'

type PendingTx = {
  txId: ArweaveTxId
  status: TransactionStatusResponse | null
}

export interface IArweaveWalletContext {
  account: ArAccount | null
  isAccountLoading: boolean
  userHasAccount: boolean
  wallet: JWKInterface | null
  error: string | null
  address: string | null
  balance: ArweaveAmount | null
  pendingTxs: PendingTx[]
  disconnect: () => void
  generate: () => Promise<void>
  importFromFile: (file: File) => Promise<void>
  backupWallet: () => Promise<void>
  getBalance: () => Promise<void>
  generateBasedOnEthAddress: () => Promise<void>
  addPendingTx: ({ txId, onConfirmation }: AddPendingTxPayload) => void
  getAccount: () => void
}

export const ArweaveWalletContext = createContext<IArweaveWalletContext>({
  account: null,
  isAccountLoading: false,
  userHasAccount: false,
  wallet: null,
  error: null,
  address: null,
  balance: null,
  pendingTxs: [],
  disconnect: () => {
    return
  },
  generate: () => Promise.resolve(),
  importFromFile: () => Promise.resolve(),
  backupWallet: () => Promise.resolve(),
  getBalance: () => Promise.resolve(),
  generateBasedOnEthAddress: () => Promise.resolve(),
  addPendingTx: () => Promise.resolve(),
  getAccount: () => {
    return
  },
})

export const ArweaveWalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallet, setWallet] = useState<JWKInterface | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [pendingTxs, setPendingTxs] = useState<PendingTx[]>([])
  const [balance, setBalance] = useState<ArweaveAmount | null>(null)
  const [account, setAccount] = useState<ArAccount | null>(null)
  const [isAccountLoading, setIsAccountLoading] = useState<boolean>(true)
  const { address: ethAccountAddress } = useAccount()

  const getAccount = useCallback(() => {
    if (wallet) {
      setIsAccountLoading(true)
      getUserAccount(wallet)
        .then((account) => setAccount(account))
        .catch((e) => console.error(e))
        .finally(() => setIsAccountLoading(false))
    }
  }, [wallet])

  useEffect(() => {
    if (wallet) {
      getAccount()
    }
  }, [wallet])

  const disconnect = useCallback(() => {
    setWallet(null)
    setAddress(null)
    setBalance(null)
    setPendingTxs([])
  }, [])

  const generate = useCallback(async () => {
    const wallet = await generateArweaveWallet()
    setWallet(wallet)
  }, [])

  const generateBasedOnEthAddress = useCallback(async () => {
    if (ethAccountAddress) {
      const wallet = await generateArweaveWallet()
      localStorage.setItem(`coupled-arweave-wallet-${ethAccountAddress}`, JSON.stringify(wallet))
      setWallet(wallet)
    }
  }, [ethAccountAddress])

  const importFromFile = useCallback(async (file: File) => {
    try {
      const fileReader = new FileReader()
      fileReader.readAsText(file, 'UTF-8')
      fileReader.onload = (e) => {
        if (e.target?.result) {
          function isValidWallet(json: object): json is JWKInterface {
            return (json as JWKInterface).kty !== undefined
          }
          const result: object = JSON.parse(e.target.result as string)
          if (isValidWallet(result)) setWallet(result)
          else {
            setError('Not a valid Arweave wallet KeyFile')
          }
        }
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  const backupWallet = useCallback(async () => {
    if (!wallet || !address) return
    const json = JSON.stringify(wallet, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const href = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = href
    link.download = `${address}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [wallet, address])

  useEffect(() => {
    if (wallet) {
      setError(null)
      void (async () => {
        const address = await getArweaveWalletAddress(wallet)
        setAddress(address)
        await getBalance()
      })()
    }
  }, [wallet])

  const getBalance = useCallback(async () => {
    if (wallet) {
      const balance = await getArweaveWalletBalance(wallet)
      setBalance(balance)
    }
  }, [wallet])

  // this hook is responsible for checking if there's a coupled wallet stored in localStorage
  useEffect(() => {
    if (!ethAccountAddress && wallet) {
      disconnect()
    } else if (ethAccountAddress) {
      const storedWallet = localStorage.getItem(`coupled-arweave-wallet-${ethAccountAddress}`)
      if (storedWallet) {
        setWallet(JSON.parse(storedWallet) as JWKInterface)
      }
    }
  }, [ethAccountAddress])

  const addPendingTx = useCallback(({ txId, onConfirmation }: AddPendingTxPayload) => {
    setPendingTxs((prevTxs) => [...prevTxs, { txId, status: null }])
    const intervalId = setInterval(async () => {
      const status = await getArweaveTxStatus(txId)
      const numberOfConfirmations = status.confirmed?.number_of_confirmations
      if (numberOfConfirmations && numberOfConfirmations > CONFIRMED_THRESHOLD) {
        setPendingTxs((prevTxs) => [...prevTxs.filter((tx) => tx.txId !== txId), { txId, status }])
        onConfirmation && (await onConfirmation())
        getBalance().catch((e) => console.error('Get balance error:', e))
        clearInterval(intervalId)
      }
    }, 3000)
  }, [])

  const value: IArweaveWalletContext = useMemo(
    () => ({
      account,
      isAccountLoading,
      userHasAccount: !!account?.txid,
      getAccount,
      wallet,
      error,
      address,
      balance,
      disconnect,
      generate,
      importFromFile,
      backupWallet,
      getBalance,
      generateBasedOnEthAddress,
      addPendingTx,
      pendingTxs,
    }),
    [address, wallet, balance, error, account, isAccountLoading, pendingTxs]
  )
  return <ArweaveWalletContext.Provider value={value}>{children}</ArweaveWalletContext.Provider>
}
