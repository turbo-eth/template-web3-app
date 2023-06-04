import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Signer, ethers } from 'ethers'
import { useForm } from 'react-hook-form'
import { useSigner } from 'wagmi'
import { z } from 'zod'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { erc20MintableByteCode } from '../abis/erc20-mintable-bytecode'
import { erc20MintableABI } from '../erc20-wagmi'
import { useTokenStorage } from '../hooks/use-token-storage'
import { deployControls } from '../utils/controls'
import { deployFormSchema } from '../utils/formSchema'

export function DeployERC20Contract() {
  const [token, setToken] = useTokenStorage()

  const { data: signer } = useSigner()

  const [, setContractAddress] = useState<string | undefined>()

  const form = useForm<z.infer<typeof deployFormSchema>>({
    resolver: zodResolver(deployFormSchema),
    defaultValues: {
      name: '',
      symbol: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof deployFormSchema>) => {
    const factory = new ethers.ContractFactory(erc20MintableABI, erc20MintableByteCode, signer as Signer)
    const contract = await factory.deploy(values?.name, values?.symbol)
    const deployed = await contract.deployTransaction.wait()

    form.reset()
    setToken(deployed.contractAddress)
    setContractAddress(deployed.contractAddress)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {deployControls.map((item) => {
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
                        <Input placeholder={item?.placeholder} {...field} />
                      </FormControl>
                      <FormDescription>{item?.description}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
            )
          })}

          <Button type="submit">Submit</Button>
        </form>
      </Form>

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
