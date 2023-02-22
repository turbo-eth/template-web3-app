import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'
import { NextApiHandler } from 'next'

import { SERVER_SESSION_SETTINGS } from '../config/session'

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, SERVER_SESSION_SETTINGS)
}

export function withSessionPage(handler: any) {
  return withIronSessionSsr(handler, SERVER_SESSION_SETTINGS)
}
