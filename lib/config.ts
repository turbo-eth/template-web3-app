import { IronSessionOptions } from 'iron-session'
import { SiweMessage } from 'siwe'

declare module 'iron-session' {
  // eslint-disable-next-line unused-imports/no-unused-vars
  interface IronSessionData {
    nonce: string
    siwe: SiweMessage
    isAdmin: boolean
  }
}

export const SITE_NAME = 'TurboETH'

export const SERVER_SESSION_SETTINGS: IronSessionOptions = {
  cookieName: SITE_NAME,
  password: process.env.NEXT_AUTH_SECRET ?? 'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    // secure: process.env.NODE_ENV == 'production',
    secure: false,
  },
}
