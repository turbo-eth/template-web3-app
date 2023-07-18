import { useMutation } from '@tanstack/react-query'

import { appDiscoPostCredentialIssue } from '../routes/post-credential-issue/client'

export const useDiscoIssueCredential = () => {
  const mutation = useMutation({
    mutationFn: (vars) => {
      return appDiscoPostCredentialIssue(vars)
    },
  })

  return { mutation }
}
