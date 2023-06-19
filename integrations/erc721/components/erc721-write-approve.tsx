import { useDebounce } from 'usehooks-ts'
import { BaseError, getAddress } from 'viem'
import { Address, useWaitForTransaction } from 'wagmi'

import { ContractWriteButton } from '@/components/blockchain/contract-write-button'
import { TransactionStatus } from '@/components/blockchain/transaction-status'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { useErc721Approve, usePrepareErc721Approve } from '../erc721-wagmi'
import { useWriteApprove } from '../hooks/use-erc721-approve'
import { approveControls } from '../utils/controls'
import { getComponent } from '../utils/get-element-component'
interface Erc721WriteApproveProps {
  address: Address
}

export function Erc721WriteApprove({ address }: Erc721WriteApproveProps) {
  const { form } = useWriteApprove()
  const { handleSubmit, watch, reset } = form
  const watchToAddress: Address = getAddress(watch('toAddress') || '0x0000000000000000000000000000000000000000')
  const watchTokenId: string = watch('tokenId')
  const debouncedToAddress = useDebounce(watchToAddress, 500)
  const debouncedTokenId = useDebounce(watchTokenId, 500)

  const { config, error, isError } = usePrepareErc721Approve({
    address,
    args: debouncedToAddress && debouncedTokenId ? [debouncedToAddress, BigInt(debouncedTokenId)] : undefined,
    enabled: Boolean(debouncedToAddress && debouncedTokenId),
  })

  const { data, write, isLoading: isLoadingWrite } = useErc721Approve(config)

  const { isLoading: isLoadingTx, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const onSubmit = async () => {
    write?.()
    reset()
  }

  return (
    <div className="card w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {approveControls.map((item) => {
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
          <ContractWriteButton type="submit" isLoadingTx={isLoadingTx} isLoadingWrite={isLoadingWrite} write={!!write} loadingTxText="Approving...">
            Approve
          </ContractWriteButton>

          <TransactionStatus
            isError={isError && Boolean(debouncedToAddress && debouncedTokenId)}
            isLoadingTx={isLoadingTx}
            isSuccess={isSuccess}
            error={error as BaseError}
            hash={data?.hash}
          />
          <hr className="my-4" />
          <div className="flex items-center justify-between">
            <h3 className="text-center">ERC721 Approve</h3>
            <p className="text-center text-sm text-gray-500">Approve NFTs to any address</p>
          </div>
        </form>
      </Form>
    </div>
  )
}
