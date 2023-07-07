import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { appDiscoPostCredentialIssue } from '../routes/post-credential-issue/client'

// !! use mutation hook to be used

export const ApiCall = () => {
  return useQuery(['discoIssueCredential'], async () => appDiscoPostCredentialIssue())
}

export const useDiscoIssueCredential = () => {
  const mutation = useMutation(async () => {
    const response = await appDiscoPostCredentialIssue()

    // if (response.ok) {
    //   return await response.json()
    // } else {
    //   throw new Error(response.statusText)
    // }

    console.log('res:::', response)

    // return {
    //   data,
    //   isLoading,
    //   error,
    // }
  })

  const discoSchema = z.object({
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
    mutation.mutate()
    console.log('handle', values)
  }

  return {
    discoSchema,
    form,
    onSubmit,
    mutation,
  }
}
