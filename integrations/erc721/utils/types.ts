import { HTMLAttributes } from 'react'

import type { Address } from 'wagmi'

export interface ERC721Props extends HTMLAttributes<HTMLElement> {
  address?: Address
  chainId?: number
}

export type DeployType = {
  formfieldName: 'name' | 'symbol'
  label: string
  type: string
  placeholder: string
  description: string
}

export type writeMintType = {
  formfieldName: 'toAddress' | 'tokenId' | 'tokenUri'
  label: string
  type: string
  placeholder: string
  description?: string
}

export type writeTransferType = {
  formfieldName: 'toAddress' | 'tokenId' | 'differentFromAddress' | 'fromAddress'
  label: string
  type: string
  placeholder: string
  description?: string
}

export type storageType = {
  formfieldName: 'address'
  label: string
  type: string
  placeholder: string
  description: string
}

export type approveType = {
  formfieldName: 'toAddress' | 'tokenId'
  label: string
  type: string
  placeholder: string
  description?: string
}
