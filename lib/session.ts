import { IronSessionOptions } from 'iron-session'
import { SiweMessage } from 'siwe'

import { siteConfig } from '@/config/site'
import { env } from '@/env.mjs'

declare module 'iron-session' {
  // eslint-disable-next-line unused-imports/no-unused-vars
  interface IronSessionData {
    nonce: string
    siwe: SiweMessage
    isAdmin: boolean
  }
}

// This is the secret used to encrypt the session cookie
// It should be at least 32 characters long
export const NEXTAUTH_SECRET = env.NEXTAUTH_SECRET

// The httpOnly cookie option is not working so we are using
// a hack to remove the cookie from the browser
// See: /api/siwe/logout
export const SERVER_SESSION_SETTINGS: IronSessionOptions = {
  cookieName: siteConfig.name,
  password: NEXTAUTH_SECRET ?? 'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV == 'production',
  },
}
