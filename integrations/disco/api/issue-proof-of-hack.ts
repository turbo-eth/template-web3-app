import { getIronSession } from 'iron-session'
import { z } from 'zod'

import { SERVER_SESSION_SETTINGS } from '@/lib/session'

import { discoIssueProofOfHack } from '../routes/issue-proof-of-hack'

const discoSchema = z.object({
  schemaUrl: z.string(),
  subjectData: z.object({
    eventDate: z.string().transform((value) => {
      const date = new Date(value)
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date format')
      }
      return date.toISOString().split('T')[0]
    }),
    eventName: z.string(),
    place: z.string(),
    projectName: z.string(),
    sourceCodeUrl: z.string(),
    teamName: z.string(),
    usageLink: z.string(),
    expDate: z.string().transform((value) => {
      const date = new Date(value)
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date format')
      }
      return date.toISOString().split('T')[0]
    }),
    recipientDid: z.string(),
  }),
  recipientDID: z.string(),
})

export async function POST(req: Request) {
  try {
    const res = new Response()
    const prunedReq = discoSchema.parse(await req.json())
    const session = await getIronSession(req, res, SERVER_SESSION_SETTINGS)

    if (!session?.isAdmin) {
      return new Response('Unauthorized. You need to be an app admin to issue a Proof of Hack', { status: 401 })
    }

    if (!prunedReq.recipientDID) {
      return new Response('recipientDID not found', { status: 400 })
    }
    const info = await discoIssueProofOfHack(prunedReq)

    if (info) {
      return new Response(JSON.stringify(info), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    return new Response(errorMessage, { status: 500 })
  }
}
