import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const writeMintFormSchema = z.object({
  address: z.string().min(1),
})

export const useStorage = () => {
  const form = useForm<z.infer<typeof writeMintFormSchema>>({
    resolver: zodResolver(writeMintFormSchema),
    defaultValues: {
      address: '',
    },
  })

  return { form }
}
