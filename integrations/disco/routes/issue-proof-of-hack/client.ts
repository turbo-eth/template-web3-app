import { PROOF_OF_HACK_SCHEMA_URL } from "../../utils/constants"
import { EventData } from "../../utils/types"

export async function appDiscoIssueProofOfHack(values: EventData) {
  const payload = {
    schemaUrl: PROOF_OF_HACK_SCHEMA_URL,
    subjectData: { ...values },
    recipientDID: values?.recipientDid,
  }

  const res = await fetch("/api/disco/issue-proof-of-hack", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok && res.status !== 200) {
    throw new Error(await res.text())
  }

  return res.json() as Promise<EventData>
}
