import { LensConfig, development, production } from '@lens-protocol/react-web'
import { bindings as wagmiBindings } from '@lens-protocol/wagmi'

export const lensProviderConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: process.env.NODE_ENV === 'production' ? production : development,
}
