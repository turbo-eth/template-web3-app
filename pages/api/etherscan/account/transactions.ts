import { NextApiRequest, NextApiResponse } from 'next'

import { etherscanAccountTransactionList } from '@/lib/api/etherscanAccountTransactionList'
import getEtherscanClient from '@/lib/etherscan/getEtherscanClient'
import { withSessionRoute } from '@/lib/server'

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const client = getEtherscanClient(1, 5000, process.env.ETHERSCAN_API_KEY)
    const address = req.session.siwe?.address
    const config = {
      startblock: 0,
      endblock: 99999999,
      page: 1,
      offset: 1000,
    }
    const transactions = await etherscanAccountTransactionList(client, address, config)

    return res.send({ address: req.session.siwe?.address, transactions })
  }

  res.setHeader('Allow', ['GET'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
})
