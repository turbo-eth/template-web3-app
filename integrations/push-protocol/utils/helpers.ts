import { ApiNotificationType } from '@pushprotocol/restapi'
import { ENV } from '@pushprotocol/uiweb'

export const pushEnvToChainId = (env: ENV) => {
  return env === ENV.PROD ? 1 : 5
}

export const truncateAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const getMockedNotification = ({ env }: { env: ENV }): ApiNotificationType => {
  return {
    channel: '0x74415Bc4C4Bf4Baecc2DD372426F0a1D016Fa924',
    payload: {
      data: {
        app: '',
        acta: 'https://staging.push.org',
        icon: '',
        aimg: 'https://staging.push.org/push.svg',
        url: 'https://staging.push.org',
        amsg: 'This is an example notification received on PUSH!',
        asub: 'Hello from PUSH!',
      },
    },
    source: env === ENV.STAGING ? 'ETH_TEST_GOERLI' : 'ETH_TEST_MAINNET',
  } as ApiNotificationType
}

export const strLimit = (text: string, count: number) => {
  return text.slice(0, count) + (text.length > count ? '...' : '')
}
