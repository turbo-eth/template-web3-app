import { NextApiRequest, NextApiResponse } from 'next'

import { discoGetCredentialsFromDID } from '@/integrations/disco/actions/get-credentials-from-did'
import { withSessionRoute } from '@/lib/server'

const routeDiscoCredentialsFromDid = withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const address = req.session.siwe?.address
      if (!address) {
        return res.status(401).send('Unauthorized')
      }

      const profile = await discoGetCredentialsFromDID(req.query.did as string)
      return res.send(profile)
    } catch (error: any) {
      return res.status(500).send(error?.message)
    }
  }

  res.setHeader('Allow', ['GET'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
})

export default routeDiscoCredentialsFromDid