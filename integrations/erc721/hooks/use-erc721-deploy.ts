import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const deployFormSchema = z.object({
  name: z.string().min(2).max(50),
  symbol: z.string().min(2).max(10),
})

export const useDeploy = () => {
  const form = useForm<z.infer<typeof deployFormSchema>>({
    resolver: zodResolver(deployFormSchema),
    defaultValues: {
      name: '',
      symbol: '',
    },
  })

  return { form }
}
