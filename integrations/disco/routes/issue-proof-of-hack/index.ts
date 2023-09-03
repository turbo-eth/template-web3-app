import { discoClient } from "@/integrations/disco/disco-client"

import { PROOF_OF_HACK_SCHEMA_URL } from "../../utils/constants"
import { IssuedCredentials, IssueEntity } from "../../utils/types"

export async function discoIssueProofOfHack(val: IssueEntity) {
  const payload = {
    schemaUrl: PROOF_OF_HACK_SCHEMA_URL,
    subjectData: { ...val?.subjectData },
    recipientDID: val?.subjectData?.recipientDid,
  }

  const { data }: { data: IssuedCredentials } = await discoClient.post(
    `/credential`,
    JSON.stringify(payload),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  return data
}
