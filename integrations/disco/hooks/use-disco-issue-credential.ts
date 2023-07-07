import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// did:3:kjzl6cwe1jw14bc98o7vzobvgpjy8nq3gouzguc2zvzz901nixa99h8ru7gvye5
import { appDiscoPostCredentialIssue } from '../routes/post-credential-issue/client'

// !! use mutation hook to be used

// export const ApiCall = () => {
//   return useQuery(['discoIssueCredential'], async () => appDiscoPostCredentialIssue())
// }

export const useDiscoIssueCredential = () => {
  const mutation = useMutation(
    async (v) => {
      const res = await appDiscoPostCredentialIssue(v)

      //console.log('v:', v)
      // if (response.ok) {
      //   return await response.json()
      // } else {
      //   // throw new Error(response.statusText)
      //   console.log('error haha')
      // }

      return res
      //console.log('res:::', res)
    },
    {
      onSuccess: (response) => {
        //alert('kjbcjkek')
        console.log('res', response)
        // Do something with the response data
      },
    }
  )

  const discoSchema = z.object({
    eventDate: z.coerce.date(),
    eventName: z.string(),
    place: z.string(),
    projectName: z.string(),
    sourceCodeUrl: z.string(),
    teamName: z.string(),
    usageLink: z.string(),
    // expDate: z.coerce.date(),
    id: z.string(),
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
      // expDate: new Date('2023-07-04'),
      id: '',
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
        // expDate: values.expDate,
        id: values.id,
      })

      //console.log('hehe', data)
    } catch (error) {
      console.log(error)
    }

    // mutation.mutate(values)
    //console.log('handle', values)
  }

  return {
    discoSchema,
    form,
    onSubmit,
    mutation,
  }
}
