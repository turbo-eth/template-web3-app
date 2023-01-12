import { IronSessionOptions } from 'iron-session'

export const SITE_NAME = 'TurboETH'

export const SERVER_SESSION_SETTINGS: IronSessionOptions = {
  cookieName: SITE_NAME,
  password: process.env.SESSION_PASSWORD ?? 'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: false,
  },
}
