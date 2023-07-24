import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useDiscoIssueProofOfHack } from '../../hooks/use-disco-issue-proof-of-hack'

export const useDiscoIssueForm = () => {
  const { mutate, data, isLoading, isError, error, isSuccess } = useDiscoIssueProofOfHack()
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
      mutate({
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
      form.reset()
    } catch (error) {
      console.log(error)
    }
  }

  return {
    error,
    data,
    isError,
    isLoading,
    isSuccess,
    discoSchema,
    form,
    onSubmit,
  }
}
