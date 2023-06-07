import { ConnectButton } from '@rainbow-me/rainbowkit'

import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form'
import { FormItem } from '@/components/ui/form'

import ERC20EventMint from './erc20-event-mint'
import { useWriteMint } from '../hooks/use-write-mint'
import { writeMintControls } from '../utils/controls'
import { getComponent } from '../utils/get-element-component'

function ERC20ContractMintTokens() {
  const { form, onSubmit } = useWriteMint()

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {writeMintControls.map((item) => {
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

          <Button className="w-full" type="submit">
            Mint
          </Button>
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
