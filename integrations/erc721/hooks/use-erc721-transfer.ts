import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { isAddress } from 'viem'
import { z } from 'zod'

const transferFormSchema = z.object({
  toAddress: z.string().refine((value) => isAddress(value), {
    message: 'Receiver address is invalid. Please insure you have typed correctly.',
  }),
  fromAddress: z.string().refine((value) => isAddress(value), {
    message: 'Sender address is invalid. Please insure you have typed correctly.',
  }),
  tokenId: z.string().min(1),
  differentFromAddress: z.boolean(),
})

export const useTransfer = () => {
  const form = useForm<z.infer<typeof transferFormSchema>>({
    resolver: zodResolver(transferFormSchema),
    defaultValues: {
      toAddress: '',
      fromAddress: '',
      tokenId: '',
      differentFromAddress: true,
    },
  })

  return { form }
}
