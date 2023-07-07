import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { appDiscoPostCredentialIssue } from '../routes/post-credential-issue/client'

export const useDiscoIssueCredential = () => {
  const mutation = useMutation(
    async (v) => {
      const res = await appDiscoPostCredentialIssue(v)

      return res
    },
    {
      onSuccess: (response) => {
        alert('Sucessful')
      },
    }
  )

  const discoSchema = z.object({
    eventDate: z.string().transform((value) => {
      const date = new Date(value)
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date format')
      }
      return date.toISOString().split('T')[0]
    }),

    eventName: z.string(),
    place: z.string(),
    projectName: z.string(),
    sourceCodeUrl: z.string(),
    teamName: z.string(),
    usageLink: z.string(),
    expDate: z.string().transform((value) => {
      const date = new Date(value)
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date format')
      }
      return date.toISOString().split('T')[0]
    }),
    recipientDid: z.string(),
  })

  const form = useForm<z.infer<typeof discoSchema>>({
    resolver: zodResolver(discoSchema),
    defaultValues: {
      eventDate: 'YYYY-MM-DD',
      eventName: '',
      place: '',
      projectName: '',
      sourceCodeUrl: '',
      teamName: '',
      usageLink: '',
      expDate: 'YYYY-MM-DD',
      recipientDid: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof discoSchema>) => {
    try {
      const data = await mutation.mutateAsync({
        eventDate: values.eventDate,
        eventName: values.eventName,
        place: values.place,
        projectName: values.projectName,
        sourceCodeUrl: values.sourceCodeUrl,
        teamName: values.teamName,
        usageLink: values.usageLink,
        expDate: values.expDate,
        recipientDid: values.recipientDid,
      })
    } catch (error) {}
  }

  return {
    discoSchema,
    form,
    onSubmit,
    mutation,
  }
}
