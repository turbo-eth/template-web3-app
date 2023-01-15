import getChainIdApiKey from '../services/etherscan/getChainIdApiKey'
import getEtherscanClient from '../services/etherscan/getEtherscanClient'
import handleErrorTypes from '../services/etherscan/handleErrorTypes'
import handleEtherscanResponse from '../services/etherscan/handleEtherscanResponse'
import isClientConnected from '../services/etherscan/isClientConnected'
import isValidAddress from '../services/etherscan/isValidAddress'

export async function etherscanAccountTransactionList(chainId: number | string, address: string, config: BlockPagination) {
  const client = getEtherscanClient(Number(chainId), 5000, getChainIdApiKey(chainId))
  if (!isClientConnected(client)) {
    throw new Error('Etherscan Client Not Connected')
  }
  if (!isValidAddress(address)) throw new Error('Address Invalid')

  try {
    const { data } = await client.get('/api?', {
      params: {
        module: 'account',
        action: 'txlist',
        address,
        startblock: config.startblock || 0,
        endblock: config.endblock || 99999999,
        sort: config.sort || 'asc',
        page: config.page || 1,
        offset: config.offset || 0,
      },
    })
    return handleEtherscanResponse(data)
  } catch (error) {
    return handleErrorTypes(error)
  }
}
