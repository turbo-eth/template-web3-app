import { QueryProposalArgs } from "../autogen/schema"
import { tallyQuery } from "../tally-client"

const proposalDocument = `
  query ProposalDetails($governanceId: AccountID!, $proposalId: ID!) {
    proposal(proposalId: $proposalId, governanceId: $governanceId) {
      id
      description
      voteStats {
        votes
        percent
        support
        weight
      }
      statusChanges {
        type
      }
      votes(sort: {field: WEIGHT, order: DESC}, pagination: {limit: 500}) {
        voter {
          name
          picture
          address
          identities {
            twitter
          }
        }
        reason
        support
        weight
        block {
          timestamp
        }
      }
      executable {
        values
        targets
        callDatas
        signatures
      }
      governance {
        id
        chainId
        organization {
          description
        }
        contracts {
          governor {
            address
            type
          }
        }
        timelockId
      }
      governor {
        tokens {
          decimals
          symbol
        }
      }
      governanceId
      block {
        timestamp
      }
    }
}


`

export const proposalQuery = (variables: QueryProposalArgs, apiKey: string) => {
  return tallyQuery({
    query: proposalDocument,
    variables,
    apiKey,
  })
}
