import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { utils } from 'ethers'
import { useForm } from 'react-hook-form'
import { useSigner } from 'wagmi'
import { useErc20Transfer } from '../erc20-wagmi'
import { useTokenStorage } from '../hooks/use-token-storage'

import ERC20EventTransfer from './erc20-event-transfer'

export function ERC20ContractTransferTokens() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { data: signer } = useSigner()

  const [token] = useTokenStorage()
  // @ts-ignore
  const mintAction = useErc20Transfer({
    address: token,
  })

  const onSubmit = async (data: any) => {
    // @ts-ignore
    const tx = await mintAction.writeAsync({
      recklesslySetUnpreparedArgs: [data.to, utils.parseEther(data.amount)],
    })
  }

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label>Amount</label>
        <input placeholder="10" {...register('amount')} className="input" />
        <label>To</label>
        <input placeholder="kames.eth" {...register('to')} className="input" />
        {errors.exampleRequired && <span>This field is required</span>}
        <button type="submit" className="btn btn-emerald">
          Transfer
        </button>
      </form>
    </>
  )
}

export function ERC20WriteTransfer() {
  return (
    <BranchIsWalletConnected>
      <div className="w-full">
        <h3 className="font-bold">Transfer</h3>
        <hr className="my-2" />
        <ERC20ContractTransferTokens />
        <ERC20EventTransfer />
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">ERC20 Transfer</h3>
          <p className="text-center text-sm text-gray-500">Transer tokens to a friend... or enemy.</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-10">
        <>
          <WalletConnect />
        </>
      </div>
    </BranchIsWalletConnected>
  )
}
