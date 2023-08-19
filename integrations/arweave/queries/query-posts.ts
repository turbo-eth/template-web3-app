import { arweave } from '..'
import { ArweavePost, ArweaveTxSearchTag } from '../utils/types'

type QueryReturnType = {
  data: {
    transactions: {
      pageInfo: {
        hasNextPage: boolean
      }
      edges: {
        cursor: string
        node: ArweavePost
      }[]
    }
  }
}

const pageSize = 100

const buildQueryObject = (address = '', tags: ArweaveTxSearchTag[], cursor = '') => {
  let params = `first: ${pageSize},`
  if (address) params += `owners: ["${address}"],`
  if (tags.length) {
    params += 'tags: '
    tags.forEach((tag) => {
      const value = tag.values.reduce((tot, cur, index) => {
        tot += `"${cur.value}"`
        if (index !== tag.values.length - 1) tot += ','
        return tot
      }, '')
      params += `{ name: "${tag.name}", values: [${value}]}`
    })
    params += `,`
  }
  if (cursor) params += `after: "${cursor}"`
  return {
    query: `{
		transactions (
      ${params}
		) {
      pageInfo { 
        hasNextPage
      },
			edges {
        cursor,
				node {
					id,
          tags { name, value },
          owner { address },
          data { size, type },
          anchor,
          signature,
          recipient,
          fee { winston, ar },
          quantity { winston, ar },
          block { timestamp, height },
          bundledIn { id }
				}
			}
		}
	}`,
  }
}

export const queryPosts = async (address: string, tags: ArweaveTxSearchTag[], lastCursor?: string) => {
  const results = await arweave.api.post<QueryReturnType>('/graphql', buildQueryObject(address, tags, lastCursor))
  const txs = results.data.data.transactions
  return {
    txs: txs.edges.map((edge) => edge.node),
    lastCursor: txs.edges.length ? txs.edges[txs.edges.length - 1].cursor : '',
    hasNextPage: txs.pageInfo.hasNextPage,
  }
}
