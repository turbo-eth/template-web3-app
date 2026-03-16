'use client'

import { useQuery } from '@tanstack/react-query'
import { env } from '@/env.mjs'
import axios from 'axios'

// Tally API base URL
const TALLY_API_BASE_URL = 'https://api.tally.xyz/query'

// Tally API client
export const tallyClient = axios.create({
  baseURL: TALLY_API_BASE_URL,
  timeout: 20000,
  headers: {
    'Api-Key': env.NEXT_PUBLIC_TALLY_API_KEY || '',
  },
})

// Types for Tally API responses
export interface Governor {
  id: string
  name: string
  chainId: number
  address: string
  token: {
    id: string
    name: string
    symbol: string
  }
}

export interface Proposal {
  id: string
  title: string
  description: string
  state: string
  startBlock: number
  endBlock: number
  proposer: {
    address: string
  }
  votes: {
    forVotes: string
    againstVotes: string
    abstainVotes: string
  }
}

export interface Delegate {
  id: string
  address: string
  delegatedVotes: string
  tokenHoldersRepresented: number
}

// API Functions
export async function fetchGovernors(chainId?: number): Promise<Governor[]> {
  const query = `
    query {
      governors(first: 20) {
        id
        name
        chainId
        address
        token {
          id
          name
          symbol
        }
      }
    }
  `
  const response = await tallyClient.post('', { query })
  return response.data?.data?.governors || []
}

export async function fetchProposals(governorId: string): Promise<Proposal[]> {
  const query = `
    query($governorId: String!) {
      proposals(first: 20, where: { governor: $governorId }, orderBy: createdBlock, orderDirection: desc) {
        id
        title
        description
        state
        startBlock
        endBlock
        proposer {
          address
        }
        votes {
          forVotes
          againstVotes
          abstainVotes
        }
      }
    }
  `
  const response = await tallyClient.post('', { query, variables: { governorId } })
  return response.data?.data?.proposals || []
}

export async function fetchDelegates(governorId: string): Promise<Delegate[]> {
  const query = `
    query($governorId: String!) {
      delegates(first: 20, where: { governor: $governorId }, orderBy: delegatedVotes, orderDirection: desc) {
        id
        address
        delegatedVotes
        tokenHoldersRepresented
      }
    }
  `
  const response = await tallyClient.post('', { query, variables: { governorId } })
  return response.data?.data?.delegates || []
}

export async function fetchDaoInfo(governorId: string): Promise<Governor | null> {
  const query = `
    query($governorId: String!) {
      governor(id: $governorId) {
        id
        name
        chainId
        address
        token {
          id
          name
          symbol
        }
      }
    }
  `
  const response = await tallyClient.post('', { query, variables: { governorId } })
  return response.data?.data?.governor || null
}

// React Query Hooks
export function useGovernors(chainId?: number) {
  return useQuery({
    queryKey: ['tally', 'governors', chainId],
    queryFn: () => fetchGovernors(chainId),
    enabled: !!env.NEXT_PUBLIC_TALLY_API_KEY,
  })
}

export function useProposals(governorId: string) {
  return useQuery({
    queryKey: ['tally', 'proposals', governorId],
    queryFn: () => fetchProposals(governorId),
    enabled: !!governorId && !!env.NEXT_PUBLIC_TALLY_API_KEY,
  })
}

export function useDelegates(governorId: string) {
  return useQuery({
    queryKey: ['tally', 'delegates', governorId],
    queryFn: () => fetchDelegates(governorId),
    enabled: !!governorId && !!env.NEXT_PUBLIC_TALLY_API_KEY,
  })
}

export function useDaoInfo(governorId: string) {
  return useQuery({
    queryKey: ['tally', 'dao-info', governorId],
    queryFn: () => fetchDaoInfo(governorId),
    enabled: !!governorId && !!env.NEXT_PUBLIC_TALLY_API_KEY,
  })
}
