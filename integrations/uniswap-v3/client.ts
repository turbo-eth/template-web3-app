import { request } from "graphql-request"

export const UNISWAP_V3_BASE_SUBGRAPH_URL =
  "https://api.goldsky.com/api/public/project_cl8ylkiw00krx0hvza0qw17vn/subgraphs/uniswap-v3-base/prod/gn"

const PROTOCOL_STATS_QUERY = /* GraphQL */ `
  query ProtocolStats {
    dexAmmProtocols(first: 1) {
      id
      name
      network
      cumulativeVolumeUSD
      cumulativeUniqueUsers
      totalPoolCount
    }
  }
`

const DAILY_SNAPSHOTS_QUERY = /* GraphQL */ `
  query DailySnapshots {
    financialsDailySnapshots(first: 7, orderBy: timestamp, orderDirection: desc) {
      id
      timestamp
      dailyVolumeUSD
      dailyTotalRevenueUSD
    }
  }
`

const TOKEN_BY_ID_QUERY = /* GraphQL */ `
  query TokenById($id: String!) {
    token(id: $id) {
      id
      symbol
      name
      decimals
      lastPriceUSD
      _totalValueLockedUSD
    }
  }
`

export interface ProtocolStats {
  id: string
  name: string
  network: string
  cumulativeVolumeUSD: string
  cumulativeUniqueUsers: number
  totalPoolCount: number
}

export interface DailySnapshot {
  id: string
  timestamp: string
  dailyVolumeUSD: string
  dailyTotalRevenueUSD: string
}

export interface TokenSummary {
  id: string
  symbol: string
  name: string
  decimals: number
  lastPriceUSD: string
  _totalValueLockedUSD: string
}

interface ProtocolStatsResponse {
  dexAmmProtocols: ProtocolStats[]
}

interface DailySnapshotsResponse {
  financialsDailySnapshots: DailySnapshot[]
}

interface TokenByIdResponse {
  token: TokenSummary | null
}

export async function getProtocolStats() {
  const response = await request<ProtocolStatsResponse>(
    UNISWAP_V3_BASE_SUBGRAPH_URL,
    PROTOCOL_STATS_QUERY
  )

  return response.dexAmmProtocols[0] ?? null
}

export async function getDailySnapshots() {
  const response = await request<DailySnapshotsResponse>(
    UNISWAP_V3_BASE_SUBGRAPH_URL,
    DAILY_SNAPSHOTS_QUERY
  )

  return response.financialsDailySnapshots
}

export async function getTokenSummary(address: string) {
  const response = await request<TokenByIdResponse>(
    UNISWAP_V3_BASE_SUBGRAPH_URL,
    TOKEN_BY_ID_QUERY,
    {
      id: address.toLowerCase(),
    }
  )

  return response.token
}
