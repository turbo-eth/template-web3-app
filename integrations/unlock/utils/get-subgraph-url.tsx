import { env } from '@/env.mjs'
const { GRAPH_API_KEY } = env
const SUBGRAPH_ID = 'QmdAxPQ5yXcXtHsvjxTkPNbGgLdWrR7bqPm4jeMcSFp6gN'

const graphExplorerUrl = `https://gateway.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/${SUBGRAPH_ID}`

export default graphExplorerUrl
