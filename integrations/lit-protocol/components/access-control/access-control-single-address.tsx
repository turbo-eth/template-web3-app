import { zodResolver } from '@hookform/resolvers/zod'
import { ethers } from 'ethers'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { AccessControlProps } from './types'
import { singleAddressControls } from '../../utils/controls'
import { getComponent } from '../../utils/get-element-component'

const litSingleAddressSchema = z.object({
  singleAdd: z.string().refine((value) => ethers.utils.isAddress(value), {
    message: 'Wallet address is invalid. Please insure you have typed correctly.',
  }),
})

export function AccessControlSingleAddress({ setAccessControlConditions }: AccessControlProps) {
  const form = useForm<z.infer<typeof litSingleAddressSchema>>({
    resolver: zodResolver(litSingleAddressSchema),
    defaultValues: {
      singleAdd: '',
    },
  })

  const { register, handleSubmit } = form

  const onSubmit = (values: any) => {
    console.log('ok', values)
    setAccessControlConditions(getAccessControlConditions(values?.singleAdd))
  }

  return (
    <div className="mt-8">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-8">
          {singleAddressControls.map((item) => {
            const Item = getComponent(item?.component)
            return (
              <FormField
                {...register('singleAdd')}
                key={item?.label}
                control={form.control}
                name={item?.formfieldName as 'singleAdd'}
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>{item?.label}</FormLabel>
                      <FormControl>
                        <Item attribute={item?.attribute} placeholder={item?.placeholder} {...field} />
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
        </form>
      </Form>
    </div>
  )
}

const getAccessControlConditions = (address: string) => {
  return [
    {
      conditionType: 'evmBasic',
      contractAddress: '',
      standardContractType: '',
      chain: 'ethereum',
      method: '',
      parameters: [':userAddress'],
      returnValueTest: {
        comparator: '=',
        value: address,
      },
    },
  ]
}
