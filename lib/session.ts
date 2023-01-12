// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from 'iron-session'
import { SiweMessage } from 'siwe'

export const sessionOptions: IronSessionOptions = {
  password: process.env.NEXTAUTH_SECRET as string,
  cookieName: 'iron-session/examples/next.js',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: false,
  },
}

declare module 'iron-session' {
  // eslint-disable-next-line unused-imports/no-unused-vars
  interface IronSessionData {
    nonce: string
    siwe: SiweMessage
    isAdmin: boolean
  }
}
