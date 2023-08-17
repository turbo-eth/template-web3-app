import Transaction from 'arweave/node/lib/transaction'

export type ArweaveAmount = {
  ar: string
  winston: string
}

export type ArweavePost = {
  id: string
  tags: { name: string; value: string }[]
  owner: { address: string }
  data: { size: string; type: string }
  anchor: string
  signature: string
  recipient: string
  fee: ArweaveAmount
  quantity: ArweaveAmount
  block: { timestamp: string; height: number }
  bundledIn: { id: string }
}

export type ArweaveTx = Transaction & {
  raw_data: string
}

export type ArweaveTxTag = { name: string; value: string }
export type ArweaveTxId = string
export type ArweaveTxPostResponse = {
  status: number
  statusText: string
  data: unknown
}
