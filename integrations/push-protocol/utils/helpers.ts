import { ENV } from '@pushprotocol/uiweb'

export const pushEnvToChainId = (env: ENV) => {
  return env === ENV.PROD ? 1 : 5
}
