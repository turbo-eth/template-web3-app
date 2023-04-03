import { useState } from 'react'

import { ethers, Signer } from 'ethers'
import { useForm } from 'react-hook-form'
import { useSigner } from 'wagmi'
import { erc20MintableABI } from '../abis/erc20MintableABI'
import { erc20MintableByteCode } from '../abis/erc20MintableByteCode'
import { useTokenStorage } from '../use-token-storage'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { WalletConnect } from '@/components/blockchain/wallet-connect'

export function DeployERC20Contract() {
  const [token, setToken] = useTokenStorage()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { data: signer } = useSigner()

  const [, setContractAddress] = useState<string | undefined>()
  const onSubmit = async (data: any) => {
    // https://docs.ethers.org/v5/api/contract/example/#example-erc-20-contract--deploying-a-contract
    const factory = new ethers.ContractFactory(erc20MintableABI, erc20MintableByteCode, signer as Signer)
    const contract = await factory.deploy(data.name, data.symbol)
    const deployed = await contract.deployTransaction.wait()

    setToken(deployed.contractAddress)
    setContractAddress(deployed.contractAddress)
  }

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input {...register('name')} className="input" />
        <label>Symbol</label>
        <input {...register('symbol')} className="input" />
        {errors.exampleRequired && <span>This field is required</span>}
        <button type="submit" className="btn btn-primary">
          Deploy
        </button>
      </form>
      {!token ? null : (
        <div className="flex items-center justify-between pt-5 pb-2">
          <span className="font-semibold">Mint Contract Address:</span>
          <span className="">{token}</span>
        </div>
      )}
    </>
  )
}

export function ERC20Deploy() {
  return (
    <div className="w-full">
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
