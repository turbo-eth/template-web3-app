import { QueryGovernancesArgs, QueryGovernorsArgs } from "../autogen/schema"
import { tallyQuery } from "../tally-client"

const governorDocument = `
  query Governors(
    $ids: [AccountID!],
  ) {
      governors(
        ids: $ids
      ) { 
          id
          proposalStats {
            total
            active
            failed
            passed
          }
          name
          tokens {
            id
            type
            address
            name
            symbol
            supply
            lastBlock
            decimals
            stats {
              voters
              supply
              delegatedVotingPower
            }
          }
          proposals(pagination: {limit:4, offset:0}, sort: {field: START_BLOCK, order: DESC}) {
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
          delegates(pagination: {limit:3, offset:0}, sort: { field: VOTING_WEIGHT, order: DESC }) {
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
          }
          name
          slug
        }
    }
`

export const governorQuery = (
  variables: QueryGovernorsArgs & { id: string },
  apiKey: string
) => {
  const { id } = variables
  return tallyQuery({
    query: governorDocument,
    variables: { ...variables, ids: [id] },
    apiKey,
  })
}
;`

    query GovernanceTrendingDelegates($governanceId: AccountID!, $sort: DelegateSort, $pagination: Pagination) {
  governance(id: $governanceId) {
    id
    chainId
    organization {
      name
      visual {
        icon
      }
    }
    contracts {
      tokens {
        type
        address
      }
      governor {
        type
      }
    }
    name
    stats {
      tokens {
        owners
        voters
        supply
        delegatedVotingPower
      }
    }
    quorum
    parameters {
      ... on GovernorBravoParameters {
        proposalThreshold
      }
      ... on OpenZeppelinGovernorParameters {
        proposalThreshold
      }
      ... on GovernorAlphaParameters {
        proposalThreshold
      }
      ... on GovernorAaveParameters {
        proposalThreshold
      }
    }
    tokens {
      symbol
      decimals
    }
    delegates(sort: $sort, pagination: $pagination) {
      account {
        address
        name
        bio
        picture
        identities {
          ens
          twitter
        }
      }
      participation {
        stats {
          weight {
            total
            owned
          }
          votes {
            total
          }
          delegations {
            total
          }
        }
      }
    }
  }
}

`
