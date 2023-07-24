export type Contract = {
  contract_address: string
  chain_id: number
  decimals: number
  symbol?: string // Change this to be optional
  image?: string
  wrapable?: boolean
  is_bridge?: boolean
  next_asset?: {
    contract_address: string
    decimals: number
    symbol: string
    image: string
  }
  mintable?: boolean
  is_pool?: boolean
}

export type Asset = {
  id: string
  symbol: string
  name: string
  image: string
  is_stablecoin?: boolean
  allow_paying_gas?: boolean
  contracts: Contract[]
  color?: string
  exclude_source_chains?: string[]
  exclude_destination_chains?: string[]
  preset?: boolean
  disabled?: boolean
}

export type Chain = {
  domain_id: string
  name: string
  image: string
}

export type Transfer = {
  transfer_id: string
  xcall_timestamp: number
  origin_domain: string
  origin_transacting_asset: string
  origin_local_asset: string
  origin_transacting_amount: string
  destination_domain: string
  destination_transacting_asset: string
  destination_local_asset: string
  destination_transacting_amount: string
  error_status?: string
  status?: string
}
