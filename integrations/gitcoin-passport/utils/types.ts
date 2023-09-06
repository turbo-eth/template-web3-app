import { ReactNode } from "react"

export type StampId = string

export type AddressStampsResponse = {
  items: Array<{
    credential: {
      credentialSubject: {
        provider: string
      }
    }
    metadata: {
      platform: {
        id: StampId
      }
    }
  }>
  detail?: string
}

export type StampsMetadataResponse = {
  id: StampId
  icon: string
  name: string
  description: string
  connectMessage: string
  groups: Array<{
    name: string
    stamps: Array<{
      name: StampId
      description: string
      hash: string
    }>
  }>
}

export type AddressScoreResponse = {
  score: string
  last_score_timestamp: string
}

export interface ScoreGateProps {
  score: number
  fallback?: ReactNode
  children: ReactNode
}

export interface StampGateProps {
  stampId: StampId
  fallback?: ReactNode
  children: ReactNode
}

export type AddressStamp = {
  provider: StampId
  items: StampId[]
}
