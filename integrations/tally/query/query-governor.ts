import { QueryGovernancesArgs } from "../autogen/schema"
import { tallyQuery, useTallyQuery } from "./tally-client"

const governorsDocument = `
  query Governors(
    $chainIds: [ChainID!],
    $addresses: [Address!],
    $ids: [AccountID!],
    $includeInactive: Boolean,
    $pagination: Pagination,
    $sort: GovernorSort,
    $includeUnlinked: Boolean
  ) {
      governors(
        chainIds: $chainIds,
        addresses: $addresses,
        ids: $ids,
        includeInactive: $includeInactive,
        pagination: $pagination,
        sort: $sort,
        includeUnlinked: $includeUnlinked
      ) { 
          id
          type
          proposalStats {
            total
            active
            failed
            passed
          }
          name
          slug
        }
    }
`

// hook (@tanstack/react-query)
export const useGovernorsQuery = (variables: QueryGovernancesArgs) =>
  useTallyQuery({ query: governorsDocument, variables })

// normal function
export const governorsQuery = (variables: QueryGovernancesArgs) =>
  tallyQuery({ query: governorsDocument, variables })
