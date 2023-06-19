import { useState } from 'react'

import { FieldValues } from 'react-hook-form'
import { usePublicClient, useWalletClient } from 'wagmi'

import { BlockExplorerLink } from '@/components/blockchain/block-explorer-link'
import { ContractWriteButton } from '@/components/blockchain/contract-write-button'
import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { erc20MintableABI } from '../abis/erc20-mintable-abi'
import { erc20MintableByteCode } from '../abis/erc20-mintable-bytecode'
import { useDeploy } from '../hooks/use-deploy'
import { deployControls } from '../utils/controls'
import { getComponent } from '../utils/get-element-component'

export function DeployERC20Contract() {
  const { form, token = '', setToken = () => {} } = useDeploy()

  const [isSigning, setIsSigning] = useState<boolean>(false)
  const [isWaitingTransaction, setIsWaitingTransaction] = useState<boolean>(false)

  const { reset, handleSubmit, watch } = form
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
    reset()
  }

  return (
    <>
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
            write={Boolean(name && symbol)}
            isLoadingTx={isWaitingTransaction}
            isLoadingWrite={isSigning}
            loadingTxText="Deploying...">
            Deploy
          </ContractWriteButton>
        </form>
      </Form>
      {!token ? null : (
        <div className="flex max-w-full flex-wrap items-center justify-between break-words pt-5 pb-2">
          <span className="font-semibold">Mint Contract Address:</span>
          <BlockExplorerLink address={token} />
        </div>
      )}
    </>
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
