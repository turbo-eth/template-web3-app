import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Spinner } from './spinner'
import { useArweaveWallet } from '../hooks/use-arweave-wallet'

export function ConnectArweaveWallet() {
  const [loading, setLoading] = useState<boolean>(false)
  const { generate, disconnect, wallet, address, backupWallet, balance, importFromFile, error } = useArweaveWallet()
  useEffect(() => {
    if (wallet) setLoading(false)
    if (error) setLoading(false)
  }, [wallet, error])

  if (loading) return <Spinner />

  if (!wallet)
    return (
      <div>
        <div>Generate a new Arweave Wallet</div>
        <Button
          onClick={() => {
            setLoading(true)
            void generate()
          }}>
          Generate wallet
        </Button>
        <div className="my-5"> - or - </div>
        <div>Import your wallet KeyFile</div>
        <label>
          <Input
            accept="application/json"
            type="file"
            className="text-sm
            file:mr-5 file:rounded-full file:border-0
            file:bg-blue-50 file:py-2
            file:px-6 file:text-sm
            file:font-medium file:text-blue-700
            hover:file:cursor-pointer
          "
            onChange={(e) => {
              if (e.target.files) {
                setLoading(true)
                void importFromFile(e.target.files[0])
              }
            }}
          />
        </label>
        {error && <div className="text-red-50">{error}</div>}
      </div>
    )

  return (
    <div>
      <h3>Connected to {address}</h3>
      <div className="flex">
        Balance:{' '}
        {balance ? (
          <>
            {balance?.ar} AR ({balance?.winston} winston)
          </>
        ) : (
          <Spinner />
        )}
      </div>
      <div>
        <Button onClick={() => backupWallet()}>backup keyfile</Button>
        <Button onClick={() => disconnect()}>disconnect</Button>
      </div>
    </div>
  )
}
