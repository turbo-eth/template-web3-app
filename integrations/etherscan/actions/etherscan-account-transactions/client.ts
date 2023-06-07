import axios from 'axios'

export async function appEtherscanAccountTransactions(params?: BlockPagination): Promise<
  | {
      address: string
      transactions: Array<any>
    }
  | undefined
  | void
> {
  try {
    const { data } = await axios.get('/api/etherscan/account/transactions', {
      params: params,
    })
    return data
  } catch (error: any) {
    throw new Error(`Unexpected Error`)
  }
}
