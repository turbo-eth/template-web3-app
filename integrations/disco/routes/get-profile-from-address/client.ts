import axios from "axios"
import type { Address } from "wagmi"

import { Profile } from "../../utils/types"

export async function appDiscoGetProfileFromAddress(address?: Address) {
  try {
    const { data }: { data: Profile } = await axios.get(
      `/api/disco/profile-from-address`,
      {
        params: {
          address: address,
        },
      }
    )
    return data
  } catch (error) {
    throw error
  }
}
