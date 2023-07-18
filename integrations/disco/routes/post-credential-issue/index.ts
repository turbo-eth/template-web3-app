import { discoClient } from '@/integrations/disco/disco-client'

import { IssueEntity, IssuedCredentials } from '../../utils/types'

export async function postCredentialIssue(val: IssueEntity) {
  const payload = {
    schemaUrl: 'https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/ProofOfHackCredential/1-0-0.json',
    subjectData: { ...val?.subjectData },
    recipientDID: val?.subjectData?.recipientDid,
  }

  const { data }: { data: IssuedCredentials } = await discoClient.post(`/credential`, JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return data
}
