import { arweave } from '..'

// owners:["${address}"],
const queryObject = {
  query: `{
		transactions (
			tags: [
			  {
					name: "Type",
					values: ["manifest"]
				}
			]
		) {
			edges {
				node {
					id
				}
			}
		}
	}`,
}

export const queryPosts = async () => {
  const results = await arweave.api.post('/graphql', queryObject)
  return results
}
