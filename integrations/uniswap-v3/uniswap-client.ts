'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Uniswap V3 API base URL (using Uniswap info API)
const UNISWAP_API_BASE_URL = 'https://api.uniswap.org/v1'

// GraphQL endpoint for Uniswap V3
const UNISWAP_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'

// Uniswap V3 API client
export const uniswapClient = axios.create({
  baseURL: UNISWAP_API_BASE_URL,
  timeout: 20000,
})

// Types for Uniswap API responses
export interface Token {
  id: string
  symbol: string
  name: string
  decimals: number
  volumeUSD: string
  totalValueLockedUSD: string
}

export interface Pool {
  id: string
  token0: Token
  token1: Token
  feeTier: number
  liquidity: string
  sqrtPrice: string
  tick: string
  volumeUSD: string
  totalValueLockedUSD: string
}

export interface PoolDayData {
  id: string
  date: number
  volumeUSD: string
  tvlUSD: string
  feesUSD: string
}

export interface TokenDayData {
  id: string
  date: number
  priceUSD: string
  volumeUSD: string
  totalValueLockedUSD: string
}

// Helper function to fetch pool data from The Graph
async function fetchPools(token0Address?: string, token1Address?: string): Promise<Pool[]> {
  let whereClause = ''
  if (token0Address && token1Address) {
    whereClause = `where: { token0_: { id: "${token0Address.toLowerCase()}" }, token1_: { id: "${token1Address.toLowerCase()}" } }`
  }
  
  const query = `
    {
      pools(first: 10, orderBy: totalValueLockedUSD, orderDirection: desc, ${whereClause}) {
        id
        token0 {
          id
          symbol
          name
          decimals
        }
        token1 {
          id
          symbol
          name
          decimals
        }
        feeTier
        liquidity
        sqrtPrice
        tick
        volumeUSD
        totalValueLockedUSD
      }
    }
  `
  
  try {
    const response = await axios.post(UNISWAP_SUBGRAPH_URL, { query })
    return response.data?.data?.pools || []
  } catch (error) {
    console.error('Error fetching pools:', error)
    return []
  }
}

// Helper function to fetch pool day data
async function fetchPoolDayData(poolId: string, days: number = 7): Promise<PoolDayData[]> {
  const query = `
    {
      poolDayDatas(first: ${days}, where: { pool: "${poolId}" }, orderBy: date, orderDirection: desc) {
        id
        date
        volumeUSD
        tvlUSD
        feesUSD
      }
    }
  `
  
  try {
    const response = await axios.post(UNISWAP_SUBGRAPH_URL, { query })
    return response.data?.data?.poolDayDatas || []
  } catch (error) {
    console.error('Error fetching pool day data:', error)
    return []
  }
}

// Helper function to fetch token data
async function fetchTokenData(tokenAddress: string): Promise<Token | null> {
  const query = `
    {
      token(id: "${tokenAddress.toLowerCase()}") {
        id
        symbol
        name
        decimals
        volumeUSD
        totalValueLockedUSD
      }
    }
  `
  
  try {
    const response = await axios.post(UNISWAP_SUBGRAPH_URL, { query })
    return response.data?.data?.token || null
  } catch (error) {
    console.error('Error fetching token data:', error)
    return null
  }
}

// Helper function to fetch top tokens
async function fetchTopTokens(limit: number = 20): Promise<Token[]> {
  const query = `
    {
      tokens(first: ${limit}, orderBy: totalValueLockedUSD, orderDirection: desc) {
        id
        symbol
        name
        decimals
        volumeUSD
        totalValueLockedUSD
      }
    }
  `
  
  try {
    const response = await axios.post(UNISWAP_SUBGRAPH_URL, { query })
    return response.data?.data?.tokens || []
  } catch (error) {
    console.error('Error fetching top tokens:', error)
    return []
  }
}

// Helper function to get current price from pool
export function getCurrentPrice(pool: Pool): string {
  // sqrtPrice is in fixed point Q64.96 format
  const sqrtPriceX96 = BigInt(pool.sqrtPrice)
  const sqrtPrice = Number(sqrtPriceX96) / (2 ** 96)
  const price = sqrtPrice ** 2
  
  // Adjust for token decimals
  const token0Decimals = parseInt(pool.token0.decimals.toString())
  const token1Decimals = parseInt(pool.token1.decimals.toString())
  
  // Return price of token0 in terms of token1
  return (price * (10 ** token0Decimals) / (10 ** token1Decimals)).toString()
}

// React Query Hooks
export function usePools(token0Address?: string, token1Address?: string) {
  return useQuery({
    queryKey: ['uniswap', 'pools', token0Address, token1Address],
    queryFn: () => fetchPools(token0Address, token1Address),
    staleTime: 1000 * 60, // 1 minute
  })
}

export function usePoolDayData(poolId: string, days: number = 7) {
  return useQuery({
    queryKey: ['uniswap', 'poolDayData', poolId, days],
    queryFn: () => fetchPoolDayData(poolId, days),
    enabled: !!poolId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export function useTokenData(tokenAddress: string) {
  return useQuery({
    queryKey: ['uniswap', 'token', tokenAddress],
    queryFn: () => fetchTokenData(tokenAddress),
    enabled: !!tokenAddress,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export function useTopTokens(limit: number = 20) {
  return useQuery({
    queryKey: ['uniswap', 'topTokens', limit],
    queryFn: () => fetchTopTokens(limit),
    staleTime: 1000 * 60, // 1 minute
  })
}

// Fee tiers in Uniswap V3
export const FEE_TIERS = {
  LOW: 500,    // 0.05%
  MEDIUM: 3000, // 0.3%
  HIGH: 10000, // 1%
}

export function getFeeTierLabel(feeTier: number): string {
  switch (feeTier) {
    case 500:
      return '0.05%'
    case 3000:
      return '0.3%'
    case 10000:
      return '1%'
    default:
      return `${feeTier / 10000}%`
  }
}
