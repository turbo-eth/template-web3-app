import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const storageFormSchema = z.object({
  address: z.string().min(1),
})

export const useStorage = () => {
  const form = useForm<z.infer<typeof storageFormSchema>>({
    resolver: zodResolver(storageFormSchema),
    defaultValues: {
      address: '',
    },
  })

  return { form }
}
