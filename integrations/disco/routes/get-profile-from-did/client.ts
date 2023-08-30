import axios from "axios"
import type { Address } from "wagmi"

import { Profile } from "../../utils/types"

export async function appDiscoGetProfileFromDID(address?: Address) {
  try {
    const { data }: { data: Profile } = await axios.get(
      `/api/disco/profile-from-did`,
      {
        params: {
          address: address,
        },
      }
    )
    return data
  } catch (error) {
    throw new Error("something went wrong")
  }
}
