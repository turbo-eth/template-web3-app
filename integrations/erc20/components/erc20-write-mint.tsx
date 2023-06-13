import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'
import { BaseError, parseEther } from 'viem'
import { Address, useAccount, useWaitForTransaction } from 'wagmi'

import { ContractWriteButton } from '@/components/blockchain/contract-write-button'
import { TransactionStatus } from '@/components/blockchain/transaction-status'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'

import ERC20EventMint from './erc20-event-mint'
import { useErc20MintableMint, usePrepareErc20MintableMint } from '../generated/erc20-wagmi'

interface ERC20WriteMintProps {
  address: Address
}

function ERC20ContractMintTokens({ address }: ERC20WriteMintProps) {
  const { register, watch, handleSubmit } = useForm()
  const watchAmount: string = watch('amount')
  const debouncedAmount = useDebounce(watchAmount, 500)

  const { address: accountAddress } = useAccount()

  const isValidAmount = Boolean(debouncedAmount && !isNaN(Number(debouncedAmount)))

  const { config, error, isError } = usePrepareErc20MintableMint({
    address,
    args: accountAddress && isValidAmount ? [accountAddress, parseEther(`${Number(debouncedAmount)}`)] : undefined,
    enabled: Boolean(address && isValidAmount),
  })

  const { data, write, isLoading: isLoadingWrite } = useErc20MintableMint(config)

  const { isLoading: isLoadingTx, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const onSubmit = async () => {
    write?.()
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <label>Amount</label>
      <input className="input" placeholder="1000" {...register('amount')} />
      <ContractWriteButton type="submit" isLoadingTx={isLoadingTx} isLoadingWrite={isLoadingWrite} write={!!write} loadingTxText="Minting...">
        Mint
      </ContractWriteButton>
      <TransactionStatus isError={isError} isLoadingTx={isLoadingTx} isSuccess={isSuccess} error={error as BaseError} hash={data?.hash} />
    </form>
  )
}

export function ERC20WriteMint({ address }: ERC20WriteMintProps) {
  return (
    <BranchIsWalletConnected>
      <div className="card w-full">
        <ERC20ContractMintTokens address={address} />
        <ERC20EventMint />
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">ERC20 Mint</h3>
          <p className="text-center text-sm text-gray-500">Mint tokens to yourself</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-10">
        <ConnectButton />
      </div>
    </BranchIsWalletConnected>
  )
}
