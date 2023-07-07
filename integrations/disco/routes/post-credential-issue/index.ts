/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { discoClient } from '@/integrations/disco/disco-client'

import { IssuedCredentials } from '../../utils/types'

export async function postCredentialIssue(val: { recipientDid: any; subjectData: any }) {
  console.log('valekfjbvejkjkefjkkj ues:::::::::::::', val)

  const payload = {
    schemaUrl: 'https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/ProofOfHackCredential/1-0-0.json',
    subjectData: { ...val?.subjectData },
    recipientDID: val?.subjectData?.recipientDid,
  }

  console.log('values:::::::::::::', payload)

  // const raw = {
  //   schemaUrl: 'https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/GMCredential/1-0-0.json',
  //   subjectData: {},
  //   recipientDID: 'did:3:kjzl6cwe1jw147pkworv5ff70zkwjne15b4ww4xwyof4cdgvgsw8xl1srg287wj',
  // }
  const { data }: { data: IssuedCredentials } = await discoClient.post(`/credential`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log('post:::', data)
  return data
}
