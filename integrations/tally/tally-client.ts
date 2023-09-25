const TALLY_API_URL = "https://api.tally.xyz/query"

export type TallyQueryParams = {
  query: string
  variables: Record<string, unknown>
  apiKey: string
}

const fetcher = async ({ query, variables, apiKey }: TallyQueryParams) => {
  try {
    if (!apiKey) return { error: "Missing tally API Key." }
    const data = JSON.stringify({
      query,
      variables,
    })
    const response = await fetch(TALLY_API_URL, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
        "Api-Key": apiKey,
      },
    })
    if (response.status === 200) {
      const result = await response.json()
      if (result?.errors) {
        return { error: result.errors }
      }

      return { result: result.data }
    } else {
      const result = await response.json()
      if (result?.errors) return { error: result.errors[0].message }
      return { error: response.statusText }
    }
  } catch (error) {
    console.error(error)
    return { error: String(error) }
  }
}

export const tallyQuery = ({ query, variables, apiKey }: TallyQueryParams) => {
  return fetcher({ query, variables, apiKey })
}
