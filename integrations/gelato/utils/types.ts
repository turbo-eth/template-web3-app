export type GelatoConstants = {
  subgraphBaseUrl: string
  networks: {
    [key: number]: {
      graph: string
      contract: string
      testnet?: boolean
    }
  }
}

export type fetchActiveTasksProps = {
  address: string
  gqlEndpoint: string
}
