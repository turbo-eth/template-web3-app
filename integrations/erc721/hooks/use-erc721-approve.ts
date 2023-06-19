import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { isAddress } from 'viem'
import { z } from 'zod'

const writeApproveFormSchema = z.object({
  toAddress: z.string().refine((value) => isAddress(value), {
    message: 'Single address is invalid. Please insure you have typed correctly.',
  }),
  tokenId: z.string().min(1),
})

export const useWriteApprove = () => {
  const form = useForm<z.infer<typeof writeApproveFormSchema>>({
    resolver: zodResolver(writeApproveFormSchema),
    defaultValues: {
      toAddress: '',
      tokenId: '',
    },
  })

  return { form }
}
