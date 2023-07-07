/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios'

import { IssuedCredentials } from '../../utils/types'

const raw = JSON.stringify({
  schemaUrl: 'https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/ProofOfHackCredential/1-0-0.json',
  subjectData: {},
  recipientDID: 'did:3:kjzl6cwe1jw147pkworv5ff70zkwjne15b4ww4xwyof4cdgvgsw8xl1srg287wj',
})

export async function appDiscoPostCredentialIssue(values: { recipientDid: any }) {
  console.log('values', values)
  try {
    const payload = {
      schemaUrl: 'https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/ProofOfHackCredential/1-0-0.json',
      subjectData: { ...values },
      recipientDID: values?.recipientDid,
    }
    const { data }: { data: IssuedCredentials } = await axios.post(`/api/disco/credential-issue`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // console.log('clientData::', values)
    return data
  } catch (error) {
    // console.log('err::', error)
    throw error
  }
}
