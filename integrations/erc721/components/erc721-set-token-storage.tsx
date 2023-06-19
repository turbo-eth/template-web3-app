import { useEffect, useMemo, useState } from 'react'

import { Address, isAddress } from 'viem'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { useErc721TokenStorage } from '../hooks/use-erc721-token-storage'
import { useStorage } from '../hooks/use-storage'
import { storageControls } from '../utils/controls'
import { getComponent } from '../utils/get-element-component'

export function Erc721SetTokenStorage() {
  const { form } = useStorage()
  const [token, setToken] = useErc721TokenStorage()
  const [tokenAddress, setTokenAddress] = useState<Address>()

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

          <Button type="submit" disabled={!isValidAddress} className="btn  mt-3 w-full disabled:opacity-60">
            {'Select Contract Address'}
          </Button>
          <hr className="my-4" />
          <div className="flex items-center justify-between">
            <h3 className="text-center">Select ERC721 Contract</h3>
            <p className="text-center text-sm text-gray-500">Select which NFT contract to interact with</p>
          </div>
        </form>
      </Form>
    </div>
  )
}
