import { ReactNode } from "react"

export type StampId = string

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
