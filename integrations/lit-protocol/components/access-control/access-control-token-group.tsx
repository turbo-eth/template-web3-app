import { zodResolver } from '@hookform/resolvers/zod'
import { ethers } from 'ethers'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form'
import { FormItem } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { AccessControlProps } from './types'
import { GroupTokenControls } from '../../utils/controls'
import { getComponent } from '../../utils/get-element-component'

const litGroupSchema = z.object({
  chain: z.string(),
  tokenType: z.string(),
  address: z.string().refine((value) => ethers.utils.isAddress(value), {
    message: 'Address is invalid. Please insure you have typed correctly.',
  }),
  amount: z.string(),
  tokenId: z.string(),
  decimals: z.string(),
})

export function AccessControlTokenGroup({ setAccessControlConditions }: AccessControlProps) {
  const form = useForm<z.infer<typeof litGroupSchema>>({
    resolver: zodResolver(litGroupSchema),
    defaultValues: {
      chain: 'ethereum',
      tokenType: 'erc20',
      address: '',
      amount: '',
      tokenId: '',
      decimals: '18',
    },
  })

  const { register, handleSubmit, control, watch } = form

  const tokenValue = watch('tokenType')

  const onSubmit = (values: z.infer<typeof litGroupSchema>) => {
    const { chain, tokenType, address, amount, tokenId, decimals } = values

    setAccessControlConditions(getAccessControlConditions(chain, address, tokenType || '', amount, tokenId, Number(decimals)))
  }

  const Decimals = getComponent(GroupTokenControls[4].component)
  const TokenId = getComponent(GroupTokenControls[5].component)

  return (
    <div>
      <div className="mt-8">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className=" space-y-8">
            {GroupTokenControls.map((item, index) => {
              const Item = getComponent(item?.component)
              return (
                <FormField
                  {...register(item?.formfieldName as 'address' | 'tokenType' | 'tokenId' | 'chain')}
                  key={item?.label}
                  control={control}
                  name={item?.formfieldName as 'address' | 'tokenType' | 'tokenId' | 'chain'}
                  render={({ field }) => (
                    <>
                      <FormItem>
                        {index < 4 ? (
                          <>
                            <FormLabel>{item?.label}</FormLabel>
                            <FormControl>
                              {item.component === 'select' ? (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger className="input mt-4 text-gray-600 placeholder:text-neutral-400 dark:text-gray-600 dark:placeholder:text-neutral-400">
                                    <SelectValue placeholder="Select a chain" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-white dark:bg-white">
                                    {item?.options?.map((chain) => (
                                      <SelectItem key={chain} value={chain}>
                                        {chain}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Item placeholder={item.placeholder} {...field} attribute={item?.attribute} />
                              )}
                            </FormControl>
                          </>
                        ) : null}
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
              )
            })}

            {tokenValue === 'erc1155' && (
              <div className="mt-4">
                <FormField
                  key="tokenId"
                  control={control}
                  name="tokenId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token Id:</FormLabel>
                      <FormControl>
                        <Decimals placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {tokenValue === 'erc20' && (
              <div className="mt-4">
                <FormField
                  key="decimals"
                  control={control}
                  name="decimals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Decimals:</FormLabel>
                      <FormControl>
                        <TokenId placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <Button className="w-full" type="submit">
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

const getAccessControlConditions = (
  chain: string,
  address: string,
  tokenType: string,
  tokenAmount: string,
  tokenId: string,
  tokenDecimals: number
) => {
  return [
    {
      conditionType: 'evmBasic',
      contractAddress: address,
      standardContractType: tokenType,
      chain,
      method: 'balanceOf',
      parameters: tokenType === 'ERC1155' ? [':userAddress', tokenId] : [':userAddress'],
      returnValueTest: {
        comparator: '>=',
        value: tokenType === 'ERC20' ? String(Number(tokenAmount) * 10 ** tokenDecimals) : tokenAmount,
      },
    },
  ]
}
