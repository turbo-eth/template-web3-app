/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  BigDecimal: { input: any; output: any }
  BigInt: { input: any; output: any }
  Bytes: { input: any; output: any }
  /**
   * 8 bytes signed integer
   *
   */
  Int8: { input: any; output: any }
}

export type Balance = {
  __typename?: 'Balance'
  balance: Scalars['BigInt']['output']
  id: Scalars['ID']['output']
  paymentToken: PaymentToken
  taskCreator: TaskCreator
}

export type Balance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<Balance_Filter>>>
  balance?: InputMaybe<Scalars['BigInt']['input']>
  balance_gt?: InputMaybe<Scalars['BigInt']['input']>
  balance_gte?: InputMaybe<Scalars['BigInt']['input']>
  balance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  balance_lt?: InputMaybe<Scalars['BigInt']['input']>
  balance_lte?: InputMaybe<Scalars['BigInt']['input']>
  balance_not?: InputMaybe<Scalars['BigInt']['input']>
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  or?: InputMaybe<Array<InputMaybe<Balance_Filter>>>
  paymentToken?: InputMaybe<Scalars['String']['input']>
  paymentToken_?: InputMaybe<PaymentToken_Filter>
  paymentToken_contains?: InputMaybe<Scalars['String']['input']>
  paymentToken_contains_nocase?: InputMaybe<Scalars['String']['input']>
  paymentToken_ends_with?: InputMaybe<Scalars['String']['input']>
  paymentToken_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  paymentToken_gt?: InputMaybe<Scalars['String']['input']>
  paymentToken_gte?: InputMaybe<Scalars['String']['input']>
  paymentToken_in?: InputMaybe<Array<Scalars['String']['input']>>
  paymentToken_lt?: InputMaybe<Scalars['String']['input']>
  paymentToken_lte?: InputMaybe<Scalars['String']['input']>
  paymentToken_not?: InputMaybe<Scalars['String']['input']>
  paymentToken_not_contains?: InputMaybe<Scalars['String']['input']>
  paymentToken_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  paymentToken_not_ends_with?: InputMaybe<Scalars['String']['input']>
  paymentToken_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  paymentToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  paymentToken_not_starts_with?: InputMaybe<Scalars['String']['input']>
  paymentToken_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  paymentToken_starts_with?: InputMaybe<Scalars['String']['input']>
  paymentToken_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  taskCreator?: InputMaybe<Scalars['String']['input']>
  taskCreator_?: InputMaybe<TaskCreator_Filter>
  taskCreator_contains?: InputMaybe<Scalars['String']['input']>
  taskCreator_contains_nocase?: InputMaybe<Scalars['String']['input']>
  taskCreator_ends_with?: InputMaybe<Scalars['String']['input']>
  taskCreator_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  taskCreator_gt?: InputMaybe<Scalars['String']['input']>
  taskCreator_gte?: InputMaybe<Scalars['String']['input']>
  taskCreator_in?: InputMaybe<Array<Scalars['String']['input']>>
  taskCreator_lt?: InputMaybe<Scalars['String']['input']>
  taskCreator_lte?: InputMaybe<Scalars['String']['input']>
  taskCreator_not?: InputMaybe<Scalars['String']['input']>
  taskCreator_not_contains?: InputMaybe<Scalars['String']['input']>
  taskCreator_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  taskCreator_not_ends_with?: InputMaybe<Scalars['String']['input']>
  taskCreator_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  taskCreator_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  taskCreator_not_starts_with?: InputMaybe<Scalars['String']['input']>
  taskCreator_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  taskCreator_starts_with?: InputMaybe<Scalars['String']['input']>
  taskCreator_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
}

export enum Balance_OrderBy {
  Balance = 'balance',
  Id = 'id',
  PaymentToken = 'paymentToken',
  PaymentTokenDecimals = 'paymentToken__decimals',
  PaymentTokenId = 'paymentToken__id',
  PaymentTokenName = 'paymentToken__name',
  PaymentTokenSymbol = 'paymentToken__symbol',
  TaskCreator = 'taskCreator',
  TaskCreatorId = 'taskCreator__id',
  TaskCreatorOpsProxy = 'taskCreator__opsProxy',
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input']
}

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>
  number?: InputMaybe<Scalars['Int']['input']>
  number_gte?: InputMaybe<Scalars['Int']['input']>
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type PaymentToken = {
  __typename?: 'PaymentToken'
  decimals: Scalars['BigInt']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  symbol: Scalars['String']['output']
}

export type PaymentToken_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<PaymentToken_Filter>>>
  decimals?: InputMaybe<Scalars['BigInt']['input']>
  decimals_gt?: InputMaybe<Scalars['BigInt']['input']>
  decimals_gte?: InputMaybe<Scalars['BigInt']['input']>
  decimals_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  decimals_lt?: InputMaybe<Scalars['BigInt']['input']>
  decimals_lte?: InputMaybe<Scalars['BigInt']['input']>
  decimals_not?: InputMaybe<Scalars['BigInt']['input']>
  decimals_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  name?: InputMaybe<Scalars['String']['input']>
  name_contains?: InputMaybe<Scalars['String']['input']>
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>
  name_ends_with?: InputMaybe<Scalars['String']['input']>
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  name_gt?: InputMaybe<Scalars['String']['input']>
  name_gte?: InputMaybe<Scalars['String']['input']>
  name_in?: InputMaybe<Array<Scalars['String']['input']>>
  name_lt?: InputMaybe<Scalars['String']['input']>
  name_lte?: InputMaybe<Scalars['String']['input']>
  name_not?: InputMaybe<Scalars['String']['input']>
  name_not_contains?: InputMaybe<Scalars['String']['input']>
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  name_starts_with?: InputMaybe<Scalars['String']['input']>
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  or?: InputMaybe<Array<InputMaybe<PaymentToken_Filter>>>
  symbol?: InputMaybe<Scalars['String']['input']>
  symbol_contains?: InputMaybe<Scalars['String']['input']>
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  symbol_gt?: InputMaybe<Scalars['String']['input']>
  symbol_gte?: InputMaybe<Scalars['String']['input']>
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>
  symbol_lt?: InputMaybe<Scalars['String']['input']>
  symbol_lte?: InputMaybe<Scalars['String']['input']>
  symbol_not?: InputMaybe<Scalars['String']['input']>
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
}

export enum PaymentToken_OrderBy {
  Decimals = 'decimals',
  Id = 'id',
  Name = 'name',
  Symbol = 'symbol',
}

export type Query = {
  __typename?: 'Query'
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
  balance?: Maybe<Balance>
  balances: Array<Balance>
  paymentToken?: Maybe<PaymentToken>
  paymentTokens: Array<PaymentToken>
  statusInfo?: Maybe<StatusInfo>
  statusInfos: Array<StatusInfo>
  task?: Maybe<Task>
  taskCreator?: Maybe<TaskCreator>
  taskCreators: Array<TaskCreator>
  taskExecution?: Maybe<TaskExecution>
  taskExecutions: Array<TaskExecution>
  tasks: Array<Task>
  transaction?: Maybe<Transaction>
  transactions: Array<Transaction>
  version?: Maybe<Version>
  versions: Array<Version>
}

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>
}

export type QueryBalanceArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryBalancesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Balance_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Balance_Filter>
}

export type QueryPaymentTokenArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryPaymentTokensArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<PaymentToken_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<PaymentToken_Filter>
}

export type QueryStatusInfoArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryStatusInfosArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<StatusInfo_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<StatusInfo_Filter>
}

export type QueryTaskArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTaskCreatorArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTaskCreatorsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<TaskCreator_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<TaskCreator_Filter>
}

export type QueryTaskExecutionArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTaskExecutionsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<TaskExecution_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<TaskExecution_Filter>
}

export type QueryTasksArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Task_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Task_Filter>
}

export type QueryTransactionArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTransactionsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Transaction_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Transaction_Filter>
}

export type QueryVersionArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryVersionsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Version_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Version_Filter>
}

export type StatusInfo = {
  __typename?: 'StatusInfo'
  id: Scalars['ID']['output']
  status: TaskStatus
  task: Task
  time: Scalars['BigInt']['output']
}

export type StatusInfo_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<StatusInfo_Filter>>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  or?: InputMaybe<Array<InputMaybe<StatusInfo_Filter>>>
  status?: InputMaybe<TaskStatus>
  status_in?: InputMaybe<Array<TaskStatus>>
  status_not?: InputMaybe<TaskStatus>
  status_not_in?: InputMaybe<Array<TaskStatus>>
  task?: InputMaybe<Scalars['String']['input']>
  task_?: InputMaybe<Task_Filter>
  task_contains?: InputMaybe<Scalars['String']['input']>
  task_contains_nocase?: InputMaybe<Scalars['String']['input']>
  task_ends_with?: InputMaybe<Scalars['String']['input']>
  task_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  task_gt?: InputMaybe<Scalars['String']['input']>
  task_gte?: InputMaybe<Scalars['String']['input']>
  task_in?: InputMaybe<Array<Scalars['String']['input']>>
  task_lt?: InputMaybe<Scalars['String']['input']>
  task_lte?: InputMaybe<Scalars['String']['input']>
  task_not?: InputMaybe<Scalars['String']['input']>
  task_not_contains?: InputMaybe<Scalars['String']['input']>
  task_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  task_not_ends_with?: InputMaybe<Scalars['String']['input']>
  task_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  task_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  task_not_starts_with?: InputMaybe<Scalars['String']['input']>
  task_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  task_starts_with?: InputMaybe<Scalars['String']['input']>
  task_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  time?: InputMaybe<Scalars['BigInt']['input']>
  time_gt?: InputMaybe<Scalars['BigInt']['input']>
  time_gte?: InputMaybe<Scalars['BigInt']['input']>
  time_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  time_lt?: InputMaybe<Scalars['BigInt']['input']>
  time_lte?: InputMaybe<Scalars['BigInt']['input']>
  time_not?: InputMaybe<Scalars['BigInt']['input']>
  time_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
}

export enum StatusInfo_OrderBy {
  Id = 'id',
  Status = 'status',
  Task = 'task',
  TaskCancelledTxHash = 'task__cancelledTxHash',
  TaskCreatedAt = 'task__createdAt',
  TaskCreatedTxHash = 'task__createdTxHash',
  TaskExecAddress = 'task__execAddress',
  TaskExecDataOrSelector = 'task__execDataOrSelector',
  TaskExecutionCount = 'task__executionCount',
  TaskFeeToken = 'task__feeToken',
  TaskFeeTotal = 'task__feeTotal',
  TaskFeeTotalUsd = 'task__feeTotalUsd',
  TaskId = 'task__id',
  TaskInterval = 'task__interval',
  TaskNextExec = 'task__nextExec',
  TaskResolverAddress = 'task__resolverAddress',
  TaskResolverData = 'task__resolverData',
  TaskResolverHash = 'task__resolverHash',
  TaskStatus = 'task__status',
  TaskUpdatedAt = 'task__updatedAt',
  TaskUseTaskTreasuryFunds = 'task__useTaskTreasuryFunds',
  Time = 'time',
}

export type Subscription = {
  __typename?: 'Subscription'
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
  balance?: Maybe<Balance>
  balances: Array<Balance>
  paymentToken?: Maybe<PaymentToken>
  paymentTokens: Array<PaymentToken>
  statusInfo?: Maybe<StatusInfo>
  statusInfos: Array<StatusInfo>
  task?: Maybe<Task>
  taskCreator?: Maybe<TaskCreator>
  taskCreators: Array<TaskCreator>
  taskExecution?: Maybe<TaskExecution>
  taskExecutions: Array<TaskExecution>
  tasks: Array<Task>
  transaction?: Maybe<Transaction>
  transactions: Array<Transaction>
  version?: Maybe<Version>
  versions: Array<Version>
}

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>
}

export type SubscriptionBalanceArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionBalancesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Balance_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Balance_Filter>
}

export type SubscriptionPaymentTokenArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionPaymentTokensArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<PaymentToken_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<PaymentToken_Filter>
}

export type SubscriptionStatusInfoArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionStatusInfosArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<StatusInfo_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<StatusInfo_Filter>
}

export type SubscriptionTaskArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTaskCreatorArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTaskCreatorsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<TaskCreator_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<TaskCreator_Filter>
}

export type SubscriptionTaskExecutionArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTaskExecutionsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<TaskExecution_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<TaskExecution_Filter>
}

export type SubscriptionTasksArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Task_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Task_Filter>
}

export type SubscriptionTransactionArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTransactionsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Transaction_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Transaction_Filter>
}

export type SubscriptionVersionArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionVersionsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Version_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Version_Filter>
}

export type Task = {
  __typename?: 'Task'
  cancelledTxHash?: Maybe<Scalars['Bytes']['output']>
  createdAt: Scalars['BigInt']['output']
  createdTxHash: Scalars['Bytes']['output']
  execAddress: Scalars['String']['output']
  execDataOrSelector: Scalars['Bytes']['output']
  executionCount?: Maybe<Scalars['BigInt']['output']>
  feeToken: Scalars['String']['output']
  feeTotal?: Maybe<Scalars['BigInt']['output']>
  feeTotalUsd?: Maybe<Scalars['BigInt']['output']>
  id: Scalars['ID']['output']
  interval?: Maybe<Scalars['BigInt']['output']>
  moduleArgs?: Maybe<Array<Scalars['Bytes']['output']>>
  modules?: Maybe<Array<Scalars['Int']['output']>>
  nextExec?: Maybe<Scalars['BigInt']['output']>
  resolverAddress?: Maybe<Scalars['String']['output']>
  resolverData?: Maybe<Scalars['Bytes']['output']>
  resolverHash?: Maybe<Scalars['Bytes']['output']>
  status: TaskStatus
  statusHistory?: Maybe<Array<StatusInfo>>
  taskCreator: TaskCreator
  taskExecutions?: Maybe<Array<TaskExecution>>
  updatedAt: Scalars['BigInt']['output']
  useTaskTreasuryFunds: Scalars['Boolean']['output']
  version: Version
}

export type TaskStatusHistoryArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<StatusInfo_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<StatusInfo_Filter>
}

export type TaskTaskExecutionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<TaskExecution_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<TaskExecution_Filter>
}

export type TaskCreator = {
  __typename?: 'TaskCreator'
  balances?: Maybe<Array<Balance>>
  id: Scalars['ID']['output']
  opsProxy?: Maybe<Scalars['String']['output']>
  tasks?: Maybe<Array<Task>>
  transactions?: Maybe<Array<Transaction>>
}

export type TaskCreatorBalancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Balance_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Balance_Filter>
}

export type TaskCreatorTasksArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Task_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Task_Filter>
}

export type TaskCreatorTransactionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Transaction_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Transaction_Filter>
}

export type TaskCreator_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<TaskCreator_Filter>>>
  balances_?: InputMaybe<Balance_Filter>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  opsProxy?: InputMaybe<Scalars['String']['input']>
  opsProxy_contains?: InputMaybe<Scalars['String']['input']>
  opsProxy_contains_nocase?: InputMaybe<Scalars['String']['input']>
  opsProxy_ends_with?: InputMaybe<Scalars['String']['input']>
  opsProxy_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  opsProxy_gt?: InputMaybe<Scalars['String']['input']>
  opsProxy_gte?: InputMaybe<Scalars['String']['input']>
  opsProxy_in?: InputMaybe<Array<Scalars['String']['input']>>
  opsProxy_lt?: InputMaybe<Scalars['String']['input']>
  opsProxy_lte?: InputMaybe<Scalars['String']['input']>
  opsProxy_not?: InputMaybe<Scalars['String']['input']>
  opsProxy_not_contains?: InputMaybe<Scalars['String']['input']>
  opsProxy_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  opsProxy_not_ends_with?: InputMaybe<Scalars['String']['input']>
  opsProxy_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  opsProxy_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  opsProxy_not_starts_with?: InputMaybe<Scalars['String']['input']>
  opsProxy_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  opsProxy_starts_with?: InputMaybe<Scalars['String']['input']>
  opsProxy_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  or?: InputMaybe<Array<InputMaybe<TaskCreator_Filter>>>
  tasks_?: InputMaybe<Task_Filter>
  transactions_?: InputMaybe<Transaction_Filter>
}

export enum TaskCreator_OrderBy {
  Balances = 'balances',
  Id = 'id',
  OpsProxy = 'opsProxy',
  Tasks = 'tasks',
  Transactions = 'transactions',
}

export type TaskExecution = {
  __typename?: 'TaskExecution'
  execAddress: Scalars['String']['output']
  execData: Scalars['Bytes']['output']
  executedAt: Scalars['BigInt']['output']
  feeToken: PaymentToken
  id: Scalars['ID']['output']
  success: Scalars['Boolean']['output']
  task: Task
  txFee: Scalars['BigInt']['output']
  txFeeUsd: Scalars['BigInt']['output']
}

export type TaskExecution_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<TaskExecution_Filter>>>
  execAddress?: InputMaybe<Scalars['String']['input']>
  execAddress_contains?: InputMaybe<Scalars['String']['input']>
  execAddress_contains_nocase?: InputMaybe<Scalars['String']['input']>
  execAddress_ends_with?: InputMaybe<Scalars['String']['input']>
  execAddress_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  execAddress_gt?: InputMaybe<Scalars['String']['input']>
  execAddress_gte?: InputMaybe<Scalars['String']['input']>
  execAddress_in?: InputMaybe<Array<Scalars['String']['input']>>
  execAddress_lt?: InputMaybe<Scalars['String']['input']>
  execAddress_lte?: InputMaybe<Scalars['String']['input']>
  execAddress_not?: InputMaybe<Scalars['String']['input']>
  execAddress_not_contains?: InputMaybe<Scalars['String']['input']>
  execAddress_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  execAddress_not_ends_with?: InputMaybe<Scalars['String']['input']>
  execAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  execAddress_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  execAddress_not_starts_with?: InputMaybe<Scalars['String']['input']>
  execAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  execAddress_starts_with?: InputMaybe<Scalars['String']['input']>
  execAddress_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  execData?: InputMaybe<Scalars['Bytes']['input']>
  execData_contains?: InputMaybe<Scalars['Bytes']['input']>
  execData_gt?: InputMaybe<Scalars['Bytes']['input']>
  execData_gte?: InputMaybe<Scalars['Bytes']['input']>
  execData_in?: InputMaybe<Array<Scalars['Bytes']['input']>>
  execData_lt?: InputMaybe<Scalars['Bytes']['input']>
  execData_lte?: InputMaybe<Scalars['Bytes']['input']>
  execData_not?: InputMaybe<Scalars['Bytes']['input']>
  execData_not_contains?: InputMaybe<Scalars['Bytes']['input']>
  execData_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>
  executedAt?: InputMaybe<Scalars['BigInt']['input']>
  executedAt_gt?: InputMaybe<Scalars['BigInt']['input']>
  executedAt_gte?: InputMaybe<Scalars['BigInt']['input']>
  executedAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  executedAt_lt?: InputMaybe<Scalars['BigInt']['input']>
  executedAt_lte?: InputMaybe<Scalars['BigInt']['input']>
  executedAt_not?: InputMaybe<Scalars['BigInt']['input']>
  executedAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  feeToken?: InputMaybe<Scalars['String']['input']>
  feeToken_?: InputMaybe<PaymentToken_Filter>
  feeToken_contains?: InputMaybe<Scalars['String']['input']>
  feeToken_contains_nocase?: InputMaybe<Scalars['String']['input']>
  feeToken_ends_with?: InputMaybe<Scalars['String']['input']>
  feeToken_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  feeToken_gt?: InputMaybe<Scalars['String']['input']>
  feeToken_gte?: InputMaybe<Scalars['String']['input']>
  feeToken_in?: InputMaybe<Array<Scalars['String']['input']>>
  feeToken_lt?: InputMaybe<Scalars['String']['input']>
  feeToken_lte?: InputMaybe<Scalars['String']['input']>
  feeToken_not?: InputMaybe<Scalars['String']['input']>
  feeToken_not_contains?: InputMaybe<Scalars['String']['input']>
  feeToken_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  feeToken_not_ends_with?: InputMaybe<Scalars['String']['input']>
  feeToken_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  feeToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  feeToken_not_starts_with?: InputMaybe<Scalars['String']['input']>
  feeToken_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  feeToken_starts_with?: InputMaybe<Scalars['String']['input']>
  feeToken_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  or?: InputMaybe<Array<InputMaybe<TaskExecution_Filter>>>
  success?: InputMaybe<Scalars['Boolean']['input']>
  success_in?: InputMaybe<Array<Scalars['Boolean']['input']>>
  success_not?: InputMaybe<Scalars['Boolean']['input']>
  success_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>
  task?: InputMaybe<Scalars['String']['input']>
  task_?: InputMaybe<Task_Filter>
  task_contains?: InputMaybe<Scalars['String']['input']>
  task_contains_nocase?: InputMaybe<Scalars['String']['input']>
  task_ends_with?: InputMaybe<Scalars['String']['input']>
  task_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  task_gt?: InputMaybe<Scalars['String']['input']>
  task_gte?: InputMaybe<Scalars['String']['input']>
  task_in?: InputMaybe<Array<Scalars['String']['input']>>
  task_lt?: InputMaybe<Scalars['String']['input']>
  task_lte?: InputMaybe<Scalars['String']['input']>
  task_not?: InputMaybe<Scalars['String']['input']>
  task_not_contains?: InputMaybe<Scalars['String']['input']>
  task_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  task_not_ends_with?: InputMaybe<Scalars['String']['input']>
  task_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  task_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  task_not_starts_with?: InputMaybe<Scalars['String']['input']>
  task_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  task_starts_with?: InputMaybe<Scalars['String']['input']>
  task_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  txFee?: InputMaybe<Scalars['BigInt']['input']>
  txFeeUsd?: InputMaybe<Scalars['BigInt']['input']>
  txFeeUsd_gt?: InputMaybe<Scalars['BigInt']['input']>
  txFeeUsd_gte?: InputMaybe<Scalars['BigInt']['input']>
  txFeeUsd_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  txFeeUsd_lt?: InputMaybe<Scalars['BigInt']['input']>
  txFeeUsd_lte?: InputMaybe<Scalars['BigInt']['input']>
  txFeeUsd_not?: InputMaybe<Scalars['BigInt']['input']>
  txFeeUsd_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  txFee_gt?: InputMaybe<Scalars['BigInt']['input']>
  txFee_gte?: InputMaybe<Scalars['BigInt']['input']>
  txFee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  txFee_lt?: InputMaybe<Scalars['BigInt']['input']>
  txFee_lte?: InputMaybe<Scalars['BigInt']['input']>
  txFee_not?: InputMaybe<Scalars['BigInt']['input']>
  txFee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
}

export enum TaskExecution_OrderBy {
  ExecAddress = 'execAddress',
  ExecData = 'execData',
  ExecutedAt = 'executedAt',
  FeeToken = 'feeToken',
  FeeTokenDecimals = 'feeToken__decimals',
  FeeTokenId = 'feeToken__id',
  FeeTokenName = 'feeToken__name',
  FeeTokenSymbol = 'feeToken__symbol',
  Id = 'id',
  Success = 'success',
  Task = 'task',
  TaskCancelledTxHash = 'task__cancelledTxHash',
  TaskCreatedAt = 'task__createdAt',
  TaskCreatedTxHash = 'task__createdTxHash',
  TaskExecAddress = 'task__execAddress',
  TaskExecDataOrSelector = 'task__execDataOrSelector',
  TaskExecutionCount = 'task__executionCount',
  TaskFeeToken = 'task__feeToken',
  TaskFeeTotal = 'task__feeTotal',
  TaskFeeTotalUsd = 'task__feeTotalUsd',
  TaskId = 'task__id',
  TaskInterval = 'task__interval',
  TaskNextExec = 'task__nextExec',
  TaskResolverAddress = 'task__resolverAddress',
  TaskResolverData = 'task__resolverData',
  TaskResolverHash = 'task__resolverHash',
  TaskStatus = 'task__status',
  TaskUpdatedAt = 'task__updatedAt',
  TaskUseTaskTreasuryFunds = 'task__useTaskTreasuryFunds',
  TxFee = 'txFee',
  TxFeeUsd = 'txFeeUsd',
}

export enum TaskStatus {
  Cancelled = 'cancelled',
  Ongoing = 'ongoing',
}

export type Task_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<Task_Filter>>>
  cancelledTxHash?: InputMaybe<Scalars['Bytes']['input']>
  cancelledTxHash_contains?: InputMaybe<Scalars['Bytes']['input']>
  cancelledTxHash_gt?: InputMaybe<Scalars['Bytes']['input']>
  cancelledTxHash_gte?: InputMaybe<Scalars['Bytes']['input']>
  cancelledTxHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>
  cancelledTxHash_lt?: InputMaybe<Scalars['Bytes']['input']>
  cancelledTxHash_lte?: InputMaybe<Scalars['Bytes']['input']>
  cancelledTxHash_not?: InputMaybe<Scalars['Bytes']['input']>
  cancelledTxHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>
  cancelledTxHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>
  createdAt?: InputMaybe<Scalars['BigInt']['input']>
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  createdTxHash?: InputMaybe<Scalars['Bytes']['input']>
  createdTxHash_contains?: InputMaybe<Scalars['Bytes']['input']>
  createdTxHash_gt?: InputMaybe<Scalars['Bytes']['input']>
  createdTxHash_gte?: InputMaybe<Scalars['Bytes']['input']>
  createdTxHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>
  createdTxHash_lt?: InputMaybe<Scalars['Bytes']['input']>
  createdTxHash_lte?: InputMaybe<Scalars['Bytes']['input']>
  createdTxHash_not?: InputMaybe<Scalars['Bytes']['input']>
  createdTxHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>
  createdTxHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>
  execAddress?: InputMaybe<Scalars['String']['input']>
  execAddress_contains?: InputMaybe<Scalars['String']['input']>
  execAddress_contains_nocase?: InputMaybe<Scalars['String']['input']>
  execAddress_ends_with?: InputMaybe<Scalars['String']['input']>
  execAddress_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  execAddress_gt?: InputMaybe<Scalars['String']['input']>
  execAddress_gte?: InputMaybe<Scalars['String']['input']>
  execAddress_in?: InputMaybe<Array<Scalars['String']['input']>>
  execAddress_lt?: InputMaybe<Scalars['String']['input']>
  execAddress_lte?: InputMaybe<Scalars['String']['input']>
  execAddress_not?: InputMaybe<Scalars['String']['input']>
  execAddress_not_contains?: InputMaybe<Scalars['String']['input']>
  execAddress_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  execAddress_not_ends_with?: InputMaybe<Scalars['String']['input']>
  execAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  execAddress_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  execAddress_not_starts_with?: InputMaybe<Scalars['String']['input']>
  execAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  execAddress_starts_with?: InputMaybe<Scalars['String']['input']>
  execAddress_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  execDataOrSelector?: InputMaybe<Scalars['Bytes']['input']>
  execDataOrSelector_contains?: InputMaybe<Scalars['Bytes']['input']>
  execDataOrSelector_gt?: InputMaybe<Scalars['Bytes']['input']>
  execDataOrSelector_gte?: InputMaybe<Scalars['Bytes']['input']>
  execDataOrSelector_in?: InputMaybe<Array<Scalars['Bytes']['input']>>
  execDataOrSelector_lt?: InputMaybe<Scalars['Bytes']['input']>
  execDataOrSelector_lte?: InputMaybe<Scalars['Bytes']['input']>
  execDataOrSelector_not?: InputMaybe<Scalars['Bytes']['input']>
  execDataOrSelector_not_contains?: InputMaybe<Scalars['Bytes']['input']>
  execDataOrSelector_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>
  executionCount?: InputMaybe<Scalars['BigInt']['input']>
  executionCount_gt?: InputMaybe<Scalars['BigInt']['input']>
  executionCount_gte?: InputMaybe<Scalars['BigInt']['input']>
  executionCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  executionCount_lt?: InputMaybe<Scalars['BigInt']['input']>
  executionCount_lte?: InputMaybe<Scalars['BigInt']['input']>
  executionCount_not?: InputMaybe<Scalars['BigInt']['input']>
  executionCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  feeToken?: InputMaybe<Scalars['String']['input']>
  feeToken_contains?: InputMaybe<Scalars['String']['input']>
  feeToken_contains_nocase?: InputMaybe<Scalars['String']['input']>
  feeToken_ends_with?: InputMaybe<Scalars['String']['input']>
  feeToken_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  feeToken_gt?: InputMaybe<Scalars['String']['input']>
  feeToken_gte?: InputMaybe<Scalars['String']['input']>
  feeToken_in?: InputMaybe<Array<Scalars['String']['input']>>
  feeToken_lt?: InputMaybe<Scalars['String']['input']>
  feeToken_lte?: InputMaybe<Scalars['String']['input']>
  feeToken_not?: InputMaybe<Scalars['String']['input']>
  feeToken_not_contains?: InputMaybe<Scalars['String']['input']>
  feeToken_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  feeToken_not_ends_with?: InputMaybe<Scalars['String']['input']>
  feeToken_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  feeToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  feeToken_not_starts_with?: InputMaybe<Scalars['String']['input']>
  feeToken_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  feeToken_starts_with?: InputMaybe<Scalars['String']['input']>
  feeToken_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  feeTotal?: InputMaybe<Scalars['BigInt']['input']>
  feeTotalUsd?: InputMaybe<Scalars['BigInt']['input']>
  feeTotalUsd_gt?: InputMaybe<Scalars['BigInt']['input']>
  feeTotalUsd_gte?: InputMaybe<Scalars['BigInt']['input']>
  feeTotalUsd_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  feeTotalUsd_lt?: InputMaybe<Scalars['BigInt']['input']>
  feeTotalUsd_lte?: InputMaybe<Scalars['BigInt']['input']>
  feeTotalUsd_not?: InputMaybe<Scalars['BigInt']['input']>
  feeTotalUsd_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  feeTotal_gt?: InputMaybe<Scalars['BigInt']['input']>
  feeTotal_gte?: InputMaybe<Scalars['BigInt']['input']>
  feeTotal_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  feeTotal_lt?: InputMaybe<Scalars['BigInt']['input']>
  feeTotal_lte?: InputMaybe<Scalars['BigInt']['input']>
  feeTotal_not?: InputMaybe<Scalars['BigInt']['input']>
  feeTotal_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  interval?: InputMaybe<Scalars['BigInt']['input']>
  interval_gt?: InputMaybe<Scalars['BigInt']['input']>
  interval_gte?: InputMaybe<Scalars['BigInt']['input']>
  interval_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  interval_lt?: InputMaybe<Scalars['BigInt']['input']>
  interval_lte?: InputMaybe<Scalars['BigInt']['input']>
  interval_not?: InputMaybe<Scalars['BigInt']['input']>
  interval_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  moduleArgs?: InputMaybe<Array<Scalars['Bytes']['input']>>
  moduleArgs_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>
  moduleArgs_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>
  moduleArgs_not?: InputMaybe<Array<Scalars['Bytes']['input']>>
  moduleArgs_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>
  moduleArgs_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>
  modules?: InputMaybe<Array<Scalars['Int']['input']>>
  modules_contains?: InputMaybe<Array<Scalars['Int']['input']>>
  modules_contains_nocase?: InputMaybe<Array<Scalars['Int']['input']>>
  modules_not?: InputMaybe<Array<Scalars['Int']['input']>>
  modules_not_contains?: InputMaybe<Array<Scalars['Int']['input']>>
  modules_not_contains_nocase?: InputMaybe<Array<Scalars['Int']['input']>>
  nextExec?: InputMaybe<Scalars['BigInt']['input']>
  nextExec_gt?: InputMaybe<Scalars['BigInt']['input']>
  nextExec_gte?: InputMaybe<Scalars['BigInt']['input']>
  nextExec_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  nextExec_lt?: InputMaybe<Scalars['BigInt']['input']>
  nextExec_lte?: InputMaybe<Scalars['BigInt']['input']>
  nextExec_not?: InputMaybe<Scalars['BigInt']['input']>
  nextExec_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  or?: InputMaybe<Array<InputMaybe<Task_Filter>>>
  resolverAddress?: InputMaybe<Scalars['String']['input']>
  resolverAddress_contains?: InputMaybe<Scalars['String']['input']>
  resolverAddress_contains_nocase?: InputMaybe<Scalars['String']['input']>
  resolverAddress_ends_with?: InputMaybe<Scalars['String']['input']>
  resolverAddress_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  resolverAddress_gt?: InputMaybe<Scalars['String']['input']>
  resolverAddress_gte?: InputMaybe<Scalars['String']['input']>
  resolverAddress_in?: InputMaybe<Array<Scalars['String']['input']>>
  resolverAddress_lt?: InputMaybe<Scalars['String']['input']>
  resolverAddress_lte?: InputMaybe<Scalars['String']['input']>
  resolverAddress_not?: InputMaybe<Scalars['String']['input']>
  resolverAddress_not_contains?: InputMaybe<Scalars['String']['input']>
  resolverAddress_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  resolverAddress_not_ends_with?: InputMaybe<Scalars['String']['input']>
  resolverAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  resolverAddress_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  resolverAddress_not_starts_with?: InputMaybe<Scalars['String']['input']>
  resolverAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  resolverAddress_starts_with?: InputMaybe<Scalars['String']['input']>
  resolverAddress_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  resolverData?: InputMaybe<Scalars['Bytes']['input']>
  resolverData_contains?: InputMaybe<Scalars['Bytes']['input']>
  resolverData_gt?: InputMaybe<Scalars['Bytes']['input']>
  resolverData_gte?: InputMaybe<Scalars['Bytes']['input']>
  resolverData_in?: InputMaybe<Array<Scalars['Bytes']['input']>>
  resolverData_lt?: InputMaybe<Scalars['Bytes']['input']>
  resolverData_lte?: InputMaybe<Scalars['Bytes']['input']>
  resolverData_not?: InputMaybe<Scalars['Bytes']['input']>
  resolverData_not_contains?: InputMaybe<Scalars['Bytes']['input']>
  resolverData_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>
  resolverHash?: InputMaybe<Scalars['Bytes']['input']>
  resolverHash_contains?: InputMaybe<Scalars['Bytes']['input']>
  resolverHash_gt?: InputMaybe<Scalars['Bytes']['input']>
  resolverHash_gte?: InputMaybe<Scalars['Bytes']['input']>
  resolverHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>
  resolverHash_lt?: InputMaybe<Scalars['Bytes']['input']>
  resolverHash_lte?: InputMaybe<Scalars['Bytes']['input']>
  resolverHash_not?: InputMaybe<Scalars['Bytes']['input']>
  resolverHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>
  resolverHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>
  status?: InputMaybe<TaskStatus>
  statusHistory_?: InputMaybe<StatusInfo_Filter>
  status_in?: InputMaybe<Array<TaskStatus>>
  status_not?: InputMaybe<TaskStatus>
  status_not_in?: InputMaybe<Array<TaskStatus>>
  taskCreator?: InputMaybe<Scalars['String']['input']>
  taskCreator_?: InputMaybe<TaskCreator_Filter>
  taskCreator_contains?: InputMaybe<Scalars['String']['input']>
  taskCreator_contains_nocase?: InputMaybe<Scalars['String']['input']>
  taskCreator_ends_with?: InputMaybe<Scalars['String']['input']>
  taskCreator_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  taskCreator_gt?: InputMaybe<Scalars['String']['input']>
  taskCreator_gte?: InputMaybe<Scalars['String']['input']>
  taskCreator_in?: InputMaybe<Array<Scalars['String']['input']>>
  taskCreator_lt?: InputMaybe<Scalars['String']['input']>
  taskCreator_lte?: InputMaybe<Scalars['String']['input']>
  taskCreator_not?: InputMaybe<Scalars['String']['input']>
  taskCreator_not_contains?: InputMaybe<Scalars['String']['input']>
  taskCreator_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  taskCreator_not_ends_with?: InputMaybe<Scalars['String']['input']>
  taskCreator_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  taskCreator_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  taskCreator_not_starts_with?: InputMaybe<Scalars['String']['input']>
  taskCreator_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  taskCreator_starts_with?: InputMaybe<Scalars['String']['input']>
  taskCreator_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  taskExecutions_?: InputMaybe<TaskExecution_Filter>
  updatedAt?: InputMaybe<Scalars['BigInt']['input']>
  updatedAt_gt?: InputMaybe<Scalars['BigInt']['input']>
  updatedAt_gte?: InputMaybe<Scalars['BigInt']['input']>
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  updatedAt_lt?: InputMaybe<Scalars['BigInt']['input']>
  updatedAt_lte?: InputMaybe<Scalars['BigInt']['input']>
  updatedAt_not?: InputMaybe<Scalars['BigInt']['input']>
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  useTaskTreasuryFunds?: InputMaybe<Scalars['Boolean']['input']>
  useTaskTreasuryFunds_in?: InputMaybe<Array<Scalars['Boolean']['input']>>
  useTaskTreasuryFunds_not?: InputMaybe<Scalars['Boolean']['input']>
  useTaskTreasuryFunds_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>
  version?: InputMaybe<Scalars['String']['input']>
  version_?: InputMaybe<Version_Filter>
  version_contains?: InputMaybe<Scalars['String']['input']>
  version_contains_nocase?: InputMaybe<Scalars['String']['input']>
  version_ends_with?: InputMaybe<Scalars['String']['input']>
  version_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  version_gt?: InputMaybe<Scalars['String']['input']>
  version_gte?: InputMaybe<Scalars['String']['input']>
  version_in?: InputMaybe<Array<Scalars['String']['input']>>
  version_lt?: InputMaybe<Scalars['String']['input']>
  version_lte?: InputMaybe<Scalars['String']['input']>
  version_not?: InputMaybe<Scalars['String']['input']>
  version_not_contains?: InputMaybe<Scalars['String']['input']>
  version_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  version_not_ends_with?: InputMaybe<Scalars['String']['input']>
  version_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  version_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  version_not_starts_with?: InputMaybe<Scalars['String']['input']>
  version_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  version_starts_with?: InputMaybe<Scalars['String']['input']>
  version_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
}

export enum Task_OrderBy {
  CancelledTxHash = 'cancelledTxHash',
  CreatedAt = 'createdAt',
  CreatedTxHash = 'createdTxHash',
  ExecAddress = 'execAddress',
  ExecDataOrSelector = 'execDataOrSelector',
  ExecutionCount = 'executionCount',
  FeeToken = 'feeToken',
  FeeTotal = 'feeTotal',
  FeeTotalUsd = 'feeTotalUsd',
  Id = 'id',
  Interval = 'interval',
  ModuleArgs = 'moduleArgs',
  Modules = 'modules',
  NextExec = 'nextExec',
  ResolverAddress = 'resolverAddress',
  ResolverData = 'resolverData',
  ResolverHash = 'resolverHash',
  Status = 'status',
  StatusHistory = 'statusHistory',
  TaskCreator = 'taskCreator',
  TaskCreatorId = 'taskCreator__id',
  TaskCreatorOpsProxy = 'taskCreator__opsProxy',
  TaskExecutions = 'taskExecutions',
  UpdatedAt = 'updatedAt',
  UseTaskTreasuryFunds = 'useTaskTreasuryFunds',
  Version = 'version',
  VersionId = 'version__id',
}

export type Transaction = {
  __typename?: 'Transaction'
  amount: Scalars['BigInt']['output']
  id: Scalars['ID']['output']
  idOfTask?: Maybe<Scalars['String']['output']>
  paymentToken: PaymentToken
  taskCreator: TaskCreator
  time: Scalars['BigInt']['output']
  transactionType: TransactionType
  txHash: Scalars['String']['output']
}

export enum TransactionType {
  Deposit = 'deposit',
  ExecFailed = 'execFailed',
  ExecSuccess = 'execSuccess',
  Withdraw = 'withdraw',
}

export type Transaction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  amount?: InputMaybe<Scalars['BigInt']['input']>
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>
  amount_not?: InputMaybe<Scalars['BigInt']['input']>
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  and?: InputMaybe<Array<InputMaybe<Transaction_Filter>>>
  id?: InputMaybe<Scalars['ID']['input']>
  idOfTask?: InputMaybe<Scalars['String']['input']>
  idOfTask_contains?: InputMaybe<Scalars['String']['input']>
  idOfTask_contains_nocase?: InputMaybe<Scalars['String']['input']>
  idOfTask_ends_with?: InputMaybe<Scalars['String']['input']>
  idOfTask_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  idOfTask_gt?: InputMaybe<Scalars['String']['input']>
  idOfTask_gte?: InputMaybe<Scalars['String']['input']>
  idOfTask_in?: InputMaybe<Array<Scalars['String']['input']>>
  idOfTask_lt?: InputMaybe<Scalars['String']['input']>
  idOfTask_lte?: InputMaybe<Scalars['String']['input']>
  idOfTask_not?: InputMaybe<Scalars['String']['input']>
  idOfTask_not_contains?: InputMaybe<Scalars['String']['input']>
  idOfTask_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  idOfTask_not_ends_with?: InputMaybe<Scalars['String']['input']>
  idOfTask_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  idOfTask_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  idOfTask_not_starts_with?: InputMaybe<Scalars['String']['input']>
  idOfTask_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  idOfTask_starts_with?: InputMaybe<Scalars['String']['input']>
  idOfTask_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  or?: InputMaybe<Array<InputMaybe<Transaction_Filter>>>
  paymentToken?: InputMaybe<Scalars['String']['input']>
  paymentToken_?: InputMaybe<PaymentToken_Filter>
  paymentToken_contains?: InputMaybe<Scalars['String']['input']>
  paymentToken_contains_nocase?: InputMaybe<Scalars['String']['input']>
  paymentToken_ends_with?: InputMaybe<Scalars['String']['input']>
  paymentToken_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  paymentToken_gt?: InputMaybe<Scalars['String']['input']>
  paymentToken_gte?: InputMaybe<Scalars['String']['input']>
  paymentToken_in?: InputMaybe<Array<Scalars['String']['input']>>
  paymentToken_lt?: InputMaybe<Scalars['String']['input']>
  paymentToken_lte?: InputMaybe<Scalars['String']['input']>
  paymentToken_not?: InputMaybe<Scalars['String']['input']>
  paymentToken_not_contains?: InputMaybe<Scalars['String']['input']>
  paymentToken_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  paymentToken_not_ends_with?: InputMaybe<Scalars['String']['input']>
  paymentToken_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  paymentToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  paymentToken_not_starts_with?: InputMaybe<Scalars['String']['input']>
  paymentToken_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  paymentToken_starts_with?: InputMaybe<Scalars['String']['input']>
  paymentToken_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  taskCreator?: InputMaybe<Scalars['String']['input']>
  taskCreator_?: InputMaybe<TaskCreator_Filter>
  taskCreator_contains?: InputMaybe<Scalars['String']['input']>
  taskCreator_contains_nocase?: InputMaybe<Scalars['String']['input']>
  taskCreator_ends_with?: InputMaybe<Scalars['String']['input']>
  taskCreator_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  taskCreator_gt?: InputMaybe<Scalars['String']['input']>
  taskCreator_gte?: InputMaybe<Scalars['String']['input']>
  taskCreator_in?: InputMaybe<Array<Scalars['String']['input']>>
  taskCreator_lt?: InputMaybe<Scalars['String']['input']>
  taskCreator_lte?: InputMaybe<Scalars['String']['input']>
  taskCreator_not?: InputMaybe<Scalars['String']['input']>
  taskCreator_not_contains?: InputMaybe<Scalars['String']['input']>
  taskCreator_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  taskCreator_not_ends_with?: InputMaybe<Scalars['String']['input']>
  taskCreator_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  taskCreator_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  taskCreator_not_starts_with?: InputMaybe<Scalars['String']['input']>
  taskCreator_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  taskCreator_starts_with?: InputMaybe<Scalars['String']['input']>
  taskCreator_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  time?: InputMaybe<Scalars['BigInt']['input']>
  time_gt?: InputMaybe<Scalars['BigInt']['input']>
  time_gte?: InputMaybe<Scalars['BigInt']['input']>
  time_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  time_lt?: InputMaybe<Scalars['BigInt']['input']>
  time_lte?: InputMaybe<Scalars['BigInt']['input']>
  time_not?: InputMaybe<Scalars['BigInt']['input']>
  time_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  transactionType?: InputMaybe<TransactionType>
  transactionType_in?: InputMaybe<Array<TransactionType>>
  transactionType_not?: InputMaybe<TransactionType>
  transactionType_not_in?: InputMaybe<Array<TransactionType>>
  txHash?: InputMaybe<Scalars['String']['input']>
  txHash_contains?: InputMaybe<Scalars['String']['input']>
  txHash_contains_nocase?: InputMaybe<Scalars['String']['input']>
  txHash_ends_with?: InputMaybe<Scalars['String']['input']>
  txHash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  txHash_gt?: InputMaybe<Scalars['String']['input']>
  txHash_gte?: InputMaybe<Scalars['String']['input']>
  txHash_in?: InputMaybe<Array<Scalars['String']['input']>>
  txHash_lt?: InputMaybe<Scalars['String']['input']>
  txHash_lte?: InputMaybe<Scalars['String']['input']>
  txHash_not?: InputMaybe<Scalars['String']['input']>
  txHash_not_contains?: InputMaybe<Scalars['String']['input']>
  txHash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  txHash_not_ends_with?: InputMaybe<Scalars['String']['input']>
  txHash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  txHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  txHash_not_starts_with?: InputMaybe<Scalars['String']['input']>
  txHash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  txHash_starts_with?: InputMaybe<Scalars['String']['input']>
  txHash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
}

export enum Transaction_OrderBy {
  Amount = 'amount',
  Id = 'id',
  IdOfTask = 'idOfTask',
  PaymentToken = 'paymentToken',
  PaymentTokenDecimals = 'paymentToken__decimals',
  PaymentTokenId = 'paymentToken__id',
  PaymentTokenName = 'paymentToken__name',
  PaymentTokenSymbol = 'paymentToken__symbol',
  TaskCreator = 'taskCreator',
  TaskCreatorId = 'taskCreator__id',
  TaskCreatorOpsProxy = 'taskCreator__opsProxy',
  Time = 'time',
  TransactionType = 'transactionType',
  TxHash = 'txHash',
}

export type Version = {
  __typename?: 'Version'
  id: Scalars['ID']['output']
  tasks?: Maybe<Array<Task>>
}

export type VersionTasksArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Task_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Task_Filter>
}

export type Version_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<Version_Filter>>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  or?: InputMaybe<Array<InputMaybe<Version_Filter>>>
  tasks_?: InputMaybe<Task_Filter>
}

export enum Version_OrderBy {
  Id = 'id',
  Tasks = 'tasks',
}

export type _Block_ = {
  __typename?: '_Block_'
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>
  /** The block number */
  number: Scalars['Int']['output']
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>
}

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_'
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_
  /** The deployment ID */
  deployment: Scalars['String']['output']
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output']
}

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny',
}

export type GetAllTaskDataQueryVariables = Exact<{
  taskCreator?: InputMaybe<Scalars['String']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}>

export type GetAllTaskDataQuery = {
  __typename?: 'Query'
  tasks: Array<{
    __typename?: 'Task'
    id: string
    executionCount?: any | null
    feeTotalUsd?: any | null
    feeTotal?: any | null
    feeToken: string
    execAddress: string
    status: TaskStatus
    nextExec?: any | null
    interval?: any | null
    execDataOrSelector: any
    resolverAddress?: string | null
    resolverData?: any | null
    modules?: Array<number> | null
    moduleArgs?: Array<any> | null
    useTaskTreasuryFunds: boolean
    resolverHash?: any | null
    createdTxHash: any
    cancelledTxHash?: any | null
    createdAt: any
    updatedAt: any
    version: { __typename?: 'Version'; id: string }
    taskCreator: { __typename?: 'TaskCreator'; id: string; opsProxy?: string | null }
  }>
}

export type GetTaskQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type GetTaskQuery = {
  __typename?: 'Query'
  task?: {
    __typename?: 'Task'
    id: string
    executionCount?: any | null
    feeTotalUsd?: any | null
    feeTotal?: any | null
    feeToken: string
    execAddress: string
    status: TaskStatus
    nextExec?: any | null
    interval?: any | null
    execDataOrSelector: any
    resolverAddress?: string | null
    resolverData?: any | null
    modules?: Array<number> | null
    moduleArgs?: Array<any> | null
    useTaskTreasuryFunds: boolean
    resolverHash?: any | null
    createdTxHash: any
    cancelledTxHash?: any | null
    createdAt: any
    updatedAt: any
    version: { __typename?: 'Version'; id: string }
    taskCreator: { __typename?: 'TaskCreator'; id: string; opsProxy?: string | null }
  } | null
}

export const GetAllTaskDataDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getAllTaskData' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'taskCreator' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tasks' },
            arguments: [
              { kind: 'Argument', name: { kind: 'Name', value: 'first' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } } },
              { kind: 'Argument', name: { kind: 'Name', value: 'skip' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } } },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'taskCreator' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'taskCreator' } },
                    },
                  ],
                },
              },
              { kind: 'Argument', name: { kind: 'Name', value: 'orderBy' }, value: { kind: 'EnumValue', value: 'createdAt' } },
              { kind: 'Argument', name: { kind: 'Name', value: 'orderDirection' }, value: { kind: 'EnumValue', value: 'desc' } },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'version' },
                  selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'taskCreator' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'opsProxy' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'executionCount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'feeTotalUsd' } },
                { kind: 'Field', name: { kind: 'Name', value: 'feeTotal' } },
                { kind: 'Field', name: { kind: 'Name', value: 'feeToken' } },
                { kind: 'Field', name: { kind: 'Name', value: 'execAddress' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'nextExec' } },
                { kind: 'Field', name: { kind: 'Name', value: 'interval' } },
                { kind: 'Field', name: { kind: 'Name', value: 'execDataOrSelector' } },
                { kind: 'Field', name: { kind: 'Name', value: 'resolverAddress' } },
                { kind: 'Field', name: { kind: 'Name', value: 'resolverData' } },
                { kind: 'Field', name: { kind: 'Name', value: 'modules' } },
                { kind: 'Field', name: { kind: 'Name', value: 'moduleArgs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'useTaskTreasuryFunds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'resolverHash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdTxHash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'cancelledTxHash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAllTaskDataQuery, GetAllTaskDataQueryVariables>
export const GetTaskDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getTask' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'task' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'id' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'version' },
                  selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'taskCreator' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'opsProxy' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'executionCount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'feeTotalUsd' } },
                { kind: 'Field', name: { kind: 'Name', value: 'feeTotal' } },
                { kind: 'Field', name: { kind: 'Name', value: 'feeToken' } },
                { kind: 'Field', name: { kind: 'Name', value: 'execAddress' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'nextExec' } },
                { kind: 'Field', name: { kind: 'Name', value: 'interval' } },
                { kind: 'Field', name: { kind: 'Name', value: 'execDataOrSelector' } },
                { kind: 'Field', name: { kind: 'Name', value: 'resolverAddress' } },
                { kind: 'Field', name: { kind: 'Name', value: 'resolverData' } },
                { kind: 'Field', name: { kind: 'Name', value: 'modules' } },
                { kind: 'Field', name: { kind: 'Name', value: 'moduleArgs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'useTaskTreasuryFunds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'resolverHash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdTxHash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'cancelledTxHash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTaskQuery, GetTaskQueryVariables>
