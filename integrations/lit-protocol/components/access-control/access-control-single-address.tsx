import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form'
import { FormItem } from '@/components/ui/form'

import { AccessControlProps } from './types'
import { useLitClient } from '../../hooks/use-lit-client'
import { singleAddressControls } from '../../utils/controls'
import { getComponent } from '../../utils/get-element-component'

export function AccessControlSingleAddress({ setAccessControlConditions }: AccessControlProps) {
  // const [address, setAddress] = useState<string>('')

  const { form } = useLitClient()

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm()

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setAddress(e.target.value)
  // }

  const onSubmit = (values: any) => {
    console.log('ok', values)
    setAccessControlConditions(getAccessControlConditions(values.singleAdd))
  }

  return (
    // <form className="my-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
    //   <label className="mt-4">Wallet Address:</label>
    //   <input
    //     className="input mt-4"
    //     {...register('address', {
    //       required: 'Ethereum address is required',
    //       validate: {
    //         isValidEthereumAddress: (value) => isAddress(value) || 'Invalid Ethereum address',
    //       },
    //     })}
    //     placeholder="0x1234567890123456789012345678901234567890"
    //     type="text"
    //     value={address}
    //     onChange={handleChange}
    //   />
    //   {errors.address && <p className="mt-1 text-sm text-red-500">{String(errors.address?.message)}</p>}
    //   <button className="btn btn-emerald mt-4" type="submit">
    //     Save
    //   </button>
    // </form>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {singleAddressControls.map((item) => {
          const Item = getComponent(item?.component)
          return (
            <FormField
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
