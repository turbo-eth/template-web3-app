import { FormEvent, useState } from 'react'

import { ethers } from 'ethers'
import { useNetwork, useSigner } from 'wagmi'

import { LinkComponent } from '@/components/shared/link-component'

import { erc721ABI } from '../abis/erc721-abi'
import { erc721ByteCode } from '../abis/erc721-bytecode'
import { useErc721TokenStorage } from '../hooks/use-erc721-token-storage'

export function ERC721Deploy() {
  const [token, setTokenStorage] = useErc721TokenStorage()
  const [isSigning, setIsSigning] = useState<boolean>(false)
  const [isWaitingTransaction, setIsWaitingTransaction] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [symbol, setSymbol] = useState<string>('')
  const { data: signer } = useSigner()
  const { chain } = useNetwork()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!signer) return
    setIsSigning(true)

    let contract: ethers.Contract
    try {
      const factory = new ethers.ContractFactory(erc721ABI, erc721ByteCode, signer)
      contract = await factory.deploy(name, symbol)
    } catch (e) {
      setIsSigning(false)
      return
    }
    setIsSigning(false)
    setIsWaitingTransaction(true)
    try {
      const deployed = await contract.deployTransaction.wait()
      setIsWaitingTransaction(false)
      setTokenStorage(deployed.contractAddress)
    } catch (e) {
      setIsWaitingTransaction(false)
    }
  }

  return (
    <div className="card w-full">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="input" />
        <label>Symbol</label>
        <input value={symbol} onChange={(e) => setSymbol(e.target.value)} className="input" />
        <button disabled={!name || !symbol || isSigning || isWaitingTransaction} type="submit" className="btn btn-emerald disabled:opacity-60">
          {isSigning ? 'Sign the transaction' : isWaitingTransaction ? 'Deploying...' : 'Deploy'}
        </button>
      </form>
      {(token || isWaitingTransaction) && (
        <div className="flex max-w-full flex-wrap items-center justify-between break-words pt-5 pb-2">
          <span className="font-semibold">{token ? 'Mint Contract Address' : 'Deploying contract'}:</span>
          <LinkComponent
            className="overflow-x-scroll font-medium underline"
            isExternal
            href={`${chain?.blockExplorers?.default.url}/address/${token}`}>
            {token}
          </LinkComponent>
        </div>
      )}
      <hr className="my-4" />
      <div className="flex items-center justify-between">
        <h3 className="text-center">ERC721 Deploy</h3>
        <p className="text-center text-sm text-gray-500">Deploy a new mintable ERC721 token to any blockchain</p>
      </div>
    </div>
  )
}
