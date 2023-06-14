import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { isAddress } from 'viem'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { AccessControlProps } from './types'
import { singleAddressControls } from '../../utils/controls'
import { getComponent } from '../../utils/get-element-component'

const litSingleAddressSchema = z.object({
  singleAdd: z.string().refine((value) => isAddress(value), {
    message: 'Single address is invalid. Please insure you have typed correctly.',
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

  const onSubmit = (values: z.infer<typeof litSingleAddressSchema>) => {
    setAccessControlConditions(getAccessControlConditions(values?.singleAdd))
  }

  // ----
  // const [address, setAddress] = useState<string>('')

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm()

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setAddress(e.target.value)
  // }

  // const onSubmit = (data: any) => {
  //   setAccessControlConditions(getAccessControlConditions(data.address))
  // }

  // return (
  //   <form className="my-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
  //     <label className="mt-4">Wallet Address:</label>
  //     <input
  //       className="input mt-4"
  //       {...register('address', {
  //         required: 'Ethereum address is required',
  //         validate: {
  //           isValidEthereumAddress: (value) => isAddress(value) || 'Invalid Ethereum address',
  //         },
  //       })}
  //       placeholder="0x1234567890123456789012345678901234567890"
  //       type="text"
  //       value={address}
  //       onChange={handleChange}
  //     />
  //     {errors.address && <p className="mt-1 text-sm text-red-500">{String(errors.address?.message)}</p>}
  //     <button className="btn btn-emerald mt-4" type="submit">
  //       Save
  //     </button>
  //   </form>
  // )

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
          <Button className="w-full" type="submit">
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
