// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { SiweMessage } from 'siwe'

declare module 'iron-session' {
  // eslint-disable-next-line unused-imports/no-unused-vars
  interface IronSessionData {
    nonce: string
    siwe: SiweMessage
    isAdmin: boolean
  }
}
