import { useDebounce } from 'usehooks-ts'
import { BaseError, parseEther } from 'viem'
import { Address, useWaitForTransaction } from 'wagmi'

import { ContractWriteButton } from '@/components/blockchain/contract-write-button'
import { TransactionStatus } from '@/components/blockchain/transaction-status'
import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import ERC20EventTransfer from './erc20-event-transfer'
import { useErc20Transfer, usePrepareErc20Transfer } from '../erc20-wagmi'
import { useWriteTransfer } from '../hooks/use-write-transfer'
import { writeTransferControls } from '../utils/controls'
import { getComponent } from '../utils/get-element-component'

interface ERC20WriteTransferProps {
  address: Address
}

export function ERC20ContractTransferTokens({ address }: ERC20WriteTransferProps) {
  const { form } = useWriteTransfer()
  const { watch, handleSubmit, reset } = form

  const watchAmount: string = watch('amount')
  const watchTo = watch('to')
  const debouncedAmount = useDebounce(watchAmount, 500)
  const debouncedTo = useDebounce(watchTo, 500)

  const isValidAmount = Boolean(debouncedAmount && !isNaN(Number(debouncedAmount)))

  const { config, error, isError } = usePrepareErc20Transfer({
    address,
    args: debouncedTo && isValidAmount ? [debouncedTo, parseEther(`${Number(debouncedAmount)}`)] : undefined,
    enabled: Boolean(debouncedTo && isValidAmount),
  })

  const { data, write, isLoading: isLoadingWrite } = useErc20Transfer(config)

  const { isLoading: isLoadingTx, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const onSubmit = async () => {
    write?.()
    reset()
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {writeTransferControls.map((item) => {
            const Item = getComponent(item?.type)
            return (
              <FormField
                key={item?.label}
                control={form.control}
                name={item?.formfieldName}
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>{item?.label}</FormLabel>
                      <FormControl>
                        <Item placeholder={item?.placeholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
            )
          })}

          <ContractWriteButton
            type="submit"
            isLoadingTx={isLoadingTx}
            isLoadingWrite={isLoadingWrite}
            write={!!write}
            loadingTxText="Transferring...">
            Transfer
          </ContractWriteButton>
        </form>
      </Form>
      <div className="mt-4">
        <TransactionStatus isError={isError} isLoadingTx={isLoadingTx} isSuccess={isSuccess} error={error as BaseError} hash={data?.hash} />
      </div>
    </>
  )
}

export function ERC20WriteTransfer({ address }: ERC20WriteTransferProps) {
  return (
    <BranchIsWalletConnected>
      <div className="card w-full">
        <ERC20ContractTransferTokens address={address} />
        <ERC20EventTransfer />
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">ERC20 Transfer</h3>
          <p className="text-center text-sm text-gray-500">Transer tokens to a friend... or enemy.</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-10">
        <WalletConnect />
      </div>
    </BranchIsWalletConnected>
  )
}
