/**
 * Placeholder for the starter type. Replace with your own types.
 */
export interface Starter {
  title: string
}

export enum MimeType {
  HTML = 'text/html',
  TEXT = 'text/plain',
  IMAGE = 'image/png',
  JSON = 'application/json',
}

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
