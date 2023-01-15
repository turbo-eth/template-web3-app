import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'
import { withSessionRoute } from '@/lib/server'

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const isAdmin = req?.session.isAdmin
      if (!isAdmin) {
        return res.status(401).send('Unauthorized')
      }
      const users = await prisma.users.findMany()
      return res.send({ users, object: 'Users' })
    } catch (error: any) {
      console.log(error)
      return res.status(500).send(error?.message)
    }
  }

  res.setHeader('Allow', ['GET'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
})
