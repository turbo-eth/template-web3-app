import { useEffect, useRef, useState } from 'react'

import { redirect } from 'next/navigation'
import { useAccount } from 'wagmi'

import { Spinner } from './spinner'
import { useArweaveWallet } from '../hooks/use-arweave-wallet'

export function ConnectArweaveWallet() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { generate, wallet, importFromFile, error, generateBasedOnEthAddress } = useArweaveWallet()
  const { address: ethAccountAddress } = useAccount()
  useEffect(() => {
    if (wallet || error) setLoading(false)
  }, [wallet, error])

  if (loading) return <Spinner />

  if (!wallet)
    return (
      <div>
        <div>Use your Eth address</div>
        <button
          className="btn btn-emerald mt-2"
          disabled={!ethAccountAddress}
          onClick={() => {
            if (ethAccountAddress) {
              setLoading(true)
              void generateBasedOnEthAddress()
            }
          }}>
          Generate wallet
        </button>
        <div className="my-5 text-slate-500"> - or - </div>
        <div>Generate a new Arweave Wallet</div>
        <button
          className="btn btn-primary mt-2"
          onClick={() => {
            setLoading(true)
            void generate()
          }}>
          Generate wallet
        </button>
        <div className="my-5 text-slate-500"> - or - </div>
        <div>Import your wallet KeyFile</div>
        <button className="btn btn-primary mt-2" onClick={() => fileInputRef.current?.click()}>
          <span className="mt-2 text-base leading-normal">Select a file</span>
        </button>
        <input
          ref={fileInputRef}
          accept="application/json"
          className="hidden"
          hidden={true}
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setLoading(true)
              void importFromFile(e.target.files[0])
            }
          }}
        />
        {error && (
          <div className="mt-2">
            <span className="text-sm text-red-400">{error}</span>
          </div>
        )}
        <div className="mt-4 w-80 text-sm text-gray-600">
          You can get a backup of your Arweave wallet by clicking your wallet address in the sidebar once connected.
        </div>
      </div>
    )

  return redirect('/integration/arweave/settings')
}
