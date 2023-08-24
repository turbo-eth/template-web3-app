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

export type ArweaveTxTag = { name: string; value: string }
export type ArweaveTxSearchTag = { name: string; values: { value: string }[] }
export type ArweaveTxId = string
export type ArweaveTxPostResponse = {
  status: number
  statusText: string
  data: unknown
}

export type SignAndSendArweaveTxResponse = {
  response: ArweaveTxPostResponse | null
  txId: ArweaveTxId
  insufficientBalance: boolean
}

export type AddPendingTxPayload = {
  txId: ArweaveTxId
  onConfirmation?: () => Promise<void> | void
}
