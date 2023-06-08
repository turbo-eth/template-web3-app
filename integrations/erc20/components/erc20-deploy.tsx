import { useState } from 'react'

import { FieldValues, useForm } from 'react-hook-form'
import { usePublicClient, useWalletClient } from 'wagmi'

import { BlockExplorerLink } from '@/components/blockchain/block-explorer-link'
import { ContractWriteButton } from '@/components/blockchain/contract-write-button'
import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'

import { erc20MintableABI } from '../abis/erc20-mintable-abi'
import { erc20MintableByteCode } from '../abis/erc20-mintable-bytecode'
import { useERC20TokenStorage } from '../hooks/use-erc20-token-storage'

export function DeployERC20Contract() {
  const [token, setToken] = useERC20TokenStorage()
  const [isSigning, setIsSigning] = useState<boolean>(false)
  const [isWaitingTransaction, setIsWaitingTransaction] = useState<boolean>(false)

  const { register, handleSubmit, watch } = useForm()
  const name = watch('name')
  const symbol = watch('symbol')

  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  const onSubmit = async (data: FieldValues) => {
    if (!walletClient) return
    setIsSigning(true)

    let hash: `0x${string}` | undefined

    try {
      hash = await walletClient.deployContract({
        abi: erc20MintableABI,
        bytecode: erc20MintableByteCode,
        args: [data.name, data.symbol],
      })
    } catch (e) {
      setIsSigning(false)
      return
    }

    setIsSigning(false)
    setIsWaitingTransaction(true)
    try {
      const receipt = await publicClient.waitForTransactionReceipt({ hash })
      if (!receipt.contractAddress) return

      setIsWaitingTransaction(false)
      setToken(receipt.contractAddress)
    } catch (e) {
      setIsWaitingTransaction(false)
    }
  }

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input {...register('name')} className="input" />
      <label>Symbol</label>
      <input {...register('symbol')} className="input" />
      <ContractWriteButton write={Boolean(name && symbol)} isLoadingTx={isWaitingTransaction} isLoadingWrite={isSigning} loadingTxText="Deploying...">
        Deploy
      </ContractWriteButton>
      {!token ? null : (
        <div className="flex max-w-full flex-wrap items-center justify-between break-words pt-5 pb-2">
          <span className="font-semibold">Mint Contract Address:</span>
          <BlockExplorerLink address={token} />
        </div>
      )}
    </form>
  )
}

export function ERC20Deploy() {
  return (
    <div className="card w-full">
      <BranchIsWalletConnected>
        <div className="w-full">
          <DeployERC20Contract />
          <hr className="my-4" />
          <div className="flex items-center justify-between">
            <h3 className="text-center">ERC20 Deploy</h3>
            <p className="text-center text-sm text-gray-500">Deploy a new mintable ERC20 token to any blockchain</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-10">
          <>
            <WalletConnect />
          </>
        </div>
      </BranchIsWalletConnected>
    </div>
  )
}
