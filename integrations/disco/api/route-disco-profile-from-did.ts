import { NextApiRequest, NextApiResponse } from 'next'

import { discoGetProfileFromAddress } from '@/integrations/disco/get-profile-from-address'
import { withSessionRoute } from '@/lib/server'

const discoProfileFromDid = withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const address = req.session.siwe?.address
      if (!address) {
        return res.status(401).send('Unauthorized')
      }

      const profile = discoGetProfileFromAddress(address)
      return res.send(profile)
    } catch (error: any) {
      return res.status(500).send(error?.message)
    }
  }

  res.setHeader('Allow', ['GET'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
})

export default discoProfileFromDid