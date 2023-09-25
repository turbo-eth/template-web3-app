import { QueryAccountsArgs } from "../autogen/schema"
import { tallyQuery } from "../tally-client"

const accountDocument = `
  query Accounts(
    $ids: [AccountID!],
    $addresses: [Address!]
  ) { 
      accounts(
        ids: $ids,
        addresses: $addresses
      ) {
        id
        address
        ens
        twitter
        name
        bio
        picture
        safes
        meta {
          name
          ens
          twitter
          bio
          picture
          type
        }
      }
  }
`

export const accountQuery = (variables: QueryAccountsArgs, apiKey: string) =>
  tallyQuery({ query: accountDocument, variables, apiKey })
