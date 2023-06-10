import { zodResolver } from '@hookform/resolvers/zod'
import { ethers } from 'ethers'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form'
import { FormItem } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { AccessControlProps } from './types'
import { supportedChains } from '../../utils/config'
import { SingleNFtControls } from '../../utils/controls'
import { getComponent } from '../../utils/get-element-component'

const litSingleERC721Schema = z.object({
  chain: z.string(),
  singleNftAdd: z.string().refine((value) => ethers.utils.isAddress(value), {
    message: 'Wallet address is invalid. Please insure you have typed correctly.',
  }),
  tokenId: z.string(),
})

export function AccessControlSingleERC721({ setAccessControlConditions }: AccessControlProps) {
  const form = useForm<z.infer<typeof litSingleERC721Schema>>({
    resolver: zodResolver(litSingleERC721Schema),
    defaultValues: {
      chain: '',
      singleNftAdd: '',
      tokenId: '',
    },
  })

  const { register, handleSubmit, control } = form
  const onSubmit = (data: z.infer<typeof litSingleERC721Schema>) => {
    setAccessControlConditions(getAccessControlConditions(data.chain, data.singleNftAdd, data.tokenId))
  }

  return (
    <div className="mt-8">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-8">
          {SingleNFtControls.map((item) => {
            const Item = getComponent(item?.component)
            return (
              <FormField
                {...register(item?.formfieldName as 'singleNftAdd' | 'tokenId' | 'chain')}
                key={item?.label}
                control={control}
                name={item?.formfieldName as 'singleNftAdd' | 'tokenId' | 'chain'}
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>{item?.label}</FormLabel>
                      <FormControl>
                        {item.component === 'select' ? (
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="input mt-4 text-gray-600 placeholder:text-neutral-400 dark:text-gray-600 dark:placeholder:text-neutral-400">
                              <SelectValue placeholder="Select a chain" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-white">
                              {supportedChains.map((chain) => (
                                <SelectItem key={chain} value={chain}>
                                  {chain}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Item placeholder={item.placeholder} {...field} attribute={item?.attribute} />
                        )}
                        {/* {item.component === 'select' && (
                          <Select {...register('chain')} value={chain} onValueChange={(value) => setChain(value)}>
                            <SelectTrigger className="input mt-4 text-gray-600 placeholder:text-neutral-400 dark:text-gray-600 dark:placeholder:text-neutral-400">
                              <SelectValue placeholder="Select a chain" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-white">
                              {supportedChains.map((chain) => (
                                <SelectItem key={chain} value={chain}>
                                  {chain}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )} */}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
            )
          })}
          <Button
            onClick={() => {
              console.log('elkncl')
            }}
            className="w-full"
            type="submit">
            Save
          </Button>
          {/* <Button
    className="w-full"
    type="submit"
    onClick={() => {
      console.log('elkncl')
    }}>
    elvelknk
  </Button> */}
        </form>
      </Form>
    </div>
  )
}

const getAccessControlConditions = (chain: string, address: string, tokenId: string) => {
  return [
    {
      conditionType: 'evmBasic',
      contractAddress: address,
      standardContractType: 'ERC721',
      chain,
      method: 'ownerOf',
      parameters: [tokenId],
      returnValueTest: {
        comparator: '=',
        value: ':userAddress',
      },
    },
  ]
}
