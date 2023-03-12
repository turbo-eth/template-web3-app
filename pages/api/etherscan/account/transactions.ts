import { NextApiRequest, NextApiResponse } from 'next'

import { etherscanAccountTransactions } from '@/integrations/etherscan/account-transactions'
import { withSessionRoute } from '@/lib/server'

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const address = req.session.siwe?.address
      if (!address) {
        return res.status(401).send('Unauthorized')
      }
      let chainId: string = req.query['chainId'] as string
      if (!chainId) {
        return res.status(400).send('Missing chainId')
      }
      const startblock: string = req.query['startblock'] as string
      const endblock: string = req.query['endblock'] as string
      const page: string = req.query['page'] as string
      const offset: string = req.query['offset'] as string
      const config = {
        startblock: startblock ? Number(startblock) : 0,
        endblock: endblock ? Number(endblock) : 99999999,
        page: page ? Number(page) : 1,
        offset: offset ? Number(offset) : 0,
      }
      const transactions = await etherscanAccountTransactions(chainId, address, config)
      return res.send({ address: req.session.siwe?.address, transactions })
    } catch (error: any) {
      console.log(error)
      return res.status(500).send(error?.message)
    }
  }

  res.setHeader('Allow', ['GET'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
})
