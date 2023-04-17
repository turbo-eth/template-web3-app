import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { encryptedString, accessControlConditions, encryptedSymmetricKeyString } = req.body

      const litProtocolMessage = await prisma.litProtocolMessage.create({
        data: {
          encryptedString,
          metadata: {
            accessControlConditions,
            encryptedSymmetricKey: encryptedSymmetricKeyString,
          },
        },
      })

      return res.json(litProtocolMessage)
    } catch (ex) {
      console.error(ex)
      return res.json({ ok: false })
    }
  }

  res.setHeader('Allow', ['POST'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
