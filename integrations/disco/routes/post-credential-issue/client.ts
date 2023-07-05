import axios from 'axios'

// const myHeaders = new Headers()
const config = { 'Content-Type': 'application/json' }
// myHeaders.append('Authorization', 'Bearer <redacted>')

const raw = JSON.stringify({
  schemaUrl: 'https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/GMCredential/1-0-0.json',
  subjectData: {},
  recipientDID: 'did:3:kjzl6cwe1jw147pkworv5ff70zkwjne15b4ww4xwyof4cdgvgsw8xl1srg287wj',
})

export async function appPostCredentialIssue() {
  try {
    const { data }: { data: any } = await axios.post(`/api/disco/credentials-issue`, raw, { headers: config })
    return data
  } catch (error) {
    throw error
  }
}
