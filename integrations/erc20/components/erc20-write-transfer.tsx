import { zodResolver } from '@hookform/resolvers/zod'
import { utils } from 'ethers'
import { useForm } from 'react-hook-form'
import { useSigner } from 'wagmi'
import { z } from 'zod'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form'
import { FormDescription, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import ERC20EventTransfer from './erc20-event-transfer'
import { useErc20Transfer } from '../erc20-wagmi'
import { useTokenStorage } from '../hooks/use-token-storage'
import { writeTransferControls } from '../utils/controls'
import { writeTransferFormSchema } from '../utils/formSchema'

export function ERC20ContractTransferTokens() {
  const form = useForm<z.infer<typeof writeTransferFormSchema>>({
    resolver: zodResolver(writeTransferFormSchema),
    defaultValues: {
      fromAddress: '',
      toAddress: '',
      amount: '',
    },
  })
  const { data: signer } = useSigner()

  const [token] = useTokenStorage()
  // @ts-ignore
  const mintAction = useErc20Transfer({
    address: token,
  })

  const onSubmit = async (values: z.infer<typeof writeTransferFormSchema>) => {
    console.log('ij', values)

    // @ts-ignore
    const tx = await mintAction.writeAsync({
      recklesslySetUnpreparedArgs: [values?.toAddress as `0x${string}`, utils.parseEther(values.amount)],
    })

    form.reset()
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {writeTransferControls.map((item) => {
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
