import { useState } from 'react'

import { usePublicClient, useWalletClient } from 'wagmi'

import { BlockExplorerLink } from '@/components/blockchain/block-explorer-link'
import { ContractWriteButton } from '@/components/blockchain/contract-write-button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { erc721ABI } from '../abis/erc721-abi'
import { erc721ByteCode } from '../abis/erc721-bytecode'
import { useDeploy } from '../hooks/use-erc721-deploy'
import { useErc721TokenStorage } from '../hooks/use-erc721-token-storage'
import { deployControls } from '../utils/controls'
import { getComponent } from '../utils/get-element-component'

export function ERC721Deploy() {
  const { form } = useDeploy()

  const [token, setTokenStorage] = useErc721TokenStorage()
  const { reset, handleSubmit, watch } = form
  const Name = watch('name')
  const Symbol = watch('symbol')

  const [isSigning, setIsSigning] = useState<boolean>(false)

  const [isWaitingTransaction, setIsWaitingTransaction] = useState<boolean>(false)

  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  const onSubmit = async (values: any) => {
    const { name, symbol } = values
    if (!walletClient) return
    setIsSigning(true)

    let hash: `0x${string}` | undefined
    try {
      hash = await walletClient.deployContract({
        abi: erc721ABI,
        bytecode: erc721ByteCode,
        args: [name, symbol],
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
      setTokenStorage(receipt.contractAddress)
    } catch (e) {
      setIsWaitingTransaction(false)
    }

    reset()
  }

  return (
    <div className="card w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {deployControls.map((item) => {
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
            write={Boolean(Name && Symbol)}
            isLoadingTx={isWaitingTransaction}
            isLoadingWrite={isSigning}
            loadingTxText="Deploying...">
            Deploy
          </ContractWriteButton>
        </form>
      </Form>

      {(token || isWaitingTransaction) && (
        <div className="flex max-w-full flex-wrap items-center justify-between break-words pt-5 pb-2">
          <span className="font-semibold">{token ? 'Mint Contract Address' : 'Deploying contract'}:</span>
          <BlockExplorerLink address={token} />
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
