import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const writeTransferFormSchema = z.object({
  amount: z.string().min(1),
  to: z.string().min(1),
})

export const useWriteTransfer = () => {
  const form = useForm<z.infer<typeof writeTransferFormSchema>>({
    resolver: zodResolver(writeTransferFormSchema),
    defaultValues: {
      // fromAddress: '',
      to: '',
      amount: '',
    },
  })

  return {
    form,
  }
}
