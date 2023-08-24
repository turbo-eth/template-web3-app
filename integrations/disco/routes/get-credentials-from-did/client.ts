import axios from "axios"

export async function appDiscoGetCredentialsFromDID(did?: string) {
  try {
    const { data }: { data: Credential[] } = await axios.get(
      `/api/disco/credentials-from-did`,
      {
        params: {
          did: did,
        },
      }
    )
    return data
  } catch (error) {
    throw new Error("something went wrong ", error.message)
  }
}
