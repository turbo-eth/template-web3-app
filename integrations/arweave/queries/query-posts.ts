import { arweave } from '..'
import { ArweavePost } from '../utils/types'

type QueryReturnType = {
  edges: {
    cursor: string
    node: ArweavePost
  }[]
}

const buildQueryObject = (address: string) => ({
  query: `{
		transactions (
      owners:["${address}"],
		) {
			{
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
})

export const queryPosts = async (address: string) => {
  const results = await arweave.api.post<QueryReturnType>('/graphql', buildQueryObject(address))
  return results.data.edges
}
