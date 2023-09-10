import { useQuery } from "@tanstack/react-query"

import { TALLY_API_KEY } from "../tally-provider"

const TALLY_API_URL = "https://api.tally.xyz/query"

export type TallyQueryParams = {
  query: string
  variables: Record<string, unknown>
}

const fetcher = async ({ query, variables }: TallyQueryParams) => {
  try {
    const response = await fetch(TALLY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": TALLY_API_KEY,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
    const json = await response.json()
    if (json?.errors) {
      console.error("error when fetching", json.errors)
      return { error: json.errors }
    }

    return { result: json.data }
  } catch (error) {
    console.error("Error when fetching =>", error)
    return { error }
  }
}

// as a function
export const tallyQuery = ({ query, variables }: TallyQueryParams) => {
  return fetcher({ query, variables })
}

// as a hook
export const useTallyQuery = ({ query, variables }: TallyQueryParams) => {
  return useQuery({
    queryKey: [query.slice(0, 10), variables],
    queryFn: () => fetcher({ query, variables }),
  })
}
