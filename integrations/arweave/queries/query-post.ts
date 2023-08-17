import { arweave } from '..'
import { ArweavePost } from '../utils/types'

type QueryReturnType = {
  data: {
    transactions: {
      edges: {
        cursor: string
        node: ArweavePost
      }[]
    }
  }
}

const buildQueryObject = (id: string) => {
  return {
    query: `{
		transactions (
      ids: ["${id}"]
		) {
			edges {
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

export const getArweaveTx = async (id: string) => {
  const results = await arweave.api.post<QueryReturnType>('/graphql', buildQueryObject(id))
  const tx = results.data.data.transactions.edges[0].node
  return tx
}
