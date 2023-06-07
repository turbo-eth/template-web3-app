import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { useDeploy } from '../hooks/use-deploy'
import { deployControls } from '../utils/controls'
import { getComponent } from '../utils/get-element-component'

export function DeployERC20Contract() {
  const { form, onSubmit, token } = useDeploy()

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

          <Button className="w-full" type="submit">
            Deploy
          </Button>
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
