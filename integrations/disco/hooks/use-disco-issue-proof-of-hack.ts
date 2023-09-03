import { useMutation } from "@tanstack/react-query"

import { appDiscoIssueProofOfHack } from "../routes/issue-proof-of-hack/client"
import { EventData } from "../utils/types"

export const useDiscoIssueProofOfHack = () => {
  return useMutation({
    mutationFn: (vars: EventData) => {
      return appDiscoIssueProofOfHack(vars)
    },
  })
}
