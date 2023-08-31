import { isAutomateSupported } from "@gelatonetwork/automate-sdk"
import { useNetwork } from "wagmi"

export const useIsAutomateSupported = () => {
  const { chain } = useNetwork()

  return chain?.id ? isAutomateSupported(chain.id) : false
}
