'use client'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

import { JWKInterface } from 'arweave/node/lib/wallet'

import { generateArweaveWallet, getArweaveWalletAddress, getArweaveWalletBalance } from '..'
import { ArweaveAmount } from '../utils/types'

export interface IArweaveWalletContext {
  wallet: JWKInterface | null
  error: string | null
  address: string | null
  balance: ArweaveAmount | null
  disconnect: () => void
  generate: () => Promise<void>
  importFromFile: (file: File) => Promise<void>
  backupWallet: () => Promise<void>
}

export const ArweaveWalletContext = createContext<IArweaveWalletContext>({
  wallet: null,
  error: null,
  address: null,
  balance: null,
  disconnect: () => {
    return
  },
  generate: () => Promise.resolve(),
  importFromFile: () => Promise.resolve(),
  backupWallet: () => Promise.resolve(),
})

export const ArweaveWalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallet, setWallet] = useState<JWKInterface | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<ArweaveAmount | null>(null)

  const disconnect = useCallback(() => {
    setWallet(null)
    setAddress(null)
    setBalance(null)
  }, [])

  const generate = useCallback(async () => {
    const wallet = await generateArweaveWallet()
    setWallet(wallet)
  }, [])

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
    console.info(wallet, address)
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
        const balance = await getArweaveWalletBalance(wallet)
        setBalance(balance)
      })()
    }
  }, [wallet])

  const value: IArweaveWalletContext = useMemo(
    () => ({
      wallet,
      error,
      address,
      balance,
      disconnect,
      generate,
      importFromFile,
      backupWallet,
    }),
    [address, wallet, balance, error]
  )
  return <ArweaveWalletContext.Provider value={value}>{children}</ArweaveWalletContext.Provider>
}
