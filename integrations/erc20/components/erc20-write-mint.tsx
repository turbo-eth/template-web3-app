import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { utils } from 'ethers'
import { useForm } from 'react-hook-form'
import { useAccount } from 'wagmi'
import { useErc20MintableMint } from '../erc20-wagmi'
import { useTokenStorage } from '../use-token-storage'

import ERC20EventMint from './erc20-event-mint'

function ERC20ContractMintTokens() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [token] = useTokenStorage()
  const { address } = useAccount()
  // @ts-ignore
  const mintAction = useErc20MintableMint({
    address: token as `0x${string}`,
  })

  const onSubmit = async (data: any) => {
    // @ts-ignore
    const tx = await mintAction.writeAsync({
      recklesslySetUnpreparedArgs: [address as `0x${string}`, utils.parseEther(data.amount)],
    })
  }

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label>Amount</label>
        <input className="input" placeholder="1000" {...register('amount')} />
        {errors.exampleRequired && <span>This field is required</span>}
        <button type="submit" className="btn btn-emerald">
          Mint
        </button>
      </form>
    </>
  )
}

export function ERC20WriteMint() {
  return (
    <BranchIsWalletConnected>
      <div className="w-full">
        <ERC20ContractMintTokens />
        <ERC20EventMint />
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">ERC20 Mint</h3>
          <p className="text-center text-sm text-gray-500">Mint tokens to yourself</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-10">
        <>
          <ConnectButton />
        </>
      </div>
    </BranchIsWalletConnected>
  )
}
