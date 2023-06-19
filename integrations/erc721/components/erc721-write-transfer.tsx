import { useDebounce } from 'usehooks-ts'
import { BaseError, getAddress } from 'viem'
import { Address, useAccount, useWaitForTransaction } from 'wagmi'

import { TransactionStatus } from '@/components/blockchain/transaction-status'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { useErc721SafeTransferFrom, usePrepareErc721SafeTransferFrom } from '../erc721-wagmi'
import { useTransfer } from '../hooks/use-erc721-transfer'
import { writeTransferControls, writeTransferFromControls } from '../utils/controls'
import { getComponent } from '../utils/get-element-component'

interface Erc721WriteTransferProps {
  address: Address
}

export function Erc721WriteTransfer({ address }: Erc721WriteTransferProps) {
  const { form } = useTransfer()

  const { register, watch, handleSubmit, reset } = form

  const watchDifferentFromAddress: boolean = watch('differentFromAddress' || '0x0000000000000000000000000000000000000000')
  const watchTokenId: string = watch('tokenId')
  const watchFromAddress: Address = getAddress(watch('fromAddress') || '0x0000000000000000000000000000000000000000')
  const watchToAddress: Address = getAddress(watch('toAddress') || '0x0000000000000000000000000000000000000000')
  const debouncedTokenId = useDebounce(watchTokenId, 500)
  const debouncedFromAddress = useDebounce(watchFromAddress, 500)
  const debouncedToAddress = useDebounce(watchToAddress, 500)

  const { address: accountAddress } = useAccount()

  const transferFromAddress = watchDifferentFromAddress ? debouncedFromAddress : accountAddress

  const { config, error, isError } = usePrepareErc721SafeTransferFrom({
    address,
    args:
      transferFromAddress && debouncedToAddress && debouncedTokenId ? [transferFromAddress, debouncedToAddress, BigInt(debouncedTokenId)] : undefined,
    enabled: Boolean(transferFromAddress && debouncedToAddress && debouncedTokenId),
  })

  const { data, write, isLoading: isLoadingWrite } = useErc721SafeTransferFrom(config)

  const { isLoading: isLoadingTx, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const onSubmit = async () => {
    await write?.()
  }

  return (
    <div className="card w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="mb-4 flex items-center justify-between text-sm">
            <label>Use different from address</label>
            <div className="h-6 w-6">
              <input {...register('differentFromAddress')} type="checkbox" className="input" />
            </div>
          </div>
          {(!watchDifferentFromAddress ? writeTransferControls : writeTransferFromControls).map((item) => {
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
          <Button className="w-full" type="submit" disabled={!write || isLoadingWrite || isLoadingTx}>
            {isLoadingWrite ? 'Sign the transaction in your wallet' : isLoadingTx ? 'Transferring...' : 'Transfer'}
          </Button>
          <TransactionStatus isError={isError} isLoadingTx={isLoadingTx} isSuccess={isSuccess} error={error as BaseError} hash={data?.hash} />
          <hr className="my-4" />
          <div className="flex items-center justify-between">
            <h3 className="text-center">ERC721 Transfer</h3>
            <p className="text-center text-sm text-gray-500">Transfer NFTs to any address</p>
          </div>
        </form>
      </Form>
    </div>
  )
}
