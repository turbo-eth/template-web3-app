import { AxiosInstance } from 'axios'
import querystring from 'query-string'

import isClientConnected from '../etherscan/isClientConnected'
import isValidAddress from '../etherscan/isValidAddress'
import queryEtherscanClient from '../etherscan/queryEtherscanClient'

export function etherscanAccountTransactionList(client: AxiosInstance, address: string, config: BlockPagination) {
  if (!isClientConnected(client)) {
    throw new Error('Etherscan Client Not Connected')
  }
  if (!isValidAddress(address)) throw new Error('Address Invalid')
  const query = querystring.stringify({
    module: 'account',
    action: 'txlist',
    address,
    startblock: config.startblock || 0,
    endblock: config.endblock || 99999999,
    sort: config.sort || 'asc',
    page: config.page || 1,
    offset: config.offset || 1000,
  })
  return queryEtherscanClient(client, query)
}
