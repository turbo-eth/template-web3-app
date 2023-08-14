import { CreateTaskOptions } from '@gelatonetwork/automate-sdk'
import { Overrides } from 'ethers'

export type GelatoConstants = {
  subgraphBaseUrl: string
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

export type FetchTaskProps = {
  id: string
  gqlEndpoint: string
}

export type ExplorerFetchAbiResponse = {
  message: string
  result: {
    ABI: string
  }[]
}

export type FetchResolverResponse = {
  chainId: string
  createdAt: string
  id: number
  name: string
  origin?: string
  ownerAddress: string
  taskId: string
  updatedAt: string
  ABI: string
  address: string
}

export type UseNewTaskProps = { args: CreateTaskOptions; overrides?: Overrides; authToken?: string }
export type UseCancelTaskProps = { taskId: string; overrides?: Overrides | undefined }
export type UseRenameTaskProps = { taskId: string; name: string; authToken?: string | undefined }
