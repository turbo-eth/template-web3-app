/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  'query getAllTaskData($taskCreator: String, $limit: Int, $skip: Int) {\n  tasks(\n    first: $limit\n    skip: $skip\n    where: {taskCreator: $taskCreator}\n    orderBy: createdAt\n    orderDirection: desc\n  ) {\n    id\n    version {\n      id\n    }\n    taskCreator {\n      id\n      opsProxy\n    }\n    executionCount\n    feeTotalUsd\n    feeTotal\n    feeToken\n    execAddress\n    status\n    nextExec\n    interval\n    execDataOrSelector\n    resolverAddress\n    resolverData\n    modules\n    moduleArgs\n    useTaskTreasuryFunds\n    resolverHash\n    createdTxHash\n    cancelledTxHash\n    createdAt\n    updatedAt\n  }\n}\n\nquery getTask($id: ID!) {\n  task(id: $id) {\n    id\n    version {\n      id\n    }\n    taskCreator {\n      id\n      opsProxy\n    }\n    executionCount\n    feeTotalUsd\n    feeTotal\n    feeToken\n    execAddress\n    status\n    nextExec\n    interval\n    execDataOrSelector\n    resolverAddress\n    resolverData\n    modules\n    moduleArgs\n    useTaskTreasuryFunds\n    resolverHash\n    createdTxHash\n    cancelledTxHash\n    createdAt\n    updatedAt\n  }\n}':
    types.GetAllTaskDataDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query getAllTaskData($taskCreator: String, $limit: Int, $skip: Int) {\n  tasks(\n    first: $limit\n    skip: $skip\n    where: {taskCreator: $taskCreator}\n    orderBy: createdAt\n    orderDirection: desc\n  ) {\n    id\n    version {\n      id\n    }\n    taskCreator {\n      id\n      opsProxy\n    }\n    executionCount\n    feeTotalUsd\n    feeTotal\n    feeToken\n    execAddress\n    status\n    nextExec\n    interval\n    execDataOrSelector\n    resolverAddress\n    resolverData\n    modules\n    moduleArgs\n    useTaskTreasuryFunds\n    resolverHash\n    createdTxHash\n    cancelledTxHash\n    createdAt\n    updatedAt\n  }\n}\n\nquery getTask($id: ID!) {\n  task(id: $id) {\n    id\n    version {\n      id\n    }\n    taskCreator {\n      id\n      opsProxy\n    }\n    executionCount\n    feeTotalUsd\n    feeTotal\n    feeToken\n    execAddress\n    status\n    nextExec\n    interval\n    execDataOrSelector\n    resolverAddress\n    resolverData\n    modules\n    moduleArgs\n    useTaskTreasuryFunds\n    resolverHash\n    createdTxHash\n    cancelledTxHash\n    createdAt\n    updatedAt\n  }\n}'
): (typeof documents)['query getAllTaskData($taskCreator: String, $limit: Int, $skip: Int) {\n  tasks(\n    first: $limit\n    skip: $skip\n    where: {taskCreator: $taskCreator}\n    orderBy: createdAt\n    orderDirection: desc\n  ) {\n    id\n    version {\n      id\n    }\n    taskCreator {\n      id\n      opsProxy\n    }\n    executionCount\n    feeTotalUsd\n    feeTotal\n    feeToken\n    execAddress\n    status\n    nextExec\n    interval\n    execDataOrSelector\n    resolverAddress\n    resolverData\n    modules\n    moduleArgs\n    useTaskTreasuryFunds\n    resolverHash\n    createdTxHash\n    cancelledTxHash\n    createdAt\n    updatedAt\n  }\n}\n\nquery getTask($id: ID!) {\n  task(id: $id) {\n    id\n    version {\n      id\n    }\n    taskCreator {\n      id\n      opsProxy\n    }\n    executionCount\n    feeTotalUsd\n    feeTotal\n    feeToken\n    execAddress\n    status\n    nextExec\n    interval\n    execDataOrSelector\n    resolverAddress\n    resolverData\n    modules\n    moduleArgs\n    useTaskTreasuryFunds\n    resolverHash\n    createdTxHash\n    cancelledTxHash\n    createdAt\n    updatedAt\n  }\n}']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
