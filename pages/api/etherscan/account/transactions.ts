import { NextApiRequest, NextApiResponse } from 'next'

import { etherscanAccountTransactionList } from '@/lib/api/etherscanAccountTransactionList'
import getChainIdApiKey from '@/lib/etherscan/getChainIdApiKey'
import getEtherscanClient from '@/lib/etherscan/getEtherscanClient'
import { withSessionRoute } from '@/lib/server'

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      let chainId: string = req.query['chainId'] as string
      const startblock: string = req.query['startblock'] as string
      const endblock: string = req.query['endblock'] as string
      const page: string = req.query['page'] as string
      const offset: string = req.query['offset'] as string
      if (!chainId) {
        return res.status(400).send('Missing chainId')
      }
      const client = getEtherscanClient(Number(chainId), 5000, getChainIdApiKey(chainId))
      const address = req.session.siwe?.address
      const config = {
        startblock: startblock ? Number(startblock) : 0,
        endblock: endblock ? Number(endblock) : 99999999,
        page: page ? Number(page) : 1,
        offset: offset ? Number(offset) : 0,
      }
      const transactions = await etherscanAccountTransactionList(client, address, config)
      return res.send({ address: req.session.siwe?.address, transactions })
    } catch (error: any) {
      console.log(error)
      return res.status(500).send(error?.message)
    }
  }

  res.setHeader('Allow', ['GET'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
})
