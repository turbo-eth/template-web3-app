import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { isAddress } from 'viem'
import { z } from 'zod'

const writeMintFormSchema = z.object({
  toAddress: z.string().refine((value) => isAddress(value), {
    message: 'Single address is invalid. Please insure you have typed correctly.',
  }),
  tokenId: z.string().min(1),
  tokenUri: z.string().min(1),
})

export const useWriteMint = () => {
  const form = useForm<z.infer<typeof writeMintFormSchema>>({
    resolver: zodResolver(writeMintFormSchema),
    defaultValues: {
      toAddress: '',
      tokenId: '',
      tokenUri: '',
    },
  })

  return { form }
}
