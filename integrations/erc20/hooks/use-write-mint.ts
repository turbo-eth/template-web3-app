import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useERC20TokenStorage } from '../hooks/use-erc20-token-storage'

const writeMintFormSchema = z.object({
  amount: z.string().min(1),
})

export const useWriteMint = () => {
  const form = useForm<z.infer<typeof writeMintFormSchema>>({
    resolver: zodResolver(writeMintFormSchema),
    defaultValues: {
      amount: '',
    },
  })
  const [token] = useERC20TokenStorage()

  return { form }
}
