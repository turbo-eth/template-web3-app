import { zodResolver } from '@hookform/resolvers/zod'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { utils } from 'ethers'
import { useForm } from 'react-hook-form'
import { useAccount } from 'wagmi'
import { z } from 'zod'

import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form'
import { FormDescription, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import ERC20EventMint from './erc20-event-mint'
import { useErc20MintableMint } from '../erc20-wagmi'
import { useTokenStorage } from '../hooks/use-token-storage'
import { writeMintControls } from '../utils/controls'
import { writeMintFormSchema } from '../utils/formSchema'

function ERC20ContractMintTokens() {
  const [token] = useTokenStorage()
  const { address } = useAccount()
  // @ts-ignore
  const mintAction = useErc20MintableMint({
    address: token as `0x${string}`,
  })

  const form = useForm<z.infer<typeof writeMintFormSchema>>({
    resolver: zodResolver(writeMintFormSchema),
    defaultValues: {
      amount: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof writeMintFormSchema>) => {
    console.log('values', values)

    // @ts-ignore
    const tx = await mintAction.writeAsync({
      recklesslySetUnpreparedArgs: [address as `0x${string}`, utils.parseEther(values.amount)],
    })
    form.reset()
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {writeMintControls.map((item) => {
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
