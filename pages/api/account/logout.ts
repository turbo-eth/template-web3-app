import { NextApiRequest, NextApiResponse } from 'next'

import { withSessionRoute } from '../../../lib/server'

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await req.session.destroy()
    return res.send({ ok: true })
  }

  res.setHeader('Allow', ['GET'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
})
