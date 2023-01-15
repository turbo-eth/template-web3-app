import { AxiosInstance } from 'axios'

import { default as handleErrorTypes } from './handleErrorTypes'
import { default as handleEtherscanResponse } from './handleEtherscanResponse'

export async function queryEtherscanClient(client: AxiosInstance, queryString: any) {
  try {
    const { data } = await client.get('/api?' + queryString)
    return handleEtherscanResponse(data)
  } catch (error) {
    return handleErrorTypes(error)
  }
}

export default queryEtherscanClient
