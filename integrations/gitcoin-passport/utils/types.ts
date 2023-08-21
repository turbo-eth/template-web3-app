import { Dispatch, SetStateAction } from 'react'

interface StampCredentialResponseMetadataForPlatform {
  id: string
  icon: string
  name: string
  description: string
  connectMessage: string
}

interface StampCredentialResponseMetadata {
  group: string
  platform: StampCredentialResponseMetadataForPlatform
  name: string
  description: string
  hash: string
}

interface StampCredentialResponse {
  version: string
  metadata: StampCredentialResponseMetadata
}

export interface PaginatedStampCredentialResponse {
  next: string
  prev: string
  items: StampCredentialResponse[]
}

export interface ScoreStampProps {
  setStamps: Dispatch<SetStateAction<PaginatedStampCredentialResponse | null>>
}

export interface ScoreGateProps {
  setScore: Dispatch<SetStateAction<number | null>>
}

export interface ScoreResponse {
  address: string
  last_score_timestamp: string
  score: number
  status: string
}

export interface SigningMessageResponse {
  message: string
  nonce: string
}

export interface SubmitPassportResponse {
  address: string
  last_score_timestamp: string
  score: string
  status: string
}
