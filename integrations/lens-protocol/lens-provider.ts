import { development, LensConfig } from "@lens-protocol/react-web"
import { bindings as wagmiBindings } from "@lens-protocol/wagmi"

export const lensProviderConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: development,
}
