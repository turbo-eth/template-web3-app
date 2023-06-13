import type { Address } from 'wagmi'

export interface Transaction {
  blockHash: string
  blockNumber: string
  confirmations: string
  contractAddress: string
  cumulativeGasUsed: string
  from: string
  functionName: string
  gas: string
  gasPrice: string
  gasUsed: string
  hash: string
  input: string
  isError: string
  methodId: string
  nonce: string
  timeStamp: string
  to: string
  transactionIndex: string
  txreceipt_status: string
  value: string
}

export interface TransactionsResponse {
  address: Address
  transactions: Transaction[]
}

export interface EtherscanApiTransactionsResponse {
  status: string
  message: string
  result: Transaction[]
}
