export type GelatoConstants = {
  subgraphBaseUrl: string
  whitelistAddress: string
  docs: {
    payment: string
    resolver: string
  }
  networks: {
    [key: number]: {
      graph: string
      contract: string
      testnet?: boolean
      explorerApiUrl: string
      explorerUrl: string
      explorerApiKey: string
    }
  }
}

export type FetchActiveTasksProps = {
  address: string
  gqlEndpoint: string
}

export type ExplorerFetchAbiResponse = {
  message: string
  result: {
    ABI: string
  }[]
}
