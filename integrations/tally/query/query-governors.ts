import { QueryGovernancesArgs } from "../autogen/schema"
import { tallyQuery } from "../tally-client"

const governorsDocument = `
  query Governances(
    $pagination: Pagination,
  ) {
      governances(
        pagination: $pagination,
      ) { 
          id
          name
          chainId
          organization {
            visual {
              icon
            }
            name
            description
          }
          stats {
            tokens {
              voters
              owners
            }
            proposals {
              active
              total
              passed
              failed
            }
          }
          slug
        }
    }
`

export const governorsQuery = (
  variables: QueryGovernancesArgs,
  apiKey: string
) => tallyQuery({ query: governorsDocument, variables, apiKey })
