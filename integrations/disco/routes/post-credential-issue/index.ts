import { discoClient } from '@/integrations/disco/disco-client'

import { IssuedCredentials } from '../../utils/types'

const raw = {
  schemaUrl: 'https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/GMCredential/1-0-0.json',
  subjectData: {},
  recipientDID: 'did:3:kjzl6cwe1jw147pkworv5ff70zkwjne15b4ww4xwyof4cdgvgsw8xl1srg287wj',
}
export async function postCredentialIssue() {
  const { data }: { data: IssuedCredentials } = await discoClient.post(`/credential`, raw)
  // console.log('post:::', data)
  return data
}
