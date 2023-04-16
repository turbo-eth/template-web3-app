import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query
    try {
      const message = await prisma.litProtocolMessage.findFirst({
        where: {
          id: id as string,
        },
      })

      if (!message) {
        return res.status(404).send('Message not found')
      }
      return res.send(message)
    } catch (e) {
      console.log(e)
      return res.status(500).send(e)
    }
  }
  res.setHeader('Allow', ['GET'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
