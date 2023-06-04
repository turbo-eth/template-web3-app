import { ethers } from 'ethers'
import { z } from 'zod'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form'
import { FormDescription, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import ERC20EventTransfer from './erc20-event-transfer'
import { useWriteTransfer } from '../hooks/use-write-transfer'
import { writeTransferControls } from '../utils/controls'

const writeTransferFormSchema = z.object({
  amount: z.string().min(1),
  fromAddress: z.string().refine((value) => ethers.utils.isAddress(value), {
    message: 'Sender address is invalid. Please insure you have typed correctly.',
  }),
  toAddress: z.string().refine((value) => ethers.utils.isAddress(value), {
    message: 'Reciever address is invalid. Please insure you have typed correctly.',
  }),
})

export function ERC20ContractTransferTokens() {
  const { form, onSubmit } = useWriteTransfer({ writeTransferFormSchema })

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
