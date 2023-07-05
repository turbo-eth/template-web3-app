import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Address } from 'wagmi'
import { z } from 'zod'

import { appDiscoGetProfileFromAddress } from '../routes/get-profile-from-address/client'

export const ApiCall = (address?: Address, queryKey?: any) => {
  return useQuery(['discoProfileFromAddress', address, queryKey], async () => appDiscoGetProfileFromAddress(address))
}
export const useDiscoIssueCredential = () => {
  const discoSchema = z.object({
    // apiKey: z.string().min(2).max(51),
    // prompt: z.string().min(2).max(100000),
    eventDate: z.coerce.date(),
    eventName: z.string(),
    place: z.string(),
    projectName: z.string(),
    sourceCodeUrl: z.string(),
    teamName: z.string(),
    usageLink: z.string(),
    expDate: z.coerce.date(),
    recipientDid: z.string(),
  })

  const form = useForm<z.infer<typeof discoSchema>>({
    resolver: zodResolver(discoSchema),
    defaultValues: {
      eventDate: new Date('2023-07-04'),
      eventName: '',
      place: '',
      projectName: '',
      sourceCodeUrl: '',
      teamName: '',
      usageLink: '',
      expDate: new Date('2023-07-04'),
      recipientDid: '',
    },
  })

  const onSubmit = async (values: any) => {
    console.log('handle', values)
  }

  return {
    credential,
    discoSchema,
    form,
    onSubmit,
  }
}
