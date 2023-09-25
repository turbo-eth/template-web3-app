import { QueryGovernancesArgs } from "../autogen/schema"
import { tallyQuery } from "../tally-client"

const chainsDocument = `
  query Chains {
      chains { 
          id
          name
          svg
        }
    }
`

export const chainsQuery = (apiKey: string) =>
  tallyQuery({ query: chainsDocument, variables: {}, apiKey })
