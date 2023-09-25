import { GovernanceDelegatesArgs } from "../autogen/schema"
import { tallyQuery } from "../tally-client"

const governorDocument = `
  query Governors(
    $ids: [AccountID!],
    $pagination: Pagination,
    $sort: DelegateSort
  ) {
      governors(
        ids: $ids
      ) { 
          delegates(pagination: $pagination, sort: $sort) {
            account {
              id
              address
              ens
              twitter
              name
              bio
              picture
              safes
            }
            stats {
              delegationCount
              votes {
                total
              }
              weight {
                owned
                total
              }
            }
            governor {
              tokens {
                symbol
                decimals
              }
            }
          }
          
        }
    }
`

export const delegationsQuery = (
  variables: GovernanceDelegatesArgs & { id: string },
  apiKey: string
) => {
  const { id } = variables
  return tallyQuery({
    query: governorDocument,
    variables: { ...variables, ids: [id] },
    apiKey,
  })
}
