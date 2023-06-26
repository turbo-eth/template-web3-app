import { NextApiRequest, NextApiResponse } from 'next'

import { env } from '@/env.mjs'
import { prisma } from '@/lib/prisma'
import { withSessionRoute } from '@/lib/server'

export type Users = Awaited<ReturnType<typeof prisma.user.findMany>>

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const isAdmin = req?.session.isAdmin
      if (!isAdmin) {
        return res.status(401).send('Unauthorized')
      }

      let users: Users = []
      if (env.DATABASE_URL) {
        users = await prisma.user.findMany()
      }
      return res.send({ users, object: 'Users' })
    } catch (error: any) {
      console.log(error)
      return res.status(500).send(error?.message)
    }
  }

  res.setHeader('Allow', ['GET'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
})
