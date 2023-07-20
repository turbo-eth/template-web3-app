import { useMutation } from '@tanstack/react-query'

import { appDiscoPostCredentialIssue } from '../routes/post-credential-issue/client'
import { EventData } from '../utils/types'

export const useDiscoIssueCredential = () => {
  const mutation = useMutation({
    mutationFn: (vars: EventData) => {
      return appDiscoPostCredentialIssue(vars)
    },
  })

  return { mutation }
}
