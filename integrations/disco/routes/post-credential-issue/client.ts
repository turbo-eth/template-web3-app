import axios from 'axios'

import { IssuedCredentials } from '../../utils/types'

export async function appDiscoPostCredentialIssue(values: { recipientDid: any }) {
  try {
    const payload = {
      schemaUrl: 'https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/ProofOfHackCredential/1-0-0.json',
      subjectData: { ...values },
      recipientDID: values?.recipientDid,
    }
    const { data }: { data: IssuedCredentials } = await axios.post(`/api/disco/credential-issue`, JSON.stringify(payload), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return data
  } catch (error) {
    throw error
  }
}
