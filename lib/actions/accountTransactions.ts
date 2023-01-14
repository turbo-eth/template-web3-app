import axios, { AxiosError } from 'axios'

export async function accountTransactions(): Promise<
  | {
      address: string
      transactions: Array<any>
    }
  | undefined
  | void
> {
  try {
    const { data } = await axios.get('/api/etherscan/account/transactions')
    return data
  } catch (error: any) {
    throw new Error(`Unexpected Error`)
  }
}
