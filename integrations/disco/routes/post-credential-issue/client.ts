import axios from 'axios'

import { IssuedCredentials } from '../../utils/types'

const raw = JSON.stringify({
  schemaUrl: 'https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/GMCredential/1-0-0.json',
  subjectData: {},
  recipientDID: 'did:3:kjzl6cwe1jw147pkworv5ff70zkwjne15b4ww4xwyof4cdgvgsw8xl1srg287wj',
})

export async function appDiscoPostCredentialIssue() {
  try {
    const { data }: { data: IssuedCredentials } = await axios.post(`/api/disco/credential-issue`, raw)
    console.log('clientData::', data)
    // console.log('keffbvkje')
    return data
  } catch (error) {
    // console.log('err::', error)
    throw error
  }
}
