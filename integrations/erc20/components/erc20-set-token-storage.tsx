import { useEffect, useMemo, useState } from 'react'

import { isAddress } from 'viem'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { useERC20TokenStorage } from '../hooks/use-erc20-token-storage'
import { useStorage } from '../hooks/use-storage'
import { storageControls } from '../utils/controls'
import { getComponent } from '../utils/get-element-component'
export function Erc20SetTokenStorage() {
  const { form } = useStorage()
  const [token, setToken] = useERC20TokenStorage()
  const [tokenAddress, setTokenAddress] = useState(token)

  const { watch, handleSubmit, reset } = form

  const Address: Address = watch('address')

  const onSubmit = async (values: any) => {
    setToken(tokenAddress)
    reset()
  }

  const isValidAddress = useMemo(() => tokenAddress && isAddress(tokenAddress), [tokenAddress])

  useEffect(() => {
    setTokenAddress(token)
  }, [token])

  useEffect(() => {
    setTokenAddress(Address)
  }, [Address])

  return (
    <div className="card w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {storageControls.map((item) => {
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

          <Button type="submit" disabled={!isValidAddress} className="btn w-full">
            {'Select Contract Address'}
          </Button>
          <hr className="my-4" />
          <div className="flex items-center justify-between">
            <h3 className="text-center">Select ERC20 Contract</h3>
            <p className="text-center text-sm text-gray-500">Select which ERC20 contract to interact with</p>
          </div>
        </form>
      </Form>
    </div>
  )
}
