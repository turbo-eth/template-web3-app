import { AxiosInstance } from 'axios'

import { default as handleErrorTypes } from './handle-error-types'
import { default as handleEtherscanResponse } from './handle-etherscan-response'
import { EtherscanApiTransactionsResponse } from './types'

export async function queryEtherscanClient(client: AxiosInstance, queryString: string) {
  try {
    const { data }: { data: EtherscanApiTransactionsResponse } = await client.get('/api?' + queryString)
    return handleEtherscanResponse(data)
  } catch (error) {
    return handleErrorTypes(error)
  }
}

export default queryEtherscanClient
