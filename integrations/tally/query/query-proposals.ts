import { GovernanceProposalsArgs } from "../autogen/schema"
import { tallyQuery } from "../tally-client"

const proposalsDocument = `
  query Governors(
    $ids: [AccountID!],
    $pagination: Pagination
  ) {
      governors(
        ids: $ids
      ) {
          proposals(pagination: $pagination, sort: {field: START_BLOCK, order: DESC}) {
            id
            description
            block {
              timestamp
            }
            voteStats {
              votes
              percent
              support
              weight
            }
            statusChanges {
              type
            }
          }
          name
          slug
        }
    }

`

export const proposalsQuery = (
  variables: GovernanceProposalsArgs & { id: string },
  apiKey: string
) => {
  const { id } = variables
  return tallyQuery({
    query: proposalsDocument,
    variables: { ...variables, ids: [id] },
    apiKey,
  })
}
