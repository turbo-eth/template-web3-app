import { discoClient } from "@/integrations/disco/disco-client"

import { Profile } from "../../utils/types"

export async function discoGetProfileFromDID(did: string) {
  const { data }: { data: Profile } = await discoClient.get(`/profile/${did}`)
  return data
}
